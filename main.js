"use strict";

import { commentsElement } from "./modules/variables.js";
import { initAddCommentButton } from "./modules/listeners.js";
import { fetchAndRenderComments } from "./modules/api.js";

commentsElement.innerHTML = "<li>Комментарии загружаются...</li>";
commentsElement.style.display = "flex";

initAddCommentButton();
fetchAndRenderComments();
