import { renderComments } from "./renderComments.js";
import {
  addFormComment,
  addformButton,
  addNameInput,
  addFormElement,
  loadingAddCommentEl,
} from "./variables.js";
import { comments } from "./state.js";
import { addComment } from "./api.js";

// Обработчик клика по кнопке лайка
export const initLikeButtons = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const commentElem = likeButton.closest(".comment");
      const index = commentElem.dataset.index;
      const comment = comments[index];

      comment.isLiked = !comment.isLiked;
      comment.likes = Math.max(0, comment.likes + (comment.isLiked ? 1 : -1));

      renderComments(comments);
      initLikeButtons();
      initCommentClick();
    });
  }
};

// Обработчик клика по комментарию для отображения его текста в алерте
export const initCommentClick = () => {
  const commentElements = document.querySelectorAll(".comment");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      const comment = comments[index];

      addFormComment.value = `> ${comment.author.name}: \n ${comment.text} \n\n`;
    });
  }
};

// Обработчик события для кнопки "Написать"
export const initAddCommentButton = () => {
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

    // Функция для проверки длины имени и текста комментария
    const checkFormLength = (name, text) => {
      if (name.length < 3 || text.length < 3) {
        addNameInput.classList.add("error");
        addFormComment.classList.add("error");
        alert("Имя и комментарий должны быть не короче 3 символов");
        return false;
      }
      return true;
    };

    // Проверяем длину имени и текста комментария, если они меньше 3 символов, выводим предупреждение и не отправляем комментарий
    if (!checkFormLength(name, text)) {
      return;
    }

    // Скрываем форму добавления комментария и отображаем сообщение о загрузке
    addFormElement.style.display = "none";
    loadingAddCommentEl.innerHTML = "Комментарий отправляется...";
    addComment(text, name);
  });
};
