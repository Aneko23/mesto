import {Popup} from './popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._formSelector = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__data');
        this._formValues = {};
        this._inputList.forEach((data) => {
            this._formValues[data.name] = data.value;
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formSelector.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._formSelector.reset();
    }
}
