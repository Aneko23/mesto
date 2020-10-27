import {popupImage, imageBox, imageText} from './index.js';

class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
    };

    _getTemplate() {
        return document.querySelector(this._selector).content.cloneNode(true).children[0];
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

        popupImage.classList.toggle('popup_opened');
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

        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;

        return this._element;
    }
}

  export {Card};