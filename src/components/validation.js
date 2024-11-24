// Функция для отображения сообщения об ошибке
const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Функция для скрытия сообщения об ошибке
const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
};

// Функция для отключения кнопки
function disabledButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass); // Добавляем класс
    buttonElement.disabled = true; // Отключаем кнопку
}

// Функция для включения кнопки
function enableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass); // Убираем класс
    buttonElement.disabled = false; // Включаем кнопку
}

// Функция для переключения состояния кнопки в зависимости от валидности полей ввода
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, inactiveButtonClass); // Отключаем кнопку, если есть ошибки
    } else {
        enableButton(buttonElement, inactiveButtonClass); // Включаем кнопку, если все поля валидны
    }
}

// Функция для проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity(""); // Сбрасываем сообщение об ошибке
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

// Функция для установки обработчиков событий на форму
const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
        });
    });
};

// Функция для проверки наличия недействительных полей ввода
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Функция для включения валидации на всех формах
const enableValidation = (validationConfig) => {
    const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector),
    );
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig.inputSelector, validationConfig.inputErrorClass, validationConfig.errorClass, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass);
    });
};

// Функция для очистки валидации формы
const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector),
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector,
    );
    disabledButton(buttonElement, validationConfig.inactiveButtonClass); // Используем функцию вместо ручного добавления
    inputList.forEach((inputElement) => {
        hideError(
            formElement,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass,
        );
        inputElement.setCustomValidity(""); // Сбрасываем сообщение об ошибке
    });
};

// Экспортируем функции для использования в других модулях
export { enableValidation, clearValidation };
