class Card {
    constructor({data, handleCardClick}, selector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._selector = selector;
    };

    _getTemplate() {
        console.log(this._selector)
        const cardItem = document
        .querySelector(this._selector)
        .content
        .querySelector('.element__card')
        .cloneNode(true);
        console.log(cardItem)
        return cardItem;
    };

    _likePicture() {
        this._element.querySelector('.button-like').classList.toggle('button-like_active');
    }

    _deleteHandler(){
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.button-like').addEventListener('click', () => {
        this._likePicture();
      });

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._deleteHandler();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    getElement() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__name').textContent = this._name;
        const image = this._element.querySelector('.element__image');

        image.src = this._link;
        image.alt = this._name;

        return this._element;
    }
}

  export {Card};