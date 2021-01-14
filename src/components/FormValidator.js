export default class FormValidator {

  constructor(form, cfg) {
    this.form = form;
    this.cfg = cfg;
  }

  enableValidation () {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.inputList = this.form.querySelectorAll(this.cfg.inputSelector);
    this.submit = this.form.querySelector(this.cfg.submitSelector);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._submitCheck(this.submit);
      });
    });
  }

  _submitCheck (submit) {
    if(this.form.checkValidity()){
      submit.disabled = false;
      submit.classList.remove(this.cfg.submitStateInvalidSelector);
      submit.classList.add(this.cfg.submitStateValidSelector);

    } else {
      submit.disabled = true;
      submit.classList.remove(this.cfg.submitStateValidSelector);
      submit.classList.add(this.cfg.submitStateInvalidSelector);
    }
  }

  _checkValid (inputElement) {
    if(inputElement.validity.valid) {
      this._hideError(inputElement)
     } else {
      this._showError(inputElement);
     }
   }

  _showError (inputElement) {
    const error = this.form.querySelector(`#${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.cfg.inputInvalidSelector);
  }

  _hideError (inputElement) {
    const error = this.form.querySelector(`#${inputElement.id}-error`);
    error.textContent = '';
    inputElement.classList.remove(this.cfg.inputInvalidSelector);
  }


}


