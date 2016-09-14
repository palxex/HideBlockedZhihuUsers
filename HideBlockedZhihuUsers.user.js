// ==UserScript==
// fork from https://greasyfork.org/zh-CN/scripts/10807-知乎-隐藏你屏蔽的人
// @name        知乎·隐藏你屏蔽的人补完
// @namespace   ZhihuHideBlockedUserExtended
// @description 屏蔽用户，主站改为https，彻底掩埋痕迹
// @include     http://www.zhihu.com/
// @include     http://www.zhihu.com/*
// @include     https://www.zhihu.com/
// @include     https://www.zhihu.com/*
// @version     1
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       none
// ==/UserScript==
var sitePrefix = "https://www.zhihu.com/";
var peoplePrefix = (sitePrefix + "people/").replace(/.*?:\/\//g, "");
var userlist = localStorage.UserList.split(',');
function BlockPeople()
{
  var $userlist = $('.blocked-users .item-card a.avatar-link');
  var username = new Array($userlist.length);
  for (i = 0; i < $userlist.length; i++)
  {
    username[i] = $userlist.eq(i).attr('href').replace('/people/', '');
  }
  localStorage.UserList = username;
}
$(function () {
  console.log("HideBlockedZhihu UserJS Works");
  if (window.location.href == 'https://www.zhihu.com/settings/filter')
  {
    BlockPeople();
  }
  if (localStorage.UserList == undefined)
  {
    if (window.location.href != 'https://www.zhihu.com/settings/filter')
    {
      if (confirm('将要跳转到 https://www.zhihu.com/settings/filter 获取屏蔽列表'))
      {
        window.location.href = 'https://www.zhihu.com/settings/filter';
      }
    }
  }
});

function replaceContentWithText(node, text) {
	node.children().hide();
	var spanNode = document.createElement('span');
	spanNode.append( document.createTextNode(text) );
	spanNode.style.color = "#999";
	node.append(spanNode);
}

//屏蔽评论，尚欠回复
function processComment (jNode) {

    iNode=jNode[0];
    aNode=iNode.childNodes[0];
	if(aNode.tagName!="A") //匿名用户是SPAN
		return;

    for (var user of userlist)
    {
    	if ((new RegExp('^'+peoplePrefix+user+'$')).test(aNode.href.replace(/.*?:\/\//g, "")) ) 
    		replaceContentWithText(jNode,'这里有一条已被block的评论');
 	}
}
waitForKeyElements ("div._CommentItem_root_PQNS", processComment);
//屏蔽提醒
function processNotify (jNode) {
    iNode=jNode[0];
    spanNode=iNode.childNodes[1];
	if(spanNode.childElementCount <= 0)//匿名用户没有用户区...
		return;
    userNode=spanNode.childNodes[1];
    aNode=userNode.childNodes[0];
	if(aNode.tagName!="A")
		return;

    for (var user of userlist)
    {
    	if ((new RegExp('^'+peoplePrefix+user+'$')).test(aNode.href.replace(/.*?:\/\//g, "")) ) 
    		replaceContentWithText(jNode,'这里有一条已被block的提醒');
 	}
}
waitForKeyElements ("div.zm-noti7-content-item", processNotify);
//屏蔽回答
function processAnswer (jNode) {
    iNode=jNode[0];
    headNode=iNode.childNodes[11];
	if(headNode.childElementCount <= 0)//匿名用户没有用户区...
		return;
    infoNode=headNode.childNodes[1];
    aNode=infoNode.childNodes[1];
	if(aNode.tagName!="A")
		return;

    for (var user of userlist)
    {
    	if ((new RegExp(user+'$')).test(aNode.href.replace(/.*?:\/\//g, "")) ) 
    		replaceContentWithText(jNode,'这里有一条已被block的回答');
 	}
}
waitForKeyElements ("div.zm-item-answer", processAnswer);
//屏蔽时间线
function processFeed (jNode) {
    iNode=jNode[0];
    mainNode=iNode.childNodes[5];
    contentNode=mainNode.childNodes[3];
    entryNode=contentNode.childNodes[13];
	if(entryNode.childElementCount <= 0)//匿名用户没有用户区...
		return;
    authorNode=entryNode.childNodes[9];
    summaryNode=authorNode.childNodes[1];
    linkNode=summaryNode.childNodes[1];
    aNode=linkNode.childNodes[1];
	if(aNode.tagName!="A")
		return;

    for (var user of userlist)
    {
    	if ((new RegExp(user+'$')).test(aNode.href.replace(/.*?:\/\//g, "")) ) 
    		replaceContentWithText(jNode,'这里有一条已被block的回答');
 	}
}
waitForKeyElements ("div.feed-item", processFeed);