package com.bepotato.test;

import net.sf.json.JSONObject;

import com.bepotato.po.AccessToken;
import com.bepotato.util.WeixinUtil;

public class test {

	public static void main(String[] args) {
		
		AccessToken token = WeixinUtil.getAccessToken();
		System.out.println("票据:" + token.getToken());
		System.out.println("有效时间:" + token.getExpiresIn());
		
		
		//创建菜单
		String menu = JSONObject.fromObject(WeixinUtil.initMenu()).toString();
		System.out.println("menu = " + menu);
		int result = WeixinUtil.createMenu(menu,token.getToken());
		if (result == 0) {
			System.out.println("创建菜单成功");
		}else{
			System.out.println("错误码："+result);
		}
		
		//获取二维码
//		JSONObject tjsonObj = WeixinUtil.getTicketJsonObj(2015,604800);
//		String ticketString = tjsonObj.getString("ticket");
//		int expire_seconds = tjsonObj.getInt("expire_seconds");
//		String url = tjsonObj.getString("url");
//		System.out.println("ticketString:"+ticketString);
//		System.out.println("expire_seconds:"+expire_seconds);
//		System.out.println("url:"+url);
//		
//		String qrcodeUrl = WeixinUtil.getQrcodeUrl(tjsonObj);
//		System.out.println("qrcodeUrl:"+qrcodeUrl);

		
	}

}
