import {Card} from './card.js';

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            const popupOpened = document.querySelector('.popup_opened');
            this.close(popupOpened);
        }
    }

    _closeClickOverlay(event) { 
        if (event.target == event.currentTarget) { 
            this.close(); 
        } 
    }

    setEventListeners() {
        this._popup.querySelector('.close-button').addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('click', this._closeClickOverlay.bind(this));
    }
}