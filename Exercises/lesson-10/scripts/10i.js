let calculation = localStorage.getItem('calculation') ? localStorage.getItem('calculation') : '';

document.querySelector('.display-calculations').innerHTML = calculation;

function updateCalculation(appended) {
  calculation += appended;
  localStorage.setItem('calculation', calculation);
  document.querySelector('.display-calculations').innerHTML = calculation;
  console.log(calculation);
}