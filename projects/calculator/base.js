/* 레이어팝업 중복 처리 START */
var _LPOPEN_FUNC_ = [];
var _overLpOpenLayer_ = lp.open;
lp.open = function() {
	var param = arguments;
	if ( !param[0] || ( param[0].indexOf('#sysCommAlert') < 0 && param[0].indexOf('#sysConfirm') < 0 ) ) {
		if ( $('.popWrap.nowOpen').length > 0 ) { /* open 되어있으면 */
			_LPOPEN_FUNC_[_LPOPEN_FUNC_.length] = function() {
				_overLpOpenLayer_.apply(null, param);
			}
		} else _overLpOpenLayer_.apply(null, param);
	} else _overLpOpenLayer_.apply(null, param);
}
var _overLpCloseLayer_ = lp.close;
lp.close = function() {
	var param = arguments;
	_overLpCloseLayer_.apply(null, param);
	if ( !param[0] || ( param[0].indexOf('#sysCommAlert') < 0 && param[0].indexOf('#sysConfirm') < 0 ) ) {
		if ( _LPOPEN_FUNC_[0] ) {
			_LPOPEN_FUNC_[0].apply(null);
			_LPOPEN_FUNC_.shift();
		}
	}
}
/* 레이어팝업 중복 처리 END */
if ( window.location.hash == '#gomainhash' ) window.onload = function() {
	if ( window.performance && window.performance.navigation.type == 2 ) SysComm.moveLocation('/main.do');
}
$(document).ready(function() {
	var titleNm = $('.pageTit > .inner > h1.titH1').text();
	if( $('.pageTit').length == 0 ){
		titleNm = $('h1.titH1').text();
	}
	
	//메인은 타이틀 조정 별도 규칙으로 처리
	var mainPageH = ['메인', '복지 메인'];
	if ( titleNm && mainPageH.indexOf($.trim(titleNm)) < 0) {
		var titleSubNm = "";	//탭 타이틀
		var titleStepNm = "";	//스탭 타이틀

		try{

			$(".pageTab > li").each(function(index, item){
			    if($(item).hasClass("on")){
			        titleSubNm = "-"+$(item)[0].childNodes[0].nodeValue;
			        return;
			    }
			});

			$(".progress > ol > li").each(function(index, item){
			    if($(item).hasClass("on")){
			        titleStepNm = "-"+$(item).text();
			        return;
			    }
			});

			if (getSvcGbCd == '01') {
			   document.title = titleNm + titleSubNm + titleStepNm + ' | 우리카드(개인)';
			}else if (getSvcGbCd == '02') {
			   document.title = titleNm + titleSubNm + titleStepNm + ' | 우리카드(기업)';
			}else {
			   document.title = titleNm + titleSubNm + titleStepNm + ' | 우리카드(복지)';
			}
		}catch(e){
			if (getSvcGbCd == '01') {
			   document.title = titleNm + titleSubNm + titleStepNm + ' | 우리카드(개인)';
			}else if (getSvcGbCd == '02') {
			   document.title = titleNm + titleSubNm + titleStepNm + ' | 우리카드(기업)';
			}else {
			   document.title = titleNm + titleSubNm + titleStepNm + ' | 우리카드(복지)';
			}
		}
	}

	//키보드보안 으로 인한 ajaxStart 로직 안됨.
	SysComm.setCookie("lang", "ko", 1);  // 다국어 처리를 위한 언어 설정 (미설정 시 프레임워크에서 ko 세팅)
	SysComm.setCookie("bodyYn", "Y", 1); // HTTP Body로 JSON 객체를 전달하기 위한 여부

	//로그인 세션 삭제하기
	if( isLogin == 'false' ) {
		sessStorage.removeItemByKey('loginInfo');
	} else {
		$(document).keyup(function(evt) { // PauseBreak키 로그인연장
			if ( evt.keyCode == 19 ) try { LogoutCountDown.extention(true); } catch(e) {}
		});
	}



	/**************************************************************
	 * 팝업 동작 여부
	 *************************************************************/
	//중복로그인으로 들어올경우 팝업
	if( 'Y' == SysComm.getParameter('overLogin') ){
		SysComm.modalMsgPop('고객님의 아이디로 다른 로그인이 접속되어 연결을 종료합니다.<br/>동일 아이디로 동시 로그인 접속은 불가합니다.');
	}

	//CDD 동작여부
	if( 'Y' == sessStorage.getItemByKey('loginPop_CDD') ){
		if( 'Y' != SysComm.getCookie('cddConfirm')){ //CDD확인여부 쿠키에서 로딩
			var pathNm = $(location).prop('pathname');
			var url = '';
			if( 'yh1' == pathNm.substring(6, 9) ){
				url = '/dcpc/js/yh1/mmb/mmb01/H1MMB201P03.js';
			} else {
				url = '/dcpc/js/yh2/bmm/bmm01/H2BMM201P03.js';
			}
			lp.open('/dcpc/loginPopCDD.do', '', url);
		}
	}

	//FDS팝업 확인
	if ( 'Y' == sessStorage.getItemByKey('fdsPopYn') ){
		if ( '' == SysComm.getCookie('fdsPopYn') ){
//			lp.open('/dcpc/fdsPopYn.do', '', '/dcpc/js/cmn/login/fdsPopYn.js');
		}
	}

	//정보유출 팝업 확인
	if ( 'Y' == sessStorage.getItemByKey('ouflPopYn') ) {
		lp.open('/dcpc/ouflPopYn.do', '', '/dcpc/js/cmn/login/ouflPopYn.js');
	}

	//카드신청 임시저장 여부
	if ( SysComm.getCookie('tmpCardGbPop') != 'Y' ) {
		var cdPrdCd = sessStorage.getItemByKey('tmpCardGb').cdPrdCd || '';
		var cdPrdCdPath = sessStorage.getItemByKey('tmpCardGb').path || '';
		if ( cdPrdCd ) {
			lp.open('/dcpc/tmpCardGb.do', '', '/dcpc/js/cmn/login/tmpCardGb.js');
		}
	}

	//기업 안내팝업

	if( 'N' == sessStorage.getItemByKey('regCertSignYn') ||
		'N' == sessStorage.getItemByKey('regSmsNoYn') ||
		'N' == sessStorage.getItemByKey('regMngCdYn') ){
		var pathNm = $(location).prop('pathname');
		var url = '';

		if( 'yh2' == pathNm.substring(6, 9) ){
			var loginInfo = sessStorage.getItemByKey('loginInfo');
			if ( loginInfo ) {
				var userDis = loginInfo.userDis;
				if ( 'M' == userDis || 'S' == userDis) {
					lp.open('/dcpc/yh2/com/com01/H2COM201P00.do','', '/dcpc/js/yh2/com/com01/H2COM201P00.js');
				}
			}
		}
	}

	/**************************************************************
	 * 팝업 동작 여부 끝
	 *************************************************************/

	//eFDS 동작
	var eFDS = sessStorage.getItemByKey('eFDS');
	if( !eFDS || eFDS == '' || 'N' == efdsYn) {
		eFdsInit();
	}

	//보안키보드 실행(매번실행)
	if( npPfsCtrl.isStartup ){
		npPfsCtrl.RescanField();
	} else {
		var pathname = $(location).prop('pathname');
		var keyword = keyword;
		if(!(pathname.indexOf('yh1/main') > -1 || pathname.indexOf('dcpc/main') > -1 || pathname.indexOf('yh1/com/com01/H1COM201S00.do') > -1 || pathname.indexOf('yh2/com/com01/H2COM201S00.do') > -1  ||  pathname.indexOf('/dcpc/yh3/com/com01/H3COM201S01.do') > -1  ||  pathname.indexOf('mmb05') > -1 || cntnAt == 'Y')) {
			npPfsStartup(document.ncrptyKey, true, true, false, false, 'npkencrypt', 'on');
		}
	}
	//보안키보드 버그 해결
	if( 'undefined' != typeof(bh) ) bh.doFocusOut();

	//보안키패드 영역 감지
	if( $('input').filter(function(i, e){return $(e).data('tkKbdtype')}).length > 0 ){
		//보안 키패드 이벤트 처리
		var TranskeyClose = Transkey.prototype.close;
		Transkey.prototype.close = function() {
			if(tk.now != null){
				$('#' + tk.now.id).trigger('focusout');
				/* 사용자지정 callback 존재하면 수행 */
				//if (typeof(eval($('#' + tk.now.id).data('tk-close-callback'))) === 'function') {
				//	eval($('#' + tk.now.id).data('tk-close-callback'))();
				//}
				try {
					new Function($('#' + tk.now.id).data('tk-close-callback') + '()')();
				} catch (e) {
					//함수가 아닐 경우 Do Nothing
					console.log("");
				}
				TranskeyClose();
			}
		};
	}
	
	//가상환경 시 보안키보드(X), 가상키패드(O) 처리
	$(document).on('nppfs-before-startup', function() {
		npPfsCtrl.isVirtualMachine(function(result) {
			if (result) {
				$('[npkencrypt=on]').prop('readonly', true);
				$('[npkencrypt=on]').attr('onclick','tk.onKeyboard(this)');
				$('[npkencrypt=on]').attr('onfocus','this.blur()');
			}
		});
	});

	//기업에서 개인으로 이동시 사용자구분 확인
	$('.header .gate > li:eq(0) > a').on('click', function(){
		var loginInfo = sessStorage.getItemByKey('loginInfo');
		if ( loginInfo ) {
			if ( '02' == loginInfo.loginGubun && 'S' != loginInfo.userDis ) {
				SysComm.modalConfirmPop('개인카드 홈페이지를 이용하시려면 개인카드 홈페이지에서 로그인 하시기 바랍니다.\n기업카드 홈페이지를 로그아웃하시겠습니까?', function(){
				}, function(){
					ExecuteAjax.callGet('/SvcLogout.pwkjson', '', function(data) {
			    		SysComm.moveLocation('/yh1/mmb/mmb01/H1MMB201S00.do');
			    	});
				})
			} else {
				SysComm.moveLocation('/main.do');
			}
		} else {
			SysComm.moveLocation('/main.do');
		}
	});
	//개인에서 기업으로 이동시
	$('.header .gate > li:eq(1) > a').on('click', function(){
		if ( typeof history.pushState === 'function' ) {
			//window.history.pushState(null, '우리카드', '/dcpc/main.do'); // ie document.referrer 가 없음
			window.history.pushState(null, '우리카드', '/dcpc/yh1/com/com01/H1COM201S00.do');
			SysComm.moveLocation('/yh2/main.do');
		} else { // ie9
			window.location.hash = 'gomainhash';
			window.onhashchange = function() {
				if ( window.location.hash == '#gomainhash' ) SysComm.moveLocation('/yh2/main.do');
			}
		}
	});

	//이용대금명세서 바로가기 링크
	$('#h1mcd203s00').on('click', function(){
		if(getSvcGbCd == '01')
			SysComm.moveLocation('/yh1/mcd/mcd03/H1MCD203S00.do');
		else
			SysComm.moveLocation('/yh2/bcv/bcv03/stmt/H2BCV203S01.do');
	});
	//결제예상금액 바로가기 링크
	$('#h1mcd202s00').on('click', function(){
		if(getSvcGbCd == '01')
			SysComm.moveLocation('/yh1/mcd/mcd02/H1MCD202S00.do');
		else
			SysComm.moveLocation('/yh2/bcv/bcv03/stlfcstam/H2BCV203S07.do');
	});
	//이용내역조회 바로가기 링크
	$('#h1mcd204s00').on('click', function(){
		if(getSvcGbCd == '01')
			SysComm.moveLocation('/yh1/mcd/mcd04/usehis/H1MCD204S00.do');
		else
			SysComm.moveLocation('/yh2/bcv/bcv04/apvhisinq/H2BCV204S01.do');
	});
	//회원정보변경 바로가기 링크
	$('#h1mcd309s00').on('click', function(){
		if(getSvcGbCd == '01')
			SysComm.moveLocation('/yh1/mcd/mcd09/myinfcnf/H1MCD309S00.do');
		else
			SysComm.moveLocation('/yh2/bmm/bmm02/H2BMM302S00.do');
	});

	try{
		//챗봇 init
		var chatBotScreenYn = "N";
		var curPath = $(location).prop('pathname');
		if ( curPath.indexOf('/main') > -1 || curPath.indexOf('/yh1/com/com01/H1COM201S00') > -1 ) var chatBotScreenYn = "Y";
		if((chatBotSvcExpsrAt == 'Y' || chatBotScreenYn == 'Y') && getSvcGbCd == '01'){
			Chatbot.init();
		}
	}catch(e){
		 console.log(e);
		//IE9에서 가끔 오류가 나올때가 있어 오류가 나와도 무시함. (기타 IE11이나 크롬은 발생하지 않음)
	}

});

var eFdsInit = function(){
	var obj = {
		before : function(data){
			console.log(data);
		},
		after : function(data){
			var eFDS = {};
			if(data != null){
				console.log(data);
				eFDS.natIp = data.ndata;
				eFDS.wdata = data.wdata;
				iTracerAF.init(function(data){
					eFDS.afwData = data.wdata;
					sessStorage.setItemByKey('eFDS', 'Y');
					var param = {
							efdsSendVo : eFDS
					}
					ExecuteAjax.callBgPost('/GetEfds.pwkjson', param, function() {});
				})
			}
		},
		installCheckCallBack : function(installCheckResult){
			try {
				if(installCheckResult == IPinsideInstallCheckResultType.NotInstalled){ return false; }
				else if(installCheckResult == IPinsideInstallCheckResultType.UpdateRequired){ return false; }
				else if(installCheckResult == IPinsideInstallCheckResultType.LatestInstalled){ return true; }
			} catch (e) {
				console.log(e);
			}
		}
	}
	try {
		IPinside.launchAgent(obj);
	} catch (e) {
		console.log(e);
	}
}

/* 잉카 키보드보안 옵션 */
npPfsExtension = new function() {
	/* 입력양식의 키 유효성 체크 */
	this.keyValidation = function(element, keyCode) {
		if ($(element).attr('npknum') == 'on') {
			// 0 = 48, 9 = 57, a = 97, z = 122, A = 65, Z = 90
			var key = parseInt("" + keyCode);
			if(key < 48 || key > 57) {
				return false;
			}
		}
		return true;	/* true : 입력가능문자, false : 정합성불가/입력불가문자 */
	}
}
