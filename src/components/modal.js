export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEsc);
  }
  
export function closeModal(modal) {
    modal.classList.add('popup_is-animated'); // Добавляем класс анимации
    modal.addEventListener('transitionend', function handleTransitionEnd() {
        modal.classList.remove('popup_is-opened', 'popup_is-animated'); // Удаляем классы после завершения анимации
        modal.removeEventListener('transitionend', handleTransitionEnd); // Удаляем обработчик
    });
}

  
function closeModalByEsc(event) {
    if (event.key === "Escape") {
      const openModal = document.querySelector('.popup_is-opened');
      if (openModal) {
        closeModal(openModal);
      }
    }
  }
  
export function closeModalOnClickOverlay(event) {
    if (event.target === event.currentTarget) {
      closeModal(event.target);
    }
  }