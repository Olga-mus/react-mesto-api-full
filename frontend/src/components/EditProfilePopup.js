import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit-profile"
      button="Сохранить"
      // isOpen={isEditProfilePopupOpen}
      // onClose={closeAllPopups}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <fieldset className="popup__profile">
        <label className="popup__field">
          <input
            value={name}
            onChange={handleChangeName}
            id="firstname"
            type="text"
            name="firstname"
            placeholder="Введите имя"
            className="popup__input popup__input_type_name"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="firstname-error popup__error-message"></span>
        </label>
        <label className="popup__field">
          <input
            value={description}
            onChange={handleChangeDescription}
            id="proffesion"
            type="text"
            name="proffesion"
            placeholder="Введите вид деятельности"
            className="popup__input popup__input_type_job"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="proffesion-error popup__error-message"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
