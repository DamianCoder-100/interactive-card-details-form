// BUTTONS
let continueBtn = document.getElementById('continue-btn');
let confirmBtn = document.getElementById('confirm-btn');

// INPUTS
let inputName = document.getElementById('input-card-name');
let inputNumber = document.getElementById("input-card-num");
let inputMonth = document.getElementById('month');
let inputYear = document.getElementById('year');
let inputCvc = document.getElementById('cvc-input');

// DISPLAYS
let nameDisplay = document.getElementById("card-name");
let numberDisplay = document.getElementById("numbers");
let monthDisplay = document.getElementById('output-month');
let yearDisplay = document.getElementById('output-year');
let cvcDisplay = document.getElementById('cvc-output');

// ERROR
const nameErr = document.getElementById('name-err');
const numErr = document.getElementById('num-err');
const monthErr = document.getElementById('month-err');
const yearErr = document.getElementById('year-err');
const cvcErr = document.getElementById('cvc-err');

// FORM TOGGLES
let formSection = document.getElementById('form-section');
let successSection = document.getElementById('complete-section');

// EVENT LISTENERS
inputName.addEventListener('input', handleName);
inputNumber.addEventListener('input', handleNumber);
inputMonth.addEventListener('input', handleMonth);
inputYear.addEventListener('input', handleYear);
inputCvc.addEventListener('input', handleCvc);

inputName.addEventListener('blur', handleNameFinalize);
inputNumber.addEventListener('blur', handleNumberFinalize);
inputMonth.addEventListener('blur', handleMonthFinalize);

inputNumber.addEventListener('keydown', handleNumberKeydown);
inputMonth.addEventListener('keydown', handleMonthKeydown);

inputName.addEventListener("blur", validateName);
inputNumber.addEventListener("blur", validateNumber);
inputMonth.addEventListener("blur", validateMonth);
inputYear.addEventListener("blur", validateYear);
inputCvc.addEventListener("blur", validateCvc);

continueBtn.addEventListener('click', handleRestForm);
confirmBtn.addEventListener('click', togglePage);

formSection.addEventListener('submit', handleSubmit);

// DEFAULT NAME
const DEFAULT_NAME = 'Jane Appleseed';
const DEFAULT_NUMBER = '0000 0000 0000 0000';
const DEFAULT_MESSAGE_THREE = `Can't be blank`;
const DEFAULT_MESSAGE_TWO = 'Wrong format, numbers only';

// NAME FUNCTION
// While typing — clean input
function handleName() {
  let value = inputName.value;
  // Remove numbers and unwanted characters
  value = value.replace(/[^ \p{L}\-\.']/gu, '');
  // Enforce max length 21 (optional if you already have maxlength in HTML)
  value = value.slice(0, 21);
  inputName.value = value;
  nameDisplay.textContent = value || DEFAULT_NAME;
}

// On blur — normalize and trim
function handleNameFinalize() {
  let value = inputName.value.trim();
  inputName.value = value;
  nameDisplay.textContent = value || DEFAULT_NAME;
}

// NUMBER FUNCTION
function handleNumber() {
  let value = inputNumber.value;
  // Remove everything except digits
  value = value.replace(/\D/g, '');
  // Limit to 16 digits
  value = value.slice(0, 16);
  // Insert space every 4 digits
  value = value.replace(/(.{4})/g, '$1 ').trim();
  inputNumber.value = value;
  numberDisplay.textContent = value || DEFAULT_NUMBER;
}

function handleNumberFinalize() {
  let rawValue = inputNumber.value.replace(/\D/g, '');  // digits only
  let formattedValue = rawValue.replace(/(\d{4})/g, '$1 ').trim(); // add spaces

  inputNumber.value = formattedValue;
  numberDisplay.textContent = formattedValue || DEFAULT_NUMBER;

  if (rawValue.length !== 16) {
    numErr.textContent = 'Card number must be 16 digits';
  } else {
    numErr.textContent = '';
  }
}

function handleNumberKeydown(e) {
  if (e.key === 'Enter') {
    handleNumberFinalize();
    inputNumber.blur();
  }
}

// MONTH FUNCTION
function handleMonth() {
  let value = inputMonth.value.replace(/\D/g, '');
  value = value.slice(0, 2);
  inputMonth.value = value;
  monthDisplay.textContent = value || '00';
}

function handleMonthFinalize() {
  let value = inputMonth.value;
  if (value === '') {
    monthDisplay.textContent = '00';
    return;
  }
  let num = Number(value);
  if (num < 1) num = 1;
  if (num > 12) num = 12;
  inputMonth.value = String(num).padStart(2, '0');
  monthDisplay.textContent = inputMonth.value;
}

function handleMonthKeydown(e) {
  if (e.key === 'Enter') {
    handleMonthFinalize();
    inputMonth.blur();
  }
}


// YEAR FUCNTION
function handleYear() {
  let value = inputYear.value.replace(/\D/g, '');
  value = value.slice(0, 2);
  inputYear.value = value;
  yearDisplay.textContent = value || '00';

}


// CVC FUNCTION
function handleCvc() {
  let value = inputCvc.value.replace(/\D/g, '');
  value = value.slice(0, 3);
  inputCvc.value = value;
  cvcDisplay.textContent = value || '000';
}

// FORM VALIDATION
function validateForm() {
  let hasError = false;
  if (!validateName()) hasError = true;
  if (!validateNumber()) hasError = true;
  if (!validateMonth()) hasError = true;
  if (!validateYear()) hasError = true;
  if (!validateCvc()) hasError = true;
  return !hasError;
}

// VALIDATE FUNCTIONS
// VALIDATE NAME
function validateName() {
  const nameValue = inputName.value.trim();
  if (nameValue === "") {
    nameErr.textContent = "Can't be blank";
    return false;
  } 
    nameErr.textContent = "";
    return true
  }


// VALIDATE NUMBER
function validateNumber() {
  const numberValue = inputNumber.value.replace(/\D/g, '');
  if (!numberValue) {
    numErr.textContent = DEFAULT_MESSAGE_TWO;
    return false;
  }
  if (numberValue.length !== 16) {
    numErr.textContent = "Must be 16 digits";
    return false;
  }
  numErr.textContent = "";
  return true;
}

// VALIDATE MONTH
function validateMonth() {
  const monthValue = inputMonth.value.trim();
  if (monthValue === "") {
    monthErr.textContent = DEFAULT_MESSAGE_THREE;
    return false;
  }
  if (+monthValue < 1 || +monthValue > 12) {
    monthErr.textContent = "Invalid month";
    return false;
  }
  monthErr.textContent = "";
  return true;

}

// VALIDATE YEAR
function validateYear() {
  const yearValue = inputYear.value.trim();
  if (yearValue === "") {
    yearErr.textContent = DEFAULT_MESSAGE_THREE;
    return false;
  }
  yearErr.textContent = "";
  return true
}

// VALIDATE CVC
function validateCvc() {
  const cvcValue = inputCvc.value.trim();
  if (cvcValue === "") {
    cvcErr.textContent = DEFAULT_MESSAGE_THREE;
    return false;
  }
  if (!/^\d{3}$/.test(cvcValue)) {
    cvcErr.textContent = "cvc must be 3 digits";
    return false;
  }
  cvcErr.textContent = "";
  return true
}

function togglePage(e) {
  e.preventDefault()
  const isValid = validateForm();
  if (!validateForm()) return;
  formSection.classList.add('hidden');
  successSection.classList.remove('hidden');
  console.log(formSection, successSection);
};

function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

    formSection.classList.add('hidden');
    successSection.classList.remove('hidden');
  }


function handleRestForm() {
  formSection.classList.remove('hidden');
  successSection.classList.add('hidden');
  // Reset inputs
  inputName.value = "";
  inputNumber.value = "";
  inputMonth.value = "";
  inputYear.value = "";
  inputCvc.value = "";
  // Reset displays
  nameDisplay.textContent = DEFAULT_NAME;
  numberDisplay.textContent = DEFAULT_NUMBER;
  monthDisplay.textContent = "00";
  yearDisplay.textContent = "00";
  cvcDisplay.textContent = "000";
}