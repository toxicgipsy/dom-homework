import { escapeHtml } from "./escapeHtml.js";
import { commentsElement } from "./variables.js";
import { formatDate } from "./formatDate.js";
import { comments } from "./state.js";

// Функция для отрисовки комментариев на странице
export const renderComments = (comments) => {
  commentsElement.innerHTML = comments
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
        </li>`;
    })
    .join("");
};
