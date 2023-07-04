import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, stateIsLoading }) {
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    if (!stateIsLoading)
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
        name,
        about: description,
      });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfile"
      textSubmit={stateIsLoading ? "Сохраняю..." : "Сохранить"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        value={name}
        onChange={handleChangeName}
        type="text"
        className="popup__input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error name-error"></span>
      <input
        name="job"
        value={description}
        onChange={handleChangeDescription}
        type="text"
        className="popup__input"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
