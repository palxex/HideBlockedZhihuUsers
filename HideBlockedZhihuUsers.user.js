// ==UserScript==
// fork from https://greasyfork.org/zh-CN/scripts/10807-知乎-隐藏你屏蔽的人
// @name        知乎·隐藏你屏蔽的人增强
// @namespace   ZhihuHideBlockedUserExtended
// @description 屏蔽用户，主站改为https，彻底掩埋痕迹
// @include     http://www.zhihu.com/
// @include     http://www.zhihu.com/*
// @include     https://www.zhihu.com/
// @include     https://www.zhihu.com/*
// @version     1
// @grant       none
// ==/UserScript==
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
  else
  {
    var userlist = localStorage.UserList.split(',');
    //初次加载评论
    $('a[name="addcomment"]').click(function () {
      setTimeout(function () {
        //屏蔽评论
        var $commentlist = $('.zm-comment-list .zm-item-comment .zm-item-link-avatar')
        for (i = 0; i < $commentlist.length; i++)
        {
          if ($commentlist.eq(i).attr('href') != undefined)
          {
            for (j = 0; j < userlist.length; j++)
            {
              if ($commentlist.eq(i).attr('href').indexOf(userlist[j]) != - 1)
              {
                $commentlist.eq(i).parents('.zm-item-comment').hide();
              }
            }
          }
        }
      }, 3000
      )
    }
    )
    //加载更多评论
    $('a[name="load-more"]').click(function () {
      setTimeout(function () {
        //屏蔽评论
        var $commentlist = $('.zm-comment-list .zm-item-comment .zm-item-link-avatar')
        for (i = 0; i < $commentlist.length; i++)
        {
          if ($commentlist.eq(i).attr('href') != undefined)
          {
            for (j = 0; j < userlist.length; j++)
            {
              if ($commentlist.eq(i).attr('href').indexOf(userlist[j]) != - 1)
              {
                $commentlist.eq(i).parents('.zm-item-comment').hide();
              }
            }
          }
        }
      }, 10000
      )
    });
    //屏蔽回答
    if (window.location.href.indexOf('https://www.zhihu.com/question/') != - 1)
    {
      var $answerlist = $('.zm-item-answer .answer-head .zm-item-answer-author-info .zm-item-answer-author-wrap a.zm-item-link-avatar');
      for (i = 0; i < $answerlist.length; i++)
      {
        for (j = 0; j < userlist.length; j++)
        {
          if ($answerlist.eq(i).attr('href').indexOf(userlist[j]) != - 1)
          {
            $answerlist.eq(i).parents('.zm-item-answer').hide();
          }
        }
      }
    }
    //屏蔽时间线

    if (window.location.href == 'https://www.zhihu.com/')
    {
      var $timeline = $('.feed-item .feed-item-inner .feed-main .content .entry-body .zm-item-answer-detail .zm-item-answer-author-info .zm-item-answer-author-wrap a');
      for (i = 0; i < $timeline.length; i++)
      {
        for (j = 0; j < userlist.length; j++)
        {
          if ($timeline.eq(i).attr('href').indexOf(userlist[j]) != - 1)
          {
            $timeline.eq(i).parents('.feed-item').hide();
          }
        }
      }
    }
    //localStorage.removeItem('UserList');

  }
});