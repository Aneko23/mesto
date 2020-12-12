import {Popup} from './Popup.js';

export class PopupFormSubmit extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
    }

    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }

    setEventListeners() {
        this._form.addEventListener('submit', () => {
            event.preventDefault()
            this._handleFormSubmit(this.setSubmitAction());
        })
    }
}
