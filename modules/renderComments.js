import { escapeHtml } from "./escapeHtml.js";
import {
  addFormElement,
  commentsElement,
  addNameInput,
} from "./variables.js";
import { formatDate } from "./formatDate.js";
import { comments } from "./state.js";
import { renderLogin } from "./renderLogin.js";
import { setUserName, token, userName } from "./api.js";

// Функция для отрисовки комментариев на странице
export const renderComments = (comments) => {
  if (token) {
    addFormElement.style.display = "flex";
    addNameInput.value = userName;
  } else {
    addFormElement.style.display = "none";
  }

  const commentsHtml = comments
    .map((comment, index) => {
      return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapeHtml(comment.author.name)}</div>
            <div>${formatDate(new Date(comment.date))}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${escapeHtml(comment.text)}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>
  `;
    })
    .join("");

  const appHtml = `
    ${commentsHtml}
    ${token ? "" : `<a class='auth'>Чтобы добавить комментарий, авторизуйтесь</a>`}
  `;

  commentsElement.innerHTML = appHtml;

  const authLink = document.querySelector(".auth");

  if (authLink) {
    authLink.addEventListener("click", () => {
      renderLogin();
    });
  }
};
