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

const element = document.querySelector('.edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const ProfileName = document.querySelector('.profile__name');
const ProfileJob = document.querySelector('.profile__work');
const formName = popupEdit.querySelector('.popup__container');
const CloseButton = popupEdit.querySelector('.close-button');
const nameInput = popupEdit.querySelector('.popup__data_name');
const jobInput = popupEdit.querySelector('.popup__data_job');
const AddButton = document.querySelector('.add-button');
const popupPlace = document.querySelector('.popup_type_place');
const ClosePopupPlace = popupPlace.querySelector('.close-button');
const PlaceInput = popupPlace.querySelector('.popup__data_place');
const LinkInput = popupPlace.querySelector('.popup__data_link');
const popupImage = document.querySelector('.popup_type_image');
const closeImage = popupImage.querySelector('.close-button');

//открытие и закрытие попапов
function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
    nameInput.value = ProfileName.textContent;
    jobInput.value = ProfileJob.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileJob.textContent = jobInput.value;
    popupToggle(popupEdit);
}

formName.addEventListener('submit', formSubmitHandler);

element.addEventListener('click', function(){
    popupToggle(popupEdit);
});
CloseButton.addEventListener('click', function(){
    popupToggle(popupEdit);
});
AddButton.addEventListener('click', function(){
    popupToggle(popupPlace);
});
ClosePopupPlace.addEventListener('click', function(){
    popupToggle(popupPlace);
});

//вывод карточек на страницу
const templateCard = document.querySelector('.element').content;
const containerCards = document.querySelector('.elements');

function render() {
    containerCards.innerHTML = "";
    initialCards.forEach(getCard);

    setListeners();
}

function getCard(item, index) {
    const oneCard = templateCard.cloneNode(true);
    oneCard.querySelector('.element__name').textContent = item.name;
    oneCard.querySelector('.element__image').src = item.link;
    oneCard.querySelector('.element__image').alt = item.name;
    oneCard.querySelector('.delete-button').setAttribute("id", index);
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

    containerCards.append(oneCard);

}

render();


//Удаление карточки
function handleDelete(event) {
    const index = event.target.parentNode.getAttribute("id");
    initialCards.splice(index, 1);
    render();
}


function setListeners() {
    document.querySelectorAll('.delete-button').forEach((btn) => {
        btn.addEventListener('click', handleDelete);
    });
}

//Добавление новых карточек
function newCard(event) {
    event.preventDefault();
    const oneCard = templateCard.cloneNode(true);
    oneCard.querySelector('.element__name').textContent = PlaceInput.value;
    oneCard.querySelector('.element__image').src = `${LinkInput.value}`;
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
      
    containerCards.prepend(oneCard);
    popupToggle(popupPlace);

    setListeners()
}
const formPlace = popupPlace.querySelector('.popup__container');
formPlace.addEventListener('submit', newCard);

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