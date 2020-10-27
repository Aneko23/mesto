import {Card} from './card.js';
import {FormValidator} from './formValidator.js';

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//для работы с попапом для создания карточки нового места
const addButton = document.querySelector('.add-button');
const popupPlace = document.querySelector('.popup_type_place');
const closePopupPlace = popupPlace.querySelector('.close-button');

//темплейт карточки
const templateCard = document.querySelector('.element').content;

//для работы с попапом для редактирования профиля
const editButton = document.querySelector('.edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formName = popupEdit.querySelector('.popup__container');
const closeButton = popupEdit.querySelector('.close-button');

//поля в профиле (автоматические)
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');

//поля в профиле (для редактирования)
const nameInput = popupEdit.querySelector('.popup__data_name');
const jobInput = popupEdit.querySelector('.popup__data_job');

//для работы с попапом для просмотра картинки
const popupImage = document.querySelector('.popup_type_image');
const closeImage = popupImage.querySelector('.close-button');
const formPlace = popupPlace.querySelector('.popup__container');
const imageText = popupImage.querySelector('.popup__name'); 
const imageBox = popupImage.querySelector('.popup__pic');

//поля при добавлении каточки с местом
const placeInput = popupPlace.querySelector('.popup__data_place');
const linkInput = popupPlace.querySelector('.popup__data_link');

export const config = {
    itemTemplate: ".element",
    formSelector: '.popup__container',
    inputSelector: '.popup__data',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'submit-button_inactive',
    errorClass: 'popup__data_error',
    inputErrorClass: 'popup__input-error_active',
    formNameSelector: '.popup__container_name',
    formPlaceSelector: '.popup__container_place'
}

//обработчик при сохранении данных в профиле
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

//открытие попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleClickKey);
};

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClickKey);
};

//обработчик при нажатии кнопки ESC
function handleClickKey(event) {
    if (event.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

//вывод карточек на страницу
initialCards.forEach(function(item) {
    const card = new Card(item, config.itemTemplate);
    const element = card.getElement();
    const containerCards = document.querySelector('.elements');
    containerCards.append(element);
});

//добавление новых карточек
formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const item = {
      name: placeInput.value,
      link: linkInput.value
    };
  
    const card = new Card(item, config.itemTemplate);
    const element = card.getElement();
    const containerCards = document.querySelector('.elements');
    containerCards.prepend(element);

    closePopup(popupPlace);
  });

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);

});

formName.addEventListener('submit', handleFormSubmit);

closeButton.addEventListener('click', function() {
    closePopup(popupEdit);
}
);

addButton.addEventListener('click', function(){
    openPopup(popupPlace);
});

closePopupPlace.addEventListener('click', function(){
    closePopup(popupPlace);
});

popupImage.addEventListener('click', function(event) { 
    if (event.target == event.currentTarget) { 
        closePopup(popupImage); 
    } 
});

popupEdit.addEventListener('click', function(event) { 
    if (event.target == event.currentTarget) { 
        closePopup(popupEdit); 
    } 
}); 

popupPlace.addEventListener('click', function(event) { 
    if (event.target == event.currentTarget) { 
        closePopup(popupPlace); 
    } 
});

closeImage.addEventListener('click', function(){
    closePopup(popupImage);
});

const formPlaceValidator = new FormValidator(config, config.formPlaceSelector);
formPlaceValidator.enableValidation()

const formNameValidator = new FormValidator(config, config.formNameSelector);
formNameValidator.enableValidation()


export {popupImage, imageBox, imageText}