import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, stateIsLoading }) {
  const { values, handleChange, setValues } = useForm({
    "name-card": "",
    "src-card": "",
  });

  useEffect(() => {
    setValues({ "name-card": "", "src-card": "" });
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!stateIsLoading) {
      onAddPlace({
        name: values["name-card"],
        link: values["src-card"],
      });
    }
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addCard"
      textSubmit={stateIsLoading ? "Создаю..." : "Создать"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        name="name-card"
        value={values["name-card"]}
        onChange={handleChange}
        type="text"
        className="popup__input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error name-card-error"></span>
      <input
        name="src-card"
        value={values["src-card"]}
        onChange={handleChange}
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error src-card-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
