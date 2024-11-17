import '../pages/index.css';
import initialCards from './cards.js';
import { createCard, deleteCard } from '../components/card.js';
import { openModal, closeModal, closeModalOnClickOverlay } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Элементы для модального окна изображения
const previewModal = document.querySelector('.popup_type_image');
const previewImage = previewModal.querySelector('.popup__image');
const previewCaption = previewModal.querySelector('.popup__caption');

// Элементы профиля
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

// Инпуты в модальном окне редактирования профиля
const nameInput = editProfileModal.querySelector('.popup__input_type_name');
const descriptionInput = editProfileModal.querySelector('.popup__input_type_description');

function displayCards() {
  initialCards.forEach(card => {
    const cardElement = createCard(card, () => deleteCard(cardElement), () => openImagePreview(card));
    placesList.prepend(cardElement);
  });
}

function openImagePreview(card) {
  previewImage.src = card.link;
  previewImage.alt = card.name;
  previewCaption.textContent = card.name;

  openModal(previewModal);
}

function populateProfileInputs() {
  // Вставляем текущие данные профиля в инпуты
  nameInput.value = profileTitleElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

profileEditButton.addEventListener('click', () => {
  populateProfileInputs(); // Заполняем инпуты перед открытием попапа
  openModal(editProfileModal);
});
addCardButton.addEventListener('click', () => openModal(addCardModal));

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
