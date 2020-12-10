import {PopupWithForm} from './PopupWithForm.js';

export class PopupFormSubmit extends PopupWithForm {
    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }
}
