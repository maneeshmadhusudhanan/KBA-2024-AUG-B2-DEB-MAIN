function compareNumbers() {
  const num1 = +document.getElementById('firstNumber').value;
  const num2 = +document.getElementById('secondNumber').value;
  const result = document.getElementById('result');

  if (!num1 && !num2) {
    result.textContent = "Please enter valid numbers.";
  } else if (num1 > num2) {
    result.textContent = `${num1} is greater than ${num2}.`;
  } else if (num1 < num2) {
    result.textContent = `${num1} is less than ${num2}.`;
  } else {
    result.textContent = "Both numbers are equal.";
  }
}
