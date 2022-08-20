import React from "react";
import logo from "../images/header-logo.svg";

function ImagePopup(props) {
  const popupVisible = props.card ? "popup_opened" : "";
  
  return (
    <div className={`popup ${props.name} ${popupVisible}`}>
      <figure className="popup__info">
        <button
          onClick={props.onClose}
          className="popup__close-button"
        ></button>
        {/* <img className="popup__view" /> */}
        <img
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
          className="popup__view"
        />
        <figcaption>
          {/* <p className="popup__image-title"></p> */}
          <p className="popup__image-title">{props.card && props.card.name}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
