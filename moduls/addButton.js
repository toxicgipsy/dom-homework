import {
  commentsElement,
  loadingAddCommentEl,
  addFormElement,
  addNameInput,
  addFormComment,
  addformButton,
} from "./variables.js";

// Обработчик события для кнопки "Написать"
export const addButton = () => {
  addformButton.addEventListener("click", () => {
    addNameInput.classList.remove("error");
    addFormComment.classList.remove("error");

    // Получаем имя и текст комментария из полей ввода
    const name = addNameInput.value;
    const text = addFormComment.value;

    // Создаем новый объект комментария с данными из полей ввода и текущей датой
    const newComment = {
      text,
      name,
    };

    // Скрываем форму добавления комментария и отображаем сообщение о загрузке
    addFormElement.style.display = "none";
    loadingAddCommentEl.innerHTML = "Комментарий отправляется...";
  });
};
