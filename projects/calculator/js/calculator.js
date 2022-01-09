var calculator = CommonPageObject.clone();

/**
 * 공통 변수 정의
 */

/**
 * init 최초 초기화 정의 영역
 */
calculator.init = function (data) {
	CommonPageObject.eventBind(calculator);

	calculator.bind();

	calculator.locAction.repaymentMethodInit();
};

calculator.variable = {
	loanResult: null,
	localLoanData: [],
}

calculator.bind = function () {
	$('#btnBack').on('click', calculator.event.loanRateResult); // 뒤로가기
	$('#btnReCalculate').on('click', calculator.event.loanRateResult); // 다시 계산하기
	$('#btnCalculate').on('click', calculator.event.calculateLoanRate); // 월납입금 예상조회 버튼
	$('.btnTop').on('click touchstart', calculator.event.lrr_foot); // 하단 레이어 팝업
	$('#btnSaveHistory').on('click', calculator.event.saveLoanHistory); // 대출내역 저장하기
	
	$('#selectBankPopup .btnBank').on('click', calculator.event.selectBank); // 은행 선택
	$('#selectBankPopup .btnConfirm').on('click', calculator.event.selectBankConfirm); // 은행 선택 확인
	$('#selectBankPopup .btnClose').on('click', calculator.event.selectBankClose); // 은행 선택 팝업 닫기
};

calculator.event = {
	/**
	 * 월납입금 예상조회 버튼
	 */
	/*searchLoanRate: function () {
		var loanResult = calculator.locAction.calculateLoanRate();
		calculator.loanData = loanResult;
		console.log(calculator.loanData);

		$('#loanRateResult').css({ transform: 'translateX(-50%)' });

		if (!$('#loanRateResult').is(':visible')) {
		}
	},*/
	/**
	 * 월납입금 계산하기
	 */
	calculateLoanRate: function () {
		var repaymentMethod = $('input[name=repaymentMethod]:checked'); //상환방법
		var selAmt = $('#selAmt').val(); //대출원금
		var selDateTerm = $('#selDateTerm').val(); //기간
		var selRate = $('#selRate').val(); //금리

		var vRepaymentMethod = Number(repaymentMethod[0].value); // 상환방법
		var vSelAmt = Number(selAmt); // 대출원금
		var vSelDateTerm = Number(selDateTerm); // 기간
		var vSelRate = Number(selRate); // 금리

		// calcLoanInterest(상환방법(0: 원리금, 1: 원금), 대출원금, 이자율, 납입기간(월), 거치기간(월));
		calculator.variable.loanResult = calculator.locAction.calcLoanInterest(vRepaymentMethod, vSelAmt, vSelRate, vSelDateTerm, 0);
		calculator.tempData = calculator.variable.loanResult;

		calculator.locAction.drawLoanDetail(); // 상세정보 그리기
		calculator.locAction.drawLoanInfo(repaymentMethod, vSelAmt, vSelDateTerm, vSelRate, calculator.variable.loanResult); // 요약정보 그리기

		calculator.event.loanRateResult();
	},

	loanRateResult: function () {
		if ($('.loanRateResult').is('.on')) {
			$('.loanRateResult').removeClass('on');
		} else {
			$('.loanRateResult').addClass('on');
		}
		// 새로운 대출내역 알림 초기화
		$('.notification').attr({ 'aria-live': 'off', 'aria-hidden': false });
	},
	lrr_foot: function () {
		$('.lrr_foot').toggleClass('on');
	},
	saveLoanHistory: function () {
		if ('localStorage' in window) {
			var isDiff = true;
			if (localStorage.getItem('loanData') != null) {
				var newDiff = `${calculator.variable.loanResult.method}/${calculator.variable.loanResult.loanMoney}/${calculator.variable.loanResult.loansDate}/${calculator.variable.loanResult.rates}`;

				calculator.variable.localLoanData = JSON.parse(localStorage.getItem('loanData'));
				$(calculator.variable.localLoanData).each(function (i, e) {
					if (e.diff == newDiff) {
						ux.toast('동일한 대출 내역이 있습니다.');
						isDiff = false;
						setTimeout(() => {
							calculator.locAction.drawLoanHistory();
						}, 1000);
						return false;
					}
				});
			} else {
				var localArray = [];
			}

			if (isDiff == true) {
				calculator.locAction.drawSelectBankPopup();
			}
		} else {
			alert('localStorage가 지원되지 않습니다.');
		}
	},

	/**
	 * 은행 선택
	 */
	selectBank: function () {
		$('.btnBank[aria-selected="true"]').attr('aria-selected', false);
		$(this).attr('aria-selected', true);
	},

	/**
	 * 은행 선택 확인
	 */
	selectBankConfirm: function () {
		var bankId = $('.btnBank[aria-selected="true"]').attr('data-bank');
		var bankName = $('.btnBank[aria-selected="true"]').text();

		calculator.tempData.monthly = '';
		calculator.tempData.bankId = bankId;
		calculator.tempData.bankName = bankName;
		calculator.tempData.loanId = ComUtil.string.getCurrDateTime();
		calculator.tempData.diff = `${calculator.tempData.method}/${calculator.tempData.loanMoney}/${calculator.tempData.loansDate}/${calculator.tempData.rates}`;
		calculator.variable.localLoanData.push(calculator.tempData);
		localStorage.setItem('loanData', JSON.stringify(calculator.variable.localLoanData));

		calculator.event.selectBankClose();

		ux.toast('대출 내역이 저장되었습니다.');

		// 새로운 대출내역 알림
		$('.notification').attr({ 'aria-live': 'polite', 'aria-hidden': true });
	},

	/**
	 * 은행 선택 팝업 닫기
	 */
	selectBankClose: function () {
		$('#selectBankPopup').hide();
	},
	name7: function () {},
	name8: function () {},
};

calculator.locAction = {
	/**
	 * 대출계산결과 요약 그리기
	 */
	drawLoanInfo: function (repaymentMethod, vSelAmt, selDateTerm, selRate, loanResult) {
		$('#sum1').html(repaymentMethod[0].title);
		$('#sum2').html(ComUtil.mask.addComma(Math.floor(vSelAmt)) + '원');
		$('#sum3').html(selDateTerm + '개월');
		$('#sum4').html((selRate * 100).toFixed(1) + '%');
		$('#sum5').html(ComUtil.mask.addComma(Math.floor(loanResult.totalInterest)) + '원');
		$('#sum6').html(ComUtil.mask.addComma(Math.floor(loanResult.totalRepay)) + '원');
		$('#sum7').html(ComUtil.mask.addComma(Math.floor(loanResult.totalRepay)) + '원');
		$('#sum8').html(calculator.locAction.numberToKorean(loanResult.totalRepay) + '원');
	},

	/**
	 * 대출계산결과 상세 그리기
	 */
	drawLoanDetail: function () {
		if (calculator.variable.loanResult == null) return false;

		// round: 회차, repayment: 월상환금, interest: 대출이자, payment: 납입원금, balance: 대출잔금
		var tbody = '';
		$(calculator.variable.loanResult.monthly).each(function (index, item) {
			tbody += `
			<tr tabindex="0">
				<td tabindex="0">${ComUtil.mask.addComma(Math.floor(item.round))}</td>
				<td tabindex="0">${ComUtil.mask.addComma(Math.floor(item.repayment))}</td>
				<td tabindex="0">${ComUtil.mask.addComma(Math.floor(item.interest))}</td>
				<td tabindex="0">${ComUtil.mask.addComma(Math.floor(item.payment))}</td>
				<td tabindex="0">${ComUtil.mask.addComma(Math.floor(item.balance))}</td>
			</tr>`;
		});

		var html = `
		<table class="tableX fixed" data-title="월별 납입금액">
			<caption>회차, 상환금, 이자, 납부원금, 상환후 예정잔액 등으로 구성되어 있습니다.</caption>
			<colgroup>
				<col style="width: 36px" />
				<col style="width: auto" />
				<col style="width: auto" />
				<col style="width: auto" />
				<col style="width: auto" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">회차</th>
					<th scope="col">상환금</th>
					<th scope="col">이자</th>
					<th scope="col">납부원금</th>
					<th scope="col">상환후 예정잔액</th>
				</tr>
			</thead>
			<tbody id="tbody">${tbody}</tbody>
		</table>`;

		// 월별 납입금액 세팅
		$('#loanDetailTitle').html('월별 상환금액');
		$('.lrr_foot .inner').html(html);

		$('.tableX.fixed td').on('focusin', function(){
			$(this).parent('tr').addClass('highlight');
		});
		$('.tableX.fixed td').on('focusout', function(){
			$(this).parent('tr').removeClass('highlight');
		});
	},

	/**
	 * @param {number} method 상환방법 (0: 원리금균등, 1: 원금균등, 2:만기일시)
	 * @param {number} loanMoney 원금;
	 * @param {number} rates 이자율
	 * @param {number} loansDate 납입기간(월)
	 * @param {number} period 거치기간(월)
	 * @returns {object} 대출계산 결과 리턴
	 */
	calcLoanInterest: function (method, loanMoney, rates, loansDate, period) {
		var CALC_LOAN_INTEREST_TYPES = {
			0: '원리금균등상환',
			1: '원금균등상환',
			2: '만기일시상환',
		};

		var __spreadArray =
			(this && this.__spreadArray) ||
			function (to, from) {
				for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
				return to;
			};

		var _a, _b;
		var obj = {
			method: CALC_LOAN_INTEREST_TYPES[method],
			loanMoney: loanMoney,
			rates: rates,
			loansDate: loansDate,
			monthly: [],
			totalInterest: undefined,
			totalRepay: undefined,
		};

		// 원리금균등
		if (method === 0) {
			obj.monthly = __spreadArray([], Array(loansDate)).reduce(function (a, _, i) {
				var _a, _b;
				var interest = ((_a = a[i - 1]) === null || _a === void 0 ? void 0 : _a.balance) * (rates / 12) || loanMoney * (rates / 12); // 대출 이자
				var repayment =
					period && period >= i + 1
						? interest
						: (loanMoney * (rates / 12) * Math.pow(1 + rates / 12, loansDate - (period !== null && period !== void 0 ? period : 0))) /
						  (Math.pow(1 + rates / 12, loansDate - (period !== null && period !== void 0 ? period : 0)) - 1); // 월상환금
				var payment = period && period >= i + 1 ? 0 : repayment - interest; // 납입원금
				var balance = (((_b = a[i - 1]) === null || _b === void 0 ? void 0 : _b.balance) || loanMoney) - repayment + interest; // 대출잔금
				var result = {
					round: i + 1,
					payment: payment,
					interest: interest,
					repayment: repayment,
					balance: balance > 0 ? balance : 0,
				};
				return __spreadArray(__spreadArray([], a), [result]);
			}, []);
		}

		// 원금균등
		if (method === 1) {
			obj.monthly = __spreadArray([], Array(loansDate)).reduce(function (a, _, i) {
				var _a, _b, _c;
				var interest = ((_b = (_a = a[i - 1]) === null || _a === void 0 ? void 0 : _a.balance) !== null && _b !== void 0 ? _b : loanMoney) * (rates / 12); // 대출 이자
				var payment = period && period >= i + 1 ? 0 : loanMoney / (loansDate - (period !== null && period !== void 0 ? period : 0)); // 납입원금
				var repayment = payment + interest; // 월상환금1
				var balance = (((_c = a[i - 1]) === null || _c === void 0 ? void 0 : _c.balance) || loanMoney) - repayment + interest; // 대출잔금
				var result = {
					round: i + 1,
					payment: payment,
					interest: interest,
					repayment: repayment,
					balance: balance > 0 ? balance : 0,
				};
				return __spreadArray(__spreadArray([], a), [result]);
			}, []);
		}

		obj.totalInterest =
			(_a = obj.monthly) === null || _a === void 0
				? void 0
				: _a.reduce(function (a, c) {
						return a + c.interest || 0;
				  }, 0); // 총대출이자
		obj.totalRepay =
			(_b = obj.monthly) === null || _b === void 0
				? void 0
				: _b.reduce(function (a, c) {
						return a + c.repayment || 0;
				  }, 0); // 총상환금액

		// 만기일시
		if (method === 2) {
			var _interest = 0;
			obj.monthly = __spreadArray([], Array(loansDate)).reduce(function (a, _, i) {
				var _a, _b, _c;
				var interest = Math.floor(((_b = (_a = a[i - 1]) === null || _a === void 0 ? void 0 : _a.balance) !== null && _b !== void 0 ? _b : loanMoney) * (rates / 12)); // 대출 이자
				_interest = interest;
				var payment = 0; // 납입원금
				var repayment = payment + interest; // 월상환금
				// var balance = obj.loanMoney; // 대출잔금
				var balance = (((_c = a[i - 1]) === null || _c === void 0 ? void 0 : _c.balance) || loanMoney) - repayment + interest; // 대출잔금
				var result = {
					round: i + 1,
					payment: payment,
					interest: interest,
					repayment: repayment,
					balance: balance > 0 ? balance : 0,
				};
				return __spreadArray(__spreadArray([], a), [result]);
			}, []);

			obj.totalInterest = _interest * obj.loansDate; // 대출 이자
			obj.totalRepay = obj.loanMoney + obj.totalInterest;
		}

		return obj;
	},

	/**
	 * 상환방법 초기세팅
	 */
	repaymentMethodInit: function () {
		if (SysComm.getParameter('repaymentMethod').length > 0) {
			$('input[name=repaymentMethod][value=' + SysComm.getParameter('repaymentMethod') + ']').trigger('click');
		}
	},

	/**
	 * 대출계산 내역 화면 그리기
	 */
	drawLoanHistory: function () {
		if ('localStorage' in window) {
			if (localStorage.getItem('loanData') != null) {
				var loanData = JSON.parse(localStorage.getItem('loanData'));
				console.log(loanData);
				var html = '';
//<div class="date">${loanId.substring(0, 4)}.${loanId.substring(4, 6)}.${loanId.substring(6, 8)} ${loanId.substring(8, 10)}:${loanId.substring(10, 12)}</div>
				$(loanData).each(function (index, elem) {
					var loanId = String(elem.loanId);
					html += `
					<li class="loanHistoryItem" data-index="${index}" data-id="${elem.loanId}" data-diff=${elem.diff}>
						<div class="info">
							<div class="bank" data-bank="${elem.bankId}" data-name="${elem.bankName}">${elem.method}</div>
							<div class="loanMoney"><span class="blind">대출원금</span>${ComUtil.mask.addComma(Math.floor(elem.loanMoney))}원</div>
							<div class="totalInterest"><span class="blind">총대출이자</span>${ComUtil.mask.addComma(Math.floor(elem.totalInterest))}원</div>
							<div class="method"><span class="blind">상환방식</span>${elem.method}</div>
							<div class="loansDate"><span class="blind">대출기간</span>${elem.loansDate}개월</div>
							<div class="rates"><span class="blind">연이자율</span>${(elem.rates * 100).toFixed(1)}%</div>
						</div>
					</li>`;
				});

				$('.lrr_foot .titH3').text('대출계산 내역');
				$('.lrr_foot .inner').addClass('loanHistory').html(html);

				// 선택된 대출계산 내역 삭제
				$('.loanHistoryItem').on('click', function(){
					var loanId = $(this).attr('data-id');
					$(calculator.variable.localLoanData).each(function (index, elem) {
						if(elem.loanId == loanId){
							calculator.variable.localLoanData.splice(index,1);
							console.log(calculator.variable.localLoanData);
						}
					});
					localStorage.setItem('loanData', JSON.stringify(calculator.variable.localLoanData));
					$(this).remove();
				});
			}
		} else {
			alert('localStorage가 지원되지 않습니다.');
		}
	},

	/**
	 * 은행 선택 팝업
	 */
	drawSelectBankPopup: function () {

		if ($('#selectBankPopup').length > 0) {
			$('#selectBankPopup').show();
			return false;
		}

		var bankArr = [
			{ id: 'default', name: '선택안함' },
			{ id: 'kbbank', name: 'KB국민' },
			{ id: 'shinhan', name: '신한' },
			{ id: 'keb', name: '하나' },
			{ id: 'wooribank', name: '우리' },
			{ id: 'nhbank', name: '농협' },
			{ id: 'ibk', name: '기업' },
			{ id: 'kdb', name: '산업' },
			{ id: 'kakaobank', name: '카카오뱅크' },
			{ id: 'tossbank', name: '토스뱅크' },
			{ id: 'kbank', name: '케이뱅크' },
			{ id: 'scbank', name: 'SC제일' },
			{ id: 'citi', name: '한국씨티' },
			{ id: 'jeju', name: '제주' },
			{ id: 'bnk', name: '부산' },
			{ id: 'kjbank', name: '광주' },
			{ id: 'dgb', name: '대구' },
			{ id: 'bnk2', name: '경남' },
			{ id: 'jbbank', name: '전북' },
			{ id: 'fsb', name: '저축' },
			{ id: 'epost', name: '우체국' },
			{ id: 'kfcc', name: '새마을금고' },
			{ id: 'cu', name: '신협' },
			{ id: 'sh', name: '수협' },
			{ id: 'nfcf', name: '산림조합' },
		];

		var list = '';
		$(bankArr).each(function (index, bank) {
			var selected = index == 0 ? true : false;
			list += `<li><button type="button" class="btnBank" data-bank="${bank.id}" aria-selected="${selected}">${bank.name}</button></li>`;
		});

		var html =`
		<div id="selectBankPopup" class="modalPopup">
			<div class="titArea">
				<h3 class="titH3">은행 선택</h3>
				<p class="desc">대출 이자 계산 내역을 표기 시 사용됩니다.</p>
			</div>
			<ul class="bankList">${list}</ul>
			<button type="button" class="btnClose" title="취소하기"></button>
			<button type="button" class="btnConfirm" title="확인">확인</button>
		</div>`;

		$('body').append(html);

		$('#selectBankPopup .btnBank').on('click', calculator.event.selectBank); // 은행 선택
		$('#selectBankPopup .btnConfirm').on('click', calculator.event.selectBankConfirm); // 은행 선택 확인
		$('#selectBankPopup .btnClose').on('click', calculator.event.selectBankClose); // 은행 선택 팝업 닫기
	},

	/**
	 * 금액 숫자 3자리(천단위) 마다 콤마 표시
	 * @param {number} number
	 * @returns
	 */
	numberFormat: function (number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},

	/**
	 * 금액 단위 한글로 표기
	 * @param {number} number
	 * @returns
	 */
	numberToKorean: function (number) {
		var inputNumber = number < 0 ? false : number;
		var unitWords = ['', '만 ', '억 ', '조 ', '경 '];
		var splitUnit = 10000;
		var splitCount = unitWords.length;
		var resultArray = [];
		var resultString = '';

		for (var i = 0; i < splitCount; i++) {
			var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
			unitResult = Math.floor(unitResult);
			if (unitResult > 0) {
				resultArray[i] = unitResult;
			}
		}

		for (var i = 0; i < resultArray.length; i++) {
			if (!resultArray[i]) continue;
			resultString = String(calculator.locAction.numberFormat(resultArray[i])) + unitWords[i] + resultString;
		}

		return resultString;
	},
};

/**
 * 페이지 공통 초기화 함수
 */
PageReadyInit = calculator.init;
