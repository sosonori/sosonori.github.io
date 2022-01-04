/**
 * 파  일  명   : ComUtil
 * 업      무  : 공통 / 공통JsUtil
 * 설      명  : 공통 JsUtil을 정의한다.
 * 최초  작성자  : BDH
 * 최초 작성일자 : 2019-12-13
 * Coptright 우리카드. All Right Reserved

 -------------------------------------------------
 */
/*
 * ComUtil.string.isNull(str)														문자열이 null이면 true 아니면 false리턴
 * ComUtil.string.nullIsVal(str,val)												문자열이 null 설정값(val)리턴 아닌경우 str리턴
 * ComUtil.string.cfTrim(str)                                                       문자열 공백제거
 * ComUtil.string.replaceAll(str,orgStr,repStr)                                     텍스트 리플레이스
 * ComUtil.string.trim(str)                                                         문자열 공백제거
 * ComUtil.string.shiftTime                                                         설명 달아주세요
 * ComUtil.string.setValTxt(el, cd, txt)                                            SelectBox 형태의 input 객체에 값 세팅
 * ComUtil.string.setVal3(el, cd, txt, txt2)                                        SelectBox 형태의 input 객체에 값 세팅
 * ComUtil.string.getVal(el)                                                        SelectBox 형태의 input 객체의 값 가져오기
 * ComUtil.string.getVal2(el)                                                       설명 달아주세요
 * ComUtil.string.setVal(el, ds, cd)                                                SelectBox 형태의 input 객체에 값 세팅
 * ComUtil.string.getTit(el)                                                        SelectBox 형태의 input 객체의 Title 가져오기
 * ComUtil.string.noDataGrid(id, msg)                                               조회내역이 없을때 화면에 출력되는 메세지 세팅
 * ComUtil.string.numberOfDays(fromDay, toDay)                                      두 날짜사이의 일 수를 계산해 준다.
 * ComUtil.string.getCurrDate(tok)                                                  현재일자를 반환한다
 * ComUtil.string.getTermDate(yyyymmdd, tok, ymd, num)                              해당일자 기준으로 년월일을 + 또는 - 하여 반환한다
 * ComUtil.string.getPrevDate(yyyymmdd, term)                                       현재일을 기준으로 이전 날짜를 구해서 문자열로 반환한다
 * ComUtil.string.getLastDay(year, month)                                           해당년월의 마지막 날짜를 구한다
 * ComUtil.string.getImgUrl(cd)                                                     카드 이미지 가져오기
 * ComUtil.string.payday()                                                          당월 결제일 가져오기
 * ComUtil.string.gvsetDate(fdt, tdt, period, pos)                                  날짜 자동세팅
 * ComUtil.string.setListOpt(d, fn)                                                 목록조회시 더보기, 맨위로, 요약 처리
 * ComUtil.string.clearList                                                         삭제 목록
 * ComUtil.string.mkSelobj(lobj)                                                    SelectBox 목록 객체변환
 * ComUtil.string.mkSelobj2(lobj, opt)                                              SelectBox 목록 객체변환2
 * ComUtil.string.strcut(str,len)                                                   문자열자르기
 * ComUtil.string.getMobileWebUrl()                                                 모바일 웹 URL
 *
 *
 *
 * ComUtil.type.isInteger(strValue)                                                 인자 데이터가 integer 타입인지 체크하는 함수
 * ComUtil.type.chkInputVal(str, restrictionType)                                   설명 달아주세요
 * ComUtil.type.isNumber(pValue)                                                    숫자형 여부를 리턴한다
 * ComUtil.string.getByteLength(str)                                                데이터 길이 반환(한글 2Byte로 계산함)
 * ComUtil.string.lpad(src, len, padStr)                                            Left 빈자리 만큼 padStr 을 붙인다.
 * ComUtil.string.rpad(src, len, padStr)                                            Right 빈자리 만큼 padStr 을 붙인다.
 *
 *
 * ComUtil.mask.stripCommas(numString)                                              콤마(,)를 제거하여 반환한다.
 * ComUtil.mask.addComma(num)                                                       1000단위 콤마 설정
 * ComUtil.mask.fncRegReturn(type,id)                                               정규식 관련 추가
 * ComUtil.mask.numberformat(n, len)                                                숫자포맷
 * ComUtil.mask.custnomask(str)                                                     주민번호 마스킹
 * ComUtil.mask.numberformat4(str , len)                                            이율표시
 * ComUtil.mask.numberformat4a(str , len)                                           이율표시 할부전환내역조회
 * ComUtil.mask.cardnumberformat(str)                                               카드번호 포맷
 * ComUtil.mask.cardmaskformat(str)                                                 카드번호 마스킹 포맷
 * ComUtil.mask.numberformat2(n, len)                                               숫자포맷 - 금액단위 포맷
 * ComUtil.mask.numberformat3(n, len)                                               금액숫자포맷
 * ComUtil.mask.getFormatDate(date, formatstr)                                      포맷된 날짜 가져오기
 * ComUtil.mask.acctformat2(str)                                                    우리은행 계좌번호 포멧
 * ComUtil.mask.numberRpad(str,len)                                                 설명 달아주세요
 * ComUtil.mask.dateformat(str, gbn)                                                날짜형식
 * ComUtil.mask.dateformat2(str)                                                    날짜형식2
 * ComUtil.mask.formateMPayday()                                                    당월 결제일 가져오기(월 포맷)
 * ComUtil.mask.jsPutHanAmt2(obj, type)                                             금액 한글포맷 (원단위)
 * ComUtil.mask.jsPutHanAmt(obj, type)                                              금액 한글포맷 (만원단위)
 *
 *
 * ComUtil.convert.convertArray2SelectData(arr)                                     AFSelectBox 컴펀넌트 create 인자 생성 함수..
 * ComUtil.convert.toDateTimeObj(str)                                               날짜 string을 Date객체로 리턴
 * ComUtil.convert.dateformat(str, gbn)                                             날짜 포맷팅 : default YYYY-MM-DD
 * ComUtil.convert.dtmformat(str, fmt)                                              날짜시간 포맷팅
 * ComUtil.convert.fmtTime(str, gbn)                                                시간 포맷팅
 *
 *
 *
 * ComUtil.validate.isValidData(data)                                               벨리데이션 체크
 * ComUtil.validate.isEnglishName(strValue)                                         인자 데이터가 영어 이름인지 확인하는 함수 (영어 캐릭터 이외에 '-' ',' '.' 허용)
 * ComUtil.validate.compareDate(startDate, endDate)                                 두개의 날짜값을 비교한는 함수
 * ComUtil.validate.isHangul(pValue)                                                한글만 있는지 여부를 리턴한다
 * ComUtil.validate.restrictCharacters(myfield, e, restrictionType, maxLength)      Input 엘리먼트에 입력 가능문자처리
 * ComUtil.validate.cardfmt(obj)                                                    인풋박스 카드포맷 리턴(event.setOnKeyUpHandler)
 * ComUtil.validate.amtfmt(obj)                                                     인풋박스 금액포맷 리턴(event.setOnKeyUpHandler)
 * ComUtil.validate.amtfmt2(obj)                                                    인풋박스 실수형금액(-9,999.9999)
 * ComUtil.validate.compareMoney(a, b)                                              금액비교 (a>=b):true, (a<b):false
 * ComUtil.validate.isValidRegNo(regno)                                             주민등록번호 유효성 검증
 * ComUtil.validate.cardImg(cd)                                                     카드 이미지 보유여부
 * ComUtil.validate.useDscdnm(cd)                                                   이용구분명
 * ComUtil.validate.useDscdnm2(cd)                                                  이용구분명 매출건별조회시
 * ComUtil.validate.checkEmail(email)                                               email 형식 체크
 *
 *
 * ComUtil.ui.clearTable(tobj)                                                      리스트 초기화
 * ComUtil.ui.show(objID)                                                           객체보이기
 * ComUtil.ui.hide(objID)                                                           객체숨김
 *
 *
 *
 *
 * ComUtil.scrollerTop(id)                                                          iScroll top
 * ComUtil.validate.showKeyCode(event)                                              숫자만 체크 하는 함수
 * ComUtil.date.svrToDate()                                                         오늘날짜를 가져오는 함수
 * ComUtil.date.svrTime()                                                           오늘날짜를 가져오는 함수(구현제)
 *
 *
 *
 */


var alphaDigit = /[1234567890a-zA-Z]/g;
var alphaDigitHan = /[0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]/g;

var hanNumber   = new Array ('영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' );
var fourFour    = new Array ('일', '만', '억', '조' );
var fourDigit   = new Array ('일', '십', '백', '천' );

/**
 * eventList / EventList의 개별 함수 모음
 * @param
 * @return
 * @author
 */

var ComUtil = {

	string : {
		isNull : {},
		nullIsVal : {},
		cfTrim : {},
		replaceAll : {},
		trim : {},
		shiftTime : {},
		setValTxt : {},
		setVal3 : {},
		getVal : {},
		getVal2 : {},
		setVal : {},
		getTit : {},
		noDataGrid : {},
		numberOfDays : {},
		getCurrDate : {},
		getTermDate : {},
		getPrevDate : {},
		getLastDay : {},
		getImgUrl : {},
		payday : {},
		gvsetDate : {},
		setListOpt : {},
		clearList : {},
		mkSelobj : {},
		mkSelobj2 : {},
		strcut : {},
		getMobileWebUrl : {},
		rpad : {},
		lpad : {}
	},

	type : {
		isInteger : {},
		chkInputVal : {},
		isNumber : {},
		getByteLength : {}
	},

	mask : {
		addComma : {},
		stripCommas : {},
		fncRegReturn : {},
		numberformat : {},
		custnomask : {},
		numberformat4 : {},
		numberformat4a : {},
		cardnumberformat : {},
		cardmaskformat : {},
		numberformat2 : {},
		numberformat3 : {},
		getFormatDate : {},
		formatDate : {},
		acctformat2 : {},
		numberRpad : {},
		dateformat : {},
		dateformat2 : {},
		formateMPayday : {},
		jsPutHanAmt : {},
		jsPutHanAmt2 : {}
	},

	convert : {
		convertArray2SelectData : {},
		toDateTimeObj : {},
		dateformat : {},
		dtmformat : {},
		fmtTime : {}
	},

	validate : {
		isValidData : {},
		isEnglishName : {},
		compareDate : {},
		isHangul : {},
		restrictCharacters : {},
		cardfmt : {},
		amtfmt : {},
		amtfmt2 : {},
		compareMoney : {},
		zeroPad : {},
		isValidRegNo : {},
		cardImg : {},
		useDscdnm : {},
		useDscdnm2 : {},
		checkEmail : {},
	},
	ui : {
		clearTable : {},
		show : {},
		hide : {},
		scrollerTop : {}
	},
	date : {
		svrToDate : {}
	}
}

/*************************************************************************************
 * string 함수의 영역
 *
 ************************************************************************************/

/**
 * 문자열이 null이면 true 아니면 false리턴
 * 작성자  :
 * 작성일  : 2019-01-20
 * 파라미터 : type=(str)
 * 리턴값  : true/false
 */
ComUtil.string.isNull = function(str) {
	if(str == "" || str == undefined || str == null){
		return true;
	}
	return false;
}

/**
 * 문자열이 null 설정값(val)리턴 아닌경우 str리턴
 * 작성자  :
 * 작성일  : 2019-01-20
 * 파라미터 : type=(str, val)
 * 리턴값  : val, str
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
 * 문자열 공백제거
 * 작성자  : 반동혁
 * 작성일  : 2019-11-19
 * 파라미터 : type=(str)
 * 리턴값  :
 */
ComUtil.string.cfTrim = function(str) {

	return $.trim(str);
}

/**
 * 텍스트 리플레이스
 * @param str
 * @param orgStr
 * @param repStr
 * @returns
 */
ComUtil.string.replaceAll = function(str,orgStr,repStr) {
    if(str == "" || str == undefined || str == null){
		return "";
	}else{
		return str.split(orgStr).join(repStr);
	}
}

/**
 * 문자열 공백제거
 * @param str
 * @returns
 */
ComUtil.string.trim = function(str){

	return $.trim(str);
}

/**
 *
 */
ComUtil.string.shiftTime = function(time,y,m,d) { //moveTime(time,y,m,d,h)
    var date = toDateTimeObj(time);
    date.setFullYear(date.getFullYear() + y); //y년을 더함
    date.setMonth(date.getMonth() + m);       //m월을 더함
    date.setDate(date.getDate() + d);         //d일을 더함
    return date;
}

/**
 * SelectBox 형태의 input 객체에 값 세팅
 * @param el
 * @param cd 코드값
 * @param txt 텍스트값
 */
ComUtil.string.setValTxt = function(el, cd, txt) {
	// [R101706011621] 06/08 보안취약성 점검 대응
	//el = (typeof(el)!="object")?el:eval(el);
	$(el).attr("data-val", cd);
	$(el).val(txt);
}

/**
 * SelectBox 형태의 input 객체에 값 세팅
 * @param el
 * @param cd 코드값
 * @param txt 텍스트값
 * @param txt2 텍스트값
 */
ComUtil.string.setVal3 = function(el, cd, txt, txt2) {
	// [R101706011621] 06/08 보안취약성 점검 대응
	//el = (typeof(el)!="object")?el:eval(el);
	$(el).attr("data-val", cd);
	$(el).val(txt);
	$(el).attr("data-val2", txt2);
}

/**
 * SelectBox 형태의 input 객체의 값 가져오기
 * @param el
 * @returns
 */
ComUtil.string.getVal = function(el) {
	return $(el).attr("data-val");
}

/**
 *
 */
ComUtil.string.getVal2 = function(el) {
	return $(el).attr("data-val2");
}

/**
 * SelectBox 형태의 input 객체에 값 세팅
 * @param el
 * @param ds
 * @param cd
 */
ComUtil.string.setVal = function(el, ds, cd) {
	// [R101706011621] 06/08 보안취약성 점검 대응
	//el = (typeof(el)!="object")?el:eval(el);
	$.each(ds, function(k,v){
		if(v.cd==cd) {
			$(el).attr("data-val", v.cd);
			$(el).val(v.txt);
			return false;
		}
	});
}

/**
 * SelectBox 형태의 input 객체의 Title 가져오기
 * @param el
 * @returns
 */
ComUtil.string.getTit = function(el) {
	return $(el).attr("data-title");
}

/**
 * 조회내역이 없을때 화면에 출력되는 메세지 세팅
 * @param id : div 태그의 ID.
 * @param msg : 화면에 보여질 출력 메세지.
 */
ComUtil.string.noDataGrid = function(id, msg) {
	var dv = "";
	dv = "<span class=\"complete_t02\">";
	dv += msg;
	dv += "</span>";

	$("#"+id).html(dv);
}

/**
 * 두 날짜사이의 일 수를 계산해 준다.
 *
 * @param fromDay :
 *            시작날짜 (형식"20010101")
 * @param toDay :
 *            종료날(형식"20011231")
 * @returns : 날짜차이 수치
 * @예제 : numberOfDays(fromDay, toDay)
 */
ComUtil.string.numberOfDays = function(fromDay, toDay){
    var fromD = new Date(fromDay.substring(0,4),fromDay.substring(4,6)-1,fromDay.substring(6,8));
    var toD = new Date(toDay.substring(0,4),toDay.substring(4,6)-1,toDay.substring(6,8));
    var totD = toD.getTime() - fromD.getTime();
    totD = totD / 1000 / 60 / 60 / 24;
// totD = totD / 1000 / 60 / 60 / 24+1;

    return totD;
}

/**
 * 현재일자를 반환한다.
 */
ComUtil.string.getCurrDate = function(tok) {
	var currDate = new Date();
	var fullYear = currDate.getFullYear();
	var month = ComUtil.string.lpad(currDate.getMonth() + 1, 2, '0');
	var date = ComUtil.string.lpad(currDate.getDate(), 2, '0');
	return fullYear + tok + month + tok + date;
}

/**
 * 해당일자 기준으로 년월일을 + 또는 - 하여 반환한다.
 * ex) ComUtil.string.getTermDate('20191224', '-', 'm', 12)
 */
ComUtil.string.getTermDate = function(yyyymmdd, tok, ymd, num) {
	var yyyy = Number(yyyymmdd.substring(0, 4)) + (ymd == 'y' ? num : 0);
	var mm = Number(yyyymmdd.substring(4, 6)) + (ymd == 'm' ? num : 0) - 1;
	var dd = Number(yyyymmdd.substring(6, 8)) + (ymd == 'd' ? num : 0);
	var termDate = new Date(yyyy, mm , dd);
	var fullYear = termDate.getFullYear();
	var month = ComUtil.string.lpad(termDate.getMonth() + 1, 2, '0');
	var date = ComUtil.string.lpad(termDate.getDate(), 2, '0');
	return fullYear + tok + month + tok + date;
}

/**
 * 현재일을 기준으로 이전 날짜를 구해서 문자열로 반환한다.
 */
ComUtil.string.getPrevDate = function(yyyymmdd, term) {
	var yyyy = yyyymmdd.substring(0, 4);
	var mm = yyyymmdd.substring(4, 6);
	var dd = yyyymmdd.substring(6, 8);

	myDate = new Date();
	myDate.setFullYear(yyyy);
	myDate.setMonth(mm-1);
	myDate.setDate(dd);

	if(term.charAt(term.length-1) == 'd') {
		term = term.substring(0, term.length-1);
		if(Number(term) > 0)
			//[R101706011621] 06/08 보안취약성 점검 대응
			//myDate.setDate(dd - eval(term) +1);
			myDate.setDate(dd - parseInt(term) +1);
		else
			//[R101706011621] 06/08 보안취약성 점검 대응
			//myDate.setDate(dd - eval(term) -1);
			myDate.setDate(dd - parseInt(term) -1);
	}

	if(term.charAt(term.length-1) == 'm') {
		term = term.substring(0, term.length-1);

		if(getLastDay(yyyy,mm) == dd) {
			//[R101706011621] 06/08 보안취약성 점검 대응
			//myDate.setMonth(mm - eval(term));
			myDate.setMonth(mm - parseInt(term));
			myDate.setDate('01');
		} else {
			//[R101706011621] 06/08 보안취약성 점검 대응
			//myDate.setMonth(mm - eval(term) -1);
			myDate.setMonth(mm - parseInt(term) -1);
			if(Number(term) > 0)
				myDate.setDate(myDate.getDate() + 1);
			else
				myDate.setDate(myDate.getDate() - 1);
		}
	}

	yyyy = myDate.getFullYear();
	mm = myDate.getMonth()+1;
	dd = myDate.getDate()-1;

	dd = (dd<=0)?'1':dd;

	dd = (dd<10)?'0'+dd:dd;
	mm = (mm<10)?'0'+mm:mm;

	return yyyy + '/' + mm + '/' + dd;
}

/**
 * 해당년월의 마지막 날짜를 구한다.
 */
ComUtil.string.getLastDay = function(year, month) {
	var lastDay;

	if(month == 1
		|| month == 3
		|| month == 5
		|| month == 7
		|| month == 8
		|| month == 10
		|| month == 12
	)
		lastDay = 31;
	else if(month == 4
		|| month == 6
		|| month == 9
		|| month == 11
	)
		lastDay = 30;
	else {
		if((year % 400) == 0)
			lastDay = 29;
		else if((year % 100) == 0)
			lastDay = 28;
		else if((year % 4) == 0)
			lastDay = 29;
		else
			lastDay = 28;
	}
	return lastDay;
}

/**
 * @param cd 카드코드
 * @returns {String} 이미지URL
 */
ComUtil.string.getImgUrl = function(cd) {

	var CONTENT_URL = getContentUrl();

	var imgURL = "";

	if(cardImg(cd)) {

		imgURL = CONTENT_URL + "/card/img/"+ cd +".png";

	}else {

		imgURL = CONTENT_URL + "/card/img/cimg_default.png";

	}

	return imgURL;

}

/**
 * 당월 결제일 가져오기
 */
ComUtil.string.payday = function(){
	var tmp = "";
	var stl_dt = getUsrInf().STL_DT;

	if(stl_dt >= d){
//		tmp = ((m+1)>12?y+1:y)+""+((m+1)>12?"01":(m+1))+""+stl_dt;
		tmp = ((m+1)>12?y+1:y)+""+formateMPayday()+""+stl_dt;
	}else{
//		tmp = ((m+2)>12?y+1:y)+""+((m+2)>12?"01":(m+2))+""+stl_dt;
		tmp = ((m+2)>12?y+1:y)+""+formateMPayday()+""+stl_dt;
	}

	return tmp;
}
/**
 * 날짜 자동세팅
 * @param fdt : 시작일
 * @param tdt : 종료일
 * @param period : 기간
 * @param pos : 시작기준일자(일(day)기준 숫자 - 예)조회기준일이 내일이면 1, 어제면 -1
 */
ComUtil.string.gvsetDate = function(fdt, tdt, period, pos) {

	var tt, sdt;
	// [R101706011621] 06/08 보안취약성 점검 대응
	//var sel = eval(fdt);
	//var eel = eval(tdt);
	var sel = $(fdt);
	var eel = $(tdt);

	period = (typeof(period)!="undefined")?period.toUpperCase():"";

	if(ComUtil.validate.isValidData(pos)){
		tt = shiftTime(getFormatDate(_today, df.date1), 0, 0, pos);
	}else{
		tt = _today;
	}

	if(period.indexOf("Y")>-1){
		period = (period.substr(0,period.indexOf("Y"))*12)+"m";
	}
	else if(period.indexOf("W")>-1){
		period = (period.substr(0,period.indexOf("W"))*7)+"d";
	}

	// [R101706011621] 06/08 보안취약성 점검 대응
	//eel.value = getFormatDate(tt, df.date2);
	eel.val(getFormatDate(tt, df.date2));
	sdt = getPrevDate(getFormatDate(tt, df.date1), period.toLowerCase());
	// [R101706011621] 06/08 보안취약성 점검 대응
	//sel.value = sdt;
	sel.val(sdt);
}

/**
 * 목록조회시 더보기, 맨위로, 요약 처리
 * @param d : 조회데이타
 * @param fn : more버튼 클릭 콜백함수
 */
ComUtil.string.setListOpt = function(d, fn) {

	if(_more_cnt==0){
		$(".summury").attr("style", "display:none !important");
		$(".top").click(function(){
			//$('html, body').animate( { scrollTop : 0 } ,200);
			$('body').scrollTop(0);
			$(".top").hide();
		}).hide();
		$('.more').hide();
	}

	_more_cnt++;

	$(".summury").attr("style", "display:block");

	//더보기 버튼 최초생성 시 함수 bind
	if($(".more").css("display")=="none") {
		_top_pos = $('.summury').offset().top;
		$(".more").unbind("click");
		$(".more").click(function(){
			fn();
		});
	}

//	if(_more_cnt>1) $(".top").show();

	//더보기 버튼 처리(next 조회건수 없을경우 "")
	if (ComUtil.validate.isValidData(d.GT_CONTAREA) && d.GT_FLAG=="1") {
		_contarea = d.GT_CONTAREA;
		_gtflag = d.GT_FLAG;
		show(".more");
//		$(".more").show();
	} else {
		_contarea = "";
		_gtflag = "";
		hide(".more");
//		$(".more").hide();
	}

	if(ComUtil.validate.isValidData(d.list.grid)){
		if(d.list.grid.length>=def_lcnt && _more_cnt==1) $('body').scrollTop(_top_pos);
	}
};

/**
 * 목록삭제
 * @param id
 */
ComUtil.string.clearList = function(id) {
	var v = $("#"+id);
	v.children().remove();
	v.html('');
//	$(".top").hide();
//	$(".more").hide();
//	$(".summury").attr("style", "display:none !important");
}

/**
 * SelectBox 목록 객체변환
 * @param lobj : selobj = {data : {},col : []} 형태
 * @returns {Array}
 */
ComUtil.string.mkSelobj = function(lobj) {

	var d = lobj.data;
	var cols = lobj.col;
	var vd = new Array();

	$.each(d, function(k,v){
		vd[k] = {};
		for(var i=0;i<3;i++){
			$.each(v, function(kk, vv){
				if(cols[0] == kk) vd[k].txt  = ComUtil.string.trim(vv);
				if(cols[1] == kk) vd[k].cd   = ComUtil.string.trim(vv);
				if(cols[2] == kk) vd[k].rtxt = ComUtil.string.trim(vv);
			});
		}
	});

	return vd;
}

/**
 * SelectBox 목록 객체변환2
 * @param lobj : selobj = {data : {},col : []} 형태
 * 				 화면에 보이는 txt만 col에 정의, 값(cd)는 해당 row전체
 * @param opt : 외화의 통화코드 한글명처리("*")
 * @returns {Array}
 */
ComUtil.string.mkSelobj2 = function(lobj, opt) {

	var d = lobj.data;
	var cols = lobj.col;
	var vd = new Array();
	var curcd = false;
	if(ComUtil.validate.isValidData(opt) && opt=="$") { curcd = true; }

	$.each(d, function(k,v){
		vd[k] = {};
		for(var i=0;i<2;i++){
			$.each(v, function(kk, vv){
				if(cols[0] == kk) {
					if(curcd) {
						vd[k].txt = ComUtil.string.trim(vv) + FOEX_CURNM[FOEX_CURCD.indexOf(vv)];
					}else{
						vd[k].txt = ComUtil.string.trim(vv);
					}
				}
				return;
			});
			vd[k].cd = JSON.stringify(v);
		}
	});

	return vd;
}

/**
 * 문자열자르기
 * @param str 문자열
 * @param len 길이
 * @returns {String}
 */
ComUtil.string.strcut = function(str,len){
	var tmp = "";
	if(str.length > len)
		tmp = str.substring(0,len) + "...";
	else tmp = str;
	return tmp;
}

/**
 * 모바일 웹 URL
 * @returns
 */
ComUtil.string.getMobileWebUrl = function() {
	var url = memoryPreference.get("MOBILEWEB_URL");

	if(!ComUtil.validate.isValidData(url)){
		url = MOBILEWEB_URL;
	}
	return url;
}

/*************************************************************************************
 * type 함수의 영역
 *
 ************************************************************************************/

/**
 * 인자 데이터가 integer 타입인지 체크하는 함수
 * @param strValue (string type)
 * @returns {Boolean}
 */
ComUtil.type.isInteger = function(strValue) {
	var NUM = "0123456789";
	var i;
	if (strValue == null || strValue == "") {
		return false;
	}

	for (i = 0; i < strValue.length; i++) {
		if (NUM.indexOf(strValue.charAt(i)) < 0) {
			return false;
		}
	}
	return true;
}

/**
 * 문자열
 * @param str
 * @param restrictionType : 세팅된 조건이 없을경우 디폴트 alphaDigitHan
 */
ComUtil.type.chkInputVal = function(str, restrictionType) {
	if(!ComUtil.validate.isValidData(str)) return false;
	if(!ComUtil.validate.isValidData(restrictionType)) restrictionType = alphaDigitHan;

	var len1 = str.length;
	var len2 = ComUtil.validate.isValidData(str.match(restrictionType))?str.match(restrictionType).length:0;
	if(len1!=len2){
		return false;
	}else{
		return true;
	}
}

/**
 * 숫자형 여부를 리턴한다
 *
 * @param pValue : 확인할 값
 * @returns : {Boolean}
 * @예제 : isNumber(pValue)
 */
ComUtil.type.isNumber = function(pValue){
	if(!ComUtil.validate.isValidData(pValue)) return false;

	pValue = ComUtil.string.replaceAll(pValue, ",", "");
	pValue = ComUtil.string.replaceAll(pValue, "-", "");

	if(Number(pValue) > 0) {
		return true;
	}

	return false;
}

/**
 * 데이터 길이 반환(한글 2Byte로 계산함)
 *
 * @param str : 확인 데이터
 * @returns : 데이터 length
 * @예제 : getByteLength(str)
 */
ComUtil.string.getByteLength = function(str){
   var len = 0;
   if ( str == null ) return 0;
   for(var i=0;i<str.length;i++){
      var c = escape(str.charAt(i));
      if ( c.length == 1 ) len ++;
      else if ( c.indexOf("%u") != -1 ) len += 2;
      else if ( c.indexOf("%") != -1 ) len += c.length/3;
   }
   return len;
}

/**
 * Left 빈자리 만큼 padStr 을 붙인다.
 * @param src, len, padStr
 * @returns
 */
ComUtil.string.lpad = function(src, len, padStr){
  var retStr = "";
  var padCnt = Number(len) - String(src).length;
  for(var i=0;i<padCnt;i++) retStr += String(padStr);
  return retStr+src;
}

/**
 * Right 빈자리 만큼 padStr 을 붙인다.
 * @param src, len, padStr
 * @returns
 */
ComUtil.string.rpad = function(src, len, padStr){
  var retStr = "";
  var padCnt = Number(len) - String(src).length;
  for(var i=0;i<padCnt;i++) retStr += String(padStr);
  return src+retStr;
}

/**********************************************************************************
 * mask 함수의 영역
 *
 *********************************************************************************/

/**
* 콤마(,)를 제거하여 반환한다.
* @param {Object} numString 콤마를 제거할 값
*/
ComUtil.mask.stripCommas = function(numString) {
    var re = /,/g;
    return numString.replace(re, "");
}

/**
 * 1000단위 콤마 설정
 * 작성자  : 반동혁
 * 작성일  : 2019-11-19
 * 파라미터 : type=(number)
 * 리턴값  :
 */

ComUtil.mask.addComma = function(num) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;

	return num.toString().replace(regexp,",");
}


/**
 * 정규식 관련 추가
 * 작성자  : 반동혁
 * 작성일  : 2019-11-19
 * 파라미터 : type=(email,phone,kor,number,korEn,brizno,email)
 * 리턴값  :
 */
ComUtil.mask.fncRegReturn = function(type,id) {
	 var retVal = null;
	 if(type == "email"){
		 retVal = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;
	 }else if(type == "phone"){
		 retVal = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	 }else if(type == "kor"){
		 retVal = /([^가-힣\x20])/i;
	 }else if(type == "number"){
		 retVal = /^[0-9]/;
	 }else if(type == "korEn"){
		 retVal = /^[가-힣a-zA-Z]+$/;
	 }else if(type == "bizrno"){
		 retVal = /^[0-9]{3}?[0-9]{2}?[0-9]{5}$/;
	 }else if(type == "card"){
		 retVal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 }else if(type == "birth"){
		 retVal = /^(19[0-9][0-9]20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	 }else if(typr == "jumin"){
		 retVal = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0,9]|3[0,1]))-[1-4][0-9]{6}$/;
	 }

	 return retVal.test($(id).val());
}

/**
 * 숫자포맷
 * @param n
 * @param len
 * @returns 99,999,999
 */
ComUtil.mask.numberformat = function(n, len) {

	n += '';
	if(n==''||n=='0') return n;
	n = ComUtil.mask.stripCommas(n);
	n = parseInt(n,10);

    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';

    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');

    return n;
}

/**
 * 주민번호 마스킹
 * @param str
 */
ComUtil.mask.custnomask = function(str) {
	str = ComUtil.string.trim(str);
	var cno = ComUtil.string.replaceAll(str,"-","");
	if(cno.length==13){
		var str1 = str.substr(0,6);
		var str2 = "-*******";
		str = str1 + str2;
	}
	return str;
}

/**
 * 이율표시
 * @param str : '.' 없는 숫자
 * @param len : 소숫점 이하 자리 수
 * @returns {String}
 */
ComUtil.mask.numberformat4 = function(str , len) {
	str = str + '';
	var prestr = "";
	if(str.indexOf("-")>-1){
		prestr = "-";
		str = str.replace("-", "");
	}
	var o = "";
	var p = "";
	str = ComUtil.string.replaceAll(str,",","");
	str = ComUtil.string.trim(Number(str));
	if(str.indexOf(".")!=-1){
		for ( var i=0; i<len; i++ ) {
//			str = "0" + str + "0";
			str = str + "0";
		}
		o = str.substring(0, str.indexOf("."));
		p = str.substring(str.indexOf(".")+1, str.indexOf(".")+1+len);
	}else{
		for ( var i=0; i<len; i++)
			str = "0" + str;
		o = str.substring(0,str.length-len);
		p = str.substring(str.length-len,str.length);
	}
	o = ComUtil.mask.numberformat(o);
	return prestr + o+"."+p;
}

/**
 * 이율표시 할부전환내역조회
 * @param str : '.' 없는 숫자
 * @param len : 소숫점 이하 자리 수
 * @returns {String}
 */
ComUtil.mask.numberformat4a = function(str , len) {
	str = str + '';
	var prestr = "";
	if(str.indexOf("-")>-1){
		prestr = "-";
		str = str.replace("-", "");
	}
	var o = "";
	var p = "";
	str = ComUtil.string.replaceAll(str,",","");
	str = ComUtil.string.trim(Number(str));
	if(str.indexOf(".")!=-1){
		for ( var i=0; i<len; i++ ) {
            //			str = "0" + str + "0";
			str = str + "0";
		}
		o = str.substring(0, str.indexOf("."));
		p = str.substring(str.indexOf(".")+1, str.indexOf(".")+1+len);
	}else{
		for ( var i=0; i<len; i++)
			str = str + "0";
		o = str.substring(0,str.length-len);
		p = str.substring(str.length-len,str.length);
	}
	o = numberformat(o);
	return prestr + o+"."+p;
}

/**
 * 카드번호 포맷
 * @param str
 * @returns {String}
 */
ComUtil.mask.cardnumberformat = function(str) {
	var rstr = "";
	str = ComUtil.string.replaceAll(str, "-", "");
	var str1 = str.substr(0,4);
	var str2 = str.substr(4,4);
	var str3 = str.substr(8,4);
	var str4 = str.substr(12);

	if (str.length<4) {
		rstr = str1;
	} else if (str.length>3 && str.length<8) {
		rstr = str1 + "-" + str2;
	} else if (str.length>7 && str.length<12) {
		rstr = str1 + "-" + str2 + "-" + str3;
	} else {
		rstr = str1 + "-" + str2 + "-" + str3 + "-" + str4;
	}

	return rstr;
}

/**
 * 카드번호 마스킹 포맷
 * @param str
 * @returns {String}
 */
ComUtil.mask.cardmaskformat = function(str){
	var rstr = "";
	str = ComUtil.string.replaceAll(str, "-", "");
	var str1 = str.substr(0,4);
	var str2 = "****";
	var str3 = "****";
	var str4 = str.substr(12);

	if(str.length<4) {
		rstr = str1;
	} else if (str.length>3 && str.length<8) {
		rstr = str1 + "-" + str2;
	} else if (str.length>7 && str.length<12) {
		rstr = str1 + "-" + str2 + "-" + str3;
	} else {
		rstr = str1 + "-" + str2 + "-" + str3 + "-" + str4;
	}

	return rstr;
}

/**
 * 숫자포맷 - 금액단위 포맷
 * @param n
 * @param len : 단위 - default:3(천원단위)
 * @returns 99,999,999 > 99,999
 */
ComUtil.mask.numberformat2 = function(n, len) {

	n += '';
	if(n==''||n=='0') return n;

	n = ComUtil.mask.stripCommas(n);

	var len = (ComUtil.validate.isValidData(len))?len:3; //1000원단위(3)
	n = n.substr(0, (n.length-len));
	n = parseInt(n,10);

	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';

	while (reg.test(n)) {
		n = n.replace(reg, '$1' + ',' + '$2');
	}

	return n;
}

/**
 * 금액숫자포맷
 * @param n
 * @param len : 소숫점 자리(default:2)
 * @returns 99,999,999.99
 */
ComUtil.mask.numberformat3 = function(n, len) {

    var tempV = n;
    var floatnum = "";
    var pos = (ComUtil.validate.isValidData(len))?len:3;

    if(tempV.indexOf(".") != -1) {
        floatnum = tempV.substring(tempV.indexOf("."), tempV.indexOf(".")+1+pos);
        tempV = tempV.substring(0,tempV.indexOf("."));
    }

    var moneyReg = new RegExp('(-?[0-9]+)([0-9]{3})');
    tempV = tempV.replace(/\,/g, "");

    while(moneyReg.test(tempV)) {
        tempV = tempV.replace(moneyReg, '$1,$2');
    }

	return tempV+floatnum;
}

/**
 * 포맷된 날짜 가져오기
 * @param date
 * @param formatstr
 * @returns
 */
ComUtil.mask.getFormatDate = function(date, formatstr){
	var today;

	if (date=='undefined' || date==null || date=="") {
		today = new Date();
	} else {
		today = date;
	}

	if (formatstr=='undefined' || formatstr==null || formatstr=="") {
		formatstr = 'yyyy-MM-dd';
	}

	var strtoday = formatDate(today, formatstr);

	return strtoday;
}

/**
 * 우리은행
 * @param str : 계좌번호
 * @returns
 */
ComUtil.mask.acctformat2 = function(str) {
	var temp = "";

	temp = str.substring(0, str.length-5)+"*****";

	return temp;
}

ComUtil.mask.numberRpad = function(str,len){
	var idxOf;
	var srtVal;
	var substr;
	var orginStr;
	idxOf = str.indexOf(".");

	if (idxOf >-1) {
		orginStr = str.substring(0,str.indexOf("."));
		substr = str.substring(Number(str.indexOf("."))+1);
		srtVal = ComUtil.string.rpad(substr,len,"0");
	} else {
		orginStr = str;
		srtVal = ComUtil.string.rpad("0",len,"0");
	}

	return orginStr + "." + srtVal;
}

/**
 * 날짜형식
 * @param str	날짜
 * @param gbn	구분자
 * @returns
 */
ComUtil.mask.dateformat = function(str, gbn){
	if(typeof gbn === 'undefined' || gbn === null) {
		gbn = "/";
	}
	var yy = str.substr(2,2);
	var mm = str.substr(4,2);
	var dd = str.substr(6,2);
	return yy + gbn +  mm + gbn + dd;
}

/**
* 날짜형식2
* @param str	날짜
* @param gbn	구분자
* @returns
*/
ComUtil.mask.dateformat2 = function(str){
    var yy = str.substr(0,4);
    var mm = str.substr(4,2);
    var dd = str.substr(6,2);
    return yy + "년 " +  mm + "월 " + dd + "일";
}

/**
 * 당월 결제일 가져오기(월 포맷)
 */
ComUtil.mask.formateMPayday = function(){

	var tmp = ((m+2)>12?"01":(m+2));

	//월이 (숫자형)10보다 작은경우 '0'을 붙여준다
	if(tmp < 10)
		tmp = "0"+tmp;

	return tmp;
}

/**
 * 금액 한글포맷 (원단위)
 * @param obj
 * @param type
 * @returns {String}
 */
ComUtil.mask.jsPutHanAmt2 = function(obj, type) {

	num = obj.value;
    str = "";
    strr = num.split(",");
    for (i=0; i<strr.length; i++) {
        str += strr[i];
    }
    num = str;

    // 한글금액 처리
    delimiter = ' ';
    var endValue = ' ';
    var endZValue= ' 영';


    bPos = 0; // 만, 억, 조
    sPos = 0; // 십, 백, 천
    digit = 0;

    if (type==null) {        // 원단위
        bPos = 0; // 만, 억, 조
        sPos = 0; // 십, 백, 천
        endValue = " ";
        endZValue = "영 ";
    } else if (type=='1') {    //만단위
        bPos = 1; // 만, 억, 조
        sPos = 0; // 십, 백, 천
        endValue = " 원";
        endZValue = "영 만";
    } else if (type=='2') {    //십만단위
        bPos = 1; // 만, 억, 조
        sPos = 1; // 십, 백, 천
        endValue = "만 ";
        endZValue = "영 십만";
    } else if (type=='3') {    //백만단위
        bPos = 1; // 만, 억, 조
        sPos = 2; // 십, 백, 천
        endValue = "만 ";
        endZValue = "영 백만";
    }

    szDigit = '';
    is_start = false;
    appendFF = false;
    len = num.length;
    szHan = '';

    for (i=len-1;i>=0;i--) {
        szDigit = num.substring(i,i+1);
        digit = parseInt(szDigit);

        if (digit!=0) {
            if (bPos!=0 && sPos==0) {
                if (is_start==true) szHan += delimiter;
                szHan += fourFour[bPos]; // 만, 억
                appendFF=false;
            }
            if (bPos!=0 && appendFF==true) {
                if (is_start==true) szHan += delimiter;
                szHan += fourFour[bPos]; // 만, 억
                appendFF=false;
            }
            if (sPos!=0) szHan += fourDigit[sPos]; // 십, 백, 천
            szHan += hanNumber[digit]; // 일, 이, 삼
            is_start=true;

        }
        else if (sPos==0 && bPos!=0) appendFF = true;
        sPos++;
        if (sPos%4==0) {
            sPos=0;
            bPos++;
            if (bPos>=4) return "(범위초과)";
        }
    }

    if (is_start==false){
        rslt = '';
            if( document.getElementById(obj.name+"_KorAmt") != null) {
                document.getElementById(obj.name+"_KorAmt").innerHTML = rslt + endZValue;
            }
    } else {
        rslt = '';
        for(i = szHan.length - 1; i >= 0; i--) {
            rslt += szHan.substring(i, i + 1);
        }

        rslt = rslt + endValue;
        if (type=='2' || type=='3'){    //만단위
            rslt = rslt.replace("억만 ","억 ");
            rslt = rslt.replace("조만 ","조 ");
        }

        if( document.getElementById(obj.name+"_KorAmt") != null) {
            document.getElementById(obj.name+"_KorAmt").innerHTML = rslt;
        }
    }
}

/**
 * 금액 한글포맷 (만원단위)
 * @param obj
 * @param type
 * @returns {String}
 */
ComUtil.mask.jsPutHanAmt = function(obj, type) {

	num = obj.value + "0000";
    str = "";
    strr = num.split(",");
    for (i=0; i<strr.length; i++){
        str += strr[i];
    }
    num = str;

    // 한글금액 처리
    delimiter = ' ';
    var endValue = ' 원';
    var endZValue= ' 영';

    bPos = 0; // 만, 억, 조
    sPos = 0; // 십, 백, 천
    digit = 0;

    if (type==null){        // 원단위
        bPos = 0; // 만, 억, 조
        sPos = 0; // 십, 백, 천
        endValue = " 원";
        endZValue = "영 원";
    } else if (type=='1'){    //만단위
        bPos = 1; // 만, 억, 조
        sPos = 0; // 십, 백, 천
        endValue = " 원";
        endZValue = "영 만원";
    } else if (type=='2') {    //십만단위
        bPos = 1; // 만, 억, 조
        sPos = 1; // 십, 백, 천
        endValue = "만 원";
        endZValue = "영 십만원";
    } else if (type=='3') {    //백만단위
        bPos = 1; // 만, 억, 조
        sPos = 2; // 십, 백, 천
        endValue = "만 원";
        endZValue = "영 백만원";
    }

    szDigit = '';
    is_start = false;
    appendFF = false;
    len = num.length;
    szHan = '';

    for (i=len-1;i>=0;i--) {
        szDigit = num.substring(i,i+1);
        digit = parseInt(szDigit);

        if (digit!=0) {
            if (bPos!=0 && sPos==0) {
                if (is_start==true) szHan += delimiter;
                szHan += fourFour[bPos]; // 만, 억
                appendFF=false;
            }
            if (bPos!=0 && appendFF==true) {
                if (is_start==true) szHan += delimiter;
                szHan += fourFour[bPos]; // 만, 억
                appendFF=false;
            }
            if (sPos!=0) szHan += fourDigit[sPos]; // 십, 백, 천
            szHan += hanNumber[digit]; // 일, 이, 삼
            is_start=true;

        }
        else if (sPos==0 && bPos!=0) appendFF = true;
        sPos++;
        if (sPos%4==0) {
            sPos=0;
            bPos++;
            if (bPos>=4) return "(범위초과)";
        }
    }

    if (is_start==false){
        rslt = '';
            if( document.getElementById(obj.name+"_KorAmt") != null)
                document.getElementById(obj.name+"_KorAmt").innerHTML = rslt + endZValue;
    } else {
        rslt = '';
        for(i = szHan.length - 1; i >= 0; i--) {
            rslt += szHan.substring(i, i + 1);
        }

        rslt = rslt + endValue;
        if (type=='2' || type=='3'){    //만단위
            rslt = rslt.replace("억만 원","억 원");
            rslt = rslt.replace("조만 원","조 원");
        }

        if( document.getElementById(obj.name+"_KorAmt") != null)
            document.getElementById(obj.name+"_KorAmt").innerHTML = rslt;
    }
}

/**
 * convert 함수의 영역
 *
 */

/**
 * AFSelectBox 컴펀넌트 create 인자 생성 함수..
 * @param arr (array obj) AFSelectBox 내부 데이터를 저장한 배열
 * @returns {Array}
 */
ComUtil.convert.convertArray2SelectData = function(arr) {
	var selectData = [];
	for(var i=0; i<arr.length; i++) {
		selectData.push({ "option" : arr[i], "value" : arr[i]});
	}
	return selectData;
}

/**
 * 날짜 string을 Date객체로 리턴
 * @param str
 * @returns {Date}
 */
ComUtil.convert.toDateTimeObj = function(str) {
	var len = str.length;
	var d, y, m, d, h, mi, s;
	y = str.substr(0, 4);
	m = str.substr(4, 2) - 1;
	d = str.substr(6, 2);
	h = str.substr(8, 2);
	mi = str.substr(10, 2);
	s = str.substr(12);

	return new Date(y, m, d, h, mi, s);
}

/**
 * 날짜 포맷팅 : default YYYY-MM-DD
 * @param str
 * @param gbn
 * @returns {String}
 */
ComUtil.convert.dateformat = function(str, gbn){
	if(str == null || str == "undefined" || str == "" || str == "00000000"){
		return "";
	}else{

		if(gbn==null || gbn == "undefined" || gbn == ""){
			gbn = ".";
		}

		if (str.length == 8) {
			var yy = str.substr(0,4);
			var mm = str.substr(4,2);
			var dd = str.substr(6,2);
			return yy + gbn +  mm + gbn + dd;
		} else if (str.length == 6) {
			var yy = str.substr(0,4);
			var mm = str.substr(4,2);
			return yy + gbn +  mm ;
		} else if (str.length == 14) {
			var yy = str.substr(0,4);
			var mm = str.substr(4,2);
			var dd = str.substr(6,2);
			return yy + gbn +  mm + gbn + dd;
		}
	}
}

/**
 * 날짜시간 포맷팅
 * @param str
 * @option fmt
 */
ComUtil.convert.dtmformat = function(str, fmt){
	if(str == null || str == "undefined" || str == "" || str == "00000000"){
		return "";
	}
	if (str.indexOf(".")>-1) {
		str = ComUtil.string.replaceAll(str, ".", "");
	} else if (str.indexOf("-")>-1) {
		str = ComUtil.string.replaceAll(str, "-", "");
	} else if (str.indexOf("/")>-1) {
		str = ComUtil.string.replaceAll(str, "/", "");
	}
	var d = toDateTimeObj(str);
	return formatDate(d, fmt);
}

/**
 * 시간 포맷팅
 * @param str
 * @param gbn
 * @returns
 */
ComUtil.convert.fmtTime = function(str, gbn) {
	if(!ComUtil.validate.isValidData(gbn)) gbn = ":";
	str = ComUtil.string.trim(str);
	if (str.length==6) {
		str = str.substr(0,2)+gbn+str.substr(2,2)+gbn+str.substr(4);
	} else if (str.length==4) {
		str = str.substr(0,2)+gbn+str.substr(2,2);
	}
	return str;
}

/*************************************************************************************
 * validate 함수의 영역
 *
 ************************************************************************************/

/**
 * 벨리데이션 체크
 * 작성자  : 반동혁
 * 작성일  : 2019-11-19
 * 파라미터 : type=(data)
 * 리턴값  :
 */
ComUtil.validate.isValidData = function(data) {
	if (typeof data == "undefined") {
		return false;
	}
	data = ComUtil.string.trim(data);
	if (data != null && data != "" && data != "undefined") {
		return true;
	} else {
		return false;
	}
}

/**
 * 인자 데이터가 영어 이름인지 확인하는 함수 (영어 캐릭터 이외에 '-' ',' '.' 허용)
 * @param strValue
 * @returns {Boolean}
 */
ComUtil.validate.isEnglishName = function(strValue) {
	for (var i = 0; i < strValue.length; i++) {
		var char = strValue.charAt(i);
		if (!((char>='a' && char<='z') || (char>='A' && char<='Z') || char==' ' || char=='-' || char==',' || char=='.')) {
			return false;
		}
	}
	return true;
}

/**
 * 두개의 날짜값을 비교한는 함수
 * @param startDate "XXXX-XX-XX"
 * @param endDate "XXXX-XX-XX"
 * @returns {Boolean}
 */
ComUtil.validate.compareDate = function(startDate, endDate) {
	var startDateYear = parseInt(startDate.split(".")[0]);
	var startDateMonth = startDate.split(".")[1];
	var startDateDay = startDate.split(".")[2];
	var endDateYear = endDate.split(".")[0];
	var endDateMonth = endDate.split(".")[1];
	var endDateDay = endDate.split(".")[2];

	startDate = new Date(startDateYear, startDateMonth, startDateDay);
	endDate = new Date(endDateYear, endDateMonth, endDateDay);

	if (startDate <= endDate) {
		return true;
	} else {
		return false;
	}

}

/**
 * 한글만 있는지 여부를 리턴한다
 *
 * @param pValue : 확인할 값
 * @returns : {Boolean}
 * @예제 : isHangul(pValue)
 */
ComUtil.validate.isHangul = function(pValue) {
    if (!ComUtil.validate.isValidData(pValue)) {
    	return false;
    }
	for(var idx=0;idx < pValue.length;idx++) {
		var c = escape(pValue.charAt(idx));
    	if ( c.indexOf("%u") == -1) {
    		return false;
    	}
    }

    return true;
}

/**
 * Input 엘리먼트에 입력 가능문자처리
 * @returns {Boolean}
 */
ComUtil.validate.restrictCharacters = function(myfield, e, restrictionType, maxLength) {
	var code = "";
	if (e.keyCode) {
		code = e.keyCode;
	} else if (e.which) {
		code = e.which;
	}

	//var character = String.fromCharCode(code);
	var character = myfield.value.substring(myfield.value.length-1);

	// if they pressed esc... remove focus from field...
	if (code==27) { myfield.blur(); return false; }

	// ignore if they are press other keys
	// strange because code: 39 is the down key AND ' key...
	// and DEL also equals .
	if (!e.ctrlKey && code!=9 && code!=8 && code!=13 && code!=16 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40) {
		if(typeof maxLength === 'number' && typeof myfield.value === 'string') {
			if(myfield.value.length > maxLength)
				return false;
		}

		if(typeof restrictionType === 'undefined' || restrictionType === null) {
			return true;
		}

		if (character.match(restrictionType)) {
			return true;
		} else {
			return false;
		}
	}
	return true;
}

/**
 * 인풋박스 카드포맷 리턴(event.setOnKeyUpHandler)
 * @param e
 */
ComUtil.validate.cardfmt = function(obj){

    var txt = obj.value;
	if(txt=="") return;
    var res = "";
    //입력 허용 키
    if( (event.keyCode >=  48 && event.keyCode <=  57)	//number 0~9
			|| event.keycode==8 					//backspace
			|| event.keyCode==undefined)			//onblur event
	{
        res = cardnumberformat(txt);
        obj.value = res;
    } else if (event.keyCode!=8) {
        res = txt.substr(0, txt.length-1);
        res = cardnumberformat(res);
        obj.value = res;
    }
}

/**
 * 인풋박스 금액포맷 리턴(event.setOnKeyUpHandler)
 * @param obj
 */
ComUtil.validate.amtfmt = function(obj){

	var txt = obj.value;
	if(txt=="") return;
	var res = "";

	//입력 허용 키
	if(event==undefined || (event.keyCode >=  48 && event.keyCode <=  57)	//number 0~9
			|| event.keyCode==8 					//backspace
			|| event.keyCode==undefined)			//onblur event
	{
		//res = numberformat(txt);
		res = txt;
		obj.value = res;
		$("#"+obj.name).addClass("tRight");
	} else {
//		res = txt.substr(0, txt.length-1);
//		//res = numberformat(res);
//		obj.value = res;
		return;
	}

	obj.focus();
}

/**
 * 인풋박스 실수형금액(-9,999.9999)
 * @param obj
 */
ComUtil.validate.amtfmt2 = function(obj) {

	var tempV = obj.value;
	if(tempV=="."){
		tempV = "0.";
	}

	var res = "";
	var floatnum = "";
	var minus = "-";

	if (tempV.indexOf("-") == 0) {
		tempV = tempV.substring(1);
	} else {
		minus = "";
	}

	//입력 허용 키
	if(event==undefined || (event.keyCode >=  48 && event.keyCode <=  57)	//number 0~9
			|| event.keyCode==8 		//backspace
			|| event.keyCode==189		//-
			|| event.keyCode==190		//.
			|| event.keyCode==undefined)//onblur event
	{

		if(tempV.indexOf(".") != -1) {
			floatnum = tempV.substring(tempV.indexOf(".")+1, parseInt(tempV.indexOf(".") + 5)); //소숫점4자리
			tempV = tempV.substring(0,tempV.indexOf("."));	//정수자리
			res = minus + numberformat(tempV)+"."+ComUtil.string.replaceAll(floatnum, ".", "");
		} else {
			res = minus + numberformat(tempV);
		}

	} else {
		res = tempV.substr(0, tempV.length-1);
		if(tempV.indexOf(".") != -1) {
			res = minus + res;
		} else {
			res = minus + numberformat(res);
		}
		obj.value = res;
	}
    obj.value = res;
}

/**
 * 금액비교 (a>=b):true, (a<b):false
 * @param a
 * @param b
 * @returns boolean
 */
ComUtil.validate.compareMoney = function(a, b) {
	var tf = false;
	if (ComUtil.validate.isValidData(a) && ComUtil.validate.isValidData(b)) {
		a = parseInt(ComUtil.mask.stripCommas(a));
		b = parseInt(ComUtil.mask.stripCommas(b));
		if ((a-b)>=0) {
			tf = true;
		} else {
			tf=false;
		}
	}
	return tf;
}

ComUtil.validate.zeroPad  = function(n) {
	return (n < 10 ? '0' : '') + n;
}

/**
 * 주민등록번호 유효성 검증
 * @param regno : 주민번호.
 */
ComUtil.validate.isValidRegNo = function(regno){
	if ((regno.length != 13) || (!ComUtil.type.isInteger(regno))) {
		return false;
	}
	var ju = regno.substring(0,6);
	var ju1 = regno.substring(6);
	juid = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
	for(var i = 0; i<6;i++) {
		juid[i] = ju.substring(i,i+1);
	}
	for(i=0;i<7;i++) {
		juid[i+6] = ju1.substring(i,i+1);
	}
	for(var sum = 0, i = 0;i<12;i++) {
		sum += juid[i] * ((i >7) ? (i-6) : (i+2));
	}
	var mod = 11 - sum%11;
	if(mod >= 10) {
		mod -= 10;
	}
	if(mod != juid[12]) {
		return false;
	}
	else {
		return true;
	}
}


/**
 * 카드 이미지 보유여부
 * @param cd 카드 코드
 */
ComUtil.validate.cardImg = function(cd) {
	var rtn_val = false;
	$.each(CARD_IMG_LIST, function(k, v){
		if (v == cd) {
			rtn_val = true;
			return false;
		}
	});

	return rtn_val;
}

/**
 * 이용구분명
 * @param cd 코드
 * @returns {String}
 */
ComUtil.validate.useDscdnm = function(cd){
	var USE_DSCD_NM = "";
	if(cd == "00") { USE_DSCD_NM = "일시불"; }
	if(cd == "01") { USE_DSCD_NM = "할부"; }
	if(cd == "02") { USE_DSCD_NM = "현금"; }
	if(cd == "03") { USE_DSCD_NM = "리볼빙(일시불)"; }
	if(cd == "04") { USE_DSCD_NM = "리볼빙(현금)"; }
	if(cd == "05") { USE_DSCD_NM = "리볼빙"; }
	if(cd == "06") { USE_DSCD_NM = "카드론"; }
	if(cd == "07") { USE_DSCD_NM = "대환론"; }
	if(cd == "08") { USE_DSCD_NM = "해외일시불"; }
	if(cd == "09") { USE_DSCD_NM = "해외현금"; }
	if(cd == "10") { USE_DSCD_NM = "선할인"; }
	if(cd == "11") { USE_DSCD_NM = "연회비"; }

	return USE_DSCD_NM;
}

/**
 * 이용구분명 매출건별조회시
 * @param cd 코드
 * @returns {String}
 */
ComUtil.validate.useDscdnm2 = function(cd){
//	매출건별 조회시 구분 00:전체, 01:일시불, 02:할부, 03:현금서비스, 04:리볼빙약정, 05:카드론, 06:대환론, 07:해외, 09:연회비
	var USE_DSCD_NM = "";
	if(cd == "00") { USE_DSCD_NM = "전체"; }
	if(cd == "01") { USE_DSCD_NM = "일시불"; }
	if(cd == "02") { USE_DSCD_NM = "할부"; }
	if(cd == "03") { USE_DSCD_NM = "현금서비스"; }
	if(cd == "04") { USE_DSCD_NM = "리볼빙"; }
	if(cd == "05") { USE_DSCD_NM = "카드론"; }
	if(cd == "06") { USE_DSCD_NM = "대환론"; }
	if(cd == "07") { USE_DSCD_NM = "해외"; }
	if(cd == "09") { USE_DSCD_NM = "연회비"; }

	return USE_DSCD_NM;
}

/**
 * email 형식 체크
 * @returns {String}
 */
ComUtil.validate.checkEmail = function(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!email.match(filter)) {
    	return false;
    }
    return true;
}

/*************************************************************************************
 * UI 함수의 영역
 *
 ************************************************************************************/

/**
 * 리스트 초기화
 * @param tobj
 */
ComUtil.ui.clearTable = function(tobj){

	for(var i=tobj.data.data.length; i > 0; i--) {
		tobj.data.deleteRowData(i-1);
    }
}

/*************************************************************************************
 * 공통UI class처리 start
 *
 ************************************************************************************/

/**
 * 객체보이기
 */
ComUtil.ui.show = function(objID) {
	if(objID.indexOf(".") >= 0 ) {
		$(objID).attr("style", "display:webkit-box");
	} else {
		$("#"+objID).attr("style", "display:webkit-box");
	}
}
/**
 * 객체숨김
 */
ComUtil.ui.hide = function(objID) {
	if(objID.indexOf(".") >= 0 ) {
		$(objID).attr("style", "display:none !important");
	} else {
		$("#"+objID).attr("style", "display:none !important");
	}
}

/*************************************************************************************
 * 공통UI class처리 end
 *
 ************************************************************************************/

/**
 * iScroll top
 */
ComUtil.scrollerTop = function(id) {

	if(ComUtil.validate.isValidData(id)) {
		id.scrollTo(0,0 ,500);
	}
}

/**
 * 숫자만 체크 하는 함수
 *
 */
ComUtil.validate.showKeyCode = function(event) {

	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9 ) {
		return;
	} else {
		return false;
	}
}

/**
 * 오늘날짜를 가져오는 함수
 *
 */
ComUtil.date.svrToDate = function() {

	var st = ComUtil.date.svrTime();

	return st;
}

/**
 * 오늘날짜를 가져오는 함수(구현제)
 *
 */
ComUtil.date.svrTime = function() {

	var xmlHttp;
	function srvTime(){
	    if (window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다.
	        xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등
	        xmlHttp.open('HEAD',window.location.href.toString(),false);
	        xmlHttp.setRequestHeader("Content-Type", "text/html");
	        xmlHttp.send('');
	        return xmlHttp.getResponseHeader("Date");
	    } else if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
	        xmlHttp.open('HEAD',window.location.href.toString(),false);
	        xmlHttp.setRequestHeader("Content-Type", "text/html");
	        xmlHttp.send('');
	        return xmlHttp.getResponseHeader("Date");
	    }
	}

}
