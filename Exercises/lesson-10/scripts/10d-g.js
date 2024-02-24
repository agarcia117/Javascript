function toggle(className) {
  const buttonElement = document.querySelector('.' + className);

  const prevButtonElement = document.querySelector('.' + 'is-toggled');

  if (buttonElement.classList.contains('is-toggled')){
    buttonElement.classList.remove('is-toggled');
  } else {
    buttonElement.classList.add('is-toggled');
  }

  if(prevButtonElement) {
    prevButtonElement.classList.remove('is-toggled');
  }
}