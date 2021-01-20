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

  // _converterInputs (inputsArray) {
  //   const obj = {};
  //   for(let i = 0; i < inputsArray.length; i++){
  //     obj[`input${i+1}`] = inputsArray[i].value;
  //   }
  //   return obj;
  // }

  clearErrors (dat) {

    const errorText = this.form.querySelectorAll('.error');
    const errorInput = this.form.querySelectorAll('.popup__input');
    const submitBtn = this.form.querySelector('.popup__btn-save');

    if (this.form.closest('.popup-add-card')){
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.classList.remove(this.cfg.submitStateValidSelector);
      submitBtn.classList.add(this.cfg.submitStateInvalidSelector);
    } else { 
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.remove(this.cfg.submitStateInvalidSelector);
      submitBtn.classList.add(this.cfg.submitStateValidSelector);
    }
    
    errorInput.forEach((element) => {
      element.classList.remove(this.cfg.inputInvalidSelector);
    })
    errorText.forEach((element) => {  //span element
      element.textContent = '';
    })
  }

}


