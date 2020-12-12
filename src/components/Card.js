class Card {
    constructor({data, handleCardClick, handleDeleteCardClick, handleLikeClick}, selector, myId) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteCardClick;
        this._handleLikeClick = handleLikeClick;
        this._selector = selector;
        this._myId = myId;
        this._ownerId = data.owner._id;
    };

    returnId() {
        return this._id;
    }

    _getTemplate() {
        const cardItem = document
        .querySelector(this._selector)
        .content
        .querySelector('.element__card')
        .cloneNode(true);
        return cardItem;
    };

    _likePicture() {
        this._element.querySelector('.like-counter').textContent = this._likes.length;
        if (this._isLiked()) {
            this._element.querySelector('.button-like').classList.add('button-like_active');
        } else {
            this._element.querySelector('.button-like').classList.remove('button-like_active');
        }
    }

    setLikesData(data) {
        this._likes = data.likes;
        this._likePicture();
        
    }

    deleteHandler() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.button-like').addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })

        if ((this._myId) !== (this._ownerId)) {
            return this._element.querySelector('.delete-button').classList.add('delete-button_inactive');
         }
         else {
             return this._element.querySelector('.delete-button').classList.remove('delete-button_active');
         }

    }

    _isLiked() {
        return Boolean(this._likes.find(card => card._id === this._myId))
    }

    getElement() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__name').textContent = this._name;
        const image = this._element.querySelector('.element__image');
        this._element.querySelector('.like-counter').textContent = this._likes.length;

        if (this._isLiked()) {
            this._element.querySelector('.button-like').classList.add('button-like_active');
        }

        image.src = this._link;
        image.alt = this._name;
        return this._element;

        
    }
}

  export {Card};
  