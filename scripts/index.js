// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(cardData, handleDeleteClick) {
  // Клонируем шаблон карточки
  const cardElement = cardTemplate.cloneNode(true);

  // Настраиваем значения карточки
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик клика на кнопку удаления
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', handleDeleteClick);

  // Возвращаем готовый элемент карточки
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  // Удаляем карточку из DOM
  placesList.removeChild(cardElement);
}

// Выводим карточки на страницу
initialCards.forEach(card => {
  // Создаем карточку
  const cardElement = createCard(card, () => {
    // Удаляем карточку при клике на кнопку "Удалить"
    deleteCard(cardElement);
  });

  // Добавляем карточку в список
  placesList.append(cardElement);
});