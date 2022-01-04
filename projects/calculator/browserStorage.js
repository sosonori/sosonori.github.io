/**
 * 파  일  명   : browserStorage.js
 * 업      무  : 
 * 설      명  : 
 * 최초  작성자  : 강수종
 * 최초 작성일자 : 2020-01-22
 * Coptright 우리카드. All Right Reserved
 -------------------------------------------------
 */

var JsEncrypt = {
	jsPrivateKey: CryptoJS.enc.Hex.parse('WOORICARDSTORAGE'),
	jsPrivateIve: CryptoJS.enc.Hex.parse('WOORICARDSTORAGE'),
	module: CryptoJS.AES
};

/**
 * Session Storage 사용
[ 저장 ]
var paramsJson = $('#frm').serializeToJson();
sessStorage.setItem(paramsJson); // 기본키는 location.pathname, 별도키 사용 시 : sessStorage.setItem('step1', paramsJson);
[ 읽기 ]
console.log(sessStorage.getItem()); // 기본키는 location.pathname, 별도키 사용 시 : sessStorage.getItem('step1');
[ 삭제 ]
sessStorage.removeItem(); // 기본키는 location.pathname, 별도키 사용 시 : sessStorage.removeItem('step1');
sessStorage.clear(); // 전체삭제
 */
var sessStorage = {
	sessKey: function() {
		return location.pathname.substring(location.pathname.lastIndexOf('/')+1);
	},
	isStorage: function() {
		var isRet = false;
		if ( 'sessionStorage' in window ) isRet = true;
		return isRet;
	},
	encrypt: function(strObj) {
		if ( JsEncrypt.module && strObj ) {
			strObj = JsEncrypt.module.encrypt(strObj, JsEncrypt.jsPrivateKey, {iv:JsEncrypt.jsPrivateIve});
		}
		return strObj;
	},
	decrypt: function(strObj) {
		if ( JsEncrypt.module && strObj ) {
			strObj = JsEncrypt.module.decrypt(strObj, JsEncrypt.jsPrivateKey, {iv:JsEncrypt.jsPrivateIve}).toString(CryptoJS.enc.Utf8);
		}
		return strObj
	},
	setItem: function(jsonObj) {
		this.setItemByKey(this.sessKey(), jsonObj);
	},
	setItemByKey: function(key, jsonObj) {
		if ( this.isStorage() ) sessionStorage.setItem(this.encrypt(key), this.encrypt(JSON.stringify(jsonObj)));
		else alert('sessionStorage가 지원되지 않습니다.');
	},
	getItem: function() {
		return this.getItemByKey(this.sessKey());
	},
	getItemByKey: function(key) {
		var value = this.decrypt(sessionStorage.getItem(this.encrypt(key)));
		return value ? JSON.parse(value) : '';
	},
	addItem: function(name, value) {
		this.addItemByKey(this.sessKey(), name, value);
	},
	addItemByKey: function(key, name, value) {
		if ( this.isStorage() ) {
			var jsonObj = JSON.parse(this.decrypt(sessionStorage.getItem(this.encrypt(key))));
			jsonObj[name] = value;
			sessionStorage.setItem(key, this.encrypt(JSON.stringify(jsonObj)));
		} else alert('sessionStorage가 지원되지 않습니다.');
	},
	delItem: function(name) {
		this.delItemByKey(this.sessKey(), name);
	},
	delItemByKey: function(key, name) {
		var jsonObj = JSON.parse(this.decrypt(sessionStorage.getItem(this.encrypt(key))));
		delete jsonObj[name];
		sessionStorage.setItem(key, this.encrypt(JSON.stringify(jsonObj)));
	},
	removeItem: function() {
		this.removeItemByKey(this.sessKey());
	},
	removeItemByKey: function(key) {
		sessionStorage.removeItem(this.encrypt(key));
	},
	clear: function() {
		var efds 		= sessStorage.getItemByKey('eFDS');
		var cdd 		= sessStorage.getItemByKey('loginPop_CDD');
		var loginInfo 	= sessStorage.getItemByKey('loginInfo');
		var ouflPopYn 	= sessStorage.getItemByKey('ouflPopYn');
		var fdsPopYn 	= sessStorage.getItemByKey('fdsPopYn');
		var chatbot_prk = sessStorage.getItemByKey('chatbot_prk'); 
		var chatbot_dhs = sessStorage.getItemByKey('chatbot_dhs'); 
		var chatbot_dsk = sessStorage.getItemByKey('chatbot_dsk'); 
		var loginTime 	= sessStorage.getItemByKey('loginTime');
		var tmpCardGb 	= sessStorage.getItemByKey('tmpCardGb');
		var chatbot_payload = sessStorage.getItemByKey('chatbot_payload');
		sessionStorage.clear();
		sessStorage.setItemByKey('eFDS',		efds);
		sessStorage.setItemByKey('loginPop_CDD',cdd);
		sessStorage.setItemByKey('loginInfo',	loginInfo);
		sessStorage.setItemByKey('ouflPopYn',	ouflPopYn);
		sessStorage.setItemByKey('fdsPopYn', 	fdsPopYn);
		sessStorage.setItemByKey('chatbot_prk', chatbot_prk);
		sessStorage.setItemByKey('chatbot_dhs', chatbot_dhs);
		sessStorage.setItemByKey('chatbot_dsk', chatbot_dsk);
		sessStorage.setItemByKey('loginTime', 	loginTime);
		sessStorage.setItemByKey('tmpCardGb', 	tmpCardGb);
		sessStorage.setItemByKey('chatbot_payload', chatbot_payload);
	}
}

/**
 * Local Storage 사용
[ 저장 ]
locStorage.setItem('id', 'xxxxxxx');
[ 읽기 ]
console.log(locStorage.getItem('id'));
[ 삭제 ]
locStorage.removeItem('id');
locStorage.clear(); // 전체삭제
 */
var locStorage = {
	isStorage: function() {
		return 'localStorage' in window ? true : false;
	},
	encrypt: function(strObj) {
		if ( JsEncrypt.module && strObj ) {
			strObj = JsEncrypt.module.encrypt(strObj, JsEncrypt.jsPrivateKey, {iv:JsEncrypt.jsPrivateIve});
		}
		return strObj;
	},
	decrypt: function(strObj) {
		if ( JsEncrypt.module && strObj ) {
			strObj = JsEncrypt.module.decrypt(strObj, JsEncrypt.jsPrivateKey, {iv:JsEncrypt.jsPrivateIve}).toString(CryptoJS.enc.Utf8);
		}
		return strObj
	},
	setItem: function(key, str) {
		if ( this.isStorage() ) {
			localStorage.setItem(this.encrypt(key), this.encrypt(str));
		} else alert('localStorage가 지원되지 않습니다.');
	},
	getItem: function(key) {
		return this.decrypt(localStorage.getItem(this.encrypt(key)));
	},
	removeItem: function(key) {
		localStorage.removeItem(this.encrypt(key));
	},
	clear: function() {
		localStorage.clear();
	}
}
