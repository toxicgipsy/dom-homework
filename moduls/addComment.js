import {
  commentsElement,
  loadingAddCommentEl,
  addFormElement,
  addNameInput,
  addFormComment,
  addformButton,
} from "./variables.js";
import { comments } from "./comments.js";
import { fetchAndRenderComments } from "./fetchAndRenderComments.js";


const host = "https://wedev-api.sky.pro/api/v1/aman";

// Добавляем новый комментарий в массив комментариев
export const addComment = () => {
  return fetch(host + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text: addFormComment.value,
      name: addNameInput.value,
      forceError: false,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        alert("Имя и комментарий должны быть не короче 3 символов");
        throw new Error("Validation error");
      }
      if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        throw new Error("Server error");
      }
      return response.json();
    })
    .then((data) => {
      addNameInput.value = "";
      addFormComment.value = "";
      comments.length = 0; // Очистка массива комментариев перед загрузкой новых данных
      return fetchAndRenderComments();
    })
    .catch((error) => {
      if (
        error.message === "Validation error" ||
        error.message === "Server error"
      ) {
        return;
      }
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    })
    .finally(() => {
      loadingAddCommentEl.style.display = "none";
      addFormElement.style.display = "flex";
    });
};
