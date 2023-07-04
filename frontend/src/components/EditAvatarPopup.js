import { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, stateIsLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!stateIsLoading)
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="updateAvatar"
      textSubmit={stateIsLoading ? "Сохраняю..." : "Сохранить"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        name="src-avatar"
        defaultValue={currentUser.avatar}
        ref={avatarRef}
        type="url"
        className="popup__input"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error src-avatar-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
