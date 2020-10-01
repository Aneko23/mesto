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

//для работы с попапом для создания карточки нового места
const addButton = document.querySelector('.add-button');
const popupPlace = document.querySelector('.popup_type_place');
const closePopupPlace = popupPlace.querySelector('.close-button');

//поля при добавлении каточки с местом
const placeInput = popupPlace.querySelector('.popup__data_place');
const linkInput = popupPlace.querySelector('.popup__data_link');


//для работы с попапом для просмотра картинки
const popupImage = document.querySelector('.popup_type_image');
const closeImage = popupImage.querySelector('.close-button');
const formPlace = popupPlace.querySelector('.popup__container');
const imageBox = popupImage.querySelector('.popup__pic'); 
const imageText = popupImage.querySelector('.popup__name'); 

//темплейт карточки
const templateCard = document.querySelector('.element').content;
const containerCards = document.querySelector('.elements');

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
    document.addEventListener('keydown', function() {
        handleClickKey(event, popup);
    });
};

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', function() {
        handleClickKey(event, popup);
    });
};

//обработчик при нажатии кнопки ESC
function handleClickKey(event, popup) {
    if (popup && event.key === "Escape") {
        closePopup(popup);
    }
};

//добавление новых карточек
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const item = {
    name: placeInput.value,
    link: linkInput.value
  };

  const oneCard = getCard(item);
  containerCards.prepend(oneCard);
  closePopup(popupPlace);
});

closeImage.addEventListener('click', function(){
    closePopup(popupImage);
});

formName.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);

});

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

//вывод карточек на страницу
function render() {
    containerCards.innerHTML = "";
    initialCards.forEach(function(item) {
        const oneCard = getCard(item);
        containerCards.append(oneCard);
    });
}

function getCard(item) {
    const oneCard = templateCard.cloneNode(true);
    const cardImage = oneCard.querySelector('.element__image');
    oneCard.querySelector('.element__name').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    const deleteCard = oneCard.querySelector('.delete-button');

    const cardElement = oneCard.querySelector('.element__card');
    deleteCard.addEventListener('click', function () {
        cardElement.remove();
    });

    const likeButton = oneCard.querySelector('.button-like');
    likeButton.addEventListener('click', function (event) {
        event.target.classList.toggle('button-like_active');
      });

    const templateImage = oneCard.querySelector('.element__image');
    templateImage.addEventListener('click', function (event) {
        openPopup(popupImage);
        const oneCard = event.target.parentNode;
        imageBox.src = templateImage.src;
        imageText.textContent = oneCard.querySelector('.element__name').textContent;
    });
    
    return oneCard;
}

render();