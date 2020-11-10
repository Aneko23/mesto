import css from '../pages/index.css';
import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {initialCards} from './array.js';
import {PopupWithForm} from './popupWithForm.js';
import {PopupWithImage} from './popupWithImage.js';
import {Section} from './section.js';
import { UserInfo } from './userInfo.js';
import {nameInput, jobInput} from './utils.js';

//для работы с попапом для создания карточки нового места
const addButton = document.querySelector('.add-button');
const popupPlace = document.querySelector('.popup_type_place');

//для работы с попапом для редактирования профиля
const editButton = document.querySelector('.edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formName = popupEdit.querySelector('.popup__container');

//для работы с попапом для просмотра картинки
const formPlace = popupPlace.querySelector('.popup__container');

//поля при добавлении каточки с местом
const placeInput = popupPlace.querySelector('.popup__data_place');
const linkInput = popupPlace.querySelector('.popup__data_link');
const submitPlace = popupPlace.querySelector('.submit-button');
const containerCards = document.querySelector('.elements');

const config = {
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

//данные о пользователе
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__work'
});

//открытие попапа с профилем
editButton.addEventListener('click', () => {
    windowEdit.open();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;

})

//попап для редактирования информации о пользователе
const windowEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data);
    }
});
windowEdit.setEventListeners();

//функция для сохранения данных в профиле
function handleFormSubmit(data) {
    userInfo.setUserInfo(data);
    windowEdit.close();
  }

formName.addEventListener('submit', handleFormSubmit);

//открытие попапа для добавления карточки
addButton.addEventListener('click', function(){
    windowAdd.open();
    placeInput.value = "";
    linkInput.value = "";
    makeButtonInactive(submitPlace);

});

//попап для добавления карточки
const windowAdd = new PopupWithForm({
    popupSelector: '.popup_type_place',
    handleFormSubmit: () => {
        createCard();
    }
});
windowAdd.setEventListeners();

//создание попапа для увеличенной картинки
const imageCard = new PopupWithImage('.popup_type_image');
imageCard.setEventListeners();

//отрисовка сохранённой галереи
const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card({data,
            handleCardClick: (text, link) => {
                imageCard.open(text, link);
            }  
        }, ".element");
        console.log(card)
        const element = card.getElement();
        cardsList.addItem(element);
        }
}, '.elements');
cardsList.renderItems(initialCards);

//функция по созданию новой карточки
function createCard(){
    const card = new Card({data: {
        name: placeInput.value,
        link: linkInput.value
    },
    //колбэк, который принимает данные, сформированные в классе Card
    handleCardClick: (text, link) => {
        imageCard.open(text, link);
    }}, config.itemTemplate);
    const element = card.getElement();
    containerCards.prepend(element);
}

//добавление новых карточек
formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    windowAdd.close();
  });

//активная кнопка
function makeButtonInactive (buttonElement) {
    buttonElement.classList.add('submit-button_inactive');
    buttonElement.setAttribute('disabled', true);
}

const formPlaceValidator = new FormValidator(config, config.formPlaceSelector);
formPlaceValidator.enableValidation()

const formNameValidator = new FormValidator(config, config.formNameSelector);
formNameValidator.enableValidation()