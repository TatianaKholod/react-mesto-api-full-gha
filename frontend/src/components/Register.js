import AuthForm from "./AuthForm";

function Register({ handleSubmitRegister }) {
  function onRegister(values) {
    handleSubmitRegister(values["email-input"], values["password-input"]);
  }

  return (
    <AuthForm
      caption="Регистрация"
      textButton="Зарегистрироваться"
      textLink="Уже зарегистрированы? Войти"
      handleSubmit={onRegister}
    />
  );
}

export default Register;
