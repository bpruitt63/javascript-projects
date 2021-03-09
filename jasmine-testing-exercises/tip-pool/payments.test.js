describe('payments tests with setup and teardown', function(){
    beforeEach(function(){
        tipAmtInput.value = 1;
        billAmtInput.value = 10;
    });

    it('should add payment on submitPaymentInfo()', function(){
        submitPaymentInfo();
        expect(allPayments['payment1'].billAmt).toEqual('10');
        expect(allPayments['payment1'].tipAmt).toEqual('1');
        expect(allPayments['payment1'].tipPercent).toEqual(10);
    });

    it('should create payment on createCurPayment()', function () {
        let expectedPayment = {
          billAmt: '10',
          tipAmt: '1',
          tipPercent: 10,
        }
        expect(createCurPayment()).toEqual(expectedPayment);
      });

      it('should update paymentTable on appendPaymentTable()', function () {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;
        appendPaymentTable(curPayment);
        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
        expect(curTdList[0].innerText).toEqual('$10');
        expect(curTdList[1].innerText).toEqual('$1');
        expect(curTdList[2].innerText).toEqual('%10');
      });

      afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
      });

});