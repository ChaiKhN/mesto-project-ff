// Функция для отображения сообщения об ошибке
const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass,) => {
    // Находим элемент, который будет отображать ошибку, по ID поля ввода
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Добавляем класс для стилизации поля ввода с ошибкой
    inputElement.classList.add(inputErrorClass);
    // Устанавливаем текст ошибки
    errorElement.textContent = errorMessage;
    // Добавляем класс для стилизации элемента ошибки
    errorElement.classList.add(errorClass);
};

// Функция для скрытия сообщения об ошибке
const hideError = (formElement, inputElement, inputErrorClass, errorClass,) => {
    // Находим элемент, который отображает ошибку
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Убираем класс для стилизации поля ввода
    inputElement.classList.remove(inputErrorClass);
    // Очищаем текст ошибки
    errorElement.textContent = "";
    // Убираем класс для стилизации элемента ошибки
    errorElement.classList.remove(errorClass);
};

// Функция для отключения кнопки
function disabledButton(buttonElement, config) {
     // Добавляем класс для стилизации кнопки
     buttonElement.classList.add(config);
     // Отключаем кнопку
     buttonElement.disabled = true;
}

// Функция для включения кнопки
function enableButton(buttonElement, config) {
     // Убираем класс для стилизации кнопки
     buttonElement.classList.remove(config);
     // Включаем кнопку
     buttonElement.disabled = false;
}

// Функция для переключения состояния кнопки в зависимости от валидности полей ввода
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    // Проверяем наличие недействительных полей ввода
    if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, inactiveButtonClass); // Отключаем кнопку, если есть ошибки
    } else {
        enableButton(buttonElement, inactiveButtonClass); // Включаем кнопку, если все поля валидны
    }
}

// Функция для проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass,) => {
    // Устанавливаем пользовательское сообщение об ошибке, если есть несоответствие шаблону
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity(""); // Сбрасываем сообщение об ошибке
    }

    // Проверяем, валидно ли поле ввода
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass,); // Показываем ошибку
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass); // Скрываем ошибку
    }
};

// Функция для установки обработчиков событий на форму
const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass,) => {
    // Получаем список полей ввода из формы
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Находим кнопку отправки формы
    const submitButtonElement = formElement.querySelector(submitButtonSelector);
    // Устанавливаем начальное состояние кнопки
    toggleButtonState(inputList, submitButtonElement, inactiveButtonClass);
    // Устанавливаем обработчики событий для каждого поля ввода
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass,); // Проверяем валидность поля
            toggleButtonState(inputList, submitButtonElement, inactiveButtonClass); // Обновляем состояние кнопки
        });
    });
};

// Функция для проверки наличия недействительных полей ввода
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid; // Проверяем, есть ли хотя бы одно недействительное поле
    });
};

// Функция для включения валидации на всех формах
const enableValidation = (validationConfig) => {
    // Получаем список всех форм по селектору
    const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector),
    );
    // Устанавливаем обработчики событий для каждой формы
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault(); // Предотвращаем отправку формы
        });
        setEventListeners(formElement, validationConfig.inputSelector, validationConfig.inputErrorClass, validationConfig.errorClass, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass,); // Устанавливаем обработчики событий
    });
};

// Функция для очистки валидации формы
const clearValidation = (formElement, validationConfig) => {
    // Получаем список полей ввода из формы
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector),
    );
    // Находим кнопку отправки формы
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector,
    );
    // Устанавливаем кнопку в неактивное состояние
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    // Скрываем все ошибки и сбрасываем пользовательские сообщения
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
