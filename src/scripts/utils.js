const popupImage = document.querySelector('.popup_type_image');
const imageBox = popupImage.querySelector('.popup__pic');
const imageText = popupImage.querySelector('.popup__name');
const elementCard = document.querySelector('.element');

//поля в профиле (автоматические)
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');

//поля в профиле (для редактирования)
const nameInput = popupEdit.querySelector('.popup__data_name');
const jobInput = popupEdit.querySelector('.popup__data_job');

export {popupImage, imageBox, imageText, elementCard, profileName, profileJob, nameInput, jobInput};
