import { useContext } from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile common-section" aria-label="Профиль">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
        <button
          name="update-avatar"
          aria-label="Обновить аватар"
          className="profile__update-avatar"
          type="button"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info-container">
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <p className="profile__job">{about}</p>
          </div>
          <button
            name="edit-button"
            className="profile__edit-button button-hover"
            aria-label="Редактировать профиль"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          name="add-button"
          className="profile__add-button button-hover"
          aria-label="Добавить место"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery common-section" aria-label="Галерея">
        <ul className="gallery__card-list">
          {cards.map((cardItem) => (
            <Card
              key={cardItem._id}
              card={cardItem}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
