/**
 * 파일명 : /cmn/pageReadyInit.js
 * 업 무 :
 * 설 명 :
 * 최초 작성자 :
 * 최초 작성일 :
 * Copyright 우리카드. All Right Reserved
 */

/**
 * 페이지 초기화 init
 * PageReadyInit = bizComm.init;
 */
var PageReadyInit;
$(document).ready(function() {
	layout.init();
	if ( typeof PageReadyInit === 'function' ) PageReadyInit();
	//form submit 방지
	/* $('form').bind('submit', function(e){
		e.preventDefault();
		e.stopPropagation();
	}); */
	
	// $('input[type=password]').attr('autocomplete','off'); // 자동완성 제거

	/*맥에서는 키보드 보안을 안쓴다 */
	/* if(/mac/.test(navigator.userAgent.toLowerCase())){
		$("[npkencrypt=on]").prop('disabled',true);
	} */
	
    // 일자유효성체크 (s)
    /* $('.ipt.date').on('blur', function() {
    	var thisVal = $.trim($(this).val());
    	if ( thisVal ) {
        	thisVal = CmnUtil.date.ymdDateFormat(thisVal, '.');
        	if ( thisVal ) $(this).val(thisVal);
        	else {
        		$(this).val('');
        		SysComm.modalMsgPop('날짜 형식이 올바르지 않습니다.');
        	}
    	}
    }); */
    // 일자유효성체크 (e)
	// 연관메뉴 링크 (s)
    /* $('.relatedArea .linkGroup .links').on('click', function(e) {
    	var linkUrl = $(this).attr('href');
    	var popChkUrl = linkUrl.substring(linkUrl.lastIndexOf('/')+9, linkUrl.lastIndexOf('/')+10);
    	if ( popChkUrl == 'P' ) {
    		var cntPath = linkUrl.substring(0, 5);
            var jsUrl = linkUrl.replace(cntPath, cntPath+'/js').replace('.do', '.js');
            lp.open(linkUrl, '', jsUrl);
        	e.preventDefault();
        	e.stopPropagation();
    	}
    }); */
    // 연관메뉴 링크 (e)
});

/**
 * 공통 CommonPageObject
 * @param
 * @return
 * @author
 */
var CommonPageObject = {
	/**
     * init 최초 초기화 정의 영역
     */
	init : {},

	/**
	 * variable 공통 변수 정의 영역
	 */
	variable : {},

	/**
	 * event 이벤트 정의 영역
	 */
	event : {},

	/**
	 * svrAction 이벤트 정의 영역
	 */
	svrAction : {},

	/**
	 * locAction 로컬 액선 정의 영역
	 */
	locAction : {},

	/**
	 * callBack 콜백 정의 영역
	 */
	callBack  : {},

	/**
	 * historyBack 이벤트 정의 영역 - ex) Sample.historyBack = function() {}
	 */
	historyBack  : function() {},

    /**
     * 이벤트를 동적으로 반영 해주는 함수
    */
    eventBind : function(app){
    	if ( app.events ) {
        	var keyList = Object.keys(app.events);
        	$(keyList).each(function(idx , key) {
        		var keys = CmnUtil.string.trim(key);
        		var pos = keys.indexOf(' ');
        		var evt = keys.substring(0, pos);
        		var selector = keys.substring(pos+1);
        		var func = app.events[keyList[idx]];
        		var nameList = func.split('.').slice(1);
        		var targetFunc = app;
        		nameList.forEach(function (name, idx) {
        			targetFunc = targetFunc[name];
        		});
        		$('body').off(evt, selector).on(evt, selector, targetFunc);
        	});
    	}
    	$(window).on(/mac/.test(navigator.userAgent.toLowerCase())?'pageshow':'load', function(event) { // 페이지 뒤로가기 시 호출
			if ( event.originalEvent.persisted || (window.performance && window.performance.navigation.type == 2) ) {
				ExecuteAjax.endProgress();
				if ( typeof app['historyBack'] === 'function' ) app['historyBack']();
			}
    	});
    },

   /**
     * 각 업무 화면 별로 Object를 복사한다.
    */
   clone: function() {
       var me = this;
       return $.extend(true, {}, me);
   }
}
