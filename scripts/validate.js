function showInputError(allSelectorsClasses, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(allSelectorsClasses.inputErrorClass);
    inputElement.classList.add(allSelectorsClasses.errorClass);
}
  
function hideInputError(allSelectorsClasses, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = allSelectorsClasses.errorClass;
    errorElement.classList.remove(allSelectorsClasses.inputErrorClass);
    inputElement.classList.remove(allSelectorsClasses.errorClass);
}

function checkInputValidity(allSelectorsClasses, formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        //показать сообщение с ошибкой
        showInputError(allSelectorsClasses, formElement, inputElement, errorMessage);
    } else {
        //скрыть сообщение с ошибкой
        hideInputError(allSelectorsClasses, formElement, inputElement);
    }
}

function enableFormValidation (allSelectorsClasses, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(allSelectorsClasses.inputSelector));
    const buttonElement = formElement.querySelector(allSelectorsClasses.submitButtonSelector);

    inputList.forEach(function (formInput) {
        formInput.addEventListener('input', function() {
            checkInputValidity(allSelectorsClasses, formElement, formInput);
            toggleButtonState(allSelectorsClasses, inputList, buttonElement);
        });
    });

    formElement.addEventListener('submit', function(event) {
        event.preventDefault();
    })
    toggleButtonState(allSelectorsClasses, inputList, buttonElement);
}

function enableValidation (allSelectorsClasses) {
    const formList = Array.from(document.querySelectorAll(allSelectorsClasses.formSelector));
    formList.forEach(function (formElement) {
        {enableFormValidation(allSelectorsClasses, formElement)};
    });
};

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__data',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'submit-button_inactive',
    errorClass: 'popup__data_error',
    inputErrorClass: 'popup__input-error_active'
});

function hasInvalidInput(inputList){
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

function toggleButtonState(allSelectorsClasses, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(allSelectorsClasses.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(allSelectorsClasses.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
}