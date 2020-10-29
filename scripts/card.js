import {popupImage, imageBox, imageText} from './utils.js';
import {openPopup} from './utils.js';

class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
    };

    _getTemplate() {
        return document.querySelector(this._selector).content.querySelector('.element__card').cloneNode(true);
    };

    _likePicture() {
        this._element.querySelector('.button-like').classList.toggle('button-like_active');
    }

    _deleteHandler(){
        this._element.remove();
    }

    _openBigPicture() {
        imageBox.src = this._link;
        imageText.textContent = this._name;

        openPopup(popupImage);
    }

    _setEventListeners() {
        this._element.querySelector('.button-like').addEventListener('click', () => {
        this._likePicture();
      });

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._deleteHandler();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openBigPicture();
        })
    }

    getElement() {
        this._element = this._getTemplate();
        const image = this._element.querySelector('.element__image');

        this._setEventListeners();

        image.src = this._link;
        image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;

        return this._element;
    }
}

  export {Card};