import {Popup} from './popup.js';
import {imageBox, imageText} from './utils.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }

    open(dataName, dataLink) {
        imageText.textContent = dataName;
        imageBox.src = dataLink;
        super.open();
    }
}