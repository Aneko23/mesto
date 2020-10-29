const popupImage = document.querySelector('.popup_type_image');
const imageBox = popupImage.querySelector('.popup__pic');
const imageText = popupImage.querySelector('.popup__name'); 

//открытие попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleClickKey);
};

//обработчик при нажатии кнопки ESC
export function handleClickKey(event) {
    if (event.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

export {popupImage, imageBox, imageText};
export {openPopup};
