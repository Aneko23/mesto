import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PicturePopup.js';
import {Section} from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {PopupFormSubmit} from '../components/PopupFormSubmit.js';
import {nameInput, jobInput, addButton, editButton, config, submitPlace, avatarBlock, avatarPhoto} from '../scripts/constans.js';
import {Api} from '../components/Api.js'

//
const api = new Api ({
    adress: 'https://mesto.nomoreparties.co',
    token: '31529348-ed42-4e11-a759-e58383781ff0',
    cohortId : `cohort-18`
})

let userId;

    //отрисовка сохранённой галереи 
    const cardsList = new Section({
        renderer: (data) => {
            const element = createCard(data);
            cardsList.addItem(element);
            }
    }, '.elements');

//данные о пользователе
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__work',
    userAvatar: '.profile__avatar',
});

//функция для создания карточки
function createCard(data) {
    const newCard = new Card({data,
        handleCardClick: (text, link) => {
            imageCard.open(text, link);
        },
        handleDeleteCardClick: () => {
            deleteCardPopup.open();
            deleteCardPopup.setSubmitAction(() => {
                api.deleteCard(newCard.returnId())
                .then(() => {
                newCard._deleteHandler()
                deleteCardPopup.close();
            })
            .catch(err => console.log(`Во время удаления карточки возникла проблема : ${err}`))
            })
        },
        handleLikeClick: () => {
            if (!newCard._isLiked()) {
                api.clickLike(newCard.returnId())
                .then((data) => {
                    newCard.setLikesData({...data});
                })
                .catch(err => console.log(`Во время клика по сердечку произошла проблема : ${err}`));
            } else {
                api.deleteLike(newCard.returnId())
                .then((data) => {
                    newCard.setLikesData({...data});
                })
                .catch(err => console.log(`Во время отмены клика произошла проблема : ${err}`));
            }   
               
        },
    }, ".element", userId);
     return newCard.getElement();

}

//открытие попапа с профилем
editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    windowEdit.open();

})

avatarBlock.addEventListener('click', ()=>{
    windowAvatar.open();
});

avatarBlock.addEventListener('mouseover', () => {
    avatarPhoto.style.opacity = '0.4';
    document.querySelector('.edit-pencil').classList.add('edit-pencil_active');
})

avatarBlock.addEventListener('mouseout', () => {
    avatarPhoto.style.opacity = '1';
    document.querySelector('.edit-pencil').classList.remove('edit-pencil_active');
})

//попап для редактирования аватара
const windowAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (data) => {
        windowAvatar._renderLoading(true);
        const userAvatarLink = data.linkInput;
        api.changeUserAvatar(userAvatarLink)
        .then((info) => {
            userInfo.setUserInfo({
                name: info.name,
                about: info.about,
                avatar: info.avatar
            })
            windowAvatar.close();
        })
        .catch ((error) => {
            console.log('Ошибка при изменении аватара');
        })
        .finally(() => {
            windowAvatar._renderLoading(false);
          });
    }
})
windowAvatar.setEventListeners();

//попап для редактирования информации о пользователе
const windowEdit = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        windowEdit._renderLoading(true);
        const nameUser = data.nameInput;
        const jobUser = data.jobInput;
        api.setUserProfile(nameUser, jobUser)
            .then((info) => {
                userInfo.setUserInfo({
                    name: info.name,
                    about: info.about,
                    avatar: info.avatar
                })
                windowEdit.close();
    })
    .catch ((error) => {
        console.log('Ошибка при изменении данных о пользователе');
    })
    .finally(() => {
        windowEdit._renderLoading(false);
      });
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
    handleFormSubmit: (data) => {
        windowAdd._renderLoading(true);
        const nameData = data.placeInput;
        const linkData = data.linkInput;
        api.addCard(nameData, linkData)
            .then((cardData) => {
                cardsList.prependCard(createCard(cardData));
                windowAdd.close();
             })
            .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
            .finally(() => {
                windowAdd._renderLoading(false);
              });
    }});
windowAdd.setEventListeners();

//создание попапа для увеличенной картинки
const imageCard = new PopupWithImage('.popup_type_image');
imageCard.setEventListeners();

//попап для удаления карточки
const deleteCardPopup = new PopupFormSubmit({
    popupSelector: '.popup_type_delete',
    handleFormSubmit: () => {
    }
})
deleteCardPopup.setEventListeners()

//активная кнопка
function makeButtonInactive (buttonElement) {
    buttonElement.classList.add('submit-button_inactive');
    buttonElement.setAttribute('disabled', true);
}

const formPlaceValidator = new FormValidator(config, config.formPlaceSelector);
formPlaceValidator.enableValidation()

const formNameValidator = new FormValidator(config, config.formNameSelector);
formNameValidator.enableValidation()

const formAvatarValidator = new FormValidator(config, config.avatarSelector);
formAvatarValidator.enableValidation()

Promise.all([api.getUserProfile(), api.getCards()])
.then(
    ([data, cards]) => {
        userId = data._id;
        userInfo.setUserInfo({
            name: data.name,
            about: data.about,
            avatar: data.avatar,
        });
        cardsList.renderItems(cards);
    }
)
