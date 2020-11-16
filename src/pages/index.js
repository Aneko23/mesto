import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../scripts/mock-data.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PicturePopup.js';
import {Section} from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {nameInput, jobInput, addButton, editButton, config, submitPlace} from '../scripts/constans.js';

//данные о пользователе
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__work'
});

//функция для создания карточки
function createCard(data) {
    const newCard = new Card({data,
        handleCardClick: (text, link) => {
            imageCard.open(text, link);
        }  
    }, ".element");
    const element = newCard.getElement();
    return element;
}

//открытие попапа с профилем
editButton.addEventListener('click', () => {
    windowEdit.open();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    console.log(userData)

})

//попап для редактирования информации о пользователе
const windowEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        const profilData = {
            name: data.nameInput,
            job: data.jobInput
        }
        console.log(profilData)
        userInfo.setUserInfo(profilData);
    }
});
windowEdit.setEventListeners();

//открытие попапа для добавления карточки
addButton.addEventListener('click', function(){
    windowAdd.open();
    makeButtonInactive(submitPlace);

});

//попап для добавления карточки
const windowAdd = new PopupWithForm({
    popupSelector: '.popup_type_place',
    handleFormSubmit: (input) => {
        const item = {
            name: input.placeInput,
            link: input.linkInput
        }
        const card = createCard(item);
        cardsList.prependCard(card);
    }});
windowAdd.setEventListeners();


//создание попапа для увеличенной картинки
const imageCard = new PopupWithImage('.popup_type_image');
imageCard.setEventListeners();

//отрисовка сохранённой галереи
const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        const element = createCard(data);
        cardsList.addItem(element);
        }
}, '.elements');
cardsList.renderItems();

//активная кнопка
function makeButtonInactive (buttonElement) {
    buttonElement.classList.add('submit-button_inactive');
    buttonElement.setAttribute('disabled', true);
}

const formPlaceValidator = new FormValidator(config, config.formPlaceSelector);
formPlaceValidator.enableValidation()

const formNameValidator = new FormValidator(config, config.formNameSelector);
formNameValidator.enableValidation()