/**
 * 파  일  명   : sysComm.js
 * 업      무  :
 * 설      명  :
 * 최초  작성자  :
 * 최초 작성일자 : 2020-01-22
 * Coptright 우리카드. All Right Reserved
 -------------------------------------------------
 */

/**
 * 시스템 공통함수
 */
var SysComm = {
	popQueue: [],
	contextPath: function() {
		return $(location).prop('pathname').substring(0,5);
	},
	screenId : function() {
		var path = $(location).prop('pathname');
		var dotIndex = path.lastIndexOf('.');
		var slashIndex = path.lastIndexOf('/');
		var screenId = path.substring(slashIndex+1, dotIndex);
		return screenId;
	},
	/**
	 * 쿠키를 저장한다.
	 * @date 2019.09.29
	 */
	setCookie: function(key, value, date) {
		var expire = new Date();
		expire.setDate(expire.getDate() + date);
		cookies = key + '=' + encodeURI(value) + '; path=/';
		if(typeof date != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
		document.cookie = cookies;
	},
	/**
	 * 쿠키를 가져온다.
	 * @date 2019.09.29
	 */
	getCookie: function(key) {
		key = key + '=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(key);
	    var value = '';
	    if(start != -1){
	        start += key.length;
	        var end = cookieData.indexOf(';', start);
	        if(end == -1) end = cookieData.length;
	        value = cookieData.substring(start, end);
	    }
	    return decodeURI(value);
	},
	/**
	 * 최근이용내역 메뉴이벤트
	 * @date 2020.05.20
	 */
	setLatelyUseMenu: function(tMenu) {
		function setLatelyUseCookie(obj) {
			var linkUrl = obj.attr('href');
			if ( linkUrl != '#' ) {
				var linkName = obj.find('span').text();
				if ( !linkName ) linkName = obj.text();
				var getCookieVal = SysComm.getLatelyUseCookie();
				var isChk = true;
				for ( cookieVal in getCookieVal ) {
					if ( getCookieVal[cookieVal].linkName == linkName && getCookieVal[cookieVal].linkUrl == linkUrl ) {
						isChk = false;
						break;
					}
				}
				if ( isChk ) SysComm.setLatelyUseCookie(linkName + ':' + linkUrl);
			}
		}
		if ( tMenu && $('.sitemapContain').length > 0 ) {
			$('.sitemapContain .depth2 li > a').off('click').on('click', function(e) {
				setLatelyUseCookie($(this));
			});
		} else {
			$('#gnb .menu a').not('#gnb .menu .leftBanner a').on('click', function(e) {
				if ( !$('.sitemapContain').is(':visible') ) {
					setLatelyUseCookie($(this));
				}
			});
		}
	},
	/**
	 * 최근이용내역 쿠키를 저장한다.
	 * @date 2020.05.19
	 */
	setLatelyUseCookie: function(latelyUseVal) {
		for(i = 4; i >= 1; i--) {
			var latelyUseCookie = this.getCookie('latelyUse'+i);
			if ( latelyUseCookie ) this.setCookie('latelyUse'+(i+1), latelyUseCookie, 365);
		}
		this.setCookie('latelyUse1', latelyUseVal, 365);
	},
	/**
	 * 최근이용내역 쿠키를 가져한다.
	 * @date 2020.05.20
	 */
	getLatelyUseCookie: function() {
		var retLatelyUse = new Array();
		for(i = 1; i <= 5; i++) {
			var latelyUseCookie = this.getCookie('latelyUse'+i);
			if ( latelyUseCookie ) {
				var latelyUse = latelyUseCookie.split(':');
				retLatelyUse.push({linkName:latelyUse[0],linkUrl:latelyUse[1]});
			}
		}
		return retLatelyUse;
	},
	/**
	 * elHeader 처리 예외 발생 시 Alert을 발생시긴다.
	 * @date 2019.09.29
	 */
	exceptionAlert: function(funcName, resCode, resMsg, callback) {
		//this.modalMsgPop(funcName + ' 처리 중 예외가 발생했습니다.<br>' + '- CODE : ' + resCode + '<br>' + '- MESSAGE : ' + resMsg, callback);
		if ( !resMsg ) resMsg = funcName + ' 처리 중 예외가 발생했습니다.';
		if ( resCode ) resMsg += ' (' + resCode + ')';
		this.modalMsgPop(resMsg, callback);
	},
	/**
	 * 해당 페이지로 이동한다.
	 * @date 2019.09.29
	 */
	moveLocation: function(url) {
		ExecuteAjax.startProgress();
		if( 'undefined' != typeof(bh) ) bh.doFocusOut();
		$(location).attr('href', this.contextPath() + url);
	},
	/**
	 * 현재페이지를 reload한다.
	 * @date 2019.12.17
	 */
	reloadLocation: function() {
		ExecuteAjax.startProgress();
		var reloadUrl = $(location).attr('pathname') + $(location).attr('search');
		$(location).attr('href', reloadUrl);
	},
	/**
	 * 홈화면으로 이동
	 * @date 2020.05.08
	 */
	moveLocHome: function() {
		ExecuteAjax.startProgress();
		var path = $(location).prop('pathname');
		if ( path.indexOf(this.contextPath() + '/yh2') > -1 ) this.moveLocation('/yh2/main.do');
		else if ( path.indexOf(this.contextPath() + '/yh3') > -1 ) this.moveLocation('/yh3/com/com01/H3COM201S01.do');
		else this.moveLocation('/main.do');
	},
	/**
	 * 파라메터 정보를 가져온다.
	 * @date 2019.11.01
	 */
	getParameter: function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
		var results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1]).replace(/\+/g, " ");
	},
	/**
	 * 웹/앱 구분을 위한 userAgent를 체크한다.
	 * @date 2019.11.01
	 */
	isUserAgent: function(value) {
		var varUA = navigator.userAgent;
		if ( varUA.indexOf(value) > -1 ) {
			return true;
		} else return false;
	},
	isAppAos: function() {
		return this.isUserAgent('WooriCardApp') && this.isDeviceAos();
	},
	isAppIos: function() {
		return this.isUserAgent('WooriCardApp') && this.isDeviceIos();
	},
	isNativeApp: function() {
		return this.isUserAgent('WooriCardApp');
	},
	/**
	 * 웹 디바이스 구분을 위한 userAgent를 체크한다.
	 * @date 2019.11.11
	 */
	getDeviceOS: function() {
		var varUA = navigator.userAgent.toLowerCase();
		if ( varUA.indexOf('android') > -1 ) {
			return 'aOS';
		} else if ( varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1 ) {
			return 'iOS';
		} else return '';
	},
	isDeviceAos: function() {
		return this.getDeviceOS() == 'aOS';
	},
	isDeviceIos: function() {
		return this.getDeviceOS() == 'iOS';
	},
	/**
	 * 브라우저 구분을 위한 userAgent를 체크한다.
	 * @date 2019.12.26
	 */
	getBrowser: function() {
		var varUA = navigator.userAgent.toLowerCase();
		if ( varUA.indexOf('msie') > -1 ) {
			return 'ie' + varUA.match(/msie (\d+)/)[1];
		} else if ( varUA.indexOf('trident') > -1 ) {
			return 'ie11';
		} else if ( varUA.indexOf('edge') > -1 ) {
			return 'edge';
		} else if ( varUA.indexOf('firefox') > -1 ) {
			return 'firefox';
		} else if ( varUA.indexOf('opr') > -1 ) {
			return 'opera';
		} else if ( varUA.indexOf('chrome') > -1 ) {
			return 'chrome';
		} else if ( varUA.indexOf('safari') > -1 ) {
			return 'safari';
		} else return 'other';
	},
	/**
	 * 모달팝업 OPEN
	 * @date 2019.11.11
	 */
	modalMsgPop: function(msg, callBack, type) {
		
		if ($('.popQueue').is(':visible')) {
			if (SysComm.popQueue.length > 4) SysComm.popQueue.pop();
			var popObj = {};
			popObj.method = 'modalMsgPop';
			popObj.msg = msg;
			popObj.callBack = callBack;
			popObj.type = type;
			SysComm.popQueue.push(popObj);
		} else {
			$('div.popWrap[id^="sysCommAlert"]').remove();
			var popId = 'sysCommAlert' + (+new Date());
			var commAlert = '<div class="popWrap ajaxPop popQueue" id="' + popId + '">' +
				'<div class="popup">' +
				'	<div class="popContain">' +
				'		<div class="popCont alert">' +
				'			<div class="popBody col_5">' +
				'				<div class="popInner">' +
				'					<p class="noData">' + msg + '</p>' +
				'				</div>' +
				'			</div>' +
				'			<div class="btnArea sticky">' +
				'				<button type="button" class="btn_p">확인</button>' +
				'			</div>' +
				'			<button type="button" class="btnIco_close"><span>닫기</span></button>' +
				'		</div>' +
				'	</div>' +
				'</div>' +
				'</div>';
			$('body').append(commAlert);
			$('#'+popId).find('.popup button:button').off('click').on('click', function() {
				SysComm.modalMsgPopClose(callBack, popId, type);
				
				if (SysComm.popQueue && SysComm.popQueue.length > 0) {
					var popObj = SysComm.popQueue.shift();
					setTimeout(function() {
						if (popObj.method == 'modalMsgPop') {
							SysComm.modalMsgPop(popObj.msg, popObj.callback, popObj.type);
						} else if (popObj.method == 'modalConfirmPop') {
							SysComm.modalConfirmPop(popObj.msg, popObj.callback1, popObj.callback2);
						}
					}, 100);
				}
			});
			lp.open('#'+popId);
		}
	},
	/**
	 * 모달팝업 CLOSE
	 * @date 2019.11.11
	 */
	modalMsgPopClose: function(callBack, clsId, type) {
		var popId = clsId ? clsId : 'sysCommAlert';
		if(typeof type != 'undefined'){
			if(type == true){
				if(typeof lp.alertClose == 'undefined'){
					//ui.front.js
					lp.alertClose = function(_mTime){
						lp.closeTarget = $(':focus').closest('.popWrap');
						wa.setNowFocus();
						if(_mTime == null || _mTime == undefined){
							var mTime = 300;
						} else {
							mTime = _mTime;
							if( _mTime.indexOf('.') >= 0 || _mTime.indexOf('#') >= 0 ){
								lp.closeTarget = _mTime;
							}
						}
						
						$(lp.closeTarget).fadeOut(mTime, function(){
							$(lp.closeTarget).removeClass('nowOpen nowAlert');
							if( $(lp.closeTarget).hasClass('ajaxPop') ){
								$(lp.closeTarget).remove();
							}
							if( $('.beforePopup').length > 0 ){
								$('.beforePopup').addClass('nowOpen').removeClass('beforePopup');
							}
							if( $('body .nowOpen').length == 0 && $('body .nowAlert').length == 0 ){
								clearInterval( lp.popupInterval );
								$('.popWrap').removeClass('nowOpen nowAlert');
								$('html, body').removeClass('popOn');
								$('body').removeClass('hasScroll');
								$('html').removeClass('popFullScroll');
								$('.wrapper').removeAttr('aria-hidden');
							}
						});
						
					}
				}
				lp.alertClose('#'+popId);
			}else{
				lp.close('#'+popId);
			}
		}else{
			lp.close('#'+popId);
		}
		
		if ( $('#'+popId).length > 0 ) $('#'+popId).remove();
		if ( typeof callBack === 'function' ) {
			callBack();
		}
	},
	
	modalInfoTitlePop: function(title, msg, btnName, callBack) {
		$('div.popWrap[id^="popup_alert_cPopup"]').remove(); 
		var popId = 'popup_alert_cPopup' + (+new Date());
		var confirmBtnName; 
		if(btnName) {
			confirmBtnName = btnName;
		} else {
			confirmBtnName = "확인";
		}
		
		var commAlert = '<div id="' + popId + '" class="popWrap">' +
			'<div class="popup">' +
			'	<div class="popContain">' +
			'		<div class="popCont">' +
			'			<div class="popHead">' +
			'				<h1 class="titH1">' + title + '</h1>' + 
			'			</div>' +
			'			<div class="popBody">' +
			'				<div class="popInner">' +
			'					<section>' +
			'						<p>' + msg + '</p>' +
			'					</section>' +
			'				</div>' +
			'			</div>' +
			'			<div class="btnArea sticky">' +
			'				<button type="button" class="btn_p">' + confirmBtnName + '</button>' +
			'			</div>' +
			'			<button type="button" class="btnIco_close"><span>닫기</span></button>' +
			'		</div>' +
			'	</div>' +
			'</div>'; 
		$('body').append(commAlert); 
		$('#'+popId).find('.popup button:button').off('click').on('click', function() {
			SysComm.modalMsgPopClose(callBack, popId);
		});  
		lp.open('#'+popId); 
	},
	
	/**
	 * (mob)모달팝업 OPEN
	 * @date 2021.09.02
	 */
	modalMobMsgPop: function(msg, callBack) {
		$('div.popWrap[id^="sysCommAlert"]').remove();
		var popId = 'sysCommAlert' + (+new Date());
		var commAlert = '<div class="popWrap ajaxPop popQueue" id="' + popId + '">' +
			'<div class="popup">' +
			'	<div class="popContain">' +
			'		<div class="popCont" style="padding:0">' +
			'			<div class="popBody" style="padding: 40px 25px 0;">' +
			'				<div class="popInner">' +
			'					<p class="noData pb60 pt80" style="border:0px; background-position-y:10px">' + msg + '</p>' +
			'				</div>' +
			'			</div>' +
			'			<div class="btnArea sticky" style="z-index:3">' +
			'				<button type="button" class="btn_p">확인</button>' +
			'			</div>' +
			'			<button type="button" class="btnIco_close"><span>닫기</span></button>' +
			'		</div>' +
			'	</div>' +
			'</div>' +
			'</div>';
		$('body').append(commAlert);
		$('#'+popId).find('.popup button:button').off('click').on('click', function() {			
			lp.close('#'+popId);
		});
		lp.open('#'+popId);
	},
	
	/**
	 * 모달 선택 팝업 OPEN
	 * @date 2020.02.19
	 */
	modalConfirmPop: function(msg, callBack1, callBack2) {
		
		var afterPopClose = function() {			
			if (SysComm.popQueue && SysComm.popQueue.length > 0) {
				var popObj = SysComm.popQueue.shift();
				setTimeout(function() {
					if (popObj.method == 'modalMsgPop') {
						SysComm.modalMsgPop(popObj.msg, popObj.callback, popObj.type);
					} else if (popObj.method == 'modalConfirmPop') {
						SysComm.modalConfirmPop(popObj.msg, popObj.callback1, popObj.callback2);
					}
				}, 100);
			}
		};
		
		if ($('.popQueue').is(':visible')) {
			if (SysComm.popQueue.length > 4) SysComm.popQueue.pop();
			var popObj = {};
			popObj.method = 'modalConfirmPop';
			popObj.msg = msg;
			popObj.callBack1 = callBack1;
			popObj.callBack2 = callBack2;
			SysComm.popQueue.push(popObj);
		} else {
			$('div.popWrap[id^="sysConfirm"]').remove();
			var popId = 'sysConfirm' + (+new Date());
			var commAlert = '<div class="popWrap ajaxPop popQueue" id="' + popId + '">' +
				'<div class="popup">' +
				'	<div class="popContain">' +
				'		<div class="popCont alert">' +
				'			<div class="popBody col_5">' +
				'				<div class="popInner">' +
				'					<p class="noData">' + msg + '</p>' +
				'				</div>' +
				'			</div>' +
				'			<div class="btnArea sticky">' +
				'               <button type="button" class="btn_s">취소</button>' +
				'				<button type="button" class="btn_p">확인</button>' +
				'			</div>' +
				'			<button type="button" class="btnIco_close"><span>닫기</span></button>' +
				'		</div>' +
				'	</div>' +
				'</div>' +
				'</div>';
			$('body').append(commAlert);
			$('#'+popId).find('.popup .btn_s,.popup .btnIco_close').off('click').on('click', function() {
				SysComm.modalMsgPopClose(callBack1, popId);
				afterPopClose();
			});
			$('#'+popId).find('.popup .btn_p').off('click').on('click', function() {
				SysComm.modalMsgPopClose(callBack2, popId);
				afterPopClose();
			});
			lp.open('#'+popId);
		}
	},
	
	/**
	 * 버튼명 만들수 있는 팝업
	 * @date 2021.09.16
	 */
	modalConfirmPopTitle: function(msg, callBack1, callBack2, btn1, btn2) {
		$('div.popWrap[id^="popup_alert_cPopup"]').remove(); 
		var popId = 'popup_alert_cPopup' + (+new Date());
		
		var commAlert = '<div id="' + popId + '" class="popWrap ajaxPop nowAlert">' +
			'<div class="focusSet blind first" tabindex="0"></div>' +
			'<div class="popup">' +
			'	<div class="popContain">' +
			'		<div class="popCont alert" tabindex="-1" role="dialog">' +
			'			<div class="popBody" style="height: auto; ">' +
			'				<div class="popInner" style="padding-bottom:10px; ">' +
			'					<div class="msg">' +
			'						<p>' + msg + '</p>' +
			'					</div>' +
			'				</div>' +
			'			</div>' +
			'			<div class="btnArea two half sticky">' +
			'				<button type="button" class="btn_p">' + btn1 + '</button>' +
			'               <button type="button" class="btn_s">' + btn2 + '</button>' +			
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>' +
			'<div class="focusSet blind last" tabindex="0"></div>' +
			'</div>'; 
		$('body').append(commAlert); 
		$('#'+popId).find('.popup .btn_s').off('click').on('click', function() {
			SysComm.modalMsgPopClose(callBack1, popId); 
		}); 
		$('#'+popId).find('.popup .btn_p').off('click').on('click', function() {
			SysComm.modalMsgPopClose(callBack2, popId); 
		}); 
		lp.open('#'+popId); 
	},
	
	/**
	 * historyBack 메시지
	 * @date 2020.05.08
	 */
	historyBackPage: function() {
		$('#content').empty();
		var histPage = '<div class="pageTit">' +
			'	<div class="inner">' +
			'		<h1 class="titH1">에러메세지</h1>' +
			'	</div>' +
			'</div>' +
			'<section>' +
			'	<div class="finishBox fail">' +
			'		<div class="inner">' +
			'			<p class="copy">비정상적인 접근입니다. 다시 접속하여 주십시오</p>' +
			'			<p class="desc">정상완료 된 화면에서 브라우저의 뒤로가기 버튼을 누르시면 <br> 비정상적인 접근으로 다시 접속해 주셔야 합니다.</p>' +
			'		</div>' +
			'	</div>' +
			'	<div class="btnArea">' +
			'		<a href="#" class="btn_p">홈으로가기</a>' +
			'	</div>' +
			'</section>';
		$('#content').html(histPage);
		$('#content').find('.btnArea .btn_p').off('click').on('click', function() {
			SysComm.moveLocHome();
		});
	},
	/**
	 * 파일다운로드
	 * @date 2019.12.23
	 */
	fileDownload: function(fileSrc) {
		if ( $('#ifmDownload').length < 1 ) {
			$(document.body).append('<iframe name="ifmDownload" id="ifmDownload" width="0" height="0" style="display:none;" title="파일 다운로드"></iframe>');
		}
		if (fileSrc) $('#ifmDownload').attr('src', fileSrc);
	},
	/**
	 * dev/test/prod 구분 
	 * @date 2021.02.04
	 */
	isDev: function(){
		return location.host.indexOf('dwww.wooricard.com') > -1 || location.host.indexOf('dm.wooricard.com') > -1;
	},
	isTest: function(){
		return location.host.indexOf('twww.wooricard.com') > -1 || location.host.indexOf('tm.wooricard.com') > -1;
	}
}