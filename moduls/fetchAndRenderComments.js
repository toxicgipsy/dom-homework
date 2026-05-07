import { comments } from "./comments.js";
import { renderComments } from "./renderComments.js";
import { initLikeButtons, initCommentClick } from "./initListeners.js";

// Функция для получения комментариев с сервера и их отрисовки на странице
export const fetchAndRenderComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/aman/comments", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        throw new Error("Server error");
      }
      return response.json();
    })
    .then((data) => {
      comments.push(...data.comments);
      renderComments(comments);
      initCommentClick();
      initLikeButtons();
    })
    .catch((error) => {
      if (error.message === "Server error") {
        return;
      }
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    });
};
