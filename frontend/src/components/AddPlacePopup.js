import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onAddCard, onClose } = props;
  
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // useEffect, который будет реагировать на пропс isOpen и очищать значения в инпутах при открытии попала
    useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      button="Сохранить"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <fieldset className="popup__profile">
        <label className="popup__field">
          <input
            value={name}
            onChange={handleChangeName}
            id="card"
            type="text"
            name="name"
            placeholder="Название"
            className="popup__input popup__input_type_card"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="card-error popup__error-message"></span>
        </label>
        <label className="popup__field">
          <input
            value={link}
            onChange={handleChangeLink}
            id="link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            required
          />
          <span className="link-error popup__error-message"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
