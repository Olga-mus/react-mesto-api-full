import React from "react";

// import avatar from "../images/profile-avatar.jpg";
// import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const userContext = React.useContext(CurrentUserContext);

  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");
  // const [cards, setCards] = useState([]);
  // const [userId, setUserId] = useState("");

  // React.useEffect(() => {
  //   Promise.all([api.getProfile(), api.getInitialCards()])

  //     .then(([profile, cards]) => {
  //       setUserName(profile.name);
  //       setUserDescription(profile.about);
  //       setUserAvatar(profile.avatar);
  //       setCards(cards);
  //       setUserId(profile._id);
  //     })

  //     .catch((err) => {
  //       console.log("Error", err);
  //       // тут ловим ошибку
  //     });
  // });

  return (
    <main>
      <section className="profile">
        <button
          onClick={props.onEditAvatar}  


          className="profile__button-edit-avatar"
        >
          {/* <img src={avatar} alt="Жак-Ив Кусто" className="profile__avatar"/> */}
          <img
            // src={userAvatar}
            src={userContext.avatar}
            alt="Жак-Ив Кусто"
            className="profile__avatar"
          />
          {/* <img style={{ backgroundImage: `url(${userAvatar})` }} alt="Жак-Ив Кусто" className="profile__avatar"/> */}
        </button>



        <div className="profile__about">
          {/* <h1 className="profile__title">Жак-Ив Кусто</h1> */}
          {/* <h1 className="profile__title">{userName}</h1> */}
          <h1 className="profile__title">{userContext.name}</h1>
          <button
            onClick={props.onEditProfile} 
            className="profile__open-window"
          ></button>
          {/* <p className="profile__subtitle">Исследователь океана</p> */}
          {/* <p className="profile__subtitle">{userDescription}</p> */}
          <p className="profile__subtitle">{userContext.about}</p>
        </div>



        <button onClick={props.onAddPlace} className="profile__button"></button> 
      </section>
      <section className="elements">
        {props.cards.map((card) => ( 
          <Card
            card={card}
            // currentUser={userId}
            key={card._id}
            onCardClick={props.onCardClick} 
            onCardLike={props.onCardLike} 
            onCardDelete={props.onCardDelete} 
        
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

{
  /* <div className="element">
<figure className="element__card">
  <img src="./images/elements-karachaevsk.jpg" alt="Карачаевск" className="element__image"/>
  <figcaption>
    <h2 className="element__title">Карачаевск</h2>
  </figcaption>
</figure>
<button className="element__button-like">
</button>
<button className="element__button-delete">
  <img className="element__delete" src="<%=require('./images/element-delete.svg')%>" alt="Удалить"/>
</button>
<span className="element__like-count"></span>
</div> */
}
