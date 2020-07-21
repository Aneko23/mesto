let element = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');

function OpenPopup() {
    popup.classList.add('popup_opened');
}
element.addEventListener('click', OpenPopup);

let CloseButton = document.querySelector('.close-button');

function ClosePopup() {
    popup.classList.remove('popup_opened');
}
CloseButton.addEventListener('click', ClosePopup);

let ProfileName = document.querySelector('.profile__name');
let ProfileJob = document.querySelector('.profile__work');
let formElement = popup.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__name');
    let jobInput = document.querySelector('.popup__job');
    ProfileName.textContent = nameInput.value;
    ProfileJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);