import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirmDelete, stateIsLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!stateIsLoading) onConfirmDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delCard"
      textSubmit={stateIsLoading ? "Удаляю..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
