/*
Project: 剑网3分流页 切换背景图
Created: 2015-10-13
Author : Duanqinxue@kingsoft.com
Updated: 2015-10-13 10:18
*/

function man_bg(){ 
    $('.page_lb').fadeOut('slow');
    $('.page_man').fadeIn('slow');
    setTimeout("lb_bg()",4000)
}

function lb_bg(){ 
    $('.page_man').fadeOut('slow');
    $('.page_lb').fadeIn('slow');
    setTimeout("man_bg()",4000)
}

$(function(){ 

    setTimeout("lb_bg()",4000)
});