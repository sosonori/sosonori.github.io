var calculator = CommonPageObject.clone();

/**
 * 공통 변수 정의
 */

/**
 * init 최초 초기화 정의 영역
 */
calculator.init = function (data) {
    CommonPageObject.eventBind(calculator);

    calculator.locAction.repaymentMethodInit();

    Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
    Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
        draw: function (ease) {
            var ctx = this.chart.ctx;
            var easingDecimal = ease || 1;
            var arcs = this.getMeta().data;
            Chart.helpers.each(arcs, function (arc, i) {
                arc.transition(easingDecimal).draw();

                var pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
                var pColor = pArc._view.backgroundColor;

                var vm = arc._view;
                var radius = (vm.outerRadius + vm.innerRadius) / 2;
                var thickness = (vm.outerRadius - vm.innerRadius) / 2;
                var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
                var angle = Math.PI - vm.endAngle - Math.PI / 2;

                ctx.save();
                ctx.translate(vm.x, vm.y);

                ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
                ctx.beginPath();
                ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = vm.backgroundColor;
                ctx.beginPath();
                ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                ctx.fill();

                ctx.restore();
            });
        },
    });

	$("#btnBack").on("click", function () {
        $("#searchResult3").css({ transform: "translateX(-200%)", transition: ".3s" });
    });

    $(".btnTop").on("click", function () {
        $(".footPopup").toggleClass("on");
    });

    $(".btnTop").on("touchstart", function () {
        $(".footPopup").toggleClass("on");
    });

	$("#btnSaveHistory").on("click", function () {
        if ("localStorage" in window) {
			
            if (localStorage.getItem("loanData") != null) {
                var localArray = JSON.parse(localStorage.getItem("loanData"));
            } else {
                var localArray = [];
            }

			//console.log(localArray);
            calculator.loanData.monthly = "";
			calculator.loanData.loanId = ComUtil.string.getCurrDateTime();
            localArray.push(calculator.loanData);
            localStorage.setItem("loanData", JSON.stringify(localArray));

        } else {
            alert("localStorage가 지원되지 않습니다.");
        }
    });

	$("#btnReCalculator").on("click", function () {
		$('.footPopup .titH3').text('History')
		$('.footPopup .inner').html('대출내역이 존재하지 않습니다.');

		if ("localStorage" in window) {
			
            if (localStorage.getItem("loanData") != null) {
                var loanData = JSON.parse(localStorage.getItem("loanData"));
				var html = '';
				$(loanData).each(function (index, elem) {
					html += `
					<li data-index="${index}">
						<div class="info">
							<div class="loanMoney">${ComUtil.mask.addComma(Math.floor(elem.loanMoney))}원</div>
							<div class="date">${elem.loanId.substring(0,4)}.${elem.loanId.substring(4,6)}.${elem.loanId.substring(6,8)} ${elem.loanId.substring(8,10)}:${elem.loanId.substring(10,12)}</div>
							<div class="method">${elem.method}</div>
							<div class="loansDate">${elem.loansDate}개월</div>
							<div class="rates">${(elem.rates * 100).toFixed(1)}%</div>
						</div>
					</li>`;
				});
				$('.footPopup .inner').addClass('loanHistory').html(html);
			}

        } else {
            alert("localStorage가 지원되지 않습니다.");
        }
    });
	
};

function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberToKorean(number){
    var inputNumber  = number < 0 ? false : number;
    var unitWords    = ['', '만 ', '억 ', '조 ', '경 '];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
        var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }

    return resultString;
}

/**
 * 이벤트 정의 영역
 */
calculator.events = {
    "click #nxtBtn": "calculator.event.fn_next", // 다음 버튼
    "click #calculation": "calculator.event.fn_calculation", // 월납입금 예상조회 버튼
};

/**
 * 다음버튼
 */
calculator.event.fn_next = function () {
  SysComm.moveLocation("/yh1/car/car08/H1CAR108S02.do");
};

/**
 * 월납입금 예상조회 버튼
 */
calculator.event.fn_calculation = function () {
    var loanResult = calculator.locAction.calculation();
	calculator.loanData = loanResult;
	console.log(calculator.loanData);

	// setTimeout(() => {
	// 	new Chart(document.getElementById("openedCanvas"), {
	// 		type: "RoundedDoughnut",
	// 		data: {
	// 			datasets: [
	// 				{
	// 					data: [Math.floor(loanResult.totalInterest), loanResult.loanMoney],
	// 					backgroundColor: ["#e77099", "#5da4e7"],
	// 					borderWidth: 0,
	// 				},
	// 			],
	// 		},
	// 		options: {
	// 			cutoutPercentage: 90,
	// 		},
	// 	});
		
	// }, 500);
	$("#searchResult3").css({'transform': 'translateX(-50%)'})

    if (!$("#searchResult3").is(":visible")) {
        // $("#searchResult3").show();
    }
};

/**
 * @param {number} method 상환방법 (0: 원리금 균등 상환, 1: 원금 균등 상환)
 * @param {number} loanMoney 원금;
 * @param {number} rates 이자율
 * @param {number} loansDate 납입기간(월)
 * @param {number} period 거치기간(월)
 */
calculator.locAction.calcLoanInterest = function (method, loanMoney, rates, loansDate, period) {
  var CALC_LOAN_INTEREST_TYPES = {
    0: "원리금균등상환",
    1: "원금균등상환",
    2: "만기일시상환",
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
};

/**
 * 월납입금 계산하기
 */
calculator.locAction.calculation = function () {
  var repaymentMethod = $("input[name=repaymentMethod]:checked"); //상환방법
  var selAmt = $("#selAmt").val(); //대출원금
  var selDateTerm = $("#selDateTerm").val(); //기간
  var selRate = $("#selRate").val(); //금리

  var vRepaymentMethod = Number(repaymentMethod[0].value); // 상환방법
  var vSelAmt = Number(selAmt); // 대출원금
  var vSelDateTerm = Number(selDateTerm); // 기간
  var vSelRate = Number(selRate); // 금리

  // calcLoanInterest(상환방법(0: 원리금, 1: 원금), 대출원금, 이자율, 납입기간(월), 거치기간(월));
  var loanResult = calculator.locAction.calcLoanInterest(vRepaymentMethod, vSelAmt, vSelRate, vSelDateTerm, 0);

  var tbody = "";

  // round: 회차, repayment: 월상환금, interest: 대출이자, payment: 납입원금, balance: 대출잔금
  $(loanResult.monthly).each(function (index, item) {
	tbody += '\
	<tr>\
		<td>' + ComUtil.mask.addComma(Math.floor(item.round)) + '</td>\
		<td>' + ComUtil.mask.addComma(Math.floor(item.repayment)) + '</td>\
		<td>' + ComUtil.mask.addComma(Math.floor(item.interest)) + '</td>\
		<td>' + ComUtil.mask.addComma(Math.floor(item.payment)) + '</td>\
		<td>' + ComUtil.mask.addComma(Math.floor(item.balance)) + '</td>\
	</tr>';
});

  // 월별 납입금액 세팅
  $("#tbody").html(tbody);

  // 조회결과 세팅
  console.log(repaymentMethod[0].title);
  $("#sum1").html(repaymentMethod[0].title);
  $("#sum2").html(ComUtil.mask.addComma(Math.floor(vSelAmt)) + "원");
  $("#sum3").html(selDateTerm + "개월");
  $("#sum4").html((selRate * 100).toFixed(1) + "%");
  $("#sum5").html(ComUtil.mask.addComma(Math.floor(loanResult.totalInterest)) + "원");
  $("#sum6").html(ComUtil.mask.addComma(Math.floor(loanResult.totalRepay)) + "원");
  $("#sum7").html(ComUtil.mask.addComma(Math.floor(loanResult.totalRepay)) + "원");
  $("#sum8").html(numberToKorean(loanResult.totalRepay) + "원");
  return loanResult;
};

/**
 * 상환방법 초기세팅
 */

calculator.locAction.repaymentMethodInit = function () {
  if (SysComm.getParameter("repaymentMethod").length > 0) {
    $("input[name=repaymentMethod][value=" + SysComm.getParameter("repaymentMethod") + "]").trigger("click");
  }
};

/**
 * 페이지 공통 초기화 함수
 */
PageReadyInit = calculator.init;
