export class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = config.formSelector; //'.popup__container'
        this._config = config;
        this._formElement = document.querySelector(formSelector);
        this._inputSelector = config.inputSelector; //'.popup__data'
        this._submitButtonSelector = config.submitButtonSelector; //'.submit-button'
        this._inactiveButtonClass = config.inactiveButtonClass; //'submit-button_inactive'
        this._errorClass = config.errorClass; //'popup__data_error'
        this._inputErrorClass = config.inputErrorClass; //'popup__input-error_active'
    }

    _enableFormValidation () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity( inputElement);
              this._toggleButtonState(inputList, buttonElement);
            });
          });
    
        this._toggleButtonState(inputList, buttonElement);
    }

    _getErrorMessage(inputElement) {
        return inputElement.validationMessage;
    }

    _checkInputValidity(inputElement) {
        const isInputNotValid = !inputElement.validity.valid;
    
        if (isInputNotValid) {
            const errorMessage = this._getErrorMessage(inputElement);
            //показать сообщение с ошибкой
            this._showInputError(inputElement, errorMessage);
        } else {
            //скрыть сообщение с ошибкой
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList){
        return inputList.some((inputElement) => !inputElement.validity.valid);
      }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._inputErrorClass);
        inputElement.classList.add(this._errorClass);
    }
      
    _hideInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
        errorElement.textContent = errorMessage;
        errorElement.classList.remove(this._inputErrorClass);
        inputElement.classList.remove(this._errorClass);
    }
    
    enableValidation() {
        const submitFormHandler = (event) => {
          event.preventDefault();

        };
        this._formElement.addEventListener("submit", submitFormHandler);
    
        this._enableFormValidation();
      };
    
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }
}