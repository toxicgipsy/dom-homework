import { fetchAndRenderComments, registration, setToken, setUserName } from "./api.js";
import { commentsElement, addFormElement } from "./variables.js";
import { comments } from "./state.js";

export const renderRegistration = () => {
  const registrationHtml = `<div class="form">
    <h3 class="form-title">Регистрация</h3>
    <div class="form-row">
      <input type="text" id="login-input" class="input" placeholder="Логин"/>
      <input type="text" id="name-input" class="input" placeholder="Имя"/>
      <input type="text" id="password-input" class="input" placeholder="Пароль"/>
    </div>
    <br />
    <button class="button" id="login-button">Зарегистрироваться</button>
  </div>  
  `;

  addFormElement.style.display = "none";
  commentsElement.innerHTML = registrationHtml;

  const loginInputElement = document.getElementById("login-input");
  const nameInputElement = document.getElementById("name-input");
  const passwordInputElement = document.getElementById("password-input");
  const buttonElement = document.getElementById("login-button");

  buttonElement.addEventListener("click", () => {
    registration({
      login: loginInputElement.value,
      name: nameInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      setToken(responseData.user.token);
      setUserName(responseData.user.name);
      comments.length = 0;
      fetchAndRenderComments();
    });
  });
};
