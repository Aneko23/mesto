import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
    }

    _renderLoading(isLoading) {
        if(isLoading) {
            console.log('Есть контакт')
            this._form.querySelector('.submit-button').textContent = 'Сохранение...';  
        } else {
            this._form.querySelector('.submit-button').textContent = 'Сохранить';  
        }
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
        this._form.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}
