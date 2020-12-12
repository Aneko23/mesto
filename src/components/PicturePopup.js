import {Popup} from '../components/Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }

    open(dataName, dataLink) {
        const popupPic = this._popup.querySelector('.popup__pic')
        this._popup.querySelector(('.popup__name')).textContent = dataName;
        popupPic.src = dataLink;
        popupPic.alt = dataName;
        super.open();
    }
}