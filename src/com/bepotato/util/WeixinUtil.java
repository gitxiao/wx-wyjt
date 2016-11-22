package com.bepotato.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.Date;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.bepotato.menu.Button;
import com.bepotato.menu.ClickButton;
import com.bepotato.menu.Menu;
import com.bepotato.menu.ViewButton;
import com.bepotato.po.AccessToken;
import com.bepotato.po.AccessTokenDao;
import com.bepotato.po.Scene;
import com.bepotato.po.Ticket;

import net.sf.json.JSONObject;

public class WeixinUtil {

	public static String APPID="wx47ad8a0dccadf604";
	public static String APPSECRET="12574628aa7e7f86050efff423359f2d";
	public static String ACCESS_TOKEN_URL ="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
	
	/**
	 * 创建菜单的接口
	 */
	public static String CREATE_MENU_URL ="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";	
	public static String AUTHORIZE_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=1#wechat_redirect";
	public static String DELETE_MENU_URL ="https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN";
	public static String TICKET_URL="https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN";
	public static String QRCODE_URL="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET";
	public static final String MY_URL ="http://119.29.26.47";
	
	/**
	 * get����
	 * @param url
	 * @return
	 */
	public static JSONObject doGetStr(String url){
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpGet httpGet =new HttpGet(url);
		JSONObject jsonObject = null;
		try {
			HttpResponse response = httpClient.execute(httpGet);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				String result = EntityUtils.toString(entity,"utf-8");
				jsonObject = JSONObject.fromObject(result);
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	
	/**
	 * post����
	 * @param url
	 * @param outStr
	 * @return
	 */
	public static JSONObject doPostStr(String url,String outStr){
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpPost httpPost = new HttpPost(url);
		JSONObject jsonObject =null;
		try {
			httpPost.setEntity(new StringEntity(outStr, "utf-8"));
			HttpResponse response = httpClient.execute(httpPost);
			String result = EntityUtils.toString(response.getEntity(),"utf-8");
			jsonObject = JSONObject.fromObject(result);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	
	/**
	 * AccessToken 的有效时间是2小时， 获取一次后可以保存到本地，每次获取时，先从本地拿到已保存的AccessToken
	 * ，如果快过期，再获取一个新的，没有过期，就使用本地的。因为AccessToken每天的获取次数是有上限的，2000次
	 * 如果业务繁忙，或者用户数量很多， 这个次数有可能会不够。所以要采用上面每隔2个小时获取一次的方法
	 * @return
	 */
	public static AccessToken getAccessToken(){
		
		//TODO 从数据库读取上一次的token,判断是否超时,如果超时,获取新的,没超时就还用原来的
		
		AccessToken token = new AccessToken();
		String url = ACCESS_TOKEN_URL.replace("APPID", APPID).replace("APPSECRET", APPSECRET);
		JSONObject jsonObject = doGetStr(url);
		if (jsonObject != null) {
			token.setToken(jsonObject.getString("access_token"));
			token.setExpiresIn(jsonObject.getInt("expires_in"));
			token.setCreateTime(new Timestamp(new Date().getTime()));
			System.out.println("成功获得最新token:"+token.getToken());
			
			//TODO 获取新的token后,保存到数据库,2个小时获取一次,防止超过次数上限(每天2000次)
		}
		return token;
	}
	
	/**
	 **初始化菜单װ
	 * @return
	 */
	public static Menu initMenu(){
		Menu menu = new Menu();			//菜单栏
		
		ViewButton button = new ViewButton();		//第一个主菜单
		button.setName("测试3");
		button.setType("view");
//		String url = CreateURL(MY_URL + "/pages/home.jsp");
//		String url = CreateURL("http://7f60950f.ngrok.io/wx_order/index.jsp");
		String url = CreateURL("http://75b6926f.ngrok.io/wx_order/demos/index.html");
//		String url = CreateURL("http://7f60950f.ngrok.io/wx_order/index.html");
		System.out.println("initMenu url = " + url);
		button.setUrl(url);
		
		Button button2 = new Button();				//第二个主菜单
		button2.setName("菜单");
		
		ClickButton cb1 = new ClickButton();		//子菜单
		cb1.setKey("cb1");
		cb1.setName("1");
		cb1.setType("click");
		
		ClickButton cb2 = new ClickButton();
		cb2.setKey("cb2");
		cb2.setName("条形码");
		cb2.setType("scancode_push");

		ClickButton cb3 = new ClickButton();
		cb3.setKey("cb3");
		cb3.setName("位置");
		cb3.setType("location_select");

		ClickButton cb4 = new ClickButton();
		cb4.setKey("cb4");
		cb4.setName("照片");
		cb4.setType("pic_weixin");
		
		button2.setSub_button(new Button[]{cb1,cb2,cb3,cb4});
		
		menu.setButton(new Button[]{button,button2});
		return menu;
	}
	
	/**
	 * 创建菜单
	 * @param menu
	 * @return
	 */
	public static int createMenu(String menu,String token){
		int result =0;
//		AccessTokenDao atDao = new AccessTokenDao();
//		atDao.checkToken();
//		String token = atDao.getAccessTokenBySQL().getToken();
		System.out.println("token = " + token);
//		token = "bepotato";
		String url = CREATE_MENU_URL.replace("ACCESS_TOKEN", token);
		JSONObject jsonObject = doPostStr(url, menu);
		if (jsonObject != null) {
			result = jsonObject.getInt("errcode");
		}
		return result;
	}
	
	public static int deleteMenu(String token){
		int result = 0;
		String url = DELETE_MENU_URL.replace("ACCESS_TOKEN", token);
		JSONObject jsonObject = doGetStr(url);
		if (jsonObject != null) {
			result = jsonObject.getInt("errcode");
		}
		return result;
	}
	
	public static String CreateURL(String url){
		String redirect_url = null;
		String urltemp =null;
		try {
			redirect_url = URLEncoder.encode(url,"utf-8");
			urltemp = AUTHORIZE_URL.replace("APPID", APPID).replace("REDIRECT_URI", redirect_url).replace("SCOPE", "snsapi_base");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return urltemp;
	}
	
	public static JSONObject getTicketJsonObj(int scene_id,int expire_seconds){
		Ticket t = new Ticket();
		t.setAction_name(Ticket.QR_SCENE);
		Scene scene = new Scene();
		scene.setScene_id(scene_id);
		t.setAction_info(scene);
		t.setExpire_seconds(expire_seconds);
		String ticket = JSONObject.fromObject(t).toString();
		System.out.println(ticket);
		AccessTokenDao atDao = new AccessTokenDao();
		atDao.checkToken();
		String token = atDao.getAccessTokenBySQL().getToken();
		String url = TICKET_URL.replace("TOKEN", token);
		return doPostStr(url, ticket);
	}
	
	public static String getQrcodeUrl(JSONObject ticketObj){
		String ticketString = ticketObj.getString("ticket");
		String url =null;
		try {
			url = QRCODE_URL.replace("TICKET", URLEncoder.encode(ticketString,"utf-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return url;
	}
}
