const initialCards = [
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

const editButton = document.querySelector('.edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
const formName = popupEdit.querySelector('.popup__container');
const closeButton = popupEdit.querySelector('.close-button');
const nameInput = popupEdit.querySelector('.popup__data_name');
const jobInput = popupEdit.querySelector('.popup__data_job');
const addButton = document.querySelector('.add-button');
const popupPlace = document.querySelector('.popup_type_place');
const closePopupPlace = popupPlace.querySelector('.close-button');
const placeInput = popupPlace.querySelector('.popup__data_place');
const linkInput = popupPlace.querySelector('.popup__data_link');
const popupImage = document.querySelector('.popup_type_image');
const closeImage = popupImage.querySelector('.close-button');

//открытие и закрытие попапов
function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle(popupEdit);
}

formName.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', function(){
    popupToggle(popupEdit);
});
closeButton.addEventListener('click', function(){
    popupToggle(popupEdit);
});
addButton.addEventListener('click', function(){
    popupToggle(popupPlace);
});
closePopupPlace.addEventListener('click', function(){
    popupToggle(popupPlace);
});

//вывод карточек на страницу
const templateCard = document.querySelector('.element').content;
const containerCards = document.querySelector('.elements');

function render() {
    containerCards.innerHTML = "";
    initialCards.forEach(function(item) {
        const oneCard = getCard(item);
        containerCards.append(oneCard);
    });
}

function getCard(item) {
    const oneCard = templateCard.cloneNode(true);
    oneCard.querySelector('.element__name').textContent = item.name;
    oneCard.querySelector('.element__image').src = item.link;
    oneCard.querySelector('.element__image').alt = item.name;
    const deleteCard = oneCard.querySelector('.delete-button');

    const cardElement = oneCard.querySelector('.element__card');
    deleteCard.addEventListener('click', function () {
        cardElement.remove();
    });

    const likeButton = oneCard.querySelector('.button-like');
    likeButton.addEventListener('click', function (event) {
        event.target.classList.toggle('button-like_active');
        console.log(likeButton);
      });

    const templateImage = oneCard.querySelector('.element__image');
    templateImage.addEventListener('click', function (event) {
        imageToggle();
        const oneCard = event.target.parentNode;
        imageBox.src = oneCard.querySelector('.element__image').src;
        imageText.textContent = oneCard.querySelector('.element__name').textContent;
    });

    return oneCard;
}

render();

//Добавление новых карточек
const formPlace = popupPlace.querySelector('.popup__container');
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const item = {
    name: placeInput.value,
    link: linkInput.value
  };

  const oneCard = getCard(item);
  containerCards.prepend(oneCard);
  popupToggle(popupPlace);
});

//Попап с картинкой
const imageBox = popupImage.querySelector('.popup__pic');
const imageText = popupImage.querySelector('.popup__name');

function imageOpen() {
    popupImage.classList.toggle('popup_image');
}

function imageToggle() {
    popupImage.classList.toggle('popup_image');
}

closeImage.addEventListener('click', function(){
    imageToggle(popupImage);
});

document.addEventListener('keydown', function(event) {
    const popupOpened = document.querySelector('.popup_opened');
    const popupImageOpend = document.querySelector('.popup_image');
  
    if (popupOpened && event.key == "Escape") {
        popupToggle(popupOpened);
    } else if (popupImageOpend && event.key == "Escape") {
        imageToggle(popupImage);
    }
  })

  popupEdit.addEventListener('click', function(event) {
    if (event.target == event.currentTarget) {
      popupToggle(popupEdit);
    }
  })

  popupPlace.addEventListener('click', function(event) {
    if (event.target == event.currentTarget) {
      popupToggle(popupPlace);
    }
  })

  popupImage.addEventListener('click', function(event) {
    if (event.target == event.currentTarget) {
        imageToggle();
    }
  })