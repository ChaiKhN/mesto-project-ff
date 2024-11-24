// Объект конфигурации для API
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-26',
    headers: {
        authorization: '8fb03581-9129-41ef-8e6b-d5e496106e95',
        'Content-Type': 'application/json',
    }
};

// Функция для обработки ответа от сервера
const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// Асинхронная функция для получения данных пользователя
const getUserData = async () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для редактирования профиля пользователя
const editUserProfile = async (userProfileData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userProfileData.name,
            about: userProfileData.about,
        }),
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для получения начальных карточек
const getInitialCards = async () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для получения начальной информации (данные пользователя и карточки)
const getInitialInfo = async () => {
    return Promise.all([getUserData(), getInitialCards()]);
};

// Асинхронная функция для добавления новой карточки
const addNewCard = async (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link,
        }),
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для добавления лайка к карточке
const addLike = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для удаления лайка с карточки
const dislike = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для удаления карточки
const deleteCardTotal = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then((res) => getResponseData(res));
};

// Асинхронная функция для обновления аватара пользователя
const updateAvatar = async (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink,
        }),
    }).then((res) => getResponseData(res));
};

// Экспортируем функции для использования в других модулях
export {
    getUserData,
    editUserProfile,
    getInitialCards,
    getInitialInfo,
    addNewCard,
    addLike,
    dislike,
    deleteCardTotal,
    updateAvatar
};
