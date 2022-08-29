import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardLike, onCardDelete, card }) {
  const currentUser = React.useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }

  //должна ли в текущей карточке показываться иконка удаления.
  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
 
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__button-delete ${
    isOwn ? "element__button-delete_visible" : "element__button-delete_hidden"
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  //поставили ли мы уже «лайк» этой карточке:

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем


   const isLiked = card.likes.some(id => id === currentUser._id);
   
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__like_active" : "element__button-like"
  }`;

  return (
    <div className="element">
      <figure className="element__card">
        {/* <img src="./images/elements-karachaevsk.jpg" alt="Карачаевск" className="element__image"/> */}
        <img
          onClick={handleClick}
          src={card.link}
          alt={card.name}
          className="element__image"
        />
        <figcaption>
          {/* <h2 className="element__title">Карачаевск</h2> */}
          <h2 className="element__title">{card.name}</h2>
        </figcaption>
      </figure>
      {/* <button className="element__button-like"></button> */}
      <button
        onClick={handleLikeClick}
        className={cardLikeButtonClassName}
      ></button>
      {/* <button className="element__button-delete"> */}
      {/* <img className="element__delete" src="<%=require('./images/element-delete.svg')%>" alt="Удалить"/> */}{" "}
      */
      {/* {/* <img className="element__delete" style={{ backgroundImage: `url(${card})` }}alt="Удалить"/> */}
      {/* </button> */}
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
        {/* <img className="element__delete" src="<%=require('./images/element-delete.svg')%>" alt="Удалить"/> */}
        {/* <img className="element__delete" style={{ backgroundImage: `url(${card})` }}alt="Удалить"/> */}
      </button>
      <span className="element__like-count">{card.likes.length}</span>
    </div>
  );
}

export default Card;
