import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({
  isOpen,
  name,
  title,
  textSubmit,
  children,
  onClose,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_form_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          name="close-button"
          className="popup__button-close button-hover"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__caption">{title}</h2>
          {children}
          <button
            name="save-button"
            type="submit"
            className="popup__button-save button-hover"
            disabled={textSubmit.includes("...") ? true : false}
          >
            {textSubmit}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
