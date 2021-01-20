import { submitAdd } from "../utils/constants";

export default class FormValidator {

  constructor(form, cfg) {
    this.form = form;
    this.cfg = cfg;
  }

  enableValidation () {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners () {
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

  clearErrors () {

    const errorTexts = this.form.querySelectorAll(this.cfg.spanError);
    const errorInputs = this.form.querySelectorAll(this.cfg.inputSelector);
    const submitBtn = this.form.querySelector(this.cfg.submitSelector);

    if (this.form.checkValidity()) {
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.remove(this.cfg.submitStateInvalidSelector);
      submitBtn.classList.add(this.cfg.submitStateValidSelector);
    } else {
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.classList.remove(this.cfg.submitStateValidSelector);
      submitBtn.classList.add(this.cfg.submitStateInvalidSelector);
    }

    errorInputs.forEach((element) => {
      element.classList.remove(this.cfg.inputInvalidSelector);
    })
    errorTexts.forEach((element) => {  //span element
      element.textContent = '';
    })
  }

}


