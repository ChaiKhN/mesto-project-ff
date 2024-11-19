import '../pages/index.css';
import initialCards from './cards.js';
import { createCard, deleteCard } from '../components/card.js';
import { openModal, closeModal, closeModalOnClickOverlay } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const previewModal = document.querySelector('.popup_type_image');
const previewImage = previewModal.querySelector('.popup__image');
const previewCaption = previewModal.querySelector('.popup__caption');

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

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

// Убираем функцию handleLikeCard, теперь она внутри card.js

function populateProfileInputs() {
  nameInput.value = profileTitleElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

// Обработчик сабмита профиля
function handleProfileSubmit(event) {
  event.preventDefault(); // предотвращаем перезагрузку страницы
  profileTitleElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

// Обработчик сабмита новой карточки
function handleCardSubmit(event) {
  event.preventDefault(); // предотвращаем перезагрузку страницы
  const cardName = event.target.querySelector('.popup__input_type_card-name').value;
  const cardLink = event.target.querySelector('.popup__input_type_url').value;

  const newCard = {
    name: cardName,
    link: cardLink,
  };
  
  const cardElement = createCard(newCard, () => deleteCard(cardElement), () => openImagePreview(newCard));
  placesList.prepend(cardElement);
  closeModal(addCardModal);

  // Очистка инпутов
  event.target.reset(); // Очищаем все инпуты в форме
}

profileEditButton.addEventListener('click', () => {
  populateProfileInputs();
  openModal(editProfileModal);
});

addCardButton.addEventListener('click', () => openModal(addCardModal));

// Обработчики сабмита форм
editProfileModal.querySelector('.popup__form').addEventListener('submit', handleProfileSubmit);
addCardModal.querySelector('.popup__form').addEventListener('submit', handleCardSubmit);

document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', (event) => {
    closeModal(event.target.closest('.popup'));
  });
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', closeModalOnClickOverlay);
});

// Инициализация карточек
displayCards();
