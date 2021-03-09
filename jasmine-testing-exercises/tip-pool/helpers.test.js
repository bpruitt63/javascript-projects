describe('helpers tests with setup and teardown', function(){
    beforeEach(function(){
        tipAmtInput.value = 1;
        billAmtInput.value = 10;
        submitPaymentInfo();
    });

    it ('should add up all the bill amounts', function(){
        expect(sumPaymentTotal('billAmt')).toEqual(10);
    });

    it ('should calculate the tip percentage', function(){
        expect(calculateTipPercent(10, 1)).toEqual(10);
    });

    afterEach(function(){
        allPayments = {};
    });
});