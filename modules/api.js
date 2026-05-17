import { comments } from "./state.js";
import { renderComments } from "./renderComments.js";
import { initCommentClick, initLikeButtons } from "./listeners.js";
import {
  addNameInput,
  addFormComment,
  loadingAddCommentEl,
  addFormElement,
} from "./variables.js";

const host = "https://wedev-api.sky.pro/api/v2/aman";
const commentsURL = host + "/comments";
const commentsRegistration = "https://wedev-api.sky.pro/api/user";
const commentsLogin = commentsRegistration + "/login";

export let token = localStorage.getItem("token");
export let userName = localStorage.getItem("userName");

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", newToken);
};

export const setUserName = (newUserName) => {
  userName = newUserName;
  localStorage.setItem("userName", newUserName);
};

// Функция для получения комментариев с сервера и их отрисовки на странице
export const fetchAndRenderComments = () => {
  return fetch(commentsURL, {
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
      comments.length = 0;
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
export const addComment = (text) => {
  return fetch(commentsURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: addFormComment.value,
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
      loadingAddCommentEl.innerHTML = "";
      loadingAddCommentEl.style.display = "none";
      addFormElement.style.display = "flex";
    });
};

export const registration = ({ login, name, password }) => {
  return fetch(commentsRegistration, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("Пользователь с таким логином уже существует");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const login = ({ login, password }) => {
  return fetch(commentsLogin, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};
