import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";

function AuthForm({ caption, textButton, textLink, handleSubmit }) {
  const { values, handleChange, setValues } = useForm({
    "email-input": "",
    "password-input": "",
  });

  useEffect(() => {
    setValues({ "email-input": "", "password-input": "" });
  }, [setValues]);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(values);
  }
  return (
    <form
      name="register"
      className="auth-form"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <h2 className="auth-form__caption">{caption}</h2>
      <input
        name="email-input"
        type="email"
        value={values["email-input"]}
        onChange={handleChange}
        className="auth-form__input"
        placeholder="Email"
        autoComplete="on"
        required
        minLength="2"
        maxLength="200"
      />
      <input
        name="password-input"
        type="password"
        value={values["password-input"]}
        onChange={handleChange}
        className="auth-form__input"
        placeholder="Пароль"
        autoComplete="off"
        required
        minLength="3"
        maxLength="40"
      />
      <button
        name="register-button"
        type="submit"
        className="auth-form__button button-hover"
      >
        {textButton}
      </button>
      <Link className="auth-form__link link" to="/sign-in">
        {textLink}
      </Link>
    </form>
  );
}

export default AuthForm;
