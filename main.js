"use strict";

import { fetchAndRenderComments } from "./modules/api.js";
import { commentsElement } from "./modules/variables.js";
import { initAddCommentButton } from "./modules/listeners.js";

commentsElement.innerHTML = "<li>Комментарии загружаются...</li>";
commentsElement.style.display = "flex";

initAddCommentButton();
fetchAndRenderComments();
