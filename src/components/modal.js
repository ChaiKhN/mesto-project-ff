// Функция для открытия попапа
const openPopup = (el) => {
  el.classList.add("popup_is-opened"); // Добавляем класс для отображения попапа
  document.addEventListener("keydown", closeToEsc); // Добавляем обработчик события нажатия клавиши Esc
};

// Функция для закрытия попапа
const closePopup = (el) => {
  el.classList.remove("popup_is-opened"); // Удаляем класс, чтобы скрыть попап
  document.removeEventListener("keydown", closeToEsc); // Убираем обработчик события нажатия клавиши Esc
};

// Функция для закрытия попапа при нажатии клавиши Esc
const closeToEsc = (evt) => {
  if (evt.key === "Escape") { // Проверяем, была ли нажата клавиша Esc
      const openedPopup = document.querySelector(".popup_is-opened"); // Находим открытый попап
      closePopup(openedPopup); // Закрываем открытый попап
  }
};

// Функция для закрытия попапа при клике на фон
const closeToOverlay = (evt) => {
  if (evt.target === evt.currentTarget) { // Проверяем, был ли клик на сам попап (фон)
      closePopup(evt.currentTarget); // Закрываем попап
  }
};

// Экспортируем функции для использования в других модулях
export { openPopup, closePopup, closeToOverlay };
