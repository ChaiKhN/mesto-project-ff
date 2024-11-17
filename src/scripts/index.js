import '../pages/index.css';
import initialCards from './cards.js';
import { createCard, deleteCard } from '../components/card.js';
import { openModal, closeModal, closeModalOnClickOverlay } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Функция отображения карточек на странице
function displayCards() {
  initialCards.forEach(card => {
    const cardElement = createCard(card, () => deleteCard(cardElement), () => openImagePreview(card));
    placesList.prepend(cardElement);
  });
}


function openImagePreview(card) {
  // Открыть модальное окно с изображением
  const previewModal = document.querySelector('.popup_type_image');
  const previewImage = previewModal.querySelector('.popup__image');
  const previewCaption = previewModal.querySelector('.popup__caption');
  previewImage.src = card.link;
  previewImage.alt = card.name;
  previewCaption.textContent = card.name;
  openModal(previewModal);
}

// Обработчики событий
profileEditButton.addEventListener('click', () => openModal(editProfileModal));
addCardButton.addEventListener('click', () => openModal(addCardModal));

// Закрытие модальных окон
document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', (event) => {
    closeModal(event.target.closest('.popup'));
  });
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', closeModalOnClickOverlay);
});

// Инициализация
displayCards();