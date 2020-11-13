import {Popup} from '../components/Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }

    open(dataName, dataLink) {
        this._popup.querySelector(('.popup__name')).textContent = dataName;
        this._popup.querySelector('.popup__pic').src = dataLink;
        super.open();
    }
}