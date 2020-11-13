export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
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