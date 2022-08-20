import React from "react";
import { useState, useEffect } from 'react';

function PopupWithForm(props) {
  const { isOpen, onClose, onSubmit, title, children } = props;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // useEffect, который будет реагировать на пропс isOpen и очищать значения в инпутах при открытии попала
    useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);

  const popupVisible = props.isOpen ? "popup_opened" : ""; //видимость попапов
  return (
    <div
      className={`popup popup_input-window ${popupVisible}`}
      id={`popup__${props.name}`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close-button"
        ></button>
        <form
          onSubmit={props.onSubmit}
          id={`form__${props.name}`}
          className="popup__form"
          name={props.name}
          noValidate
        >
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button
            id={`submit__${props.name}`}
            type="submit"
            className="popup__save-button"
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
