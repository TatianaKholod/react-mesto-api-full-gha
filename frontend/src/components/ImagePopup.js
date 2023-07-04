import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card.link, onClose);
  return (
    <div
      className={`popup popup_form_image ${card.link ? "popup_opened" : ""}`}
    >
      <figure className="popup__container-image">
        <button
          name="close-button"
          className="popup__button-close button-hover"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
