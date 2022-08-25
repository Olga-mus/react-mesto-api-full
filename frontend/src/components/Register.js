import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const { onRegister } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      onRegister(email, password);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  return (
    <form
      className="popup__form popup__form_auth"
      name="edit_profile"
      noValidate
      onSubmit={handleSubmit}
    >
      <h3 className="popup__title popup__title_auth">Регистрация</h3>
      <fieldset className="popup__profile popup__profile_auth">
        <label>
          <input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            className="popup__input popup__input_auth"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__title-error"></span>
        </label>
        <label>
          <input
            onChange={handleChange}
            value={password}
            type="password"
            name="password"
            placeholder="Пароль"
            className="popup__input popup__input_auth"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__title-error"></span>
        </label>
      </fieldset>
      <button
        type="submit"
        className="popup__save-button popup__save-button_auth"
      >
        Зарегистрироваться
      </button>
      <p className="popup__form-action">
        Уже зарегистрированы?{" "}
        <Link className="link" to="/signin">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
