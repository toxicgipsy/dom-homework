import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { likeButtons, addFormComment } from "./variables.js";

// Обработчик клика по кнопке лайка
export const initLikeButtons = () => {
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
