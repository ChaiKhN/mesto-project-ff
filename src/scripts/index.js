// Импорт стилей и необходимых модулей
import '../pages/index.css';
import { closePopup, openPopup, closeToOverlay } from "../components/modal";
import { renderCard, likeCard, deleteCard } from "../components/card";
import { enableValidation, clearValidation } from "../components/validation";
import { getInitialInfo, addNewCard, editUserProfile, deleteCardTotal, updateAvatar } from "../components/api";

// Получение элементов из DOM
const placesList = document.querySelector(".places__list");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupImageElement = document.querySelector(".popup_type_image");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");
const closeButtons = document.querySelectorAll(".popup__close");
const profileAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const avatarEditButton = document.querySelector(".profile__image-container");
const popupConfirmDel = document.querySelector(".popup_type_confirm");
const popupConfirmDelButton = popupConfirmDel.querySelector(".popup__button");

let userId;

// Функция для открытия попапа с изображением
export const openPopupImage = (CardImageURL, CardTitle) => {
    popupCaption.textContent = CardTitle;
    popupImage.src = CardImageURL;
    popupImage.alt = CardTitle;
    openPopup(popupImageElement);
};

// Заполнение информации профиля
const fillProfileInfo = (userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

// Изменение текста кнопки загрузки
const statusLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить"
};

// Обработка отправки формы профиля
const handleProfileFormSubmit = async (evt) => {
    evt.preventDefault();
    statusLoading(true, popupProfileForm.querySelector(".popup__button"));
    profileTitle.textContent = popupProfileForm.name.value;
    profileDescription.textContent = popupProfileForm.description.value;

    closePopup(popupProfile); // Сначала закрываем попап
    clearValidation(popupProfile, validationConfig); // Очищаем валидацию
    editUserProfile({
        name: popupProfileForm.name.value,
        about: popupProfileForm.description.value,
    })
        .then((updatedProfile) => {
            fillProfileInfo(updatedProfile); // Обновляем информацию профиля
            closePopup(popupProfile); 
            clearValidation(popupProfileForm, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            statusLoading(false, popupProfileForm.querySelector(".popup__button")); // Завершаем загрузку 
        });
};

// Обработка отправки формы аватара
const handleAvatarFormSubmit = async (evt) => {
    evt.preventDefault();
    statusLoading(true, popupAvatarForm.querySelector(".popup__button"));
    updateAvatar(popupAvatarForm.link.value)
        .then((updatedProfile) => {
            fillProfileInfo(updatedProfile); // Обновляем информацию профиля
            closePopup(popupAvatar);
            clearValidation(popupAvatarForm, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            statusLoading(false, popupAvatarForm.querySelector(".popup__button"));
        });
};

// Обработка отправки формы новой карточки
const handleNewCardFormSubmit = async (evt) => {
    evt.preventDefault();
    statusLoading(true, popupNewCardForm.querySelector(".popup__button"));
    const name = popupNewCardForm.elements["place-name"].value;
    const link = popupNewCardForm.elements.link.value;
    addNewCard({ name, link })
        .then((newCard) => {
            renderCard(newCard, userId, placesList, likeCard, deleteCard, openPopupImage, "start");
            closePopup(popupNewCard);
            popupNewCardForm.reset(); // Сбрасываем форму
            clearValidation(popupNewCardForm, validationConfig); // Очищаем валидацию
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            statusLoading(false, popupNewCardForm.querySelector(".popup__button"));
        });
};

// Настройки валидации
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

// Отображение начальных карточек
const renderInitialCards = (initialCards, userId) => {
    initialCards.forEach((card) => {renderCard(card, userId, placesList, likeCard, deleteCard, openPopupImage);
    });
};

// Обработка подтверждения удаления карточки
const handleConfirmDelete = async (evt) => {
    deleteCardTotal(popupConfirmDel.dataset.cardId)
        .then((result) => {
            const card = document.querySelector(
                `[data-card-id="${popupConfirmDel.dataset.cardId}"]`,
            );
            card.remove();
            closePopup(popupConfirmDel);
        })
        .catch((err) => {
            console.log(err);
        });
};

// Заполнение попапа профиля
const fillProfilePopup = (popupProfileForm, name, description) => {
    popupProfileForm.elements.name.value = name;
    popupProfileForm.elements.description.value = description;
};

// Получение первоначальной информации
getInitialInfo()
    .then((result) => {
        const userInfo = result[0];
        userId = userInfo._id;
        const initialCards = result[1];
        fillProfileInfo(userInfo);
        renderInitialCards(initialCards, userId); // Отображаем карточки
    })
    .catch((err) => {
        console.log(err);
    });

// Обработчики событий
popupImageElement.addEventListener("click", closeToOverlay);

profileEditButton.addEventListener("click", () => {
    clearValidation(popupProfileForm, validationConfig); // Очищаем валидацию
    fillProfilePopup(
        popupProfileForm,
        profileTitle.textContent,
        profileDescription.textContent,
    );
    openPopup(popupProfile); // Открываем попап профиля
});

avatarEditButton.addEventListener("click", (evt) => {
    clearValidation(popupAvatarForm, validationConfig);
    popupAvatarForm.reset();
    openPopup(popupAvatar); // Открываем попап редактирования аватара
});

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

popupAvatar.addEventListener("click", (evt) => {
    closeToOverlay(evt);
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

popupProfile.addEventListener("click", closeToOverlay);

popupNewCard.addEventListener("click", closeToOverlay);

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup)); // Закрываем попап
});

newCardButton.addEventListener("click", () => {
    popupNewCardForm.reset(); // Сбрасываем новую карточку
    clearValidation(popupNewCardForm, validationConfig);
    openPopup(popupNewCard);
});
popupNewCardForm.addEventListener("submit", handleNewCardFormSubmit);

popupConfirmDel.addEventListener("click", (evt) => {closeToOverlay(evt)});

popupConfirmDelButton.addEventListener("click", handleConfirmDelete);

// Включение валидации
enableValidation(validationConfig);
