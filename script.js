const form = document.getElementById("mortgageForm");
const clearButton = document.getElementById("clearBtn");
const emptyResult = document.getElementById("emptyResult");
const resultCard = document.getElementById("resultCard");
const monthlyAmount = document.getElementById("monthlyAmount");
const totalAmount = document.getElementById("totalAmount");
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
const typeInputs = Array.from(
  document.querySelectorAll('input[name="mortgageType"]'),
);
const formFields = [amountInput, termInput, rateInput];

const moneyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function showResults() {
  emptyResult.classList.add("results--hidden");
  resultCard.classList.remove("results--hidden");
}

function showEmpty() {
  resultCard.classList.add("results--hidden");
  emptyResult.classList.remove("results--hidden");
}

function clearError(input) {
  input.classList.remove("input--error");
  const wrapper = input.closest(".input-group");
  if (wrapper) {
    wrapper.classList.remove("input--error");
  }
  const message = document.getElementById(`${input.id}Error`);
  if (message) {
    message.textContent = "";
  }
}

function setError(input, text) {
  const wrapper = input.closest(".input-group");
  if (wrapper) {
    wrapper.classList.add("input--error");
  } else {
    input.classList.add("input--error");
  }
  const message = document.getElementById(`${input.id}Error`);
  if (message) {
    message.textContent = text;
  }
}

function validateForm() {
  let valid = true;

  formFields.forEach((field) => {
    const value = field.value.trim();

    if (value === "" || Number(value) <= 0 || Number.isNaN(Number(value))) {
      setError(field, "This field is required");
      valid = false;
    } else {
      clearError(field);
    }
  });

  const typeSelected = typeInputs.some((input) => input.checked);
  const typeError = document.getElementById("typeError");
  const radioGroup = document.querySelector(".radio-group");

  if (!typeSelected && typeError) {
    typeError.textContent = "Please select a mortgage type";
    if (radioGroup) {
      radioGroup.classList.add("error");
    }
    valid = false;
  } else if (typeError) {
    typeError.textContent = "";
    if (radioGroup) {
      radioGroup.classList.remove("error");
    }
  }

  return valid;
}

function getMortgageType() {
  return typeInputs.find((input) => input.checked)?.value || "repayment";
}

function calculateRepayment(amount, termYears, ratePercent) {
  const monthlyRate = ratePercent / 100 / 12;
  const months = termYears * 12;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return denominator === 0
    ? amount / months
    : amount * (numerator / denominator);
}

function calculateInterestOnly(amount, termYears, ratePercent) {
  const monthlyRate = ratePercent / 100 / 12;
  return amount * monthlyRate;
}

function updateResults() {
  const amount = Number(amountInput.value.trim());
  const term = Number(termInput.value.trim());
  const rate = Number(rateInput.value.trim());
  const type = getMortgageType();

  let monthly = 0;
  if (type === "repayment") {
    monthly = calculateRepayment(amount, term, rate);
  } else {
    monthly = calculateInterestOnly(amount, term, rate);
  }

  const months = term * 12;
  const total = monthly * months;

  monthlyAmount.textContent = moneyFormatter.format(monthly);
  totalAmount.textContent = moneyFormatter.format(total);
  showResults();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  updateResults();
});

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  form.reset();
  formFields.forEach(clearError);
  const typeError = document.getElementById("typeError");
  const radioGroup = document.querySelector(".radio-group");

  if (typeError) {
    typeError.textContent = "";
  }
  if (radioGroup) {
    radioGroup.classList.remove("error");
  }
  showEmpty();
});

formFields.forEach((field) => {
  field.addEventListener("input", () => {
    if (field.classList.contains("input--error")) {
      clearError(field);
    }
  });
});
