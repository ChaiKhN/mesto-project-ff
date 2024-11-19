const cardTemplate = document.querySelector('#card-template').content;

// Функция лайка карточки
function handleLikeCard(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active'); // Меняем класс для смены стиля
}

// Функция создания карточки
export function createCard(cardData, handleDeleteClick, handleImageClick) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', handleDeleteClick);
    
    cardImage.addEventListener('click', handleImageClick);
    
    // Обработчик нажатия на кнопку лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLikeCard);
    
    return cardElement; // Возвращаем элемент карточки
}

// Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}
