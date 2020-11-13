const popupImage = document.querySelector('.popup_type_image');
const elementCard = document.querySelector('.element');

//поля в профиле (автоматические)
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');

//для работы с попапом для создания карточки нового места
export const addButton = document.querySelector('.add-button');
//const popupPlace = document.querySelector('.popup_type_place');

//для работы с попапом для редактирования профиля
export const editButton = document.querySelector('.edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formName = popupEdit.querySelector('.popup__container');

//поля в профиле (для редактирования)
const nameInput = popupEdit.querySelector('.popup__data_name');
const jobInput = popupEdit.querySelector('.popup__data_job');

//для работы с попапом для просмотра картинки
//const formPlace = popupPlace.querySelector('.popup__container');

//поля при добавлении каточки с местом
const placeInput = popupPlace.querySelector('.popup__data_place');
const linkInput = popupPlace.querySelector('.popup__data_link');
export const submitPlace = popupPlace.querySelector('.submit-button');
//const containerCards = document.querySelector('.elements');

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

export {popupImage, elementCard, profileName, profileJob, nameInput, jobInput};
