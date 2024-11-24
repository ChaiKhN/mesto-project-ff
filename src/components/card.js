import { dislike, addLike } from "./api"; // Импорт функций для работы с лайками из API
import { openPopup } from "./modal"; // Импорт функции для открытия попапа

const cardTemplate = document.querySelector("#card-template").content; // Получение шаблона карточки
const popupConfirm = document.querySelector(".popup_type_confirm"); // Получение попапа подтверждения удаления карточки

// Функция для создания карточки
const createCard = (card, userId, deleteCard, likeCard, openPopupImage) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // Клонирование шаблона карточки
    const cardImage = cardElement.querySelector(".card__image"); // Получение элемента изображения карточки
    const cardDeleteButton = cardElement.querySelector(".card__delete-button"); // Получение кнопки удаления карточки
    const cardTitle = cardElement.querySelector(".card__title"); // Получение элемента заголовка карточки
    const cardButtonLike = cardElement.querySelector(".card__like-button"); // Получение кнопки лайка карточки
    const cardLikeCount = cardElement.querySelector(".card__like-count"); // Получение элемента счетчика лайков

    cardElement.dataset.cardId = card._id; // Установка ID карточки в dataset
    cardElement.dataset.ownerId = card.owner._id; // Установка ID владельца карточки в dataset
    cardTitle.textContent = card.name; // Установка названия карточки
    cardImage.src = card.link; // Установка ссылки на изображение карточки
    cardImage.alt = card.name; // Установка альтернативного текста для изображения карточки

    cardLikeCount.textContent = card.likes.length; // Установка счетчика лайков
    const isLiked = card.likes.some((like) => like._id === userId); // Проверка, поставил ли пользователь лайк
    if (isLiked) {
        cardButtonLike.classList.add("card__like-button_is-active"); // Добавление класса для активного лайка
    }

    // Если карточка принадлежит текущему пользователю, добавляем обработчик для удаления
    if (card.owner._id === userId) {
        cardDeleteButton.addEventListener("click", (evt) => {
            deleteCard(evt, card._id); // Вызов функции удаления карточки
        });
    } else {
        cardDeleteButton.remove(); // Удаление кнопки удаления, если карточка не принадлежит пользователю
    }

    // Добавление обработчика для лайка карточки
    cardButtonLike.addEventListener("click", (evt) => {
        likeCard(evt, card._id); // Вызов функции для лайка карточки
    });

    // Добавление обработчика для открытия изображения карточки
    cardImage.addEventListener("click", () => {
        openPopupImage(cardImage.src, cardImage.alt, cardTitle.textContent); // Открытие попапа с изображением
    });

    return cardElement; // Возвращаем созданный элемент карточки
};

// Функция для обработки лайка карточки
const likeCard = async (evt, cardId) => {
    let AllLike = evt.target.parentNode.querySelector(".card__like-count"); // Получение счетчика лайков

    // Проверка, активен ли лайк
    if (evt.target.classList.contains("card__like-button_is-active")) {
        dislike(cardId) // Если лайк активен, вызываем функцию для его удаления
            .then((updatedCard) => {
                evt.target.classList.remove("card__like-button_is-active"); // Убираем класс активного лайка
                AllLike.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
            })
            .catch((err) => {
                console.log(err); // Логирование ошибок
            });
    } else {
        addLike(cardId) // Если лайк не активен, вызываем функцию для его добавления
            .then((updatedCard) => {
                evt.target.classList.add("card__like-button_is-active"); // Добавляем класс активного лайка
                AllLike.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
            })
            .catch((err) => {
                console.log(err); // Логирование ошибок
            });
    }
};

// Функция для обработки удаления карточки
const deleteCard = (evt, cardId) => {
    openPopup(popupConfirm); // Открытие попапа подтверждения удаления
    popupConfirm.dataset.cardId = cardId; // Установка ID карточки в dataset попапа
};

// Функция для рендеринга карточки
const renderCard = (item, userId, container, likeCard, deleteCard, openPopupImage, place = "end") => {
    const cardEl = createCard(item, userId, deleteCard, likeCard, openPopupImage); // Создание карточки
    if (place === "end") {
        container.append(cardEl); // Добавление карточки в конец контейнера
    } else {
        container.prepend(cardEl); // Добавление карточки в начало контейнера
    }
};

// Экспорт функций для использования в других модулях
export { renderCard, likeCard, deleteCard };
