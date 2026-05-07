import { addNameInput, addFormComment } from "./variables.js";

// Получаем имя и текст комментария из полей ввода
const name = addNameInput.value;
const text = addFormComment.value;

// Функция для проверки длины имени и текста комментария
export const checkFormLength = (name, text) => {
  if (name.length < 3 || text.length < 3) {
    addNameInput.classList.add("error");
    addFormComment.classList.add("error");
    alert("Имя и комментарий должны быть не короче 3 символов");
    return false;
  }
  return true;
};

// Проверяем длину имени и текста комментария, если они меньше 3 символов, выводим предупреждение и не отправляем комментарий
if (!checkFormLength(name, text)) {
  return;
}
