import usePopupClose from "../hooks/usePopupClose";
import imageCheck from "../images/auth-check.svg";
import imageError from "../images/auth-err.svg";

function InfoTooltip({ isError, msgErrorAuth, isOpen, onClose }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_purpose_message">
        <button
          name="close-button"
          className="popup__button-close button-hover"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <img
          className=""
          src={isError ? imageError : imageCheck}
          alt={msgErrorAuth}
        />
        <p>{msgErrorAuth}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
