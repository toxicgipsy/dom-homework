import { fetchAndRenderComments, login, setToken, setUserName } from "./api.js";
import { commentsElement, addFormElement } from "./variables.js";
import { renderRegistration } from "./renderRegistration.js";
import { comments } from "./state.js";

export const renderLogin = () => {
  const loginHtml = `<div class="form">
    <h3 class="form-title">Авторизация</h3>
    <div class="form-row">
      <input type="text" id="login-input" class="input" placeholder="Логин"/>
      <input type="text" id="password-input" class="input" placeholder="Пароль"/>
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
    <button class="button" id="registration-button">Зарегистрироваться</button>
  </div>  
  `;

  addFormElement.style.display = "none";
  commentsElement.innerHTML = loginHtml;

  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  const buttonElement = document.getElementById("login-button");
  const registrationButtonElement = document.getElementById(
    "registration-button",
  );

  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      setToken(responseData.user.token);
      setUserName(responseData.user.name);
      comments.length = 0;
      fetchAndRenderComments();
    });
  });

  registrationButtonElement.addEventListener("click", () => {
    renderRegistration();
  });
};
