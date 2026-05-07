"use strict";

import { renderComments } from "./moduls/renderComments.js";
import { fetchAndRenderComments } from "./moduls/fetchAndRenderComments.js";
import { commentsElement } from "./moduls/variables.js";
// import { initLikeButtons, initCommentClick } from "./moduls/initListeners.js";

// Массив с комментариями, который будет использоваться для отрисовки комментариев
const comments = [];

commentsElement.innerHTML = "<li>Комментарии загружаются...</li>";
commentsElement.style.display = "flex";
// Рендер комментариев
fetchAndRenderComments();
