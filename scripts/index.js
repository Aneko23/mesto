let element = document.querySelector('.edit-button');
let popup = document.querySelector('.popup');
let ProfileName = document.querySelector('.profile__name');
let ProfileJob = document.querySelector('.profile__work');
let formElement = popup.querySelector('.popup__container');
let CloseButton = document.querySelector('.close-button');
let nameInput = document.querySelector('.popup__data_name');
let jobInput = document.querySelector('.popup__data_job');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = ProfileName.textContent;
    jobInput.value = ProfileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

element.addEventListener('click', openPopup);
CloseButton.addEventListener('click', closePopup);