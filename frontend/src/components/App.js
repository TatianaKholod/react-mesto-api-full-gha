import { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ProtectedRoute from "./ProtectedRoute";

//для авторизации
import InfoTooltip from "./InfoTooltip";
import * as authApi from "../utils/Auth";

//для навигации
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopup, setIsConfirmPopup] = useState(false);
  const [isOpenAuthMsg, setIsOpenAuthMsg] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [msgErrorAuth, setmsgErrorAuth] = useState("");

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);
  const [idCardDelete, setIdCardDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [loggedIn, setLoggedIn] = useState(false);
  const [nameUsser, setNameUsser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) return;
    api
      .getInitialCards()
      .then((dataCards) => setCards(dataCards))
      .catch((err) => {
        console.log("Ошибка инициализации данных карточек" + err);
      });
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
    api
      .getInitProfile()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log("Ошибка инициализации данных профиля" + err);
      });
  }, [loggedIn]);

  function checkToken() {
    authApi
      .getToken()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          navigate("/");
          setNameUsser(data.email);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log("Ошибка " + err);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleSubmitRegister(email, pwd) {
    authApi
      .register(email, pwd)
      .then(() => {
        navigate("/sign-in");
        handleIsOpenAuthMsg(false);
      })
      .catch((err) => {
        console.log("Ошибка регистрации " + err);
        handleIsOpenAuthMsg(true);
      });
  }

  function handleSubmitLogin(email, pwd) {
    authApi
      .autorize(email, pwd)
      .then(() => {
        handleLogin(email);
        navigate("/");
      })
      .catch((err) => {
        console.log("Ошибка авторизации " + err);
        handleIsOpenAuthMsg(true);
      });
  }

  const handleIsOpenAuthMsg = (isErr) => {
    setIsOpenAuthMsg(true);
    setIsErrorAuth(isErr);
    setmsgErrorAuth(
      isErr
        ? "Что-то пошло не так! Попробуйте ещё раз."
        : "Вы успешно зарегистрировались!"
    );
  };

  const handleLogin = (email) => {
    setLoggedIn(true);
    setNameUsser(email);
  };

  function signOut() {
    authApi.unAutorize()
    .then(()=>{
      navigate("/sign-in");
      setLoggedIn(false);
      setNameUsser("");  
    })
    .catch((err) => {
      console.log("Ошибка авторизации " + err);
      handleIsOpenAuthMsg(true);
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Ошибка в данных карточки " + err);
      });
  }

  function handleCardDelete(card) {
    setIsConfirmPopup(true);
    setIdCardDelete(card._id);
  }

  function handleConfirmCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(idCardDelete)
      .then(() => {
        setCards((cards) => cards.filter((с) => с._id !== idCardDelete));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки " + err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .createNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка добавления карточки " + err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsConfirmPopup(false);
    setIsOpenAuthMsg(false);
    setSelectedCard({ name: "", link: "" });
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .updateProfile(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления профиля " + err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления аватара " + err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header logo={logo} nameUsser={nameUsser} onSignOut={signOut} />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register handleSubmitRegister={handleSubmitRegister} />}
            />

            <Route
              path="/sign-in"
              element={<Login handleSubmitLogin={handleSubmitLogin} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={
                    <>
                      <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                      <Footer />
                    </>
                  }
                />
              }
            />
            <Route path="*" element={<h2>Нет такой страницы</h2>} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            stateIsLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            stateIsLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            stateIsLoading={isLoading}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ConfirmPopup
            isOpen={isConfirmPopup}
            stateIsLoading={isLoading}
            onClose={closeAllPopups}
            onConfirmDelete={handleConfirmCardDelete}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isError={isErrorAuth}
            isOpen={isOpenAuthMsg}
            onClose={closeAllPopups}
            msgErrorAuth={msgErrorAuth}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
