import { comments } from "./state.js";
import { renderComments } from "./renderComments.js";
import { initCommentClick, initLikeButtons } from "./listeners.js";
import {
  addNameInput,
  addFormComment,
  loadingAddCommentEl,
  addFormElement,
} from "./variables.js";

const host = "https://wedev-api.sky.pro/api/v1/aman";

// Функция для получения комментариев с сервера и их отрисовки на странице
export const fetchAndRenderComments = () => {
  return fetch(host + "/comments", {
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

// Добавляем новый комментарий в массив комментариев
export const addComment = (text, name) => {
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
