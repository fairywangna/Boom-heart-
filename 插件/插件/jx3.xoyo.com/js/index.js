/**
 * 剑三
 * @author：duanqinxue@kingsoft.com
 * @coding by duanqinxue;data :2017-04-20
 */
(function ($) {
    $.extend({
        jx3: {
            target: 0,
            init: function () {//页面初始化
                this.jqtab_module();      //选项卡 左侧微博
                this.video_model();       //视频

                this.server_module();     //推荐服务器滚动
                if (this.target == 1) {    //如果是首页
                    this.slides_module(); //轮播图
                    this.tabs_model();    //新闻滚动
                    this.friend_module(); //友情链接滚动
                    this.scroll_media();
                    this.tongren_model();
                }
                if (this.target == 2) {    //如果是下载页
                    this.down_hover_module();
                }
            },
            getpaintlist: function ($type, $style, $sort, $kind, $page, $fn) {
                var that = this;
                var dom = "";

                if ($kind == 3 || $kind == 2) {
                    $.inf.getmedia_func({
                        type: $type,
                        style: $style,
                        sort: $sort,
                        kind: $kind,
                        page: $page
                    }, function ($data) {
                        if ($data.status > 0) {
                            var dom = '';
                            $.each($data.tips.data, function (i, object) {
                                if (i < 5) {
                                    dom += [
                                        '<li>',
                                        '<a href="//tr.jx3.xoyo.com/detail.html?id=' + object.id + '&kind=' + $kind + '" target="_blank">',
                                        '<img src="' + object.img + '" alt=""></a></li>',
                                        '</a>',
                                        '</li>'
                                    ].join("");
                                }
                            });
                            $fn(dom)
                        }
                    });
                } else {
                    $.inf.getmedia_func({
                        type: $type,
                        style: $style,
                        sort: $sort,
                        kind: $kind,
                        page: $page
                    }, function ($data) {
                        if ($data.status > 0) {
                            var dom = '';
                            $.each($data.tips.data, function (i, object) {
                                if (i < 5) {
                                    dom += [
                                        '<li>',
                                        '<a href="//jx3.xoyo.com/tr/detail.html?id=' + object.id + '&kind=' + $kind + '" target="_blank">',
                                        '<img src="' + object.image[0] + '" alt=""></a></li>',
                                        '</a>',
                                        '</li>'
                                    ].join("");
                                }
                            });
                            $fn(dom)
                        }
                    });
                }
            },
            tongren_model: function () {
                var that = this;
                that.getpaintlist('', '', '', 4, 1, function ($dom) {
                    $('.J_trCon01 ul').empty().html($dom)
                });
                $('.J_tongrenBtn').on('click', function () {
                    var $kind = $(this).attr('data-kind');
                    var $c = $(this).attr('data-class');
                    that.getpaintlist('', '', '', $kind, 1, function ($dom) {
                        $('.J_trCon0' + $c + ' ul').empty().html($dom)
                    });
                });
            },

            down_hover_module: function () {
                var that = this;


                function postdata() {
                    var version = $("#version").val();
                    if (version.length == 0) {
                        alert("请填写版本号！");
                        $('#version').focus();
                        return false;
                    }
                    var url = "//zt.xoyo.com/other/updatepage/index.php?act=search&game=jx3&version=" + version + "&callback=?";
                    jQuery.getJSON(url, function (data) {
                        if (data.status == 'emptyversion') {
                            alert("请填写版本号！");
                            $('#version').focus();
                        } else if (data.status == 'noversion') {
                            alert("您输入的版本号不存在！");
                            $('#version').focus();
                        } else if (data.status == 'newestversion') {
                            alert("您现在的版本号已为最新，不用下载手动更新包！");
                            $('#version').focus();
                        } else {
                            $("#pagelisttable").css('display', '');
                            $("#searchresult").empty();
                            $("#searchresult").append(data.data);
                        }
                    });
                };
                /*
                 * 补丁搜索
                 */
                $('#search_ver').click(function () {
                    var versionTwo = $("#versionTwo").val();
                    if (versionTwo.length == 0) {
                        alert("请填写版本号！");
                        $('#versionTwo').focus();
                        return false;
                    }
                    var urlTwo = "//zt.xoyo.com/other/updatepage/index.php?act=search&game=jx3V3&version=" + versionTwo + "&callback=?";
                    jQuery.getJSON(urlTwo, function (data) {
                        if (data.status == 'emptyversion') {
                            alert("请填写版本号！");
                            $('#versionTwo').focus();
                        } else if (data.status == 'noversion') {
                            alert("您输入的版本号不存在！");
                            $('#versionTwo').focus();
                        } else if (data.status == 'newestversion') {
                            alert("您现在的版本号已为最新，不用下载手动更新包！");
                            $('#versionTwo').focus();
                        } else {
                            $("#pagelisttable").css('display', '');
                            $("#searchresult").empty();
                            $("#searchresult").append(data.data);
                        }
                    });
                });

                /*
                 * 补丁事件
                 */
                var $btn = $('.cms-patch-more');
                var $con = $('.patch_wrap tr:gt(3)');
                var btnClick = true;
                $con.hide();
                $btn.click(function () {
                    if (btnClick == true) {
                        $(this).addClass('js');
                        btnClick = false;
                        $con.show();
                    } else {
                        $(this).removeClass('js');
                        btnClick = true;
                        $con.hide();
                    }
                });

                /*
                 * 补丁弹出层
                 */
                $('#pop_buding_btn').click(function () {
                    $('html,body').animate({scrollTop: '0'}, 400);
                    $('.pop_buding, .popup_wrap').show();
                });
                $('#pop_banben_btn').click(function () {
                    $('.pop_banben, .popup_wrap').show();
                })
                $('#pop_zhushou_btn').click(function () {
                    $('.pop_zhushou, .popup_wrap').show();
                });
                $('.pop_close').click(function () {
                    $('.popup_box, .popup_wrap').fadeOut();
                });

                //补丁列表
                $.ajax({
                    url: '//zt.xoyo.com/other/updatepage/index.php?act=apilist&game=jx3V3&num=300',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function ($data) {
                        if ($data.status == 'ok') {
                            var html = "";
                            $.each($data.data, function (i, item) {
                                html += '<tr>' +
                                    '<td>' + item.version + '</td>' +
                                    '<td>' + item.size + '</td>' +
                                    '<td>' + item.md5 + '</td>' +
                                    '<td>' + item.update_time + '</td>' +
                                    '<td><a href="' + item.url + '" target="_blank">点击下载更新包</a></td>' +
                                    '</tr>'
                            });
                            $('#buding_list').empty().append(html);

                            $('#pop_buding_box tr, .cms-patch-history tbody tr').mouseover(function () {
                                $(this).addClass('pop_hover').siblings().removeClass('pop_hover')
                            });

                            /*
                             * 补丁事件
                             */
                            var $btn = $('.cms-patch-more');
                            var $con = $('.patch_wrap tr:gt(3)');
                            var btnClick = true;
                            $con.hide();
                            $btn.click(function () {
                                if (btnClick == true) {
                                    $(this).addClass('js');
                                    btnClick = false;
                                    $con.show();
                                } else {
                                    $(this).removeClass('js');
                                    btnClick = true;
                                    $con.hide();
                                }

                            });
                        } else {

                        }
                    }
                })

//测试客户端下载补丁列表
                $.ajax({
                    url: '//zt.xoyo.com/other/updatepage/index.php?act=apilist&game=jx3cs&num=300',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function ($data) {
                        if ($data.status == 'ok') {
                            var html2 = "";
                            $.each($data.data, function (i, item) {
                                html2 += '<tr>' +
                                    '<td>' + item.version + '</td>' +
                                    '<td>' + item.size + '</td>' +
                                    '<td>' + item.md5 + '</td>' +
                                    '<td>' + item.update_time + '</td>' +
                                    '<td><a href="' + item.url + '" target="_blank">点击下载更新包</a></td>' +
                                    '</tr>'
                            });
                            $('#ceshi_list').empty().append(html2);

                            $('.cms-patch-history tbody tr').mouseover(function () {
                                $(this).addClass('pop_hover').siblings().removeClass('pop_hover')
                            });

                            /*
                             * 补丁事件
                             */
                            var $btn = $('.cms-patch-more');
                            var $con = $('.patch_wrap tr:gt(3)');
                            var btnClick = true;
                            $con.hide();
                            $btn.click(function () {
                                if (btnClick == true) {
                                    $(this).addClass('js');
                                    btnClick = false;
                                    $con.show();
                                } else {
                                    $(this).removeClass('js');
                                    btnClick = true;
                                    $con.hide();
                                }

                            });
                        } else {

                        }
                    }
                })

            },

            friend_module: function () {
                var that = this;
                need("biz.scroll", function (s) {
//上下滚动js代码
                    s.init({
                        conId: 'rollbox2',//内容容器ID
                        frameWidth: '260',//显示框宽度
                        pageSpace: '168',//翻页宽度或高度
                        autoPlay: true,//true为自动播放、false为不自动播放
                        position: 'up',//播放方向 left为向左，up为向上,设置为up时必须加上翻页高度pageHeight值
                        autoPlayTime: '2'//自动播放间隔时间(秒)
                    })
                })
//
            },

            server_module: function () {
                var that = this;
                that.scroll_top('.server_scroll', 'li:first');
            },

            slides_module: function () {  //轮播
                var that = this;
                $('#slides, #slides2').slides({
                    preload: true,
                    preloadImage: '//pic.xoyo.com/cms/9/2012/11/23/features/loading.gif',
                    play: 4000,
                    pause: 2500,
                    hoverPause: true,
                    effect: 'slides'
                });
            },

            video_model: function () {
                var that = this;
//页面视频
                var videoNum = 0;  //一个页面有多个视频的计数器
                var videoList = [["//static.jx3.xoyo.com/res/2017/04/12/3.0_1.mp4"], ["//static.jx3.xoyo.com/res/2017/04/12/mingjiaoboy.mp4"], ["//static.jx3.xoyo.com/res/2017/04/12/all.mp4"]]
                var videoPic = ["//jx3.xoyo.com/zt/2016/05/31/testcj/images/video_pic_1.jpg", "//jx3.xoyo.com/zt/2016/05/31/testcj/images/video_pic_2.jpg", "//jx3.xoyo.com/zt/2016/05/31/testcj/images/video_pic_3.jpg"];
                $('.vt2 li').click(function () {
//        $('.pop-wrap,.pop-video').show();
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.popup_con').find('.win_video').empty();
                    videoNum = $(this).attr('data-index') ? $(this).attr('data-index') : $(this).index();
                    $('.popup_con').find('.win_video').miPlayer({
                        showTitle: false,
                        autoPlay: true,
                        width: 740,
                        height: 440,
                        title: '',
                        poster: videoPic[videoNum], //第一桢图片地址
                        videos: videoList[videoNum], //视频地址
                        onStart: function () {
                            $(".clarity-btn-text").html('高清');
                        }
                    });
                })

                $(".head_video_btn").click(function () {
                    $('.video_table').show();
                    $(".popup_wrap, .popup_box_sp").show();
                    $('.vt2 li').eq(0).addClass('cur').siblings().removeClass('cur');
                    videoNum = 0;
                    $('.popup_con').find('.win_video').miPlayer({
                        showTitle: false,
                        autoPlay: true,
                        width: 740,
                        height: 440,
                        title: '',
                        poster: videoPic[videoNum], //第一桢图片地址
                        videos: videoList[videoNum], //视频地址
                        onStart: function () {
                            $(".clarity-btn-text").html('高清');
                        }
                    });
                });

                $(".con_right .rig_video, .con_left .rig_video").click(function () {
                    $('.video_table').hide();
                    $(".popup_wrap, .popup_box_sp").show();
                    videoNum = 0;
                    $('.popup_con').find('.win_video').miPlayer({
                        showTitle: false,
                        autoPlay: true,
                        width: 740,
                        height: 440,
                        title: '',
                        poster: videoPic[videoNum], //第一桢图片地址
                        videos: videoList[videoNum], //视频地址
                        onStart: function () {
                            $(".clarity-btn-text").html('高清');
                        }
                    });
                });

                $(".school_wrap .sch_video").click(function () { //视频弹出
                    var i_temp = "";
                    i_temp = $(this).attr("id");
                    $(".popup_wrap, .popup_box_mpsp").show();
                    $("#flash_video_pop").attr("src", "//jx3.xoyo.com/assets/website/2015/08/25/video/iframe_item" + i_temp + ".html")
                });
                $(".popup_title .close").click(function () { //关闭视频弹出窗
                    $(".popup_wrap, .popup_box").hide();
                    $('.popup_con').find('.win_video').empty();
                    $("#flash_video_pop").attr("src", "//jx3.xoyo.com/assets/website/2015/08/25/white.html")

                });
            },

//点击滚动
            scroll_media: function () {
                var _wrap = $('.media_list_focus');//定义滚动区域
                var _interval = 3000;//定义滚动间隙时间
                var _moving;//需要清除的动画
                var num = 0;
                _wrap.hover(function () {
                    clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
                }, function () {
                    _moving = setInterval(function () {
                        num++;
                        if (num > 8) {
                            num = 0;
                        }
                        $('.media .con_title ul li').eq(num).click();
                    }, _interval)//滚动间隔时间取决于_interval
                }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
            },

//多行滚动应用
            scroll_left: function (box, first) {
                var _wrap = $(box);//定义滚动区域
                var _interval = 3000;//定义滚动间隙时间
                var _moving;//需要清除的动画
                _wrap.hover(function () {
                    clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
                }, function () {
                    _moving = setInterval(function () {
                        var _field = _wrap.find(first);//此变量不可放置于函数起始处,li:first取值是变化的
                        var _h = _field.height();//取得每次滚动高度
                        _field.animate({marginTop: -_h + 'px'}, 400, function () {//通过取负margin值,隐藏第一行
                            _field.css('marginTop', 0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
                        })
                    }, _interval)//滚动间隔时间取决于_interval
                }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
            },

//多行滚动应用
            scroll_top: function (box, first) {
                var _wrap = $(box);//定义滚动区域
                var _interval = 3000;//定义滚动间隙时间
                var _moving;//需要清除的动画
                _wrap.hover(function () {
                    clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
                }, function () {
                    _moving = setInterval(function () {
                        var _field = _wrap.find(first);//此变量不可放置于函数起始处,li:first取值是变化的
                        var _h = _field.height();//取得每次滚动高度
                        _field.animate({marginTop: -_h + 'px'}, 600, function () {//通过取负margin值,隐藏第一行
                            _field.css('marginTop', 0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
                        })
                    }, _interval)//滚动间隔时间取决于_interval
                }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
            },

            slides_news_module: function (list_focus, box_focus, article_list) {
                /*  滚动切换  */
                function LineRoll(_ctrl, _speed) {
                    this.ctrller = $(_ctrl);
                    this.speed = _speed;
                    this.bindClick();
                }

                LineRoll.prototype.bindClick = function () {
                    var _self = this;
                    _self.ctrller.delegate('li', {
                            'click': function () {
                                var _t = $(this).index();
                                var _link = $(this).attr('attr-href');
                                var $adom = $(this).parents('.con_title').find('.focus_more_link');
                                $($adom).attr('href', _link)
                                _self.fn(_t);

                            }
                        }
                    );
                };

                var newsRoll = new LineRoll(list_focus, 300);
                newsRoll.rollContainer = $(box_focus);
                newsRoll.speed = 500;
                newsRoll.rolllist = $(article_list);
                newsRoll.rolllist.eq(0).show();
                newsRoll.rolllwidth = function () {
                    return this.rolllist.width();
                };
                newsRoll.currentNum = 0;
                newsRoll.fn = function (t) {
                    var _self = this, _t = t;
                    if (!_self.rollContainer.is(':animated')) {
                        _self.ctrller.find('li').eq(_t).addClass('thistab').siblings().removeClass('thistab');
                        if (_t !== _self.currentNum) {
                            _self.rolllist.eq(_t).show();
                            if (_t < _self.currentNum) {
                                _self.rollContainer.css({'left': -1 * _self.rolllwidth() + 'px'});
                            }
                            var abs = (_self.currentNum - _t ) / Math.abs(_t - _self.currentNum) > 0 ? 0 : -1;
                            _self.rollContainer.animate({'left': abs * _self.rolllwidth() + 'px'}, _self.speed, function () {
                                _self.rolllist.eq(_self.currentNum).hide();
                                _self.rollContainer.css({'left': 0});
                                _self.currentNum = _t;
                            });
                        }
                    }
                };

                var roleRoll = new LineRoll('.school_ul', 500);
                roleRoll.tabtime = 1;
                roleRoll.fn = function (t) {
                    var $rolegroup = $('.school_box'), _t = t;
                    var _self = this;
                    _self.ctrller.find('li').eq(_t).addClass('thistab').siblings().removeClass('thistab');
                    $rolegroup.removeClass('thistab');
                    setTimeout(function () {
                        $rolegroup.eq(_t).addClass('sch_active').siblings().removeClass('sch_active');
                    }, roleRoll.tabtime);
                };

            },

            tabs_model: function () { //选项卡
                var that = this;
                that.slides_news_module('.news_list_focus .con_title ul', '.news_box_focus', '.news_box_focus .article_list');
                that.slides_news_module('.media_list_focus .con_title ul', '.media_box_focus', '.media_box_focus .article_list');
                that.slides_news_module('.zbtr_list_focus .con_title ul', '.zbtr_box_focus', '.zbtr_box_focus .article_list');
                that.slides_news_module('.bbs_list_focus .con_title ul', '.bbs_box_focus', '.bbs_box_focus .article_list');
                that.slides_news_module('.service .con_title ul', '.ser_box_focus', '.ser_box_focus .ser_list_box');

            },

            jqtab_module: function () {
                var that = this;

                $('#wx_btn_pop, .weixin_l').mouseover(function () {
                    $('.weixin_l').show();
                    $('#wx_btn_pop').addClass('this_trm')
                });
                $('#wb_btn_pop, .weibo_l').mouseover(function () {
                    $('.weibo_l').show();
                    $('#wb_btn_pop').addClass('this_trm')
                });
                $('#wx_btn_pop, .weixin_l').mouseout(function () {
                    $('.weixin_l').hide();
                    $('#wx_btn_pop').removeClass('this_trm')
                });
                $('#wb_btn_pop, .weibo_l').mouseout(function () {
                    $('.weibo_l').hide();
                    $('#wb_btn_pop').removeClass('this_trm')
                });


                $('.follow_wx, .ser_weixin').mouseenter(function () {
                    $('.ser_weixin').show();
                });
                $('.follow_wx, .ser_weixin').mouseleave(function () {
                    $('.ser_weixin').hide();
                });
                jQuery.jqtab = function (tabtit, tab_conbox, shijian) {
                    $(tabtit).find("li:first")
                        .addClass("thistab").fadeIn();
                    $(tab_conbox).find("div:first").fadeIn();

                    $(tabtit).find("li").bind(shijian, function () {
                        $(this).addClass("thistab")
                            .siblings("li")
                            .removeClass("thistab");
                        var activeindex = $(tabtit).find("li").index(this);
                        $(tab_conbox)
                            .children()
                            .eq(activeindex).show()
                            .siblings().hide();
                    });

                };
                /*调用方法如下：*/
                $.jqtab("#tabs1", "#tab_conbox1", "mouseover");
                $.jqtab("#tabs2", "#tab_conbox2", "click");
				$.jqtab("#tabs3", "#tab_conbox3", "mouseover");
            }

        }
    });
})(jQuery)
$(function () {
    $.jx3.init();
    var web_l = ( window.location.href ) || '';
    web_l = web_l.split('.').join('');
    web_l = web_l.split('/').join('');
    
    var _html = "<input type='text' id='pages_num' size='5' ><button id='pages_sub'>跳转</button>";

    if( web_l.lastIndexOf('jx3xoyocomallnews') > -1 ) { //首页公告页

    }else{
        $(".detail_rig .news_web_box .pagination").append(_html);
    }

    $("#pages_sub").on("click", pages_sub);
    function pages_sub() {
        var _num = $('#pages_num').val();
        var _href = location.href;
        var _urlArry = location.href.split("page" + "=");
        if (_urlArry.length = 1) {
            if (_urlArry[0].match(/\?/)) {
                location.href = _urlArry[0] + "page" + "=" + _num;
            } else {
                location.href = _urlArry[0] + "?page" + "=" + _num;
            }

        } else {
            location.href = _urlArry[0] + _urlArry[1].replace(/^\d+/, _num);
        }
    }

});
