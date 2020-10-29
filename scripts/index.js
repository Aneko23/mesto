import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {popupImage, imageBox, imageText} from './utils.js';
import {initialCards} from './array.js';
import {openPopup, handleClickKey} from './utils.js';

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
const closeImage = popupImage.querySelector('.close-button');
const formPlace = popupPlace.querySelector('.popup__container');

//поля при добавлении каточки с местом
const placeInput = popupPlace.querySelector('.popup__data_place');
const linkInput = popupPlace.querySelector('.popup__data_link');
const submitPlace = popupPlace.querySelector('.submit-button');
const containerCards = document.querySelector('.elements');

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

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClickKey);
};

//закрытие попапа кликом на оверлей
function closeClickOverlay(event) { 
        if (event.target == event.currentTarget) { 
            closePopup(popupImage); 
        } 
};

//создание карточки
function createCard(item){
    const card = new Card(item, config.itemTemplate);
    const element = card.getElement();
    containerCards.prepend(element);
}

//вывод карточек на страницу
initialCards.reverse().forEach(function(item) {
    createCard(item);
});

//добавление новых карточек
formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const item = {
      name: placeInput.value,
      link: linkInput.value
    };
  
    createCard(item);

    closePopup(popupPlace);
  });

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);

});

//активная кнопка
function makeButtonInactive (buttonElement) {
    buttonElement.classList.add('submit-button_inactive');
    buttonElement.setAttribute('disabled', true);
}

formName.addEventListener('submit', handleFormSubmit);

closeButton.addEventListener('click', function() {
    closePopup(popupEdit);
}
);

addButton.addEventListener('click', function(){
    placeInput.value = "";
    linkInput.value = "";
    makeButtonInactive(submitPlace);
    openPopup(popupPlace);

});

closePopupPlace.addEventListener('click', function(){
    closePopup(popupPlace);
});

popupImage.addEventListener('click', closeClickOverlay);

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