
it('should calculate the monthly rate correctly', function () {
  const values = { amount: 10000, years: 5, rate: 12 };
  expect(calculateMonthlyPayment(values)).toEqual('222.44');
});


it("should return a result with 2 decimal places", function() {
  const values = { amount: 24513, years: 10, rate: 5 };
  expect(calculateMonthlyPayment(values)).toEqual('260.00');
});

/// etc
