package com.bepotato.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.bepotato.po.News;
import com.bepotato.po.NewsMessage;
import com.bepotato.po.TextMessage;
import com.thoughtworks.xstream.XStream;



public class MessageUtil {
	
	public static final String MESSAGE_TEXT = "text";
	public static final String MESSAGE_NEWS = "news";
	public static final String MESSAGE_VOICE = "voice";
	public static final String MESSAGE_VIDEO = "video";
	public static final String MESSAGE_IMAGE = "image";
	public static final String MESSAGE_LINK = "link";
	public static final String MESSAGE_LOCATION = "location";
	public static final String MESSAGE_EVENT = "event";				//事件消息
	public static final String MESSAGE_SUBSCRIBE = "subscribe";		//关注事件
	public static final String MESSAGE_UNSUBSCRIBE = "unsubscribe";	//取消关注
	public static final String MESSAGE_VIEW = "VIEW";				//菜单点击
	public static final String MESSAGE_CLICK = "CLICK";				//菜单点击
	

	/**
	 * xml转map
	 * 
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws DocumentException
	 */
	public static Map<String, String> xmlToMap(HttpServletRequest request) throws IOException, DocumentException{
		Map<String, String> map = new HashMap<String, String>();
		
		SAXReader reader = new SAXReader();
		InputStream ins = request.getInputStream();
		Document doc = reader.read(ins);
		
		Element root = doc.getRootElement();
		
		List<Element> list= root.elements();
		
		for (Element element : list) {
			map.put(element.getName(), element.getText());
		}
		ins.close();
		return map;
	}
	
	/**
	 * 文本转xml
	 * @param textmessage
	 * @return
	 */
	public static String textMessageToXml(TextMessage textmessage){
		XStream xStream = new XStream();
		xStream.alias("xml", textmessage.getClass());
		return xStream.toXML(textmessage);
	}
	
	/**
	 * 初始化文本信息 
	 * @param toUserName
	 * @param fromUserName
	 * @param content
	 * @return
	 */
	public static String initTextMessage(String toUserName, String fromUserName, String content){
		String message = null;
		TextMessage textMessage = new TextMessage();
		textMessage.setFromUserName(toUserName);
		textMessage.setToUserName(fromUserName);
		textMessage.setMsgType(MESSAGE_TEXT);
		textMessage.setCreateTime(new Date().getTime());
		textMessage.setContent(content);
		message = textMessageToXml(textMessage);
		return message;
	}
	
	
	public static String menuText(){
		StringBuffer sb = new StringBuffer();
		sb.append("我早已饥渴难耐了，欢迎关注比逗\n\n");
		sb.append("回复1：了解比逗餐厅\n");
		sb.append("回复2：获取比逗餐厅地址\n");
		sb.append("回复？：调出此菜单");
		return sb.toString();
	}
	
	public static String firstMenu(){
		StringBuffer sb = new StringBuffer();
		sb.append("firstMenu");
		return sb.toString();
	}
	public static String secondMenu(){
		StringBuffer sb = new StringBuffer();
		sb.append("secondMenu");
		return sb.toString();
	}
	
	/**
	 * NewsMessage图文消息转xml
	 * @param newsMessage
	 * @return
	 */
	public static String newsMessageToXml(NewsMessage newsMessage){
		XStream xStream = new XStream();
		xStream.alias("xml", newsMessage.getClass());
		xStream.alias("item", new News().getClass());
		return xStream.toXML(newsMessage);
	}
	
	/**
	 * 创建图文消息
	 * @param toUserName
	 * @param fromUserName
	 * @return
	 */
	public static String initNewsMessage(String toUserName, String fromUserName,int index){
		String message = null;
		List<News> newsList = new ArrayList<News>();
		NewsMessage newsMessage = new NewsMessage();
		
		News news1 = new News();
		news1.setTitle("标题1:" + index);
		news1.setDescription("描述1");
		news1.setPicUrl(UserUtil.TUNNEL_URL + "/wx_order/images/banner01.jpg");
		news1.setUrl("www.imooc.com");
		
		newsList.add(news1);
		
		News news2 = new News();
		news2.setTitle("标题2:" + index);
		news2.setDescription("描述2");
		news2.setPicUrl(UserUtil.TUNNEL_URL + "/wx_order/images/banner02.jpg");
		news2.setUrl("www.imooc.com");
		
		newsList.add(news2);
		
		newsMessage.setFromUserName(toUserName);
		newsMessage.setToUserName(fromUserName);
		newsMessage.setArticles(newsList);
		newsMessage.setMsgType(MESSAGE_NEWS);
		newsMessage.setCreateTime(new Date().getTime());
		newsMessage.setArticleCount(newsList.size());
		
		message = newsMessageToXml(newsMessage);
		return message;
	}

}
