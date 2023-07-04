import { Link, Route, Routes } from "react-router-dom";

function Header({ logo, nameUsser, onSignOut }) {
  return (
    <header className="header">
      <Link className="link" to="/">
        <img
          className="header__logo"
          alt="Логотип проекта - Место"
          src={logo}
        />
      </Link>
      <div className="header__container">
        <p className="header__name">{nameUsser}</p>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                to="/sign-in"
                className="header__link link"
                onClick={onSignOut}
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
