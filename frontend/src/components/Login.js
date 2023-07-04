import AuthForm from "./AuthForm";

function Login({ handleSubmitLogin }) {
  function onLogin(values) {
    handleSubmitLogin(values["email-input"], values["password-input"]);
  }

  return (
    <AuthForm
      caption="Вход"
      textButton="Войти"
      textLink=""
      handleSubmit={onLogin}
    />
  );
}

export default Login;
