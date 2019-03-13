/*!
 *
 * XSJ xpass signin && signup dialog
 * require [ jquery.js, artDialog.js ]
 * 2014-11-16
 */
(function( w ){

    var $_REFER = ( document.referrer ) || '',
        $_URI = ( window.location.href ) || '',
        $_TARGET = 'xpass_common_signup';

	var xurl = '//pf-api.xoyo.com/passport/common_api/', //上线前修改

        DOM_List = [
        '<div id="xsj-xpass">',
            '<div class="s-tabs">',
                '<span name="t_signin" attr-tongji="xpass_tabs_login_click" attr-tongji-tips="选项卡登录按钮被单击"><a class="active" href="javascript:;">登录</a></span>',
                '<span name="t_signup" attr-tongji="xpass_tabs_reg_click" attr-tongji-tips="选项卡注册按钮被单击"><a href="javascript:;">注册</a></span>',
            '</div>',
            '<div class="i-items t_signin">',
                '<div id="sin_n_tips" class="i-n-tips" style="display:none;"><p class="i-n-tips-txt"></p></div>',
                '<div class="i-line-l">',
                    '<span class="i-txt">通行证：</span>',
                    '<input class="txt-i" type="text" name="sin_act" value="" tabindex="1" t="请填写您的通行证账号" attr-tongji="xpass_login_user_click" attr-tongji-tips="登录帐号输入框被单击"  />',
                    '<div class="i-ipt-tips" style="display:none;"></div>',
                    '<span class="sv-txt"><a class="sin_t_sup" href="javascript:;">马上注册</a></span>',
                '</div>',
                '<div class="i-line-l">',
                    '<span class="i-txt">密码：</span>',
                    '<input class="txt-i" type="password" name="sin_pwd" value="" tabindex="2" t="请输入您的密码" attr-tongji="xpass_login_pass_click" attr-tongji-tips="登录密码输入框被单击"  />',
                    '<div class="i-ipt-tips" style="display:none;"></div>',
                    '<span class="sv-txt"><a href="https://security.xoyo.com/forget-password" target="_blank">忘记密码？</a></span>',
                '</div>',
                '<div class="vcode-box J_xpassJiyanBox" style="display: none;">',
                    '<span class="i-txt">验证码：</span>',
                    '<div class="i-line-l J_jizhiCodeBox i-jizhi-wrap" style="display:none;">',
                        '<div class="i-jizhi-login-box" id="captcha-login">',
                            '<p id="wait-login" class="show">正在加载验证码......</p>',
                        '</div>',
                    '</div>',
                    '<div class="i-line-l J_putongCodeBox" style="display:none;">',
                        '<input class="txt-i vcode-i" type="text" name="sin_vde" value="" tabindex="3" attr-tongji="xpass_login_vcode_click" attr-tongji-tips="登录普通验证码输入被单击" />',
                        '<img class="v_code signin_v_code" t="signin" src="//zhcdn01.xoyo.com/xassets/com/pf/xpass/v1/images/code.png" alt="点击更换验证码" attr-tongji="xpass_login_vcodebtn_click" attr-tongji-tips="登录获取验证码按钮被单击" />',

                    '</div>',
                '</div>',
                '<div class="i-button-l"><button class="op-btn sin_submit"  attr-tongji="xpass_login_subbtn_click" attr-tongji-tips="登录按钮被单击" >立即登录</button></div>',
            '</div>',
            '<div class="i-items t_signup" style="display:none;">',
                '<div id="sup_n_tips" class="i-n-tips" style="display:none;"><p class="i-n-tips-txt"></p></div>',
                '<div class="i-line-l">',
                    '<span class="i-txt"><font color="f0000">* </font>通行证账号：</span>',
                    '<input class="txt-i" type="text" name="sup_act" value="" tabindex="4" t="4-18位字符(首字符必须为字母)" attr-tongji="xpass_reg_user_click" attr-tongji-tips="注册帐号输入框被单击" />',
                    '<div class="i-ipt-tips" style="display:none;"></div>',
                '</div>',
                '<div class="i-line-l">',
                    '<span class="i-txt"><font color="f0000">* </font>密码：</span>',
                    '<input class="txt-i" type="password" name="sup_pwd" value="" tabindex="5" t="8-32位字符(区分大小写)" attr-tongji="xpass_reg_pass_click" attr-tongji-tips="注册密码框被单击" />',
                    '<div class="i-ipt-tips" style="display:none;"></div>',
                '</div>',
                '<div class="i-line-l">',
                    '<span class="i-txt"><font color="f0000">* </font>确认密码：</span>',
                    '<input class="txt-i" type="password" name="sup_cpwd" value="" tabindex="6" t="请再次确认您的密码" attr-tongji="xpass_reg_repass_click" attr-tongji-tips="注册确认密码框被单击" />',
                    '<div class="i-ipt-tips" style="display:none;"></div>',
                '</div>',
                
                '<div class="t-signup-more-items">',
                    '<div class="vcode-box J_xpassJiyanBox" style="display: none">',
                        '<span class="i-txt">验证码：</span>',
                        '<div class="i-line-l J_jizhiCodeBoxReg i-jizhi-wrap" style="display:none;">',
                        '<div class="i-jizhi-login-box" id="captcha-reg">',
                        '<p id="wait-reg" class="show">正在加载验证码......</p>',
                        '</div>',
                    '</div>',
                    '<div class="i-line-l J_putongCodeBoxReg" style="display:none;">',
                        '<span class="i-txt"><font color="f0000">* </font>验证码：</span>',
                        '<input class="txt-i vcode-i" type="text" name="sup_vde" value="" tabindex="7" attr-tongji="xpass_reg_vcode_click" attr-tongji-tips="注册普通验证码输入被单击" />',
                        '<img class="v_code signup_v_code" t="signup" src="//zhcdn01.xoyo.com/xassets/com/pf/xpass/v1/images/code.png" alt="点击更换验证码" attr-tongji="xpass_reg_vcodebtn_click" attr-tongji-tips="注册获取验证码按钮被单击" />',
                        '<div class="i-ipt-tips" style="display:none;"></div>',
                    '</div>',
                    '</div>',
                    '<div class="i-line-l">',
                        '<span class="i-txt"><font color="f0000">* </font>手机号：</span>',
                        '<input class="txt-i" type="text" name="sup_mobile" value="" tabindex="8" t="请填写您的手机号" attr-tongji="xpass_reg_phone_click" attr-tongji-tips="注册手机号框被单击" />',
                        '<div class="i-ipt-tips" style="display:none;"></div>',
                    '</div>',

                    '<div class="i-line-l">',
                        '<span class="i-txt"><font color="f0000">* </font>短信验证码：</span>',
                        '<input class="txt-i vcode-i" type="text" name="sup_vde_phone_code" value="" tabindex="9" attr-tongji="xpass_reg_phonecode_click" attr-tongji-tips="注册手机号验证码框被单击" />',
                        '<span class="i-txt-get-code J_xpassGetCodeBtn" attr-tongji="xpass_reg_getcode_btn_click" attr-tongji-tips="注册获取短信按钮被单击">获取短信验证码</span>',
                        '<span class="i-txt-get-code i-txt-get-code-gray J_xpassGetCodeSecond" style="display: none;"></span>',
                           '<div class="i-ipt-tips" style="display:none;"></div>',
                    '</div>',
                    '<div class="i-line-l">',
                        '<span class="i-txt"><font color="f0000">* </font>真实姓名：</span>',
                        '<input class="txt-i" type="text" name="sup_name" value="" tabindex="10" t="请填写您的真实姓名" attr-tongji="xpass_reg_realname_click" attr-tongji-tips="注册真实姓名输入框被单击" />',
                        '<div class="i-ipt-tips" style="display:none;"></div>',
                    '</div>',
                    '<div class="i-line-l">',
                        '<span class="i-txt"><font color="f0000">* </font>身份证：</span>',
                        '<input class="txt-i" type="text" name="sup_sfz" value="" tabindex="11" t="请填写您的身份证号码" attr-tongji="xpass_reg_idnum_click" attr-tongji-tips="注册身份证号输入框被单击" />',
                        '<div class="i-ipt-tips" style="display:none;"></div>',
                    '</div>',
                '</div>',
                '<div class="i-agreement-i">',
                    '<p><label><input class="sup_agreement" type="checkbox" checked="checked" attr-tongji="xpass_reg_ag_click" attr-tongji-tips="注册协议被单击" />我已阅读并同意</label></p>',
                    '<p><a target="_blank" href="https://help.xoyo.com/agreement?name=kingsoft-network-service-agreement">金山网络服务使用协议</a> <a target="_blank" href="https://help.xoyo.com/agreement?name=kingsoft-online-privacy-policy">金山通行证隐私权政策</a></p>',
                '</div>',
                '<div class="i-button-l"><button class="op-btn sup_submit" attr-tongji="xpass_reg_submit_click" attr-tongji-tips="注册按钮被单击">确认提交</button></div>',
                '<div align="center">',
                    '注册遇到问题请 <a target="_blank" ',
                    'href="https://faqrobot.kefu.xoyo.com/robot/chat2.html?jid=75&sysNum=1476067342641247&sourceId=157">',
                    '<font color="#ff0000"><u>联系在线客服</u></font></a>',
                    ' | ',
                    '手机/邮箱注册请 <a target="_blank" href="https://passport.xoyo.com/signup"><font color="#ff0000"><u>点击此处</u></font></a>',
                '</div>',
            '</div>',
        '</div>'
    ],

    T = {

        i_tips: function( type, txt, target ){
            if( !type ){
                target.removeClass('i-tip i-err i-suc')
                .html( txt )
                .hide();
            }
            else{
                target.removeClass('i-tip i-err i-suc')
                .addClass( type )
                .html( txt )
                .show();
            }
        },

        n_tips: function( type, txt, target ){
            var t = $('#' + target),
                p = t.children('p');
            if( !type ){
                $('#sin_n_tips p, #sup_n_tips p')
                .removeClass('i-tip i-err i-suc').html('');
                $('#sin_n_tips, #sup_n_tips').hide();
            }
            else{
                p.removeClass('i-tip i-err i-suc').addClass( type );
                p.html( txt );
                t.show();
            }
        }
    };

    XPASS = {
        isjizhilogin:false,
        isjizhireg:false,
        pageLoadFinishTime: undefined,
        exitCallback:false,
        init: function(){
            var This = this;
			this.require_css(
                '//zhcdn01.xoyo.com/',
                'xassets/com/pf/xpass/v1/xpass.css'
			);
			//上线前 修改
            // this.require_css(
			// 	'./', 
			// 	'xpass.css'
            // );
            this.rending();
            this.listener();
            
            if( typeof __ozfac2 == "undefined" ){
                this.require_js(
                    '//zhcdn01.xoyo.com/', 
                    'xassets/lib/751code/https/o_code.js'
                );
            }
            if( typeof initGeetest == "undefined" ){
                this.require_js(
                    '//zhcdn01.xoyo.com/', 
                    'xassets/com/pf/xpass/jizhicode/gt.js'
                );
            }
            if(this.is_tester_version() == 8.0 || this.is_tester_version() == 7.0 || this.is_tester_version() || this.is_tester_version() == 5.0 ){
                if(This.isInclude('//zhcdn01.xoyo.com/xassets/lib/shim/xfe/xfe-shim.min.js')){

                }else{
                    This.require_js(
                        '//zhcdn01.xoyo.com/',
                        'xassets/lib/shim/xfe/xfe-shim.min.js'
                    );
                }
            }

            if(This.isInclude('//zhcdn01.xoyo.com/xassets/lib/st-report-sdk/stable/st-report-sdk.min.js')){

            }else{
                this.require_js(
                    '//zhcdn01.xoyo.com/',
                    'xassets/lib/st-report-sdk/stable/st-report-sdk.min.js'
                );
            }
            setTimeout(function () {
                if( typeof StReportSdk == "undefined" ){

                }else{
                    This.bdtongji_chenglongtj('xpass_web_loading','Xpass通用头页面加载成功')
                }
            },1000)
        },
        
        require_css: function( domain_name, file_path ){
            var d_name = domain_name || '//zhcdn01.xoyo.com/'; 
            
            try{
                var head = document.getElementsByTagName('head').item(0),
                    style;
                
                style = document.createElement('link');
                style.setAttribute('rel', 'stylesheet');
                style.setAttribute('type', 'text/css');
                style.setAttribute('href', d_name + file_path);
                head.appendChild(style);
            }catch(e){}
        },
        isInclude : function(name){
            var js= /js$/i.test(name);
            var es=document.getElementsByTagName(js?'script':'link');
            for(var i=0;i<es.length;i++)
                if(es[i][js?'src':'href'].indexOf(name)!=-1) return true;
            return false;
        },
        is_tester_version: function () {
            var UA = navigator.userAgent;
            if (/msie/i.test(UA)) {
                return UA.match(/msie (\d+\.\d+)/i)[1];
            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        },
        is_tester_version: function () {
            var UA = navigator.userAgent;
            if (/msie/i.test(UA)) {
                return UA.match(/msie (\d+\.\d+)/i)[1];
            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        },
        
        require_js: function( domain_name, file_path ){
            var d_name = domain_name || '//zhcdn01.xoyo.com/';
            
            try{
                var head = document.getElementsByTagName('head').item(0),
                    script;
                
                script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = d_name + file_path; 
                head.appendChild(script);
            }catch(e){}
        },
        yzStyle : function () {   //极验验证方式 默认pc端（web） 移动端传(h5)  geetest_ctype :
            var This = this;
            if (This.isPcMobi()) {
                return 'h5';
            } else {
                return 'web';
            }
        },
        isPcMobi : function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

            if (isAndroid || isiOS) {
                return true;
            } else {
                return false;
            }
        },
        rending: function(userCallback){ //初始化
            var This = this;

            XPASS.pageLoadFinishTime = This.getCurrentSecond();
            
            try{
                $.ajax({
                    url: xurl + 'get_info',
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function( account ){
                        //account = ({"code":1,"message":"","data":{"account":"199dqx","request_id":"7CB83AF2-0777-1A84-D185-0C5FD5DA4777"}});
                        //修改 上线前删除
                        if( account.code*1 > 0 ){
                            This.u_account = account.data.account;
                            This.bdtongji_chenglongtj('xpass_web_islogin_ok','Xpass通用头用户已经登录')
                            var _userName = account.data.account;
                            if( userCallback && typeof userCallback == 'function' ){ 
                                userCallback(account.data.account);
                            }

                            $('.XPASS_signin').remove();
                            $('.t_xpass_signin_u_i')
                            .html( '<a class="t_xpass_signin_u_name_i" href="https://i.xoyo.com/"><span>'
                                + _userName + '</span></a><a class="t_xpass_s_out" \
                                href="javascript:XPASS.exit();"><span>退出</span></a>' )
                            .show();
                        }
                    }
                });
            }catch(e){}        
        },
        
        isLogin: function(userCallback,nologin){ //获取用户登录信息
            var This = this; 
            try{
                $.ajax({
                    url: xurl + 'get_info',
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function( account ){
                        if( account.code*1 > 0 ){

                            if( userCallback && typeof userCallback == 'function' ){ 
                                userCallback(account.data.account);
                            }
                        }else{
                            if( nologin && typeof nologin == 'function' ){ 
                                nologin();
                            }
                        }
                    }
                });
            }catch(e){}                
        },        

        pre_authModule : function($bindname){ //获取验证方式
            var This = this; 
            try{
                $.ajax({
                    url: xurl + 'pre_auth',
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function( account ){
                        //account = ({"code":1,"message":"","data":{"mode":1,"config":{"success":1,"gt":"9d8e7fc1b0a0c59391a0e227fdb5bda3","challenge":"40a6ef907de22e9166f494be4a94da47","new_captcha":1},"request_id":"25D94F32-80B4-6555-AD21-E5156F8CEA99"}});
                        //修改 上线前删除
                        if (account.code > 0) {
                            if ( account.data.mode == 2 ){  //极致模式
                                var _gt = account.data.config.gt;
                                $('.J_xpassJiyanBox, .J_jizhiCodeBox, .J_jizhiCodeBoxReg').hide();
                                $('.J_putongCodeBox, .J_putongCodeBoxReg').hide();
                                
                                var _challenge = account.data.config.challenge;
                                var _success = account.data.config.challenge;
                                var _new_captcha = account.data.config.new_captcha;
                                initGeetest({
                                    // 以下配置参数来自服务端 SDK
                                    gt: _gt,
                                    challenge: _challenge,
                                    offline: !_success,
                                    new_captcha: _new_captcha,
                                    product: "bind", // 产品形式，包括：float，popup
                                    width: "214px"
                                }, $bindname)

                            }else{
                                $('.J_jizhiCodeBox, .J_jizhiCodeBoxReg').hide();
                                $('.J_xpassJiyanBox, .J_putongCodeBox, .J_putongCodeBoxReg').show();
                                $bindname()
                            }
                        } else {
                            alert(account.message);
                        }
                    }
                });
            }catch(e){}            
        },     

        u_account: this.u_account || '',
        
        _callbacks: {
            'sin_callback': false,
            'sup_callback': false
        },

        signin: function( callback ){
            var This = this;
            if( callback && typeof callback == 'function' ){
                this._callbacks.sin_callback = callback;
            }
            This.bdtongji_chenglongtj('xpass_tabs_login_click', '选项卡登录按钮被单击');
            
            DOM_List[2] = '<span name="t_signin"  attr-tongji="xpass_tabs_login_click" attr-tongji-tips="选项卡登录按钮被单击"><a class="active" href="javascript:;">登录</a></span>';
            DOM_List[3] = '<span name="t_signup" attr-tongji="xpass_tabs_reg_click" attr-tongji-tips="选项卡注册按钮被单击"><a href="javascript:;">注册</a></span>';
            DOM_List[5] = '<div class="i-items t_signin"  attr-tongji="xpass_tabs_login_click" attr-tongji-tips="选项卡登录按钮被单击">';
            DOM_List[33] = '<div class="i-items t_signup" style="display:none;" attr-tongji="xpass_tabs_reg_click" attr-tongji-tips="选项卡注册按钮被单击">';

            art.dialog({
                'title': '金山通行证',
                'id': 'XPASS_Dialog',
                'lock': true,
                'drag': false,
                'width': '480px',
                'content': DOM_List.join('')
            });        
            This.isjizhireg = false;
            This.pre_authModule(This.loginEventBind);
        },

        signup: function( callback ){
            var This = this;
            if( callback && typeof callback == 'function' ){
                this._callbacks.sup_callback = callback;
            }

            This.bdtongji_chenglongtj('xpass_tabs_reg_click', '选项卡注册按钮被单击');
            DOM_List[2] = '<span name="t_signin"  attr-tongji="xpass_tabs_login_click" attr-tongji-tips="选项卡登录按钮被单击"><a href="javascript:;">登录</a></span>';
            DOM_List[3] = '<span name="t_signup" attr-tongji="xpass_tabs_reg_click" attr-tongji-tips="选项卡注册按钮被单击"><a class="active" href="javascript:;">注册</a></span>';
            DOM_List[5] = '<div class="i-items t_signin" style="display:none;"  attr-tongji="xpass_tabs_login_click" attr-tongji-tips="选项卡登录按钮被单击">';
            DOM_List[33] = '<div class="i-items t_signup" attr-tongji="xpass_tabs_reg_click" attr-tongji-tips="选项卡注册按钮被单击">';

            art.dialog({
                'title': '金山通行证',
                'id': 'XPASS_Dialog',
                'lock': true,
                'drag': false,
                'width': '480px',
                'content': DOM_List.join('')
            });    
            This.isjizhilogin = false;
            This.pre_authModule(This.regEventBind);                
        },

        exit: function(){
            try{
                $.ajax({
                    url: xurl + 'logout',
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'logoutCallback',
                    success: function( result ){
                        if( typeof XPASS.exitCallback == 'function' ){
                            XPASS.exitCallback()
                        }else{
                            window.location.reload();
                        }
                    }
                });
            }catch(e){}                
        },

        regEventBind : function(captchaObj){
            var This=this !=window ? this: XPASS;
            if( !!captchaObj ){

                captchaObj.onReady(function () {
                    $("#wait-reg").hide();
                }).onSuccess(function () {
                    var result = captchaObj.getValidate();
                    if (!result) {
                        return alert('请完成验证');
                    }

                    var sup_mobile = $('#xsj-xpass input[name="sup_mobile"]'),
                        sup_mobile_v = $.trim( sup_mobile.val() ),
                        sup_vde = $('#xsj-xpass input[name="sup_vde"]'),
                        sup_vde_v = $.trim( sup_vde.val() );
                    try{
                        $.ajax({
                            url: xurl + 'send_code',
                            type: 'GET',
                            data: {
                                'geetest_challenge': result.geetest_challenge,
                                'geetest_validate': result.geetest_validate,
                                'geetest_seccode': result.geetest_seccode,
                                'mobile': sup_mobile_v,
                                'client': 'default',
                                'channel': 'register'
                            },
                            dataType: 'jsonp',
                            beforeSend: function(){
                                T.n_tips( 'i-tip', '正在为您努力提交...', 'sup_n_tips' );
                            },
                            success: function( result ){
                                putongGetPhoneCodeCallb(result)
                            }
                        });

                    }catch(e){}
                });

                This.isjizhireg = true;
            }

            //获取短信验证码回调
            var putongGetPhoneCodeCallb = function($data){
                if( $data.code == 1 ){
                    This.bdtongji_chenglongtj('xpass_web_getcode_success','Xpass通用头获取短信成功')
                    $('#xsj-xpass .J_xpassGetCodeBtn').hide();
                    var $sec = 60;
                    var InterValObj;
                    var SetRemainTime = function() {
                        if ($sec > 0) {
                            $sec = $sec - 1;
                            var second = Math.floor($sec % 60);             // 计算秒

                            $('#xsj-xpass .J_xpassGetCodeSecond').css('display','inline-block').html(second + " 秒");
                        } else {//剩余时间小于或等于0的时候，就停止间隔函数
                            window.clearInterval(InterValObj);
                            //这里可以添加倒计时时间为0后需要执行的事件
                            $('#xsj-xpass .J_xpassGetCodeBtn').show();
                            $('#xsj-xpass .J_xpassGetCodeSecond').hide();


                        }
                    }
                    InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
                    if(!!captchaObj) {
                        captchaObj.reset();
                    }

                } else if ($data.code * 1 == -20114) {
                    alert($data.message)
                    This.bdtongji_chenglongtj('xpass_web_getcode_fail','Xpass通用头获取短信失败');
                    sup_vde.val('');
                    $('#xsj-xpass img.signup_v_code').trigger('click');

                } else{
                    This.bdtongji_chenglongtj('xpass_web_getcode_fail','Xpass通用头获取短信失败');
                    alert($data.message)
                    //T.n_tips( 'i-err', result.message, 'sup_n_tips' );
                    captchaObj.reset();
                }
            }

            //获取短信验证码
            $(document).on('click', '#xsj-xpass .J_xpassGetCodeBtn', function(){
                var sup_mobile = $('#xsj-xpass input[name="sup_mobile"]'),
                    $_this = $(this),
                    sup_mobile_v = $.trim( sup_mobile.val() ),
                    sup_vde = $('#xsj-xpass input[name="sup_vde"]'),
                    sup_vde_v = $.trim( sup_vde.val() );
                var baidu_m_code = $_this.attr('attr-tongji');
                var baidu_m_des = $_this.attr('attr-tongji-tips');
                This.bdtongji_chenglongtj(baidu_m_code, baidu_m_des);

                if(!!captchaObj){
                   
                }else{
                    if( !sup_vde_v ){
                        // T.n_tips( 'i-err', '验证码不能为空', 'sup_n_tips' );
                        T.i_tips( 'i-err', '请输入验证码',
                            sup_vde.siblings('.i-ipt-tips') );
                        return false;
                    }
                }
                if( !sup_mobile_v ){
                    T.i_tips( 'i-err', '请输入手机号',
                        sup_mobile.siblings('.i-ipt-tips') );
                    return false;
                }
                if( sup_mobile_v.length !== 11 ){
                    T.i_tips( 'i-err', '手机号格式不正确',
                        sup_mobile.siblings('.i-ipt-tips') );
                    return false;
                }
                try{
                    if(!!captchaObj){  //极致验证
                        captchaObj.verify();
                    }else{        //普通验证
                        $.ajax({
                            url: xurl + 'send_code',
                            type: 'GET',
                            data: {
                                'phrase': sup_vde_v,
                                'mobile': sup_mobile_v,
                                'client': 'default',
                                'channel': 'register'
                            },
                            dataType: 'jsonp',
                            beforeSend: function(){
                                T.n_tips( 'i-tip', '正在为您努力提交...', 'sup_n_tips' );
                            },
                            success: function( result ){
                                putongGetPhoneCodeCallb(result)
                            }
                        });
                    }
                }catch(e){}
            });

            //注册
            $(document).on('click', '#xsj-xpass .sup_submit', function(){
                var sup_act = $('#xsj-xpass input[name="sup_act"]'),
                    $_this = $(this),
                    sup_pwd = $('#xsj-xpass input[name="sup_pwd"]'),
                    sup_cpwd = $('#xsj-xpass input[name="sup_cpwd"]'),
                    sup_name = $('#xsj-xpass input[name="sup_name"]'),
                    sup_sfz = $('#xsj-xpass input[name="sup_sfz"]'),
                    sup_mobile = $('#xsj-xpass input[name="sup_mobile"]'),
                    sup_vde = $('#xsj-xpass input[name="sup_vde_phone_code"]'),
                    sup_act_v = $.trim( sup_act.val() ),
                    sup_pwd_v = $.trim( sup_pwd.val() ),
                    sup_cpwd_v = $.trim( sup_cpwd.val() ),
                    sup_name_v = $.trim( sup_name.val() ),
                    sup_sfz_v = $.trim( sup_sfz.val() ),
                    sup_mobile_v = $.trim( sup_mobile.val() ),
                    sup_vde_v = $.trim( sup_vde.val() ),
                    require_more = 1;
                var baidu_m_code = $_this.attr('attr-tongji');
                var baidu_m_des = $_this.attr('attr-tongji-tips');
                This.bdtongji_chenglongtj(baidu_m_code, baidu_m_des);

                if( !sup_act_v ){
                    T.i_tips( 'i-err', '通行证账号不能为空', 
                        sup_act.siblings('.i-ipt-tips') );
                    return false;
                }
                if( !(/^[a-zA-Z]\w{4,18}$/).test( sup_act_v ) ){
                    T.i_tips( 'i-err', '通行证账号格式不正确', 
                        sup_act.siblings('.i-ipt-tips') );
                    return false;
                }
                if( !sup_pwd_v ){
                    T.i_tips( 'i-err', '密码不能为空', 
                        sup_pwd.siblings('.i-ipt-tips') );
                    return false;
                }
                if( sup_pwd_v.length < 8 || sup_pwd_v.length > 32 ){
                    T.i_tips( 'i-err', '密码长度为8-32位字符', 
                        sup_pwd.siblings('.i-ipt-tips') );
                    return false;
                }
                if( !sup_cpwd_v ){
                    T.i_tips( 'i-err', '请确认您的密码', 
                        sup_cpwd.siblings('.i-ipt-tips') );
                    return false;
                }
                if( sup_cpwd_v != sup_pwd_v ){
                    T.i_tips( 'i-err', '密码不一致', 
                        sup_cpwd.siblings('.i-ipt-tips') );
                    return false;
                }

                if( !sup_mobile_v ){
                    T.n_tips( 'i-err', '请输入手机号', 'sup_n_tips' );
                    return false;
                }
				if( !sup_vde_v ){
					T.n_tips( 'i-err', '请输入短信验证码', 'sup_n_tips' );
					return false;
				}
                if( !($('input.sup_agreement').prop('checked')) ){
                    T.n_tips( 'i-tip', '请阅读并同意下方协议', 'sup_n_tips' );
                    return false;
                }
                if( Number( require_more ) != 0 ){
                    if( !sup_name_v ){
                        T.i_tips( 'i-err', '真实姓名不能为空', 
                            sup_name.siblings('.i-ipt-tips') );
                        return false;
                    }
                    if( !(/[\u4E00-\u9FA5]/).test( sup_name_v ) 
                        || sup_name_v.length < 2 || sup_name_v.length > 8
                    ){
                        T.i_tips( 'i-err', '姓名为2-8个汉字', 
                            sup_name.siblings('.i-ipt-tips') );
                        return false;
                    }
                    if( !sup_sfz_v ){
                        T.i_tips( 'i-err', '身份证号码不能为空', 
                            sup_sfz.siblings('.i-ipt-tips') );
                        return false;
                    }
                    if( !( /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/ ).test( sup_sfz_v ) ){
                        T.i_tips( 'i-err', '请正确填写身份证号码', 
                            sup_sfz.siblings('.i-ipt-tips') );
                        return false;
                    }
                }
                try{
                    $.ajax({
                        url: xurl + 'register',
                        type: 'GET',
                        data: {
                            'account': sup_act_v,
                            'password': sup_pwd_v,
                            'from': $_REFER,
                            'target': $_TARGET,
                            'more': 1,
                            'name': sup_name_v,
                            'id_number': sup_sfz_v,
                            'mobile': sup_mobile_v,
                            'code': sup_vde_v,
                            'client': 'default'
                        },
                        dataType: 'jsonp',
                        beforeSend: function(){
                            T.n_tips( 'i-tip', '正在为您努力提交...', 'sup_n_tips' );
                        },
                        success: function( result ){
                            if( result.code == 1 ){
                                This.bdtongji_chenglongtj('xpass_web_reg_success','Xpass通用头注册成功');

                                var __callback = This._callbacks['sup_callback'] ||
                                    function(){
                                        window.location.reload();
                                    };

                                This.destroy();
                                art.dialog({
                                    'title': '温馨提示',
                                    'lock': true,
                                    'drag': false,
                                    'padding': '20px 50px',
                                    'content': '注册成功',
                                    'id':'regokId02',
                                    'cancel': __callback
                                });
                                art.dialog({id: 'regokId02'}).time(2);

                                // 751 统计代码开始
                                var _userNameReg = result.data.account;
                                _ozprm = "username=" + _userNameReg;
                                if( typeof( __ozfac2 ) != 'undefined' ) {
                                    var tprm = "username=" + _userNameReg;
                                    __ozfac2(tprm, "#success");
                                }
                                // 751 统计代码结束

                            }else{
                                T.n_tips( 'i-err', result.message, 'sup_n_tips' );
                            }
                            $('img.signup_v_code').trigger('click');
                        }
                    });


                }catch(e){}                        
                
            });
        },
        loginEventBind : function(captchaObj){
            var This=this !=window ? this: XPASS;
            
            if( !!captchaObj ){
                captchaObj.onReady(function () {
                    $("#wait-login").hide();
                }).onSuccess(function () {
                    var result = captchaObj.getValidate();
                    if (!result) {
                        return alert('请完成验证');
                    }

                    var sin_act = $('#xsj-xpass input[name="sin_act"]'),
                        sin_pwd = $('#xsj-xpass input[name="sin_pwd"]'),
                        sin_vde = $('#xsj-xpass input[name="sin_vde"]'),
                        sin_act_v = $.trim( sin_act.val() ),
                        sin_pwd_v = $.trim( sin_pwd.val() ),
                        sin_vde_v = $.trim( sin_vde.val() );

                    try{

                        var resultCode = captchaObj.getValidate();
                        if (!resultCode) {
                            return false;
                        }
                        $.ajax({
                            url: xurl + 'login',
                            type: 'GET',
                            dataType: 'jsonp',
                            data: {
                                geetest_challenge: resultCode.geetest_challenge,
                                geetest_validate: resultCode.geetest_validate,
                                geetest_seccode: resultCode.geetest_seccode,
                                account: sin_act_v,
                                password: sin_pwd_v
                            },
                            success: function ($data) {
                                if ($data.code*1 > 0) {
                                    This.bdtongji_chenglongtj('xpass_web_login_success','Xpass通用头登录成功');
                                    This.destroy();
                                    This.u_account = $data.data.account;
                                    if( This._callbacks['sin_callback'] ){
                                        This._callbacks.sin_callback.apply();
                                    }
                                    else{
                                        window.location.reload();
                                    }

                                }else if( $data.code == -20113 ){
                                    This.bdtongji_chenglongtj('xpass_web_login_fail','Xpass通用头登录', $data.code * 1, $data.message);
                                    T.n_tips( 'i-err', '请先点击按钮进行验证', 'sin_n_tips' );
                                    captchaObj.reset();
                                } else {
                                    This.bdtongji_chenglongtj('xpass_web_login_fail','Xpass通用头登录', $data.code * 1, $data.message);
                                    T.n_tips( 'i-err', $data.message, 'sin_n_tips' );
                                    captchaObj.reset();
                                }
                            }
                        });

                    }catch(e){}


                });
                This.isjizhilogin = true;
            }
            $(document).on('click', '#xsj-xpass .sin_submit', function(){
                var sin_act = $('#xsj-xpass input[name="sin_act"]'),
                    sin_pwd = $('#xsj-xpass input[name="sin_pwd"]'),
                    sin_vde = $('#xsj-xpass input[name="sin_vde"]'),
                    sin_act_v = $.trim( sin_act.val() ),
                    sin_pwd_v = $.trim( sin_pwd.val() ),
                    sin_vde_v = $.trim( sin_vde.val() );

                if( !sin_act_v ){
                    sin_act.focus();
                    return false;
                }
                else if( !sin_pwd_v ){
                    sin_pwd.focus();
                    return false;    
                }
                if(!!captchaObj){

                }else{
                    if( !sin_vde_v ){
                        T.n_tips( 'i-err', '验证码不能为空', 'sin_n_tips' );
                        return false;    
                    }    
                }
                try{
                    if(!!captchaObj){
                        captchaObj.verify();
                    }else{
                        $.ajax({
                            url: xurl + 'login',
                            type: 'GET',
                            data: {
                                'account': sin_act_v,
                                'password': sin_pwd_v,
                                'phrase': sin_vde_v
                            },
                            dataType: 'jsonp',
                            jsonpCallback: 'loginCallback',
                            beforeSend: function(){
                                T.n_tips( 'i-tip', '正在为您努力登录...', 'sin_n_tips' );
                            },
                            success: function( result ){
                                if( result.code == 1 ){
                                    This.destroy();
                                    This.u_account = result.data.account;
                                    if( This._callbacks['sin_callback'] ){
                                        This._callbacks.sin_callback.apply();
                                    }
                                    else{
                                        window.location.reload();
                                    }
                                }
                                else{
                                    T.n_tips( 'i-err', result.message, 'sin_n_tips' );    
                                }
                                $('img.signin_v_code').trigger('click');
                            }
                        });    
                    }

                }catch(e){}    
            });
        },

        listener: function(){
            
            var This = this;
            $(document)
            .on('click', '#xsj-xpass .s-tabs span', function(){
                var $_this = $(this),
                    t = $_this.attr('name');
                $('#xsj-xpass .s-tabs span a').removeClass('active');
                $_this.children('a').addClass('active');
                var baidu_m_code = $_this.attr('attr-tongji');
                var baidu_m_des = $_this.attr('attr-tongji-tips');
                This.bdtongji_chenglongtj(baidu_m_code, baidu_m_des);

                $('#xsj-xpass .i-items').hide();
                $('#xsj-xpass .' + t ).show();
                if(t == 't_signin'){

                    if( This.isjizhilogin ){

                    }else{
                        This.pre_authModule(This.loginEventBind);
                    }
                    
                }
                if(t == 't_signup'){
                    if( This.isjizhireg ){

                    }else{
                        This.pre_authModule(This.regEventBind);    
                    }
                    
                }
            })
            
            .on('click', 'a.sin_t_sup', function(){
                $('#xsj-xpass .s-tabs span[name="t_signup"]').trigger('click');
            })
            .on('click', 'img.v_code', function(){
                var $_this = $(this);
                $_this.attr(
                    'src',
                    xurl + 'captcha?t=' + Math.random() 
                );    
            })
            .on('focus', '#xsj-xpass input', function(){
                var $_this = $(this),
                    t = $_this.attr('t'),
                    target = $_this.siblings('.i-ipt-tips');
                if( t ){
                    T.i_tips( 'i-tip', t, target );
                }
                T.n_tips( false );
                var baidu_m_code = $_this.attr('attr-tongji');
                var baidu_m_des = $_this.attr('attr-tongji-tips');
                This.bdtongji_chenglongtj(baidu_m_code, baidu_m_des);
            })
            .on('blur', '#xsj-xpass .t_signin input', function(){
                var $_this = $(this),
                    v = $.trim( $_this.val() );
                if( v ){
                    $_this.siblings('.i-ipt-tips')
                    .removeClass('i-tip i-err i-suc')
                    .html('').hide();
                }
            })
            .on('blur', '#xsj-xpass .t_signup input', function(){
                var $_this = $(this),
                    v = $.trim( $_this.val() ),
                    n = $_this.attr('name'),
                    t = '',
                    target = $_this.siblings('.i-ipt-tips');
                
                if( n == 'sup_act' ){

                    if( !v ){
                        T.i_tips( 'i-err', '通行证账号不能为空', target );
                    }else if( !v.match(/^[a-zA-Z]/) ){
                        T.i_tips( 'i-err', '首字符请使用字母', target );
                    }else if( v.match(/^(gm)/i) ){
                        T.i_tips( 'i-err', '首字符不能用“gm”', target );
                        errorInfo('首字符不能用“gm”');
                    }else if( v.match(/^(kingsoft|cb|ks|test|fs|jx|db|cq|blog|passport|vip|wps|system|damei|xoyo|kol|bjsupport)/i) ){
                        T.i_tips( 'i-err', '账号开头不符合规范', target );
                    }else if( v.match(/hujintao|wenjiabao|xijinping|jiangzemin|zhurongji|qiubojun|leijun|flg|falun|minghui|lihongzhi|tmd|nmd|fuck|sex|xxx|penis|viagra|tits|pussy|shit|damn|bastard|asshole|bitch|vagina|breastroot|root|admin|gamemaster|xoyo|kol/i) ){
                        T.i_tips( 'i-err', '账号包含了非法字符', target );
                    }else if( v.length<4 || v.length>18 ){
                        T.i_tips( 'i-err', '账号长度4-18个字符', target );
                    }else if( !(/^[a-zA-Z]\w{3,17}$/).test( v ) ){
                        T.i_tips( 'i-err', '账号格式不正确', target );
                    }else{
                        T.i_tips( false, '', target );
                    }
                }

                if( n == 'sup_pwd' ){
                    if( !v ){
                        T.i_tips( 'i-err', '密码不能为空', target );    
                    }
                    else if( v.length < 8 || v.length > 32 ){
                        T.i_tips( 'i-err', '密码长度为8-32位字符', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }
                if( n == 'sup_vde' ){
                    if( !v ){
                        T.i_tips( 'i-err', '请输入验证码', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }
                if( n == 'sup_mobile' ){
                    if( !v ){
                        T.i_tips( 'i-err', '手机号不能为空', target );
                    }
                    else if( v.length!== 11 ){
                        T.i_tips( 'i-err', '手机号格式不正确', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }
                if( n == 'sup_vde_phone_code' ){
                    if( !v ){
                        T.i_tips( 'i-err', '请输入短信验证码', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }
                if( n == 'sup_cpwd' ){
                    var pwd = $.trim( $('input[name="sup_pwd"]').val() ),
                        cpwd = $.trim( $('input[name="sup_cpwd"]').val() );
                    if( !v ){
                        T.i_tips( 'i-err', '请确认您的密码', target );    
                    }
                    else if( cpwd != pwd ){
                        T.i_tips( 'i-err', '密码不一致', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }
                if( n == 'sup_name' ){
                    if( !v ){
                        T.i_tips( 'i-err', '真实姓名不能为空', target );
                    }
                    else if( !(/[\u4E00-\u9FA5]/).test( v ) 
                        || v.length < 2 || v.length > 8
                    ){
                        T.i_tips( 'i-err', '姓名为2-8个汉字', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }
                if( n == 'sup_sfz' ){
                    if( !v ){
                        T.i_tips( 'i-err', '身份证号码不能为空', target );
                    }
                    else if( !( /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/ ).test( v ) ){
                        T.i_tips( 'i-err', '请正确填写身份证号码', target );
                    }
                    else{
                        T.i_tips( false, '', target );
                    }
                }

            })
        },
        getCurrentSecond:  function() {
            return parseInt(new Date().getTime() / 1000);
        },
        /*
         * @params eventName 事件名称 egg: acc_input_click
         * @params eventDescription 事件描述  egg: 帐号输入框被单击
         * @params ret_code 后端异常返回接口码  egg: -10114
         * @params ret_msg 后端返回异常信息提示  egg: 失败
         *
         */
        bdtongji_chenglongtj:function (eventName, eventDescription, ret_code,ret_msg) {
            var This=this !=window ? this: XPASS;
            var getCurrentSecond = parseInt(new Date().getTime() / 1000);
            var timeDifference =  This.getCurrentSecond() - XPASS.pageLoadFinishTime;
            var projectHost = window.location.host ?  window.location.host : 'jx3.xoyo.com';
            var web_l = ( window.location.host ) || '';
            var web_l_join = web_l.split('.').join('');

            // * @param timeDifference [number] 时间差
            // * @param projectIdentifier [string] - 项目标识（[A-Za-z_]+{4, },内部约定），必选
            // * @param eventName [string] - 事件名称，（格式与时间分组一致），可选
            // * @param eventGroup [string] - 事件分组（[A-Za-z_\-]+{1,},内部约定），可选
            // * @param eventDescription [string]- 事件描述（字符串）
            // * @param eventDataValue [object] - 事件额外数据对象，kv对，可选, 如: evd[k1]=v1&evd[k2]
            // * @param eventTags [string[]] - 事件标签数组（格式与时间分组一致），可选
            try{
                StReportSdk.getDefaultInstance('webregstat').report({
                    eventName: eventName,
                    projectIdentifier: web_l_join.lastIndexOf('xoyo') > -1 ? projectHost.split('.')[0] : 'jx3-test',
                    eventDescription: eventDescription,
                    eventTags: [This.yzStyle(), 'webregstat'],
                    eventGroup: 'webregstat',
                    eventDataValue: {
                        td_pl: timeDifference || 0,
                        ret_code :  ret_code,
                        ret_msg: ret_msg
                    }
                });
            }catch(e){}

        },
        destroy: function(){
            art.dialog.list['XPASS_Dialog'].close();
        }

    };
    
    XPASS.init();    
    w.XPASS = XPASS; 

})( window );

