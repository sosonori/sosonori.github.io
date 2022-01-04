/**
 * 파  일  명   : cmnUtil
 * 업      무  : 공통 / 공통JsUtil
 * 설      명  : 공통 JsUtil을 정의한다.
 * 최초  작성자  :
 * 최초 작성일자 : 2019-12-13
 * Coptright 우리카드. All Right Reserved

 -------------------------------------------------
 */

/**
 * removeWhiteSpace : 문자열에 포함된 공백, 개행문자 제거
 * trim : 좌우 공백 제거
 * ltrim : 좌측 공백 제거
 * rtrim : 우측 공백 제거
 * replaceAll : 소스문자열에 포함된 문자를 원하는 문자로 변환 공백 또는 '0'을 자리수만큼 채운 문자열
 * alterString : raplaceAll과 동일
 * formatString : 포멧 문자열 변환
 * packValue : 소스 문자열을 포함해 원하는 위치에 공백 또는 '0'을 자리수만큼 채운 문자열
 * getByte : 문자열의 바이트수 구하기
 * toUpper : 소문자를 대문자로 변환
 * toLower : 대문자를 소문자로 변환
 * removeComma : 문자열에 포함된 ','를 제거
 * removeFormat : 문자열에 포함된 포멧문자 ", . - / :"를 제거
 * addComma : , 를 추가
 *
 * CmnUtil.mask.accountNo : 원하는 카드 포멧으로 변환
 * svrToDate : 서버의 시간을 가져옴
 * CmnUtil.validate.checkID : ID를 체크 해줌
 * CmnUtil.crt.keyParam : 키보드보안(키패드) 입력 필드에 대한 파라미터(VO) 생성
 * CmnUtil.crt.checkPwd : 비밀번호 검증
 * CmnUtil.crt.checkCardPwd : 카드비밀번호 검증
 * CmnUtil.validate.checkNum : 숫자여부 체크
 *  -------------------------------------------------
 */

var CmnUtil = {

	string : {
	},

	mask : {
	},

	date : {
	},

	validate : {
	},

	callBack : {
	},

	crt : {
	},

	data : {
	},

	login : {
	},
	
	term : {
	},
	
	pop: {
		
	},
	
	grid: {
		totRows: [],
		props: null,
		curRow: null
	}
}

/*******************************************************************************
 * string 함수의 영역
 *
 ******************************************************************************/



/**
 * ----------------------------------------------------------------------------
 * 문자열이 null이면 "" 아니면 str리턴
 * 작성자  :
 * 작성일  : 2019-02-10
 * 파라미터 : str
 * return   '문자열'
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.isNull = function(str) {
	if(str == "" || str == undefined || str == null){
		return "";
	}

	return str;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : removeWhiteSpace()
 * 설 명 : 문자열에 포함된 공백, 개행문자 제거
 * 인자값 : String strTarget - 문자열에 포함된
 * 공백, 개행문자를 제거하고자하는 문자열
 * 리 턴 : String - 좌우 공백이 제거된 문자열
 * 사용법 : var strResult = trim(' 문 자 열 ');
 * return '문자열'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.removeWhiteSpace = function(strTarget) {

	var strEliminate = /\s+/g;

	if(strTarget) {
		return strTarget.replace(strEliminate,"");
	} else {
		return strTarget;
	}

}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : trim()
 * 설 명 : 좌우 공백 제거
 * 인자값 : String strTarget - 좌우 공백을 없애고자하는 문자열
 * 리 턴 : String - 좌우 공백이 제거된 문자열
 * 사용법 : var strResult = trim(' 문 자 열 ');
 * return '문 자 열'
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.trim = function(strTarget) {

	var strEliminate = /(^\s*)|(\s*$)/gi;

	if(strTarget) {
		return strTarget.replace(strEliminate,"");
	} else {
		return strTarget;
	}

}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : ltrim()
 * 설 명 : 좌측 공백 제거
 * 인자값 : String strTarget - 좌측 공백을 없애고자하는 문자열
 * 리 턴 : String - 좌측 공백이 제거된 문자열
 * 사용법 : var strResult = ltrim(' 문 자 열 ');
 * return '문 자 열 '
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.ltrim = function(strTarget) {

	while(strTarget.substring(0,1)==" ") {
		strTarget = strTarget.substring(1);
	}
	return strTarget;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : rtrim()
 * 설 명 : 우측 공백 제거
 * 인자값 : String strTarget - 우측 공백을 없애고자하는 문자열
 * 리 턴 : String - 우측 공백이 제거된 문자열
 * 사용법 : var strResult = rtrim(' 문 자 열 ');
 * return ' 문 자 열'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.rtrim = function(strTarget) {

	var len = strTarget.length;

	while(strTarget.substring(len-1,len)==" ") {
		strTarget = strTarget.substring(0,len-1);
		len = strTarget.length;
	}
	return strTarget;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : replaceAll()
 * 설 명 : 소스문자열에 포함된 문자를 원하는 문자로 변환
 * 공백 또는 '0'을 자리수만큼 채운 문자열
 * 인자값 : String strSrc - 소스 문자열
 * String strOld - 총 자릿수
 * String strNew - 숫자인가? (옵션 default : false)
 * 리 턴 : String - 소스 문자열을 포함해 원하는 위치에
 * 공백 또는 '0'을 자리수만큼 채운 문자열
 * 사용법 : var strResult = packValue('1234', 8, true, true);
 * return '00001234'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.replaceAll = function(strSrc, strOld, strNew) {

	var retValue = "";

	if(strOld == null) {
		return strSrc;
	}
	if (strSrc != "" && strOld != strNew) {
		retValue = strSrc;
		while (retValue.indexOf(strOld) > -1) {
			retValue = retValue.replace(strOld, strNew);
		}
	}
	return retValue;

}

/* 문자 변환 함수 (=replaceAll() 함수와 동일) */
CmnUtil.string.alterString = function(strSrc, strOld, strNew) {

	var retValue = "";

	for(i = 0; i < strSrc.length; i++) {
		var value = strSrc.charAt(i);
		var index = strOld.indexOf(value);
		if(index >= 0) {
			value = strNew.charAt(index);
		}
		retValue += value;
	}
	return retValue;

}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : packValue()
 * 설 명 : 소스 문자열을 포함해 원하는 위치에
 * 공백 또는 '0'을 자리수만큼 채운 문자열
 * 인자값 : String strSrc - 소스 문자열
 * Int nSize - 총 자릿수
 * bool bNum - 숫자인가? (옵션 default : false)
 * bool bLeft - 왼쪽에 위치할 것인지? (옵션 default : true )
 * 리 턴 : String - 소스 문자열을 포함해 원하는 위치에
 * 공백 또는 '0'을 자리수만큼 채운 문자열
 * 사용법 : var strResult = packValue('1234', 8, true, true);
 * return '00001234'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.packValue = function(strSrc, nSize, bNum, bLeft) {
	var retValue = "";
	var preValue = "";
	var postValue = "";
	var nLen = 0;
	var i = 0;

	if(bNum == null) {
		bNum = false;
	}

	if(bLeft == null) {
		bLeft = true;
	}
	strSrc = "" + strSrc;
	nLen = strSrc.length;
	retValue = strSrc;

	if(bNum) {
		for(i = nLen; i < nSize; i++) {
			if(bLeft)
			{
				preValue += "0";
			} else {
				postValue += "0";
			}
		}
	} else {
		for(i = nLen; i < nSize; i++) {
			if(bLeft) {
				preValue += " ";
			} else {
				postValue += " ";
			}
		}
	}
	retValue = preValue + retValue + postValue;
	return retValue;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : getByte()
 * 설 명 : 문자열의 바이트수 구하기
 * 인자값 : String strSrc - 소스 문자열
 * 리 턴 : Int - 문자열 바이트수
 * 사용법 : var nResult = getByte('가나다1234');
 * return 10
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.getByte = function(strSrc) {

	return (strSrc.length+(escape(strSrc)+"%u").match(/%u/g).length - 1);

}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : toUpper()
 * 설 명 : 소문자를 대문자로 변환
 * 인자값 : String strSrc - 소스 문자열
 * 리 턴 : String - 대문자로 변환된 문자열
 * 사용법 : var strResult = toUpper('abc');
 * return 'ABC'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.toUpper = function(strSrc) {

	var str1 = "abcdefghijklmnopqrstuvwxyz";
	var str2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return CmnUtil.string.alterString(strSrc, str1, str2);
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : toLower()
 * 설 명 : 대문자를 소문자로 변환
 * 인자값 : String strSrc - 소스 문자열
 * 리 턴 : String - 소문자로 변환된 문자열
 * 사용법 : var strResult = toLower('ABC');
 * return 'abc'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.toLower = function(strSrc) {

	var str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var str2 = "abcdefghijklmnopqrstuvwxyz";
	return CmnUtil.string.alterString(strSrc, str1, str2);
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : removeComma()
 * 설 명 : 문자열에 포함된 ','를 제거
 * 인자값 : String strSrc - 소스 문자열
 * 리 턴 : String - ','가 제거된 문자열
 * 사용법 : var nResult = removeComma('123,456,789');
 * return '123456789'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.removeComma  = function(strSrc) {

	return strSrc.replace(/,/gi,"");

}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : removeFormat()
 * 설 명 : 문자열에 포함된 포멧문자 ", . - / :"를 제거
 * 인자값 : String strSrc - 소스 문자열
 * 리 턴 : String - ", . - / :"가 제거된 문자열
 * 사용법 : var nResult = removeComma('2005/03/12 12:24:00');
 * return '20050312 122400'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.removeFormat = function(strSrc) {

	return strSrc.replace(/(\,|\.|\-|\/|\:)/g,"");

}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : addComma()
 * 설 명 : 문자열에 포함된 ','를 제거
 * 인자값 : String strSrc - 소스 문자열
 * 리 턴 : String - ','가 생성된 문자열
 * 사용법 : var nResult = addComma('1234567.12');
 * return '1,234,567'
 * -----------------------------------------------------------------------------
 */

CmnUtil.string.addComma = function(strSrc) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;

	return strSrc.toString().replace(regexp,",");
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : isEmpty()
 * 설 명 : 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
 * 인자값 : String str - 소스 문자열
 * 리 턴 : true/ false
 * 사용법 :  isEmpty(str);
 * return true / false
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.isEmpty = function(str) {

	if(typeof str == "undefined" || str == null || str == "")
		return true;
	else
		return false ;
}

/**
 * -----------------------------------------------------------------------------
 * 함수명 : nullIsVal()
 * 설 명 : 문자열이 null 설정값(val)리턴 아닌경우 str리턴
 * 파라미터 : String str , val 체크할 string값
 * 리턴값  : val/ str
 * 사용법  : nullIsVal(str,val);
 * return str
 *
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.nullIsVal = function(str,val) {
	if(CmnUtil.string.isEmpty(str)) {
		if(CmnUtil.string.isEmpty(val)) {
			val = "";
		}
		return val;
	}
	return str;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : nvl()
 * 설 명 : 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * 인자값 : str  체크할 문자열
 * defaultSt  문자열이 비어있을경우 리턴할 기본 문자열
 * 리 턴 : String - null인 경우 변경할 문자열
 * 사용법 : nvl(null , '123');
 * return '123'
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.nvl = function(str, defaultStr) {

	if(typeof str == "undefined" || str == null || str == "")
		str = defaultStr ;

	return str ;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : trimNvl()
 * 설 명 : 기본적으로 공백을 삭제후 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * 인자값 : str  체크할 문자열
 * defaultSt  문자열이 비어있을경우 리턴할 기본 문자열
 * 리 턴 : String - null인 경우 변경할 문자열
 * 사용법 : nvl(null , '123');
 * return '123'
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.trimNvl = function(str, defaultStr) {

	str = CmnUtil.string.trim(str);

	if(typeof str == "undefined" || str == null || str == "")
		str = defaultStr ;

	return str ;
}


/**
 * -----------------------------------------------------------------------------
 * 문자열이 null 설정값(val)리턴 아닌경우 str리턴
 * 작성자  :
 * 작성일  : 2019-01-20
 * 파라미터 : type=(str, val)
 * 리턴값  : val, str
 * -----------------------------------------------------------------------------
 */
ComUtil.string.nullIsVal = function(str,val) {
	if(str == "" || str == undefined || str == null){
		if(val == "" || val == undefined || val == null){
			val = "";
		}
		return val;
	}
	return str;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : cmnCode()
 * 설 명 : 공통코드를 가져오는 함수
 * 인자값 : upperCode 상위코드값
 * detailCode  하위 코드값
 * 리 턴 : String - null인 경우 변경할 문자열
 * 사용법 : CmnUtil.string.cmnCode('7001','225351');
 * return 'code'
 * -----------------------------------------------------------------------------
 */
CmnUtil.string.cmnCode = function(upperCode, detailCode) {

	var rtnData = '';
	var rstData = {};
	rstData.comCodeVo = {};
	rstData.comCodeVo.upperCode = upperCode;
	rstData.comCodeVo.code = detailCode;
	var dfd = $.Deferred();
	ExecuteAjax.callPost('/selectComCodeOne.pwkjson', rstData, function(ret) {
		console.log(ret);
		 dfd.resolve(ret.comCodeVo.codeNm);
	});
	return dfd.promise();
}


/**
 *	html코드로 변환 (임시처리)
 *  by.김서경
 */
CmnUtil.string.conHtml = function(str) {
	str = String(str)
	str = str.replace(/&lt;/gi, "<");
	str = str.replace(/&gt;/gi, ">");
	str = str.replace(/&quot;/gi, '"');
	str = str.replace(/&nbsp;/gi, " ");
	str = str.replace(/&amp;/gi, "&");
	return str;
}

/**
 * xss 필터 
 * 작성자  :
 * 작성일  : 2020-06-18
 * 파라미터 : str  : [필수] 크로스사이트 스크립팅을 검사할 문자열
 *          level    : [옵션] 검사레벨
 *                      0 (기본) -> XSS취약한 문자 제거
 *                      1 (선택) -> 단순한 <, > 치환
 */
CmnUtil.string.xssHtml = function(str, level) {     
	if ( level == undefined || level == 0 ) {
		str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");		
	}
	else if (level != undefined && level == 1 ) {
		str = str.replace(/\</g, "&lt;");
		str = str.replace(/\>/g, "&gt;");
	}
  return str;
}

/**
 * strip Tag
 * 작성자  :
 * 작성일  : 2020-06-18
 * 파라미터 : str  : [필수] Tag가 포함된 문자열
 */
CmnUtil.string.stripTag = function(str) {     
	return str.replace(/(<([^>]+)>)/ig, "");
}

/**
 * json xss 필터 
 * 작성자  :
 * 작성일  : 2020-06-19
 * 파라미터 : json  : 치완할 json 데이터 
 */
CmnUtil.string.jsonFilter = function (json) {
	json = JSON.parse(JSON.stringify(json).split('&amp;').join('&'));
	json = JSON.parse(JSON.stringify(json).split('&lt;').join('<'));
	json = JSON.parse(JSON.stringify(json).split('&gt;').join('>'));
	json = JSON.parse(JSON.stringify(json).split('&quot;').join(''));

	return json;
}

/**
 * 0 ~ 1 사이의 임의의 난수를 발생시킨다.
 * @return {float} 0 ~ 1 사이 난수
 */
CmnUtil.string.getRandom = function() {
	var cObj = window.crypto || window.msCrypto;
	return cObj.getRandomValues(new Uint32Array(1))[0] / 4294967269;
};

/**
 * 문자열 앞쪽에 있는 0을 삭제한다.
 * @return {String} 0을 제거한 문자열
 */
CmnUtil.string.lTrimZero = function(val) {
	return val.replace(/(^0+)/, '');
};

/**
 * 조합형 한글 처리
 * @param param 표시할 조합형 한글
 */
CmnUtil.string.convertFont = function(param) {
	
	var contains = null;
	var obj = [];
	if (typeof param == 'string') {
		obj.push(param);
	} else {
		obj = param;
	}

	var conStr = '';
	for (var inx=0; inx<obj.length; inx++) {
		conStr += ':contains("' + obj[inx] + '"),';
	}
	contains = $(conStr.substring(0, conStr.length - 1));
	
	for (var inx=0; inx<contains.length; inx++) {
		var ele = $(contains[inx]);
		for (var knx=0; knx<obj.length; knx++) {
			if (ele[0].lastChild && ele[0].lastChild.data && ele[0].lastChild.data.indexOf(obj[knx]) > -1) {
				$(ele[0]).attr('style', 'font-family:"맑은 고딕", "Malgun Gothic", "Dotum", "돋움", "gulim", "굴림", Helvetica, sans-serif');
			}
		}
	}
};

/**
 *	숫자만 입력
 */
CmnUtil.string.wrcNumberOnly = function(){

	$('.wrcNumberOnly').on('blur keyup', function (e) {
	    if (!(e.keyCode >= 37 && e.keyCode <= 40)) {
	        var v = $(this).val();
	        $(this).val(v.replace(/[^0-9]/gi, ''));
	    }
	});
};

/** string 함수처리 end *****************************/

/*******************************************************************************
 * mask 함수의 영역
 *
 ******************************************************************************/
/**
 * ----------------------------------------------------------------------------
 * 함수명 : formatString()
 * 설 명 : 포멧 문자열 변환
 * 인자값 : String strSrc - 변환하고자 하는 문자열
 * String strFormat - 포멧형식
 * String strDelim - 포멧 구분자 문자
 * 리 턴 : String - 원하고자 하는 포멧으로 변환된 문자열
 * 사용법 : var strResult = formatString('20050512', '9999/99/99');
 * return ' 문 자 열'
 * -----------------------------------------------------------------------------
 */

CmnUtil.mask.formatString = function(strSrc,strFormat) {

	var retValue = "";
	var j = 0;
	for (var i=0; i< strSrc.length; i++) {
		retValue += strSrc.charAt(i);
		j++;
		if ( (j < strSrc.length && j < strFormat.length) && (strFormat.charAt(j) != "9" && strFormat.charAt(j).toLower != "x" && strFormat.charAt(j) != "#")) {
			retValue += strFormat.charAt(j++);
		}
	}
	return retValue;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : accountNo()
 * 설 명 : 카드번호 길이에 따라 자동으로 포멧팅
 * 인자값 : String str - 변환하고자 하는 문자열
 * 리 턴 : String - 원하고자 하는 포멧으로 변환된 문자열
 * 사용법 : var accountNo = CmnUtil.mask.accountNo('123412341234');
 * return ' 문 자 열'
 * -----------------------------------------------------------------------------
 */


CmnUtil.mask.accountNo = function(str) {

	var len = str.length;
	var rtnStr = "";

	if(len == 16) {
		rtnStr = CmnUtil.mask.formatString(chgStr , '9999-9999-9999-9999');

	}else if(len == "15") {
		rtnStr = CmnUtil.mask.formatString(str , '999-999999-99-999');

	}else if(len == "14") {
		rtnStr = CmnUtil.mask.formatString(str , '999-999999-99-999');

	}else if(len == "13") {
		rtnStr = CmnUtil.mask.formatString(str , '9999-999-999999');

	}else if(len == "12") {
		rtnStr = CmnUtil.mask.formatString(str , '999-99-999999');

	}else if(len == "11") {
		rtnStr = CmnUtil.mask.formatString(str , '999-99-999999');

	}else{
		rtnStr = str;

	}
	return rtnStr;
}

/**
 * 주소 마스킹
 * 숫자 * 처리
 */
CmnUtil.mask.mskAd = function(zip, ad1, ad2) {
	var ad = ad1 + " " + ad2;
	ad = zip + " " + ad.replace(new RegExp('(-?[0-9])','g'),"*");

	return ad;
}

/** mask 함수처리 end *****************************/

/*******************************************************************************
 * date 함수의 영역
 *
 ******************************************************/
/**
 * ----------------------------------------------------------------------------
 * 함수명 : svrToDate()
 * 설 명 : 서버의 날짜를 가져온다
 * 인자값 : svrTime을 호출하는 service 영역
 * 리 턴 : St - 서버의 시간
 * 사용법 : var time = ComUtil.date.svrToDate()
 * return st
 * -----------------------------------------------------------------------------
 */

ComUtil.date.svrToDate = function() {

	var st = ComUtil.date.svrTime();

	return st;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : svrTime()
 * 설 명 : 서버의 날짜/시간을 가져온다
 * 인자값 : svrToDate 구현제
 * 리 턴 : St - 서버의 시간
 * 사용법 : 절대 단독으로 사용하지 말것 ! 이놈은 구현체 입니다.
 * return xmlHttp 의 헤더
 * -----------------------------------------------------------------------------
 */

ComUtil.date.svrTime = function() {

	var xmlHttp;
	
	/*
	function srvTime(){
	    if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	        xmlHttp.open('HEAD',window.location.href.toString(),false);
	        xmlHttp.setRequestHeader("Content-Type", "text/html");
	        xmlHttp.send('');
	        return xmlHttp.getResponseHeader("Date");
	    }else if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
	        xmlHttp.open('HEAD',window.location.href.toString(),false);
	        xmlHttp.setRequestHeader("Content-Type", "text/html");
	        xmlHttp.send('');
	        return xmlHttp.getResponseHeader("Date");
	    }
	}
	*/
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : Timer()
 * 설 명 : 타이머를 적용한다.
 * 인자값 : Timer
 * 리 턴 : St - 서버의 시간
 * 사용법 : 절대 단독으로 사용하지 말것 ! 이놈은 구현체 입니다.
 * return xmlHttp 의 헤더
 * -----------------------------------------------------------------------------
 */
CmnUtil.date.Timer = function(elementName, minutes, seconds) {

	var element , endTime, hours , mins, msLeft, time;

	if(CmnUtil.date.timeOutId) clearTimeout(CmnUtil.date.timeOutId);

	function twoDigits(n) {

		return (n <= 9 ? "0" + n : n)
	}

	function updateTimer() {
		msLeft = endTime - (+new Date);
		if(msLeft < 1000) {
			$('#' +elementName).html('이 만료되었습니다.');
			lp.close("#accCert_cPopup");

		} else {
			time = new Date(msLeft);
			hours = time.getUTCHours();
			mins = time.getUTCMinutes();
			$('#'+ elementName).html((hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds()));
			CmnUtil.date.timeOutId= setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
		}

	}
	element = document.getElementById(elementName);
	endTime = (+new Date) + 1000 * ( 60*minutes + seconds) + 500;
	updateTimer();
}

CmnUtil.date.TimerPlus = function(elementName) {

	var element , endTime, hours , mins, msLeft, time;

	function twoDigits(n) {

		return (n <= 9 ? "0" + n : n)
	}

	function updateTimer() {
		msLeft = (+new Date) - new Date(sessStorage.getItemByKey('loginTime'));

		time = new Date(msLeft);
		hours = time.getUTCHours();
		mins = time.getUTCMinutes();
		$('#'+ elementName).html(' ' + (hours ? hours + '시간' + twoDigits(mins) : mins) + '분' + twoDigits(time.getUTCSeconds()) + '초');
		setTimeout(updateTimer, 1000);

	}
	element = document.getElementById(elementName);

	updateTimer();

}

/**
 * 오늘날짜 구하기
 * 작성자  :
 * 작성일  : 2020-02-10
 * 파라미터 :
 * 리턴값  : date
 */
CmnUtil.date.toDay = function(format)
{
	var times = ComUtil.date.svrToDate();
	var now = '';
	if(CmnUtil.string.isNull(format) == '')
	{
		now = moment(times).format('YYYYMMDD');
	}else{
		now = moment(times).format(format);
	}

	return now;

}

/**
 * 시작일과 종료일 벨리데이션 체크
 * 작성자  :
 * 작성일  : 2019-02-10
 * 파라미터 : str
 * 리턴값  : str
 */
CmnUtil.date.dateCprCheck = function(startDt, endDt, addMonth)
{
	var startDate 	= ComUtil.string.replaceAll(startDt, '.', '');
	var endDate 	= ComUtil.string.replaceAll(endDt, '.', '');

	if(CmnUtil.string.isNull(startDate) == '')
	{
		SysComm.modalMsgPop("시작일을 입력해 주세요");
		return false;
	}

	if(CmnUtil.string.isNull(endDate) == '')
	{
		SysComm.modalMsgPop("종료일을 입력해 주세요");
		return false;
	}

	if(startDate.length != 8)
	{
		SysComm.modalMsgPop("시작일을 정확히 입력해 주세요");
		return false;
	}

	if(endDate.length != 8)
	{
		SysComm.modalMsgPop("종료일을 정확히 입력해 주세요");
		return false;
	}


	var startDtArr  = new Array();
	startDtArr[0]  = startDate.substring(0, 4);
	startDtArr[1]  = startDate.substring(4, 6);
	startDtArr[2]  = startDate.substring(6, 8);

	var endDateArr  = new Array();
	endDateArr[0]  = endDate.substring(0, 4);
	endDateArr[1]  = endDate.substring(4, 6);
	endDateArr[2]  = endDate.substring(6, 8);

	var startDateComp 	= new Date(startDtArr[0], startDtArr[1], startDtArr[2]);
	var endDateComp 	= new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

	if(startDateComp.getTime() > endDateComp.getTime())
	{
		SysComm.modalMsgPop("시작일이 종료일보다 클 수 없습니다.");
		return false;
	}

	if(CmnUtil.string.isNull(addMonth) != '')
	{
		var addStartDt 		= moment(startDate).add(addMonth, 'month').format('YYYYMMDD');
		var addStartComp 	= new Date(addStartDt.substring(0,4), addStartDt.substring(4, 6), addStartDt.substring(6,8));

		if(endDateComp.getTime() >= addStartComp.getTime())
		{
			SysComm.modalMsgPop("조회기간이 "+addMonth+" 개월을 초과 할 수 없습니다.");
			return false;
		}
	}

	return true;

}

/**
 * 현재일부터 몇일전 구하기
 * 작성자  :
 * 작성일  : 2020-02-10
 * 파라미터 :
 * 리턴값  : date
 */

CmnUtil.date.preDay = function(days, format){

	if(CmnUtil.string.isNull(format) == ""){
		days = moment(CmnUtil.date.toDay('YYYYMMDD')).subtract(days, 'days').format('YYYY.MM.DD');
	}else{
		days = moment(CmnUtil.date.toDay('YYYYMMDD')).subtract(days, 'days').format(format);
	}

	return days;
}


/**
 * 현재일부터 몇개월전 구하기
 * 작성자  :
 * 작성일  : 2020-02-10
 * 파라미터 :
 * 리턴값  : date
 */
CmnUtil.date.prevMonth = function(month, format){

	if(CmnUtil.string.isNull(format) == ""){
		month, format = moment(moment(CmnUtil.date.toDay('YYYYMMDD')).format('YYYYMMDD')).subtract(month, 'month').format('YYYY.MM.DD');
	}else{
		month, format = moment(moment(CmnUtil.date.toDay('YYYYMMDD')).format('YYYYMMDD')).subtract(month, 'month').format(format);
	}
	return month, format;
}

/**
 * 현재일부터 몇일후 구하기
 * 작성자  :
 * 작성일  : 2020-02-10
 * 파라미터 :
 * 리턴값  : date
 */

CmnUtil.date.addDay = function(days, format){

	if(CmnUtil.string.isNull(format) == ""){
		days = moment(CmnUtil.date.toDay('YYYYMMDD')).add(days, 'days').format('YYYY.MM.DD');
	}else{
		days = moment(CmnUtil.date.toDay('YYYYMMDD')).add(days, 'days').format(format);
	}

	return days;
}


/**
* 현재일부터 몇개월 후 구하기
* 작성자  :
* 작성일  : 2020-02-10
* 파라미터 :
* 리턴값  : date
*/
CmnUtil.date.addMonth = function(month, format){

	if(CmnUtil.string.isNull(format) == ""){
		month, format = moment(moment(CmnUtil.date.toDay('YYYYMMDD')).format('YYYYMMDD')).add(month, 'month').format('YYYY.MM.DD');
	}else{
		month, format = moment(moment(CmnUtil.date.toDay('YYYYMMDD')).format('YYYYMMDD')).add(month, 'month').format(format);
	}
	return month, format;
}


/**
* 현재일부터 몇년 후 구하기
* 작성자  :
* 작성일  : 2020-03-23
* 파라미터 :
* 리턴값  : date
*/
CmnUtil.date.addYear = function(year, format){

	if(CmnUtil.string.isNull(format) == ""){
		year, format = moment(moment(CmnUtil.date.toDay('YYYYMMDD')).subtract(1, 'days').format('YYYYMMDD')).add(year, 'year').format('YYYY.MM.DD');
	}else{
		year, format = moment(moment(CmnUtil.date.toDay('YYYYMMDD')).subtract(1, 'days').format('YYYYMMDD')).add(year, 'year').format(format);
	}
	return year, format;
}

/**
 * 날짜비교
 * 작성자  :
 * 작성일  : 2020-02-10
 * 파라미터 :
 * 리턴값  : datejq
 */
CmnUtil.date.dateDiFF = function(startDt, endDt)
{
	if(CmnUtil.string.isNull(startDt) == '')
	{
		SysComm.modalMsgPop("시작 일자를 입력해 주세요.");
		return false;
	}
	if(CmnUtil.string.isNull(endDt) == '')
	{
		SysComm.modalMsgPop("종료 일자를 입력해 주세요.");
		return false;
	}
	var mt = moment(endDt,"YYYYMMDD").diff(moment(startDt,"YYYYMMDD"));

	if(mt >= 0)
	{
		return true;
	}else{
		return false;
	}
}

/**
 * 날짜형식체크
 * 작성일  : 2020-05-11
 */
CmnUtil.date.ymdDateFormat = function(sDate, retSpl)
{
	var retData = '';
	if ( !sDate ) return retData;
	sDate = sDate.replace(/[^0-9]/gi, '');
	var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/;
	var dtArray = sDate.match(rxDatePattern);
	var dtCheck = true;
	if ( dtArray && dtArray.length > 3 ) {
		dtYear = dtArray[1];
		dtMonth = dtArray[2];
		dtDay = dtArray[3];
		if ( dtMonth < 1 || dtMonth > 12 ) {
			dtCheck = false;
		} else if ( dtDay < 1 || dtDay > 31 ) {
			dtCheck = false;
		} else if ( (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31 ) {
			dtCheck = false;
		} else if ( dtMonth == 2 ) {
			var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
			if( dtDay > 29 || (dtDay == 29 && !isleap)) dtCheck = false;
		}
	} else retData = '';
	if ( dtCheck ) {
		try {
			if ( sDate.length == 8 ) retData = sDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1'+retSpl+'$2'+retSpl+'$3');
		} catch(e) {
			retData = '';
		}
	} else retData = '';
	return retData;
}

/** date 함수처리 end *****************************/


/*******************************************************************************
 * validate 함수의 영역
 *
 ******************************************************************************/

/**
 * ----------------------------------------------------------------------------
 * 함수명 : checkID()
 * 설 명 : ID의 형식을 체크 해준다.
 * 인자값 : str  -- str형식의 ID
 * defaultSt
 * 리 턴 : true / false
 * 사용법 : checkID(ID);
 * return true / fase
 * -----------------------------------------------------------------------------
 */
CmnUtil.validate.checkID = function(id) {
	var filter = /^[a-zA-Z0-9]{6,10}$/;
	if(id.match(filter)) {
		return false;
	}
	return true;
}

/** validate 함수처리 end *****************************/

/*******************************************************************************
 * ctr 함수의 영역
 *
 ******************************************************************************/

/**
 * 함수명 : keyParam
 * 설 명 : 키보드보안(키패드) 입력 필드에 대한 파라미터(VO) 생성
 * 인자값 : 보안키패드 Input ID
 * default : Form name = keyboardSecure
 *           inputList = input Attr중 data-tk-kbdType이 설정되어있는 모든 input
 * return : inputTarget : {}, transkeyParam : {}, e2eParam : {}
 * 사용법 : 보안키보드 적용 페이지내 아래 jsp include(필수)
 *        <jsp:include page="/WEB-INF/jsp/raonx/jsp/keyboardSecure.jsp" />
 * 		  보안키보드 적용 필드 Form태그 안으로 포함(Form name -> keyboardSecure 으로 추가(변경가능))
 *        각 업무 사용 VO에 inputTarget(type Map), transkeyParam(type Map), e2eParam(type Map) 추가
 *        CmnUtil.crt.keyParam() 호출하여 받은 Param 추가하여 Controller 호출
 *        * cmnSample.jsp 참고
 */
CmnUtil.crt.keyParam = function(input) {

	/*키패드 암호화 키 생성*/

	tk.fillEncData();

	/*Default값 셋팅 */
	var inputType = new Array();
	var inputList = new Array();

	if( !input ) {
		$('input').filter(function(i, e){
			if( $(e).data('tkKbdtype') ) {
				if( e.value != '' )	{
					if( e.value.indexOf('*') > -1 ){
						inputList.push(e.id);
						inputType.push('keypad');
					}else {
						inputList.push(e.name);
						inputType.push('keyboard');
					}
				}
			}
		});
	}else {
		input.filter(function(i, e){
			if( $(e).data('tkKbdtype') ) {
				if( e.value != '' )	{
					if( e.value.indexOf('*') > -1 ){
						inputList.push(e.id);
						inputType.push('keypad');
					}else {
						inputList.push(e.name);
						inputType.push('keyboard');
					}
				}
			}
		});
	}

	var transkeyParam = {};
	var inputTarget	= {};
	var e2eParam	= {
			__E2E_RESULT__ : $('[name=__E2E_RESULT__]').val()
		,	__E2E_UNIQUE__ : $('[name=__E2E_UNIQUE__]').val()
	};
	transkeyParam['transkeyUuid'] = $('#transkeyUuid').val();

	$.each(inputList, function(i){
		if( inputType[i] == 'keypad' ){
			inputTarget[inputList[i]] = $('#' + inputList[i]).val();
			transkeyParam[inputList[i]]	= $('#' + inputList[i]).val();
			transkeyParam['transkey_' + inputList[i]] 		= $('#transkey_' + inputList[i]).val();
			transkeyParam['transkey_HM_' + inputList[i]] 	= $('#transkey_HM_' + inputList[i]).val();
		} else {
			inputTarget[inputList[i]] = $('[name=' + inputList[i]+']').val();
			e2eParam[inputList[i]] = $('[name=' + inputList[i]+']').val();
			e2eParam[inputList[i] + '__E2E__'] = $('[name=' + inputList[i] + '__E2E__]').val();
		}
	})
	/* 키보드보안 암호화 생성키 셋팅*/
	/* var e2eParam = npPfsCtrl.toJson(document[form]); */

	var param = {
			inputTarget		: inputTarget
		,	transkeyParam 	: transkeyParam
		,	e2eParam		: JSON.parse(JSON.stringify(e2eParam))
	}

	return param;
}

/**
 * 함수명 : checkPwd()
 * 설 명 : 비밀번호 검증
 * 인자값 : 비교할 inputPassword (id pwdChk1, pwdChk2) <-- 고정
 * 리 턴 : 오류시 Alert , 정상일시 콜백 호출
 * 사용법 : CmnUtil.crt.checkPwd(callback)
 */
CmnUtil.crt.checkPwd = function(callBack, input){

	var param = {
			commonParamVo : {}
	}
	var keyParam = input ? CmnUtil.crt.keyParam(input) : CmnUtil.crt.keyParam();
	param.commonParamVo = $.extend(param.commonParamVo, keyParam);
	//param.init = Math.random();
	param.init = CmnUtil.string.getRandom();
	
	/*CommonServiceController*/
	ExecuteAjax.callBgPost('/PwdCheck.pwkjson', param, function(data) {
		callBack(data);
	})
}

/**
 * 함수명 : getPwdByEspiderEnc()
 * 설 명 : 희남 스크래핑 모듈로 암호화하여 인증서 비밀번호 가져오기
 * 인자값 : input 보안키패드에서 입력받은 데이터
 * 리 턴 : 오류시 Alert , 정상일시 콜백 호출
 * 사용법 : CmnUtil.crt.getPwdByEspiderEnc(callback)
 */
CmnUtil.crt.getPwdByEspiderEnc = function(callBack, input){

	var param = {
			commonParamVo : {}
	}
	var keyParam = input ? CmnUtil.crt.keyParam(input) : CmnUtil.crt.keyParam();
	param.commonParamVo = $.extend(param.commonParamVo, keyParam);
	//param.init = Math.random();
	param.init = CmnUtil.string.getRandom();
	
	/*CommonServiceController*/
	ExecuteAjax.callBgPost('/yh2/cmn/getPwdByEspiderEnc.pwkjson', param, function(data) {
		callBack(data);
	})
}

/**
 * 함수명 : checkPwd()
 * 설 명 : 카드비밀번호 검증
 * 인자값 : 비교할 inputPassword (id pwdChk1, pwdChk2) <-- 고정
 * 리 턴 : 오류시 Alert , 정상일시 콜백 호출
 * 사용법 : CmnUtil.crt.checkPwd(callback)
 */
CmnUtil.crt.checkCardPwd = function(callBack, input){
	var param = {
			commonParamVo : {}
	}
	var stlActNo = $('#stlacNo14').val() || '';
	if( '' !=  stlActNo ) param.commonParamVo['stlActNo'] = stlActNo;
	var keyParam = input ? CmnUtil.crt.keyParam(input) : CmnUtil.crt.keyParam();
	param.commonParamVo = $.extend(param.commonParamVo, keyParam);
	
	/* CommonServiceController */
	ExecuteAjax.callPost('/CardPwdCheck.pwkjson', param, function(data) {
		callBack(data);
	})
}

/**
 * 금융인증서 인증 호출
 * @param orgParam 서명원문에 추가할 내용 (개인정보가 있을 경우 제3자 제공 동의 필요함)
 * @param callback Success Callback
 * @param errorCallback Error Callback
 */
CmnUtil.crt.FinCertSign = function(orgParam, callback, errorCallback, signType) {

	if ($.trim(useFinCert) != '' && $.trim(useFinCert) != 'Y') {
		SysComm.modalMsgPop(useFinCert);
		return;
	}
	
	if (!signType || signType == '') signType = '99';
	
	var sign = function(nonce) { 
		
		if (orgParam == null || typeof orgParam != 'object') orgParam = {};
		orgParam.nonce = nonce;
		
		var param = {};
		param.signFormat = {};
		param.signFormat.type = 'CMS';
		param.signFormat.CMSInfo = {};
		param.signFormat.CMSInfo.includeR = true;
		
		param.content = {};
		param.content.plainText = {};
		param.content.plainText.plainTexts = [orgParam];
		param.content.plainText.encoding = 'UTF-8';
		param.algorithms = 'RSASSA-PKCS1-v1_5_SHA256';
		param.view = {};
		param.view.lastAccessCert = false;
//		param.view.oid = {
//			'1.2.410.200005.1.1.1.10': true
//		};
		param.view.enableTextView = false;
		param.info = {};
		param.info.signType = signType;
		param.success = function(data) {
			CmnUtil.crt.tmpData = data;
			if (callback && typeof callback == 'function') callback(data);
		};
		param.fail = function(error) {
			if (error.code == 800000) {
				SysComm.modalMsgPop('금융인증서 선택을 취소하였습니다.');
			} else {
				if (errorCallback && typeof errorCallback == 'function') {
					errorCallback(); 
				} else {
					SysComm.modalMsgPop('금융인증서 전자서명에 실패했습니다.');
				}
			}
		};
		FinCert.Sdk.sign(param);
	};
	
	var nonceInput = {};
	ExecuteAjax.callPost('/crt/getFinSignNonce.pwkjson', nonceInput, function(data) {
		var initParam = {};
		initParam.orgCode = (runServerMode == 'true') ? 'RF20400000' : 'DF20400000';
		initParam.apiKey = (runServerMode == 'true') ? '9b913d54-59b5-45a6-951e-a41490303c95' : 'ad05cbce-a6a1-49ea-9b5d-f2aafe373ab6';
		initParam.lang = 'kor';
		initParam.success = function() {
			sign(data.nonce);
		};
		initParam.fail = function(error) {
			if (errorCallback && typeof errorCallback == 'function') {
				errorCallback();
			} else {
				SysComm.modalMsgPop('금융인증서 전자서명에 실패했습니다.');
			}
		};
		FinCert.Sdk.init(initParam);
	}, function(error) {
		SysComm.modalMsgPop('금융인증서 호출에 실패하였습니다.');
	});
};


/**
 * ----------------------------------------------------------------------------
 * 함수명 : checkNum()
 * 설 명 : 숫자인지를 체크 해준다.
 * 인자값 : str -- 숫자 문자
 * defaultSt
 * 리 턴 : true / false
 * 사용법 : checkNum(str);
 * return true / fase
 * -----------------------------------------------------------------------------
 */
CmnUtil.validate.checkNum = function(str) {
	var regexp = /^[0-9]*$/;
	if(!regexp.test(str)) {
		return false;
	}
	return true;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : checkHanGul()
 * 설 명 : 한글만 적으세요.
 * 인자값 : str -- 숫자 문자
 * defaultSt
 * 리 턴 : true / false
 * 사용법 : checkNum(str);
 * return true / fase
 * -----------------------------------------------------------------------------
 */
CmnUtil.validate.checkHanGul = function(str) {
	var regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힇]/gi;
	if(!regexp.test(str)) {
		return false;
	}
	return true;
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : checkEng()
 * 설 명 : 영문만 적으세요.
 * 인자값 : str -- 숫자 문자
 * defaultSt
 * 리 턴 : true / false
 * 사용법 : checkNum(str);
 * return true / fase
 * -----------------------------------------------------------------------------
 */
CmnUtil.validate.checkEng = function(str) {
	var regexp = /[a-z|A-Z]/gi;
	if(!regexp.test(str)) {
		return false;
	}
	return true;
}


/**
* ----------------------------------------------------------------------------
* 함수명 : checkHanGulEng()
* 설 명 : 영문만 적으세요.
* 인자값 : str -- 숫자 문자
* defaultSt
* 리 턴 : true / false
* 사용법 : checkNum(str);
* return true / fase
* -----------------------------------------------------------------------------
*/
CmnUtil.validate.checkHanGulEng = function(str) {
	var regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힇|a-z|A-Z]/gi;
	if(!regexp.test(str)) {
		return false;
	}
	return true;
}

/**
* ----------------------------------------------------------------------------
* 함수명 : checkHanEngNum()
* 설 명 : 한글/영어/숫자.
* 인자값 : str -- 숫자 문자
* defaultSt
* 리 턴 : true / false
* 사용법 : checkNum(str);
* return true / fase
* -----------------------------------------------------------------------------
*/
CmnUtil.validate.checkHanEngNum = function(str) {
	var regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힇|a-z|A-Z|0-9]/gi;
	if(!regexp.test(str)) {
		return false;
	}
	return true;
}

/** crt 함수처리 end *****************************/


/**
* ----------------------------------------------------------------------------
* 함수명 : forbidBack(url)
* 설 명 : 브라우저 백버튼을 막는 함수
* 인자값 : url - 원하는 페이지로 이동시킴. url이 없는경우 메인페이지로 이동
* defaultSt
* 리 턴 :
* 사용법 : CmnUtil.validate.forbidBack(url);
* -----------------------------------------------------------------------------
*/
CmnUtil.validate.forbidBack = function(url){
	history.pushState(null, null, location.href);
	window.onpopstate = function(){
	    history.go(1);
	    SysComm.modalMsgPop("정상완료 된 화면에서 브라우저의 뒤로가기 버튼사용이 불가능 합니다.", function() {
	        if(url == '' || url == undefined){
	        	SysComm.moveLocation('/main.do');
	        } else {
	        	SysComm.moveLocation(url);
	        }
	    });
	}
}



/** data 함수처리 start *****************************/



/**
 * ----------------------------------------------------------------------------
 * 함수명 : getCardList()
 * 설 명 : 보유카드현황 리스트조회.
 * 인자값 : 없음
 * defaultSt
 * 리 턴 : 로그인후 세션에 있는 카드리스트를 불러온다
 * 사용법 : CmnUtil.data.getCardList(function(data){ data = 카드리스트 });
 * return JsonMap
 * -----------------------------------------------------------------------------
 */
CmnUtil.data.getCardList = function(callBack) {
	ExecuteAjax.callGet('/GetCardList.pwkjson', {}, function(data) {
		callBack(data);
	})
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : chkSvcTime()
 * 설 명 : 서비스 시간 체크 조회
 * 인자값 : 없음
 * defaultSt
 * 리 턴 : 서비스 시간을 체크한다.
 * 사용법 : CmnUtil.data.chkSvcTime(function(data){ data = 카드리스트 });
 * return JsonMap
 * -----------------------------------------------------------------------------
 */
CmnUtil.data.chkSvcTime = function(url,callBack) {

	var reqJson = {};
	reqJson.svcChkVo = {};
	reqJson.svcChkVo.url = url;

	ExecuteAjax.callGet('/chkSvcTime.pwkjson', reqJson , function(data) {
		callBack(data);
	})
}

/**
 * ----------------------------------------------------------------------------
 * 함수명 : chkBizDate()
 * 설 명 : 영업일 체크
 * 인자값 : 없음
 * defaultSt
 * 리 턴 : 영업일을 체크 한다.
 * 사용법 : CmnUtil.data.chkBizDate(날짜);
 * return JsonMap
 * -----------------------------------------------------------------------------
 */
CmnUtil.data.chkBizDate = function(hlyRgsDt,callBack) {

	var reqJson = {};
	reqJson.bizChkVo = {};
	reqJson.bizChkVo.hlyRgsDt = hlyRgsDt;

	ExecuteAjax.callPost('/chkBizDate.pwkjson', reqJson, function(data) {

		callBack(data);
	});
}

function XSS_Check(strTemp, level) {     
	  if ( level == undefined || level == 0 ) {
	    strTemp = strTemp.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");		
	  }
	  else if (level != undefined && level == 1 ) {
	    strTemp = strTemp.replace(/\</g, "&lt;");
	    strTemp = strTemp.replace(/\>/g, "&gt;");
	  }
	  return strTemp;
	}

//로그인 화면 후 리다이렉트
CmnUtil.login.reDirect = function(gubun, url) {
	sessStorage.setItemByKey('loginRedirect', url);
	if( 'yh1' == gubun ) {
		SysComm.moveLocation('/yh1/mmb/mmb01/H1MMB201S00.do');
	} else {
		SysComm.moveLocation('/yh2/bmm/bmm01/H2BMM201S01.do');
	}
}


CmnUtil.login.textKey = function(keyWord,callBack) {

	var reqJson = {};
	reqJson.searchVo = {};
	reqJson.searchVo.searchTerm = keyWord;

	ExecuteAjax.callBgPost('/autoKeyWord.pwkjson', reqJson, function(resdata){

		callBack(resdata);

	});

}

/** data 함수처리 end *****************************/


// START :: 약관 처리
CmnUtil.term.chkAllStplat = function() {

    var chkTermAll = $('input:checkbox[id=chkTermsAll]').is(':checked');
    
    if (chkTermAll) {
    	$('input:checkbox[name=cmmChkTermsGroup1]').prop('checked', true);
    } else {
    	$('input:checkbox[name=cmmChkTermsGroup1]').prop('checked', false);
    }
};

CmnUtil.term.chkEachStplat = function(thisObj, ess) {

    var chkTermAll = $('input:checkbox[id=chkTermsAll]').is(':checked');

    var chkTermAllLen = $('input:checkbox[name=cmmChkTermsGroup1]').length;
    var chkedTermLen = $('input:checkbox[name=cmmChkTermsGroup1]:checked').length;

    if (chkTermAllLen == chkedTermLen) {
    	$('#chkTermsAll').prop('checked', true);
    } else {
    	$('#chkTermsAll').prop('checked', false);
    }
};

CmnUtil.term.chkAllStplat2 = function() {
	
	var chkTermAll = $('input:checkbox[id=chkTermsAll]').is(':checked');

	if (chkTermAll) {
		$('input:checkbox[name^=chkGroup]').prop('checked', true).change();
	} else {
		$('input:checkbox[name^=chkGroup]').prop('checked', false).change();
	}
};

CmnUtil.term.chk2StepStplat = function(indexNo) {

	var chkTermAll = $('input:checkbox[id=chkTermsAll]').is(':checked');
	var chkTermAllLen = $('input:checkbox[id^=chkArg]').length;
	var chkedTermLen = $('input:checkbox[id^=chkArg]:checked').length;

	if (chkTermAllLen == chkedTermLen) {
		$('#chkTermsAll').prop('checked', true).change();
	} else {
		$('#chkTermsAll').prop('checked', false).change();
	}

	var chkTermAllLen2 = $('input:checkbox[id^=chkArg' + indexNo + ']').length;
	var chkedTermLen2 = $('input:checkbox[id^=chkArg' + indexNo + ']:checked').length;
	if (chkTermAllLen2 == chkedTermLen2) {
		$('input:checkbox[id=chkHead' + indexNo + ']').prop('checked', true);
	} else {
		$('input:checkbox[id=chkHead' + indexNo + ']').prop('checked', false);
	}
};

CmnUtil.term.stplatDtlPop = function(titId, cnId) {

	sessStorage.setItemByKey('argTitId', titId);
	sessStorage.setItemByKey('argCnId', cnId);
	lp.open('/dcpc/yh1/car/car02/H1CAR102P10.do','', '/dcpc/js/yh1/car/car02/H1CAR102P10.js','');
};

CmnUtil.term.chkEachStplat2 = function(indexNo) {

	var chkTermAll = $('input:checkbox[id=chkTermsAll]').is(':checked');
	var chkTermAllLen = $('input:checkbox[id^=chkArg]').length;
	var chkedTermLen = $('input:checkbox[id^=chkArg]:checked').length;

	if (chkTermAllLen == chkedTermLen) {
		$('#chkTermsAll').prop('checked', true).change();
	} else {
		$('#chkTermsAll').prop('checked', false).change();
	}

	var chkTermAllLen2 = $('input:checkbox[id^=chkArg' + indexNo + ']').length;
	var chkedTermLen2 = $('input:checkbox[id^=chkArg' + indexNo + ']:checked').length;
	if (chkTermAllLen2 == chkedTermLen2) {
		$('input:checkbox[id=chkHead' + indexNo + ']').prop('checked', true);
	} else {
		$('input:checkbox[id=chkHead' + indexNo + ']').prop('checked', false);
	}
};

CmnUtil.term.isChkEssntlStplat = function() {
	
    var chkTermsGroup1 = $('input:checkbox[name=cmmChkTermsGroup1]');
    var resultChk = 'Y';
    var returnObj = {};

    $.each(chkTermsGroup1, function(index, item) {
		if($(this).data('essntlat') == 'Y' && !$(this).is(':checked')) {
		    SysComm.modalMsgPop($(this).parent().children('label').text().replace(/\s+/g,'') + '에 동의하세요.');
		    resultChk = 'N';
		    return false;
	
		}

		returnObj['id_'+$(this).parents('li').attr('id')] = $(this).is(':checked');
    });

    if (resultChk == 'Y') {
    	returnObj.result = 'Y';
    } else {
    	returnObj.result = 'N';
    }

    return returnObj;
}

CmnUtil.term.isChkEssntlStplat2 = function() {
	
	var chkTermsGroup = $('input:checkbox[name^=chkGroup]');
	var resultChk = 'Y';
	var returnObj = {};

	$.each(chkTermsGroup, function(index, item) {

		if($(this).data('essntlat') == 'Y' && !$(this).is(':checked')) {
			SysComm.modalMsgPop($(this).parent().children('label').text().replace(/\s+/g,'') + '에 동의하세요.');
			resultChk = 'N';
			return false;
		}
	});

	if (resultChk == 'Y') {
		returnObj.result = 'Y';
	} else {
		returnObj.result = 'N';
	}

	return returnObj;
}

CmnUtil.term.chkAllStplatComp = function(obj) {

	var root = $(obj).closest('.termsWrap');
    var chkTermAll = $(root.find('.chkTermsAll')).is(':checked');
    
    if (chkTermAll) {
    	$(root.find('input:checkbox[name=cmmChkTermsGroup1]')).prop('checked', true);
    } else {
    	$(root.find('input:checkbox[name=cmmChkTermsGroup1]')).prop('checked', false);
    }
};

CmnUtil.term.chkEachStplatComp = function(obj, ess) {
	
	var root = $(obj).closest('.termsWrap');
    var chkTermAll = $(root.find('.chkTermsAll')).is(':checked');

    var chkTermAllLen = $(root.find('input:checkbox[name=cmmChkTermsGroup1]')).length;
    var chkedTermLen = $(root.find('input:checkbox[name=cmmChkTermsGroup1]:checked')).length;

    if (chkTermAllLen == chkedTermLen) {
    	$(root.find('.chkTermsAll')).prop('checked', true);
    } else {
    	$(root.find('.chkTermsAll')).prop('checked', false);
    }
};

CmnUtil.term.isChkEssntlStplatComp = function() {
	
	var termBoxs = $('.termsWrap').find('input:checkbox[name=cmmChkTermsGroup1]');
	
	var resultChk = 'Y';
    var returnObj = {};
    
	$.each(termBoxs, function(inx, v) {	
		var chkGrp1 = $(v);
		
		$.each(chkGrp1, function(jnx, obj) {
			if($(this).data('essntlat') == 'Y' && !$(this).is(':checked')) {
			    SysComm.modalMsgPop($(this).parent().children('label').text().replace(/\s+/g,'') + '에 동의하세요.');
			    resultChk = 'N';
			    return false;
			}
			
			returnObj['id_'+$(this).parents('li').attr('id')] = $(this).is(':checked');
		});
	});


    if (resultChk == 'Y') {
    	returnObj.result = 'Y';
    } else {
    	returnObj.result = 'N';
    }

    return returnObj;
};

CmnUtil.term.isChkEssntlConsumer = function(dscd, callback) {
	
	var radioBox = ['loanUsage','yearIncome', 'debt', 'overdueYn', 'creditScore', 'liquidation' ,'assets', 'understand', 'consumerAgree'];
	
	//카드론
	if(dscd == '1') {
		radioBox = ['loanUsage','yearIncome', 'debt', 'creditScore', 'assets', 'consumerAgree', 'fixedExpd'];
	}
	//신용대출
	if(dscd == '2') {
		radioBox = ['loanUsage','yearIncome', 'debt', 'creditScore', 'liquidation', 'assets', 'fixedExpd' , 'consumerAgree'];
	}
	//자동차
	if(dscd == '3') {
		radioBox = ['loanUsage','yearIncome', 'debt', 'creditScore', 'liquidation', 'assets', 'fixedExpd', 'consumerAgree'];
	}
	
	var dscd = dscd;
	for(var i = 0; i < radioBox.length; i++) {
		var title = $("#"+radioBox[i]+"_title").text();		
		
		if(CmnUtil.term.isRdoChk(radioBox[i])){
			var selectVal = $("label[for='"+$("input:radio[name="+radioBox[i]+"]:checked").attr("id")+"']").text();		
			$("#"+radioBox[i]+"_confirm").text(selectVal);
			$("#"+radioBox[i]+"_confirmTr").show();
			if(dscd == '1') {
				$('#consumerAge_confirm').text($('#consumerAge').parent().text());
				$('#liquidation_confirm').text($('#liquidation').parent().text());
			}else if(dscd == '2'){
				$('#consumerAge_confirm').text($('#consumerAge').parent().text());
			}else if(dscd == '3') {
				$('#consumerAge_confirm').text($('#consumerAge').parent().text());
			}
		}else{
			if(radioBox[i] == 'consumerAgree'){
				SysComm.modalMsgPop("적합성 관련 동의 사항은 필수항목입니다.");
			}else{
				if(dscd == '1' || dscd == '2') {
					$('input:radio[name="consumerAgree"]').prop('checked', false);
				}
				SysComm.modalMsgPop("["+title+"]는 필수항목입니다.");
			}
			return;
		}
	}

	/*
	 * 업무구분 (1-카드론, 2-신용대출, 3-자동차)
	 */
	if(dscd == '1'){
		if($("input:radio[name=creditScore]:checked").val() == '1'){
			$('#resultText').html("<span class='pointC2'><em>부적합함</em></span>");
			$('#rejectText').html("사유 : 신용점수 300점 이하으로 확인되었습니다.");
			$('#rejectText').show();
			$('#consumerPopConfirm').hide();
			$('#btn_productPopReCheck').show();
			$('#btn_productPopGoMain').show();
		}else{
			$("#resultText").html("<span class='pointC1'><em>적합함</em></span>");
			$('#rejectText').hide();
			$('#consumerPopConfirm').show();
			$('#btn_productPopReCheck').hide();
			$('#btn_productPopGoMain').hide();
		}
		$('#consumerPopConfirm').off("click").on('click', callback);
		lp.open('#consumerResultPop');
	}else if(dscd == '2'){
		
		if($("input:radio[name=creditScore]:checked").val() == '10'){
			$("#resultText").html("<span class='pointC2'><em>부적합함</em></span>");
			$('#rejectText').html("사유 : 신용점수 300점 이하으로 확인되었습니다.");
			$('#rejectText').show();

			$('#consumerPopConfirm').hide();
			$('#btn_productPopReCheck').show();
			$('#btn_productPopGoMain').show();
		}else{
			$("#resultText").html("<span class='pointC1'><em>적합함</em></span>");
			$('#rejectText').hide();
			
			$('#consumerPopConfirm').show();
			$('#btn_productPopReCheck').hide();
			$('#btn_productPopGoMain').hide();
		}
		$('#consumerPopConfirm').off("click").on('click', callback);
		lp.open('#consumerResultPop');
		
	}else if(dscd == '3'){
		$('#consumerResultPop .titH1').text('적합성원칙 내용 안내')
		$('#consumerResultPop .popInner .desc.pb10').text('신청하신 적합성원칙 내용 안내드립니다.')

		$('.userMsg').hide();
		
		$('#consumerPopConfirm').off("click").on('click', callback);
		lp.open('#consumerResultPop');
	}
}
	
CmnUtil.term.isRdoChk = function(name)
{
	if(CmnUtil.string.isEmpty($("input:radio[name="+name+"]:checked").val())){
		return false;
	}else{
		return true;
	}
}


/**
 * 신정법 약관
 * 전체선택
 */
CmnUtil.term.chkTermsAll = function() {
	
	if($('#chkTermsAll').is(":checked")) {
		$("#termsList input:checkbox[name='chkHeadGroup']").prop('checked', true);
		$("#termsList input:radio[data-type='true']").prop('checked', true);	
		$("#termsList input:checkbox[data-stplatClGroup=chkArgGroup]").prop('checked', true);
		
		//혜택정보 수신동의 약관펼침
		$('#stplatArea115').addClass('on');
		$('#stplatArea115 .accoBody').show();
		$('#stplatArea116').addClass('on');
		$('#stplatArea116 .accoBody').show();
		
		//자동차 선택약관 펼침
		$('#stplatArea111').addClass('on');
		$('#stplatArea111 .accoBody').show();
		
		//신용대출 선택약관 펼침
		$('#stplatArea113').addClass('on');
		$('#stplatArea113 .accoBody').show();
		
	}else{
		$("#termsList input:checkbox").prop("checked", false);
		$("#termsList input:radio[data-type=false]").prop("checked", true);
	}

};


/**
 * 신정법 약관
 * 그룹약관 선택
 */
CmnUtil.term.chkTermsGrp = function(stplatClCode){

	var isChkGrpTerm = $("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").is(":checked");
	
	//  1) 그룹약관 체크여부
	if(isChkGrpTerm){
		// - 개별약관 모두 체크박스 체크
		$("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]").prop("checked", true);
		$("#termsList input:checkbox[data-stplatClGroup=chkArgGroup][data-stplatClCode="+ stplatClCode +"]").prop('checked', true);
	}
	else{
		// - 개별약관 모두 체크박스 체크 해제
		$("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=false]").prop("checked", true);
		$("#termsList input:checkbox[data-stplatClGroup=chkArgGroup][data-stplatClCode="+ stplatClCode +"]").prop('checked', false);
	}

	CmnUtil.term.chkTermsEach();
};

/**
 * 신정법 약관
 * 개별약관 동의 클릭
 */
CmnUtil.term.chkTermsEach = function(element){
	
	//세부약관 버튼 클릭시
	if(element){
		var type 				= element.dataset.type
		var stplatClCode 		= element.dataset.stplatclcode
		var stplatCtgrySnCode 	= element.dataset.stplatctgrysncode
			
		//상세약관 그룹 동시 선택/해지
		$("#termsList input:radio[data-stplatCtgrySnCode="+ stplatCtgrySnCode +"][data-type="+ type +"]").prop("checked", true);
		
		//자동차 이용동의 수집 관련 처리
		if (stplatCtgrySnCode == '440' || stplatCtgrySnCode == '441') {
			if ($("#termsList input:radio[data-stplatCtgrySnCode=440][data-type=false]").prop('checked') && $("#termsList input:radio[data-stplatCtgrySnCode=441][data-type=false]").prop('checked')) {
				$("#termsList input:radio[data-stplatCtgrySnCode=442][data-type=false]").prop('checked',true);
				$('input:checkbox[name=advMnsGroupAll]').prop('checked',false);
				$('input:checkbox[name=advMnsGroup]').prop('checked',false);
			}
		}
		
		if (stplatCtgrySnCode == '453' || stplatCtgrySnCode == '454') {
			if ($("#termsList input:radio[data-stplatCtgrySnCode=453][data-type=false]").prop('checked') && $("#termsList input:radio[data-stplatCtgrySnCode=454][data-type=false]").prop('checked')) {
				$("#termsList input:radio[data-stplatCtgrySnCode=455][data-type=false]").prop('checked',true);
				$('input:checkbox[name=advMnsGroupAll]').prop('checked',false);
				$('input:checkbox[name=advMnsGroup]').prop('checked',false);
			}
		}
		//중분류 체크 해지/선택 처리
		var chkTermRadioAllLen2 = $("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]").length;
		var chkedTermRadioLen2 = $("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]:checked").length;

		if (chkTermRadioAllLen2 == chkedTermRadioLen2) {
			$("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").prop("checked", true);
		}else {
			$("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").prop("checked", false);
		}
	}
	
	// 1. 변수 선언 및 초기화
	// 전체약관
	var chkTermAll = $("#termsList input:checkbox[id=chkTermsAll]").is(":checked");

	//약관그룹 체크박스
	var chkTermBoxAllLen = $("#termsList input:checkbox[name=chkHeadGroup]").length;
	var chkedTerBoxmLen = $("#termsList input:checkbox[name=chkHeadGroup]:checked").length;

	//약관세부 라디오박스
	var chkTermRadioAllLen = $("#termsList input:radio[data-type=true]").length;
	var chkedTermRadioLen = $("#termsList input:radio[data-type=true]:checked").length;

	// 2. 전체동의체크박스 체크  처리
	//  1) 전체동의 체크여부
	if(chkTermBoxAllLen == chkedTerBoxmLen && chkTermRadioAllLen == chkedTermRadioLen) {
		//  2) 전체동의 체크 처리
		$("#chkTermsAll").prop("checked", true);
	}else{
		//  3) 전체동의 해제 처리
		$("#chkTermsAll").prop("checked", false);
	}

};

/**
 * 신정법 약관
 * 요약/전체동의서 탭 클릭
 */
CmnUtil.term.termsTab = function(e){

	if($(e).attr('data-type')== 'summary'){
		$(e).closest('.accoItem').find('.wrcstSummary').show();
		$(e).closest('.accoItem').find('.wrcstFull').hide();		
		
	}else if($(e).attr('data-type')== 'full'){
		$(e).closest('.accoItem').find('.wrcstSummary').hide();
		$(e).closest('.accoItem').find('.wrcstFull').show();
	}
};


/**
 * 신정법 약관
 * 약관 동의태그 등급표시
 */
CmnUtil.term.termRankColor = function(e){

	$("#termsList .infoUseRankWrap").show();
    $('#termsList .infoUseRankWrap ul li').each(function () {
        if($(this).hasClass('active')){
            var rankClass   = $(this).attr('data-rank');
            var rnakNm      = $(this).text();

            $(this).closest('.termsContentWrap').find('span.rankLabel').addClass(rankClass);
            $(this).closest('.termsContentWrap').find('span.rankLabel').html(rnakNm);
            $(this).closest('.termsContentWrap').find('span.rankLabel').parent().show();
        }
    });
	
};



/**
 * 카드신청용
 * 신정법 약관
 * 공토코드
 * termsList : 약관리스트
 * resultJson : 7914전문 상품별 약관
 * type : 1(카드신청), 2(간편신청)
 * 
 */
CmnUtil.term.makeCrdTerms = function(termsList, resultJson, type){

    var stplatClCode    = '';
    var termsHtml       = '';
    var headNo          = 0;

    $.each(termsList, function(index,item) {
        if(stplatClCode != item.stplatClCode) {
            headNo++;

            //약관그룹 종료
            if( index != 0) {
                termsHtml += '      </div>';        //END 약관 BODY 처리(.termsBody)
                termsHtml += '    </div>';          //END 약관그룹 Body 아코디언 content 영역(.accoBody)
                termsHtml += '</li>';               //END 약관그룹    
            }
            
            var essntlAt = 'N';
			if(item.essntlAt == 'Y' || (sessStorage.getItemByKey('isuDisCd1') == 'A'  && item.stplatClCode == '303')) {
				essntlAt = 'Y';
			}

            //약관그룹 시작
            //START 약관그룹
            termsHtml += '    <li id="stplatArea'+item.stplatClCode+'">';
            termsHtml += '        <div class="accoHead">';
            termsHtml += '            <input type="checkbox" class="ipt chkHead" name="chkHeadGroup" id="chkHead'+headNo+'" value="'+item.stplatClCode+'" data-stplatClGroup="chkHeadGroup" data-stplatClCode="'+item.stplatClCode+'" data-essntlAt="'+essntlAt+'" data-stplatClNm="'+item.stplatClNm+'" data-stplatClNmDc="'+item.stplatClNmDc+'" onclick="javascript:CmnUtil.term.chkCrdTermsGrp('+type+','+item.stplatClCode+');" >';

            //전문에서 가져온 약관내용
            if(item.stplatClCode == '74') {
                termsHtml += '        <label for="chkHead'+headNo+'">개인(신용)정보 필수적 제공에 관한 사항 (상품 서비스 제공)<span> (필수)</span></label>';

            } else {
                if(item.stplatClCode == '75' && sessStorage.getItemByKey('cdPrdCd')=='207599' ) {
                    termsHtml += '        <label for="chkHead'+headNo+'">GS리테일 POP Family V카드 제휴사 개인(신용)정보 제공·활용동의서';
                } else if(item.stplatClCode == '75' && sessStorage.getItemByKey('cdPrdCd')=='207463' ) {
                    termsHtml += '        <label for="chkHead'+headNo+'">POP New 우리V카드 제휴사 개인(신용)정보 제공·활용동의서';
                } else if(item.stplatClCode == '75' && sessStorage.getItemByKey('cdPrdCd')=='207489' ) {
                    termsHtml += '        <label for="chkHead'+headNo+'">POP 우리V체크카드 제휴사 개인(신용)정보 제공·활용동의서';
                } else {
                    termsHtml += '        <label for="chkHead'+headNo+'">'+item.stplatClNmDc;
                }

                if(essntlAt == 'Y') {
                    termsHtml += '            <span>(필수)</span>';
                } else {
                    termsHtml += '            <span>(선택)</span>';
                }
                
                if('27' == item.stplatClCode || '28' == item.stplatClCode || '32' == item.stplatClCode) {
                	var warnningTxt = "";
    				if('27' == item.stplatClCode) {
    					warnningTxt = "개인(신용)정보 필수적 동의서 유의사항";
    				} else if('28' == item.stplatClCode) {
    					warnningTxt = "개인(신용)정보 선택적 동의서 유의사항";
    				} else if('32' == item.stplatClCode) {
    					warnningTxt = "이동통신사정보 활용 동의 유의사항";
    				}
    				termsHtml += '        <button type="button" class="btnIco_help agreePop" id="clCode_'+item.stplatClCode+'" aria-label="'+warnningTxt+'"></button>';
                }

                termsHtml += '        </label>';
            }

            termsHtml += '            <button type="button" class="btnIco_acco accoBtn"><span>상세내용 보기</span></button>';
            termsHtml += '        </div>';

            //START 약관그룹 Body 아코디언 content 영역(.accoBody)
            termsHtml += '        <div class="accoBody notInner">';
            if(item.stplatClCode == '32') {
                termsHtml += '        <div class="termsHead">';
                termsHtml += '            <ul class="iptGroup iptBtn">';
                termsHtml += '                <li>';
                termsHtml += '                    <input type="radio" class="ipt" name="mobInfoGroup" id="mobInfoKt" value="kt" data-stplatClCode="'+item.stplatClCode+'">';
                termsHtml += '                    <label for="mobInfoKt">KT</label>';
                termsHtml += '                </li>';
                termsHtml += '                <li>';
                termsHtml += '                    <input type="radio" class="ipt" name="mobInfoGroup" id="mobInfoLg" value="lg" data-stplatClCode="'+item.stplatClCode+'">';
                termsHtml += '                    <label for="mobInfoLg">U+(LGT)</label>';
                termsHtml += '                </li>';
                termsHtml += '            </ul>';
                termsHtml += '        </div>';
            }

            if('27' == item.stplatClCode || '28' == item.stplatClCode){
                termsHtml += '        <div class="termsHead" data-stplatClCode="'+item.stplatClCode+'">';
                termsHtml += '            <div class="tabWrap" style="margin-top: 40px;">';
                termsHtml += '                <ul class="tabList etcTab">';
                termsHtml += '                    <li class="on" data-stplatClCode="'+item.stplatClCode+'" data-type="summary" onclick="javascript:CmnUtil.term.termsTab(this);">요약동의서</li>';
                termsHtml += '                    <li data-stplatClCode="'+item.stplatClCode+'" data-type="full" onclick="javascript:CmnUtil.term.termsTab(this);">전체동의서</li>';
                termsHtml += '                </ul>';
                termsHtml += '                <span class="wrcstSummary"><p>아래 동의서는 요약동의서로 구성되어 있습니다. 전체동의서를 요청하시려면 전체동의서를 눌러주세요.</p></span>';
                termsHtml += '                <span class="wrcstFull" style="display:none"><p>아래 동의서는 전체동의서로 구성되어 있습니다. 요약동의서를 요청하시려면 요약동의서를 눌러주세요.</p></span>';
                termsHtml += '            </div>';
                
                if(item.stplatClCode == '27'){
                    termsHtml += '        <p>귀하는 개인신용정보 수집 · 이용, 조회 및 제공 동의에 대해 거부하실 수 있습니다. 다만, 개인(신용)정보 수집 · 이용, 조회 및 제공에 관한 동의는 상거래관계의 설정, 유지에 필수적이거나, 상거래 관계에 따라 귀하에게 제공되는 서비스와 직접적으로 관련된 필수적 사항이므로, 아래의 사항에 동의하셔야만 (금융)거래관계의 설정 및 유지가 가능합니다.</p>'; 	 
                }
                
                termsHtml += '        </div>';     	 
            }
            // START 약관 BODY 처리(.termsBody)
            termsHtml += '            <div class="termsBody">';
        }

        stplatClCode = item.stplatClCode;
        var stplatCn = CmnUtil.string.conHtml(item.stplatCn);

        // START 약관 내용 처리(.termsContentWrap)
        termsHtml += '                  <div class="termsContentWrap" id="stplatCtgrySnArea'+item.stplatCtgrySnCode+'">';
        // START 약관 본문 내용 처리 //
        termsHtml += '                      <div class="termsContent">';

        if('27' == item.stplatClCode || ('28' == item.stplatClCode && '45' != item.stplatCtgrySnCode)){
            termsHtml += '    '+ stplatCn +'';
        
        //개인(신용)정보 선택적약관 이용권유방법 - 약관내용 동의버튼 하단에 위치
        }else if('28' == item.stplatClCode && '45' == item.stplatCtgrySnCode){
        
        	
        //상품별 약관 - 7914전문
        }else if(item.stplatClCode == '74' && resultJson) {

            termsHtml += '  <div class="termsContentGroup">';
            termsHtml += '  	<div class="inner">';
            termsHtml += '  		<p>귀하는 개인신용정보 제공 동의에 대해 거부할 수 있습니다.다만, 개인(신용)정보 제공에 관한 동의는 상거래관계의 설정, 유지에 필수적이거나 상거래 관계에 따라 귀하에게 제공되는 서비스와 직접적으로 관련된 필수적 사항이므로, 아래의 사항에 동의하셔야만 (금융)거래 관계의 설정 및 유지가 가능합니다.</p><br>';
            termsHtml += '  		<h6 class="titH6">개인(신용)정보 제공에 관한 사항</h6>';
            termsHtml += '  		<p>('+ CmnUtil.string.isNull(resultJson.CD_PRD_NM_40) +') 부가서비스 제공을 위한 개인(신용)정보 제공</p><br>';
            termsHtml += '  		<p>제공받는 자 : '+ CmnUtil.string.isNull(resultJson.OFR_CO_TXT_4000) +'</p>';
            termsHtml += '  		<p>제공받는 자의 이용목적 : '+ CmnUtil.string.isNull(resultJson.OFR_CO_USE_OBJ_TXT_4000) +'</p>';
            termsHtml += '  		<p>보유 및 이용기간 : '+ CmnUtil.string.isNull(resultJson.OFR_USE_TM_TXT_4000) +'</p>';
            termsHtml += '  	</div>';
            if(CmnUtil.string.isNull(resultJson.UNQ_ID_INF_CN_18)>0){
            	termsHtml += '  	<h5 class="titH5">수집 &middot; 이용 항목</h5>';
            	termsHtml += '  	<div class="inner"><strong>'+ CmnUtil.string.isNull(resultJson.UNQ_ID_INF_TXT_4000) +'</strong></div>';
            }
            termsHtml += '  </div>';

            termsHtml += ' 	<div class="tabContent">';
            termsHtml += ' 		<h5 class="titH5">개인(신용)정보</h5>';
            termsHtml += ' 		<table class="tableY">';
            termsHtml += ' 			<colgroup>';
            termsHtml += ' 				<col style="width: 185px;">';
            termsHtml += ' 					<col style="width: auto;">';
            termsHtml += ' 			</colgroup>';
            termsHtml += ' 			<tbody>';
            if(CmnUtil.string.isNull(resultJson.GEN_PSN_INF_CN_18)>0){
                termsHtml += ' 				<tr>';
                termsHtml += ' 					<td class="th">일반개인정보</td>';
                termsHtml += ' 					<td>'+ CmnUtil.string.isNull(resultJson.GEN_PSN_INF_TXT_4000) +'</td>';
                termsHtml += ' 				</tr>';
            }
            if(CmnUtil.string.isNull(resultJson.CRD_TRN_INF_CN_18)>0){
                termsHtml += ' 				<tr>';
                termsHtml += ' 					<td class="th">신용거래정보</td>';
                termsHtml += ' 					<td>'+CmnUtil.string.isNull(resultJson.CRD_TRN_INF_TXT_4000)+'</td>';
                termsHtml += ' 				</tr>';
            }
            if(CmnUtil.string.isNull(resultJson.CRDRT_JUG_INF_CN_18)>0){
                termsHtml += ' 				<tr>';
                termsHtml += ' 					<td class="th">신용도판단정보</td>';
                termsHtml += ' 					<td>'+CmnUtil.string.isNull(resultJson.CRDRT_JUG_INF_TXT_4000)+'</td>';
                termsHtml += ' 				</tr>';
            }
            if(CmnUtil.string.isNull(resultJson.CRD_ABL_INF_CN_18)>0){
                termsHtml += ' 				<tr>';
                termsHtml += ' 					<td class="th">신용능력정보</td>';
                termsHtml += ' 					<td>'+CmnUtil.string.isNull(resultJson.CRD_ABL_INF_TXT_4000)+'</td>';
                termsHtml += ' 				</tr>';
            }
            if(CmnUtil.string.isNull(resultJson.PUBINF_CN_18)>0){
                termsHtml += ' 				<tr>';
                termsHtml += ' 					<td class="th">공공정보</td>';
                termsHtml += ' 					<td>'+CmnUtil.string.isNull(resultJson.PUBINF_TXT_4000)+'</td>';
                termsHtml += ' 				</tr>';
            }
            if(CmnUtil.string.isNull(resultJson.ETC_INF_CN_18)>0){
                termsHtml += ' 				<tr>';
                termsHtml += ' 					<td class="th">기타</td>';
                termsHtml += ' 					<td>'+CmnUtil.string.isNull(resultJson.ETC_INF_TXT_4000)+'</td>';
                termsHtml += ' 				</tr>';
            }
            termsHtml += ' 			</tbody>';
            termsHtml += ' 		</table>';
            termsHtml += ' 	</div>';

        }else{            
            termsHtml += '                      <div class="inner">'+ stplatCn + '</div>';
        }
        termsHtml += '                      </div>';
        // END 약관 본문 내용 처리 //

        // START 약관 버튼 처리(.termsForms) //
        termsHtml += '                <div class="termsForms">';

        //개인(신용)정보 필수적 동의서, 상품별 서비스 제공 동의(NEW화물차유류구매카드), 썸(SUM)화물복지카드, SK 화물복지 50, S-OIL화물복지50, 카드의 정석 하이마트 , 전문약관
        if( ('27' == item.stplatClCode  && '419' != item.stplatCtgrySnCode) || ('28' == item.stplatClCode && ('45' != item.stplatCtgrySnCode && '48' != item.stplatCtgrySnCode )) || '54'== item.stplatClCode || '55' == item.stplatClCode
            || '56' == item.stplatClCode || '57' == item.stplatClCode || '62' == item.stplatClCode || '74' == item.stplatClCode ){
        	
        	if(('27' == item.stplatClCode  && '419' != item.stplatCtgrySnCode) || ('28' == item.stplatClCode && ('45' != item.stplatCtgrySnCode && '48' != item.stplatCtgrySnCode )) || '74' == item.stplatClCode){
                termsHtml += '             <div class="downChk">';
                termsHtml += '                 <ul class="iptGroup">';
                termsHtml += '                     <li>위 <strong><u>고유식별정보 '+ item.bassDc +'</u></strong>에 동의하십니까?</li>';
        	}else{
                termsHtml += '             <div class="downChk">';
                termsHtml += '                 <ul class="iptGroup">';
                termsHtml += '                     <li>위 <strong><u>본인 고유식별정보처리에 관한 사항</u></strong>에 동의하십니까?</li>';
        	}
            if(('28' == item.stplatClCode && ('45' != item.stplatCtgrySnCode && '48' != item.stplatCtgrySnCode ))){
            	termsHtml += '                      <li class="rankItem" style="display:none;"><span class="rankLabel" style="display:none;"></span></li>';
            }
            termsHtml += '                     <li>';
            termsHtml += '                         <input type="radio" class="ipt" name="chkArgGroup'+item.stplatClCode+'_1'+index+'" id="chkArg'+index+'_1" value="'+headNo+'" data-type="false" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" data-stplatClGroup="chkArgGroup" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);" checked>';
            termsHtml += '                         <label for="chkArg'+index+'_1">동의하지 않음</label>';
            termsHtml += '                     </li>';
            termsHtml += '                     <li>';
            termsHtml += '                         <input type="radio" class="ipt" name="chkArgGroup'+item.stplatClCode+'_1'+index+'" id="chkArg'+index+'_2" value="'+headNo+'" data-type="true" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" data-stplatClGroup="chkArgGroup" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                         <label for="chkArg'+index+'_2">동의함</label>';
            termsHtml += '                     </li>';
            termsHtml += '                 </ul>';
            termsHtml += '             </div>';

        }
        
        // START 개인신용정보 조회 동의 버튼영역(.downChk)
        termsHtml += '                 <div class="downChk">';
        termsHtml += '                     <ul class="iptGroup">';	

        //개인(신용)정보 조회에 관한 사항 이고 체크카드이면
        if(item.stplatCtgrySnCode == '41' && sessStorage.getItemByKey('cdPrdCfcd') == '2') {
            termsHtml += '                        	<li>개인(신용)정보 조회에 관한 사항(하이브리드/후불교통 신청시해당)</li>';
        }else if(item.stplatCtgrySnCode == '45') {
        	termsHtml += '						  	<li><strong>상품서비스 안내 : 전자적 전송매체(서면 포함)를 통한 광고성 정보의 수신을 동의하시겠습니까?</strong></li>';
        }else if(item.stplatClCode == '27' || ('28' == item.stplatClCode && '45' != item.stplatCtgrySnCode) || item.stplatClCode == '74'){
        	termsHtml += '                 		  	<li>위 <strong><u>개인신용정보 '+ item.bassDc +'</u></strong>에 동의하십니까?</li>';	
        }else{
            termsHtml += '                    		<li><strong>'+item.stplatSj+'</strong></li>';
        }
        
        if('28' == item.stplatClCode && '45' != item.stplatCtgrySnCode){
        	termsHtml += '                      <li class="rankItem" style="display:none;"><span class="rankLabel"></span></li>';
        }
        termsHtml += '                         <li>';
        termsHtml += '                             <input type="radio" class="ipt" name="chkArgGroup'+item.stplatClCode+'_'+index+'_2" id="chkArg'+index+'_3" value="'+headNo+'" data-type="false" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" data-stplatClGroup="chkArgGroup" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);" checked>';
        termsHtml += '                             <label for="chkArg'+index+'_3">동의하지 않음</label>';
        termsHtml += '                         </li>';
        termsHtml += '                         <li>';
        termsHtml += '                             <input type="radio" class="ipt" name="chkArgGroup'+item.stplatClCode+'_'+index+'_2" id="chkArg'+index+'_4" value="'+headNo+'" data-type="true" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" data-stplatClGroup="chkArgGroup" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
        termsHtml += '                             <label for="chkArg'+index+'_4">동의함</label>';
        termsHtml += '                         </li>';
        termsHtml += '                     </ul>';
        
        
        //개인(신용)정보 선택적 동의서 - 이용권유방법
        if(item.stplatCtgrySnCode == '45') {
            termsHtml += '                  <ul class="iptGroup" style="padding: 8px 0 16px; border-top:1px dashed #e0e0e0;">';
            termsHtml += '                         <li>';
            termsHtml += '                             <input name="advMnsGroupAll" class="ipt" id="advMnsAll" type="checkbox" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                             <label for="advMnsAll">전체</label>';
            termsHtml += '                         </li>';              
            termsHtml += '                         <li class="chkGroupItem">';
            termsHtml += '                             <div class="chkGroup">';
            termsHtml += '                                 <span class="singleIpt">';
            termsHtml += '                                     <input name="advMnsGroup" class="ipt" id="advMns1" type="checkbox" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                                     <label for="advMns1">문자</label>';
            termsHtml += '                                 </span>';
            termsHtml += '                                 <span class="singleIpt">';
            termsHtml += '                                     <input name="advMnsGroup" class="ipt" id="advMns2" type="checkbox" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                                     <label for="advMns2">이메일</label>';
            termsHtml += '                                 </span>';
            termsHtml += '                                 <span class="singleIpt">';
            termsHtml += '                                     <input name="advMnsGroup" class="ipt" id="advMns0" type="checkbox" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                                     <label for="advMns0">전화</label>';
            termsHtml += '                                 </span>';
            termsHtml += '                                 <span class="singleIpt">';
            termsHtml += '                                     <input name="advMnsGroup" class="ipt" id="advMns3" type="checkbox" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                                     <label for="advMns3">서면</label>';
            termsHtml += '                                 </span>';
            termsHtml += '                             </div>';
            termsHtml += '                         </li>';
            termsHtml += '                  </ul>';
        }

        //제3자 제공 개인(신용)정보 선택적 동의서 - 마케팅 수단 동의
        //갤러리아, 현대백화점, AK
        if(item.stplatCtgrySnCode == '222' || item.stplatCtgrySnCode == '225' || item.stplatCtgrySnCode == '319') {
            termsHtml += '              <ul class="iptGroup" style="padding: 8px 0 16px; border-top:1px dashed #e0e0e0;">';
            termsHtml += '                 <li class="singleIpt">';
            termsHtml += '                     <input type="checkbox" class="ipt"  name="prdMktAgrGroup" id="prdMktAgrChkPost" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                     <label for="prdMktAgrChkPost">DM</label>';
            termsHtml += '                 </li>';
            termsHtml += '                 <li class="singleIpt">';
            termsHtml += '                     <input type="checkbox" class="ipt"  name="prdMktAgrGroup" id="prdMktAgrChkTel" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                     <label for="prdMktAgrChkTel">TM(전화)</label>';
            termsHtml += '                 </li>';
            termsHtml += '                 <li class="singleIpt">';
            termsHtml += '                     <input type="checkbox" class="ipt"  name="prdMktAgrGroup" id="prdMktAgrChkMsg" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                     <label for="prdMktAgrChkMsg">문자메세지</label>';
            termsHtml += '                 </li>';
            termsHtml += '                 <li class="singleIpt">';
            termsHtml += '                     <input type="checkbox" class="ipt"  name="prdMktAgrGroup" id="prdMktAgrChkEmail" data-stplatClGroup="chkArgGroup" data-stplatClCode="'+item.stplatClCode+'" data-stplatCtgrySnCode="'+item.stplatCtgrySnCode+'" onclick="javascript:CmnUtil.term.chkCrdTermsEach('+type+',this);">';
            termsHtml += '                     <label for="prdMktAgrChkEmail">이메일</label>';
            termsHtml += '                 </li>';
            termsHtml += '             </ul>';
        }

        termsHtml += '                 </div>';
        // END 개인신용정보 조회 동의 버튼영역(.downChk)
        
        //개인(신용)정보 선택적약관 이용권유방법 - 약관내용 동의버튼 하단에 위치
        if(item.stplatCtgrySnCode == '45'){	
        	termsHtml += '             <div class="termsContent">'+ stplatCn + '</div>';
        }

        termsHtml += '             </div>';		      //END 약관 버튼 처리(.termsForms)
        termsHtml += '         </div>';			      //END 약관 내용 처리(.termsContentWrap)
        
    });
    termsHtml += '        </div>';      //END 약관 BODY 처리(.termsBody)
    termsHtml += '    </div>';          //END 약관 BODY 처리(.accoBody)
    termsHtml += '</li>';               //END

    $('#termsList').append(termsHtml);
    
    CmnUtil.term.termRankColor();			//약관 등급 init
    CmnUtil.term.prdAgrClick();        		//상품별-제3자 개인(신용)정보 제공 클릭

}

/**
 * 카드신청용
 * 신정법 약관
 * 전체선택
 * type : 1(카드신청), 2(간편신청)
 */
CmnUtil.term.chkCrdTermsAll = function(type) {
	
	/**
	 * 예외처리(체크해지)
	 */
	// 1. stplatClCode=32 (이동통신사정보 활용동의)
	// 2. stplatClCode=303 개인정보 제공동의(국민건강보험공단, 국세청)
	if($('#termsAllChk').is(":checked")) {
		$("#termsList input:checkbox[name='chkHeadGroup'][data-stplatClCode!=32][data-stplatClCode!=303]").prop('checked', true);
		$("#termsList input:radio[data-type='true'][data-stplatClCode!=32][data-stplatClCode!=303]").prop('checked', true);
		$("#termsList input:checkbox[data-stplatClGroup=chkArgGroup][data-stplatClCode!=32]").prop('checked', true);
		
		// 3. 체크카드 && 후불교통카드 미신청 && 신용한도부여 미신청 이면  개인(신용)정보 조회에 관한 사항(stplatCtgrySnCode:41) 필수X
		if(sessStorage.getItemByKey('cdPrdCfcd') == '2' && $('#dfpayN').prop('checked') && $('#rdo20').prop('checked')){
			$("#termsList input:radio[data-stplatCtgrySnCode=41]").prop('disabled', true);
	    	$("#termsList input:radio[data-stplatCtgrySnCode=41][data-type=false]").prop('checked', true);
		}
		
		//전체선택 클릭시 개인(신용)정보 선택적 약관 OPEN
		$('#stplatArea28').addClass('on');
		$('#stplatArea28 .accoBody').show();
	}else{
		$("#termsList input:checkbox").prop("checked", false);
		$("#termsList input:radio[data-type=false]").prop("checked", true);
	}

	//제3자 제공 개인(신용)정보 예외처리
	CmnUtil.term.prdAgrClick();
};

/**
 * 카드신청용
 * 신정법 약관
 * 그룹약관 선택
 * type : 1(카드신청), 2(간편신청)
 */
CmnUtil.term.chkCrdTermsGrp = function(type, stplatClCode){

	var isChkGrpTerm = $("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").is(":checked");
	
	//  1) 그룹약관 체크여부
	if(isChkGrpTerm){
		// - 개별약관 모두 체크박스 체크
		$("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]").prop("checked", true);
		$("#termsList input:checkbox[data-stplatClGroup=chkArgGroup][data-stplatClCode="+ stplatClCode +"]").prop('checked', true);
	}else{
		// - 개별약관 모두 체크박스 체크 해제
		$("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=false]").prop("checked", true);
		$("#termsList input:checkbox[data-stplatClGroup=chkArgGroup][data-stplatClCode="+ stplatClCode +"]").prop('checked', false);
	}
	
	//상품별-제3자 개인(신용)정보 제공 클릭
	if(stplatClCode == '77' || stplatClCode == '79' || stplatClCode == '83'){
		CmnUtil.term.prdAgrClick();        		
	}
	
	CmnUtil.term.chkCrdTermsEach(type);
};

/**
 * 카드신청용
 * 신정법 약관
 * 개별약관 동의 클릭
 * type : 1(카드신청), 2(간편신청)
 */
CmnUtil.term.chkCrdTermsEach = function(type, element){

	//상세약관 그룹 동시 선택/해지
	$("#termsList input:radio[data-stplatCtgrySnCode="+ $(element).attr('data-stplatCtgrySnCode') +"][data-type="+ $(element).attr('data-type') +"]").prop("checked", true);
    
	//약관내 .ipt 체크박스 체크, 라디오버튼 동의함 클릭 시
	if(($(element).attr('type') == 'checkbox' && $(element).prop('checked') == true)
    		|| ($(element).attr('type') == 'radio' && $(element).attr('data-type') == 'true' && $(element).prop('checked') == true)  ) {

        var cdPrdAdvColUseAgrYn1 = 'N';    //카드상품안내수집이용동의여부
        var crclnSvcColUseAgrYn1 = 'N';    //부수서비스수집이용동의여부_1

        
        //카드상품안내수집이용동의여부
        if(CmnUtil.term.termAgrSnCodeChk('43')){
        	cdPrdAdvColUseAgrYn1 = 'Y';
        }
        
        //부수서비스수집이용동의여부_1
        if(CmnUtil.term.termAgrSnCodeChk('44')){
        	crclnSvcColUseAgrYn1 = 'Y';
        }

        //이용권유방법선택시
        if($(element).attr('type') == 'radio' && $(element).attr('data-stplatCtgrySnCode') == '45' && CmnUtil.term.termAgrSnCodeChk('45')){
        	if(cdPrdAdvColUseAgrYn1 == 'N' && crclnSvcColUseAgrYn1 == 'N') {
        		$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=false]").prop('checked',true);
                SysComm.modalMsgPop('카드 · 금융상품 안내 및 이용권유를 위한 수집 · 이용 또는 카드· 금융상품 이외의 부수서비스 안내 등을 위한 수집 · 이용에 동의해 주셔야 합니다.');
            }else{
            	$('#advMnsAll,#advMns0,#advMns1,#advMns2,#advMns3').prop('checked',true);
            } 	
        }

        //상품별-개인(신용)정보 제공에 관한 사항 클릭
        //221, 222 : 갤러리아, 224, 225 : 현대, 293,319 : AK
        if($(element).attr('type') == 'radio' && ($(element).attr('data-stplatCtgrySnCode') == '221' || $(element).attr('data-stplatCtgrySnCode') == '224' || $(element).attr('data-stplatCtgrySnCode') == '293')) {
            CmnUtil.term.prdAgrClick();
        }

        if(CmnUtil.term.termCodeChk($(element),'stplatCtgrySnCode','222','true')
        		|| CmnUtil.term.termCodeChk($(element),'stplatCtgrySnCode','225','true')
        		|| CmnUtil.term.termCodeChk($(element),'stplatCtgrySnCode','319','true')){
            $('#prdMktAgrChkTel,#prdMktAgrChkMsg,#prdMktAgrChkEmail,#prdMktAgrChkPost').prop('checked',true);
        }
        
        //이용권유방법 전체선택
        if($(element).attr('id')=='advMnsAll'){
        	if(cdPrdAdvColUseAgrYn1 == 'N' && crclnSvcColUseAgrYn1 == 'N'){
    			$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=false]").prop('checked',true);
    			$('#advMnsAll').prop('checked',false);
                SysComm.modalMsgPop('카드 · 금융상품 안내 및 이용권유를 위한 수집 · 이용 또는 카드· 금융상품 이외의 부수서비스 안내 등을 위한 수집 · 이용에 동의해 주셔야 합니다.');
            }else{
            	$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=true]").prop('checked',true);
            	$('#advMns0,#advMns1,#advMns2,#advMns3').prop('checked',true);
    		}
        }

        //전화,문자메세지,이메일,서면 선택시
        if($(element).attr('id')=='advMns0' || $(element).attr('id')=='advMns1' || $(element).attr('id')=='advMns2' || $(element).attr('id')=='advMns3'){
       
        	if($('#advMns0').is(':checked') && $('#advMns1').is(':checked') && $('#advMns2').is(':checked') && $('#advMns3').is(':checked')){
        		$("#advMnsAll").prop('checked', true);
        	}

    		if(cdPrdAdvColUseAgrYn1 == 'N' && crclnSvcColUseAgrYn1 == 'N') {
    			$(element).prop('checked', false)
                SysComm.modalMsgPop('카드 · 금융상품 안내 및 이용권유를 위한 수집 · 이용 또는 카드· 금융상품 이외의 부수서비스 안내 등을 위한 수집 · 이용에 동의해 주셔야 합니다.');
            }else{
            	$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=true]").prop('checked',true);
    		}
    	}
        
        //제3자 제공 개인(신용)정보 선택적 동의서 이용권유방법 선택
        //권유방법 클릭해제 했을때,  상위,그룹 동의여부도 체크
        if($(element).attr('id')=='prdMktAgrChkTel' || $(element).attr('id')=='prdMktAgrChkMsg' || $(element).attr('id')=='prdMktAgrChkEmail' || $(element).attr('id')=='prdMktAgrChkPost'){

    		$("#termsList .ipt").each(function () {
    			
    			if($(this).attr('name') == 'chkHeadGroup'){
    				if($(this).attr('data-stplatClCode') == '77' || $(this).attr('data-stplatClCode') == '79' || $(this).attr('data-stplatClCode') == '83' ){
            			CmnUtil.term.termAgrClick($(this), 'true', true);
            		}
    			}else{
    				if($(this).attr('type') == 'radio' && ($(this).attr('data-stplatCtgrySnCode') == '222' || $(this).attr('data-stplatCtgrySnCode') == '225' || $(this).attr('data-stplatCtgrySnCode') == '319')){
                    	CmnUtil.term.termAgrClick($(this), 'true', true);
                    }
    			}
            });
        }

    /**
     * 약관내 .ipt 체크박스 체크해지
     * 라디오버튼 동의안함 클릭 시
     */
	}else if( ($(element).attr('type') == 'checkbox' && $(element).prop('checked') == false)
			|| ($(element).attr('type') == 'radio' && $(element).attr('data-type') == 'false' && $(element).prop('checked') == true) ){
	  	
    	//카드상품안내수집이용동의여부 || 부수서비스수집이용동의여부_1
        if($(element).attr('data-stplatCtgrySnCode') == '43' || $(element).attr('data-stplatCtgrySnCode') == '44') {
        	if(!CmnUtil.term.termAgrSnCodeChk('43') && !CmnUtil.term.termAgrSnCodeChk('44')){
        		$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=false]").prop('checked',true);
        		$('#advMns0,#advMns1,#advMns2,#advMns3').prop('checked',false);
        	}
        }
        
        //이용권유방법 해제시
        if($(element).attr('type') == 'radio' && ($(element).attr('data-stplatCtgrySnCode') == '45' || !CmnUtil.term.termAgrSnCodeChk('45'))) {
            $('#advMnsAll,#advMns0,#advMns1,#advMns2,#advMns3').prop('checked',false);
        }
        
        

        //상품별-개인(신용)정보 제공에 관한 사항 클릭
        if($(element).attr('type') == 'radio' && ($(element).attr('data-stplatCtgrySnCode') == '221' || $(element).attr('data-stplatCtgrySnCode') == '224' || $(element).attr('data-stplatCtgrySnCode') == '293')) {
            CmnUtil.term.prdAgrClick();
        }
        
        if(CmnUtil.term.termCodeChk($(element),'stplatCtgrySnCode','222','false')
        		|| CmnUtil.term.termCodeChk($(element),'stplatCtgrySnCode','225','false')
        		|| CmnUtil.term.termCodeChk($(element),'stplatCtgrySnCode','319','false')){
        	$('#prdMktAgrChkTel,#prdMktAgrChkMsg,#prdMktAgrChkEmail,#prdMktAgrChkPost').prop('checked',false);
        }
        
        
        //이용권유방법 전체선택
        if($(element).attr('id')=='advMnsAll'){
            	$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=false]").prop('checked',true);
            	$('#advMnsAll,#advMns0,#advMns1,#advMns2,#advMns3').prop('checked',false);
        }   
        
        //전화,문자메세지,이메일,서면 선택시
        if($(element).attr('id')=='advMns0' || $(element).attr('id')=='advMns1' || $(element).attr('id')=='advMns2' || $(element).attr('id')=='advMns3'){
        	
        	if(!($('#advMns0').is(':checked') && $('#advMns1').is(':checked') && $('#advMns2').is(':checked') && $('#advMns3').is(':checked'))){
        		$("#advMnsAll").prop('checked', false);
			}
        	
        	if(!$('#advMns0').is(':checked') && !$('#advMns1').is(':checked') && !$('#advMns2').is(':checked') && !$('#advMns3').is(':checked')){
        		$("#termsList input:radio[data-stplatCtgrySnCode=45][data-type=false]").prop('checked',true);
			}
        }
    	
    	//제3자 제공 개인(신용)정보 선택적 동의서 이용권유방법 선택
    	//권유방법 클릭해제 했을때 모두 체크해지 일 경우, 상위,그룹 동의여부도 체크 해지
    	if($(element).attr('id') == 'prdMktAgrChkTel' || $(element).attr('id') == 'prdMktAgrChkMsg' || $(element).attr('id') == 'prdMktAgrChkEmail' || $(element).attr('id') == 'prdMktAgrChkPost' ){         	
        	
        	if(!$('#prdMktAgrChkTel').is(':checked') && !$('#prdMktAgrChkMsg').is(':checked') && !$('#prdMktAgrChkEmail').is(':checked') && !$('#prdMktAgrChkPost').is(':checked')) {

        		$("#termsList .ipt").each(function () {
        			
        			if($(this).attr('name') == 'chkHeadGroup'){
        				if($(this).attr('data-stplatClCode') == '77' || $(this).attr('data-stplatClCode') == '79' || $(this).attr('data-stplatClCode') == '83' ){
        					CmnUtil.term.termAgrClick($(this), 'false', true);
        				}
        			}else{
        				if($(this).attr('type') == 'radio' && ($(this).attr('data-stplatCtgrySnCode') == '222' || $(this).attr('data-stplatCtgrySnCode') == '225' || $(this).attr('data-stplatCtgrySnCode') == '319')){
                			CmnUtil.term.termAgrClick($(this), 'false', true);
                		}
        			}
        		});
    		}
        }
    }

	//세부약관 버튼 직접 클릭시
	if(element){
		var stplatClCode = $(element).attr('data-stplatClCode');

		//중분류 체크 해지/선택 처리
		var chkTermRadioAllLen2 = $("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]:enabled").length;
		var chkedTermRadioLen2 = $("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]:enabled:checked").length;
		if (chkTermRadioAllLen2 == chkedTermRadioLen2) {
			$("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").prop("checked", true);
		}else {
			$("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").prop("checked", false);
		}
	
	//그룹약관 체크박스 클릭시
	}else{
		
		/**
		 * 예외처리
		 */
		//체크카드 && 후불교통카드 미신청 && 신용한도부여 미신청 이면  개인(신용)정보 조회에 관한 사항(stplatCtgrySnCode:41) 필수X
		if(sessStorage.getItemByKey('cdPrdCfcd') == '2' && $('#dfpayN').prop('checked') && $('#rdo20').prop('checked')){
			$("#termsList input:radio[data-stplatCtgrySnCode=41]").prop('disabled', true);
	    	$("#termsList input:radio[data-stplatCtgrySnCode=41][data-type=false]").prop('checked', true);
		}
	}
	
	// 1. 변수 선언 및 초기화
	// 전체약관
	var chkTermAll = $("#termsList input:checkbox[id=termsAllChk]").is(":checked");

	//약관그룹 체크박스( 약관분류코드:32(이동통신사정보 활용동의)제외 )
	var chkTermBoxAllLen = $("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]").length;
	var chkedTerBoxmLen = $("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]:checked").length;

	//약관세부 라디오박스( 약관분류코드:32(이동통신사정보 활용동의)제외 )
	var chkTermRadioAllLen = $("#termsList input:radio[data-type=true][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]:enabled").length;
	var chkedTermRadioLen = $("#termsList input:radio[data-type=true][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]:enabled:checked").length;

	// 2. 전체동의체크박스 체크  처리
	//  1) 전체동의 체크여부
	if(chkTermBoxAllLen == chkedTerBoxmLen && chkTermRadioAllLen == chkedTermRadioLen) {
		//  2) 전체동의 체크 처리
		$("#termsAllChk").prop("checked", true);
	}else{
		//  3) 전체동의 해제 처리
		$("#termsAllChk").prop("checked", false);
	}
};

/**
 * 신정법 약관
 * 개별약관 그룹 및 전체선택 체크
 */
CmnUtil.term.chkTermsByClcode = function(stplatClCode){

	//중분류 체크 해지/선택 처리
	var chkTermRadioAllLen2 = $("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]:enabled").length;
	var chkedTermRadioLen2 = $("#termsList input:radio[data-stplatClCode="+ stplatClCode +"][data-type=true]:enabled:checked").length;
	if (chkTermRadioAllLen2 == chkedTermRadioLen2) {
		$("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").prop("checked", true);
	}else {
		$("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode="+ stplatClCode +"]").prop("checked", false);
	}
	
	// 1. 변수 선언 및 초기화
	// 전체약관
	var chkTermAll = $("#termsList input:checkbox[id=termsAllChk]").is(":checked");

	//약관그룹 체크박스( 약관분류코드:32(이동통신사정보 활용동의)제외 )
	var chkTermBoxAllLen = $("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]").length;
	var chkedTerBoxmLen = $("#termsList input:checkbox[name=chkHeadGroup][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]:checked").length;

	//약관세부 라디오박스( 약관분류코드:32(이동통신사정보 활용동의)제외 )
	var chkTermRadioAllLen = $("#termsList input:radio[data-type=true][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]:enabled").length;
	var chkedTermRadioLen = $("#termsList input:radio[data-type=true][data-stplatClCode!=32][data-stplatClCode!=303][data-hidden!=Y]:enabled:checked").length;

	// 2. 전체동의체크박스 체크  처리
	//  1) 전체동의 체크여부
	if(chkTermBoxAllLen == chkedTerBoxmLen && chkTermRadioAllLen == chkedTermRadioLen) {
		//  2) 전체동의 체크 처리
		$("#termsAllChk").prop("checked", true);
	}else{
		//  3) 전체동의 해제 처리
		$("#termsAllChk").prop("checked", false);
	}
};

/**
 * 상품별 - 제3자 제공 개인(신용)정보 예외처리
 */
CmnUtil.term.prdAgrClick = function () {
    var prdAgr = 'N';   //개인(신용)정보 제공 동의

    if( $("#termsList input:radio[data-stplatCtgrySnCode=221][data-type=true]").is(':checked')
    		|| $("#termsList input:radio[data-stplatCtgrySnCode=224][data-type=true]").is(':checked')
    		|| $("#termsList input:radio[data-stplatCtgrySnCode=293][data-type=true]").is(':checked')){
    	
    	 prdAgr = 'Y';
    }
    
    $("#termsList .ipt").each(function () {
    	if($(this).attr('data-stplatCtgrySnCode') == '222' || $(this).attr('data-stplatCtgrySnCode') == '225' || $(this).attr('data-stplatCtgrySnCode') == '319') {
    		
    		if(prdAgr == 'Y'){
    			$(this).closest('.termsForms').find('input:radio').prop('disabled',false);
    			$(this).closest('.termsForms').find('input:checkbox[data-stplatClGroup=chkArgGroup]').prop('disabled',false);
    		}else{
    			
        		$(this).closest('.termsForms').find('input:radio').prop('disabled',true);
        		$(this).closest('.termsForms').find('input:checkbox[data-stplatClGroup=chkArgGroup]').prop('disabled',true);
        		
        		$(this).closest('.termsForms').find('input:radio[data-type=false]').prop('checked',true);
                $(this).closest('.termsForms').find('input:checkbox[data-stplatClGroup=chkArgGroup]').prop('checked',false);
    		}
    	}
    });
}

/**
 * 신정법 약관
 * 요약/전체동의서 탭 클릭
 */
CmnUtil.term.isFullTerm = function(stplatClCode){

	var isFullTerm = $("#termsList .tabList li[data-stplatClCode="+stplatClCode+"][data-type=full]").hasClass('on');
	
	if( isFullTerm){
		return true;
	}else{
		return false;		
	}
};


/**
 * 약관그룹  동의여부, 상세코드
 */
CmnUtil.term.termAgrSnCodeChk = function(stplatCtgrySnCode) {

	var argLength 		= $("#termsList input:radio[data-stplatCtgrySnCode="+stplatCtgrySnCode+"]:radio[data-type=true]").length;
	var argChkLength	= $("#termsList input:radio[data-stplatCtgrySnCode="+stplatCtgrySnCode+"]:radio[data-type=true]:checked").length;
	
	if(argLength > 0 && argLength == argChkLength){
		return true;
	}else{
		return false;
	}
}

/**
 * 약관 상세코드 별 동의함 체크여부
 * 
 * element      : selector
 * dataName     : 약관코드 name
 * code         : 약관코드
 * type         : true,flase = 동의 비동의 selector , undifinded = 약관코드만 일치하는 selector
 */
CmnUtil.term.termCodeChk = function(element, dataName ,code , type){
	
	if($(element).attr("data-"+ dataName+"") == code && $(element).attr('data-type') == type){
        return true;
    }else{
        return false;
    }
	
}

/**
 * 약관그룹  동의 클릭
 * 
 * element      : selector
 * checked      : true: 선택 , flase: 해지
 * type         : true: 동의 , flase: 미동의, undefinded:전체
 * 
 */
CmnUtil.term.termAgrClick = function(element, type, checked) {

    if($(element).attr('type') == 'checkbox'){
    	if(type == 'true'){
    		$(element).prop('checked', true);
    	}else{
    		$(element).prop('checked', false);
    	}

    }else{
        if(type){
            if($(element).attr('data-type') == type){
                $(element).prop('checked', checked);
            }
        }else{
            $(element).prop('checked', checked);
        }
    }
}

/**
 * [약관] 필수약관 체크여부 반환 (신정법 버전)
 */
CmnUtil.term.isTermChkEssntl = function(){
	// 1. 변수 선언 및 초기화
	var chkTermsGroup = $("input:checkbox[name^=chkHeadGroup]");
	var resultChk = 'Y';
	var returnObj = {};

	// 2. 필수약관 체크여부 확인
	$.each(chkTermsGroup, function(index, item){

		if($(this).data('essntlat') == 'Y' && !$(this).is(":checked")){
			SysComm.modalMsgPop($(this).parent().children('label').text().replace(/\s+/g,'') + '에 동의하세요.');
			resultChk = 'N';
			return false;
		}
	});

	if(resultChk == 'Y'){
		return true;
	}else{
		return false;
	}
}
// END :: 약관 처리

// START :: 팝업 처리
CmnUtil.pop.newAddPop = false;
CmnUtil.pop.adSrch = function(callback) {
	CmnUtil.pop.newAddPop = true;
	lp.open(SysComm.contextPath()+'/cmn/adSrch.do','',SysComm.contextPath()+'/js/cmn/adSrch/adSrch.js?202011120000001', callback);
};
// END :: 팝업 처리

CmnUtil.grid.setGridProps = function(props) {
	CmnUtil.grid.props = props;
};

CmnUtil.grid.addGridRows = function(rows) {
	if (rows == null) {
		CmnUtil.grid.totRows = [];
	} else {
		//CmnUtil.grid.totRows = [...CmnUtil.grid.totRows, ...rows];
		CmnUtil.grid.totRows = CmnUtil.grid.totRows.concat(rows);
	}
};

CmnUtil.grid.getCurData = function() {
	if (CmnUtil.grid.curRow >= 0) return CmnUtil.grid.totRows[CmnUtil.grid.curRow];
	return null;
};

CmnUtil.grid.getCheckedRows = function() {
	var checked = $('.waGridChk:checked');
	var rowData = [];
	
	$.each(checked, function(inx, ele) {
		var obj = {
			rownum: $(ele).closest('tr').data('rowindex'),
			data: CmnUtil.grid.totRows[$(ele).closest('tr').data('rowindex')]
		};
		rowData.push(obj);
	});
	
	return rowData;
};

CmnUtil.grid.createWaGrid = function(area, caption, gridClick) {
	
	var box = $('<table class="waTable">');
	box.append('<caption>' + caption + '</caption>');
	var colgroup = $('<colgroup>');
	var gc = CmnUtil.grid.props.columns;
	var th = $('<tr>');
	var isRowSpan = gc[0].caption.length > 1;
	var colCnt = 0;
	//헤더는 그리드 설정을 참조함
	for (var inx=0; inx<gc.length; inx++) {
		colgroup.append($('<col>').attr('width', gc[inx].width));
		if (isRowSpan) {
			if (gc[inx].caption[0] === gc[inx].caption[1]) {
				if (colCnt > 0) {
					th.append($('<th tabindex="0" scope="col" colspan="' + colCnt + '">').html(gc[inx-1].caption[0]));
					th.append($('<th tabindex="0" scope="col" rowspan="2">').html(gc[inx].caption[0]));
					colCnt = 0;
				} else {
					th.append($('<th tabindex="0" scope="col" rowspan="2">').html(gc[inx].caption[0]));
				}
			} else {
				colCnt++;
			}
		} else {
			th.append($('<th tabindex="0" scope="col">').html(gc[inx].caption[0]));
		}
	}
	//두 줄로 표현해야하는 헤더가 있을 경우
	if (isRowSpan) {
		var th2 = $('<tr>');
		for (var inx=0; inx<gc.length; inx++) {
			if (gc[inx].caption[0] != gc[inx].caption[1]) {
				th2.append($('<th tabindex="0" scope="col">').html(gc[inx].caption[1]));
			}
		}
		box.append(colgroup, $('<thead>').append(th, th2));
	} else {
		box.append(colgroup, $('<thead>').append(th));
	}
	
	if (!gridClick) gridClick = {};
	
	//데이터는 전체 메모리에 적재한 데이터를 참조한다.
	var tbody = $('<tbody>');
	var totRows = CmnUtil.grid.totRows;
	var len = totRows.length;
	var props = CmnUtil.grid.props;
	for (var inx=0; inx<len; inx++) {
		var tr = $('<tr data-rowindex="' + inx + '">');
		tr.on('keydown', function(e) {
			CmnUtil.grid.curRow = $(this).data('rowindex');
		});
		for (var jnx=0; jnx<props.columns.length; jnx++) {
			var td = $('<td tabindex="0">');
			var span = $('<span>');
			var anchor = null;
			var checkbox = null;
			var textVal = '';
			if (gridClick[jnx]) {
				anchor = $('<a tabindex="0" href="javascript:' + gridClick[jnx] + '()">');
				anchor.data('rd', totRows[inx]);
			}
			if (props.columns[jnx].type == 'checkbox') {
				checkbox = $('<input type="checkbox" class="waGridChk" style="-webkit-appearance:checkbox;appearance:checkbox;" aria-checked="false" />');
				var label = props.columns[jnx].label;
				var labelTxt = label.map(function(v) {
					return totRows[inx][v];
				}).join(',');
				checkbox.attr('aria-label', labelTxt);
				checkbox.on('change', function(e) {
					var isChecked = $(this).is(':checked');
					$(this).attr('aria-checked', isChecked);
				});
			}
			if (typeof props.columns[jnx].renderer == 'function') {
				textVal = props.columns[jnx].renderer.call(this, null, 0, 0, '', totRows[inx]);
			} else {
				textVal = totRows[inx][props.columns[jnx].ref];
			}
			if (checkbox) {
				span.append(checkbox);
			} else if (anchor) {
				anchor.html(textVal);
				span.append(anchor);
			} else {
				span.html(textVal);
			}
			tr.append(td.append(span));
		}
		tbody.append(tr);
	}
	
	box.append(tbody);
	
	$(area).empty();
	$(area).append(box);
	$(area).focus();
	$(window).scrollTop($(area).offset().top - 100);
};

/**
 * 기업용 주소검색 결과 처리
 * 작성자  	:
 * 작성일  	: 2021-11-23
 * 파라미터 	: form
 * 리턴값  	:
 * 기업 copubutil과 동일
 */
CmnUtil.getAddr = function(retAddr) {
	var addr 			= {};
	addr.newZipCd		= retAddr.newZipCd;			// 우편번호
	addr.adType			= retAddr.adType;			// 주소구분
	addr.crtDongNo		= retAddr.crtDongNo;		// 법정동코드
	addr.postSrno		= retAddr.postSrno;			// 우편순차번호
	addr.bldMngNo		= retAddr.bldMngNo;			// 건물관리번호

	//우편번호적용코드
	//주소팝업을 통해 얻은 주소는 모두 신주소(우편번호 5자리)
	switch (retAddr.addType) {								// 1 : 비정제, 2 : 정제
	case '1':												// 비정제주소
		addr.rodNmAd			= retAddr.rodNmAd;			// 기본주소
		addr.dtlList			= retAddr.dtlList;			// 상세주소
		addr.rsdDongBlwAdTxt	= retAddr.rsdDongBlwAdTxt;	// 참고내용

		//우편번호 적용 코드 처리
		if($.trim(retAddr.bldMngNo) == '') {
			addr.zipCdAplyCd = '8';							// 비정제지번
		} else {
			addr.zipCdAplyCd = '6';							// 비정제도로명
		}
		break;
	case '2':												// 정제주소
		addr.rodNmAd			= retAddr.addrBasic			// 기본주소
		addr.dtlList			= retAddr.addrAttached;		// 상세주소
		addr.rsdDongBlwAdTxt	= retAddr.addrReferText;	// 참고내용

		//우편번호 적용 코드 처리
		if($.trim(retAddr.bldMngNo) == '') {
			addr.zipCdAplyCd = '7';							// 정제지번
		} else {
			addr.zipCdAplyCd = '5';							// 정제도로명
		}
		break;
	}

	return addr;
}

/**
 * check 사업자번호
 * 작성자  	:
 * 작성일  	: 2020-01-13
 * 파라미터 	: type=(str)
 * 리턴값  	: boolean
 */
CmnUtil.ckBizNo = function (bizNo) {
	// 넘어온 값의 정수만 추출하여 문자열의 매열로 만들고 10자리숫자인지 확인
	if((bizNo = (bizNo+'').match(/\d{1}/g)).length != 10) {return false;}

	// 합 / 체크키
	var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];

	// 0 ~ 8까지 9개의 숫자를 체크키와 곱하여 합에 더함
	for(var i = 0; i < 9; i++) {
		sum += key[i] * Number(bizNo[i]);
	}

	// 각 8번 배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더함
	// 다시 10의 나머지를 구한 후 그 값을 10에서 빼면 이것이 검증 번호이며 기존 검증번호와 비교하면 됨
	var chkSum = 0;
	chkSum = Math.floor(key[8] * Number(bizNo[8])/10);
	sum += chkSum;
	var reminder = (10 - (sum % 10)) % 10;

	if(reminder == Number(bizNo[9])) {
		return true;
	} else {
		return false;
	}
}