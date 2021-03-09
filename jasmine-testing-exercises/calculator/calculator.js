window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = { amount: 10000, years: 5, rate: 12 };
  document.querySelector('#loan-amount').value = values.amount;
  document.querySelector('#loan-years').value = values.years;
  document.querySelector('#loan-rate').value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const current = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(current));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const p = values.amount;
  const i = (values.rate / 100) /12;
  const n = values.years * 12;
  return ((p * i) / (1 - ((1 + i) ** -n))).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector('#monthly-payment').innerText = monthly;
}
