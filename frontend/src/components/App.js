// import logo from './logo.svg';
// import avatar from '../images/profile-avatar.jpg';
import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../utils/Auth.js";
import { AuthContext } from "../contexts/AuthContext";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const token = localStorage.getItem('jwt');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isRequestCompleted, setRequestCompleted] = useState(false);
  const [isTooltipPopupOpen, setTooltipPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("ya@kick.ru");
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSignOutClick() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

  ///////////////////////////////////////////////// мой 
  useEffect(() => {
    // const token = localStorage.getItem('jwt')

    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setLoggedIn(true)
          // setUserEmail(data.data.email)
          setUserEmail(data.email)
          history.push('/')
        })
        .catch(err => console.log(err))
    }
  }, [history])

  useEffect(() => {
    if (loggedIn) {
      // вызываем получение данных ...
      Promise.all([api.getProfile(token), api.getInitialCards(token)])
        .then(resData => {
          const [userData, cardList] = resData;
          setCurrentUser(userData.data);
          setCards(cardList.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn, token]);

////////////////////////////////////////////////////////
// Казаков

// useEffect(() => {
//   handleTokenCheck();
// }, []);

// function handleTokenCheck() {
//   if (token) {
//     auth.checkToken(token)
//       .then(data => {
//         if (data.email) {
//           setUserEmail(data.email);
//           setLoggedIn(true);
//           history.push('/');
//         }
//       })
//       .catch(console.error);
//   }
// };

// useEffect(() => {
//   if (loggedIn) {
//     Promise.all([
//       api.getProfile(localStorage.getItem(token)),
//       api.getInitialCards(localStorage.getItem(token))
//     ])
//       .then(([data, cards]) => {
//         setCards(cards);
//         setCurrentUser(data);
//       })
//       .catch(console.error);
//   }
// }, [loggedIn, token]);

//////////////////////////////////////

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true); //переменные состояния, отвечающие за видимость
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true); //переменные состояния, отвечающие за видимость
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true); //переменные состояния, отвечающие за видимость
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        console.log(res);
        setCards((prevState) =>
          prevState.filter((c) => c._id !== card._id && c)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //закрытие попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipPopupOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push("/");
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch(() => {
        setRequestCompleted(false);
        setTooltipPopupOpen(true);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setRequestCompleted(true);
          setTooltipPopupOpen(true);

          setTimeout(() => {
            history.push("/signin");
            setTooltipPopupOpen(false);
            // handleLoginSubmit(email, password);
          }, 1500);
        }
      })
      .catch(() => {
        setRequestCompleted(false);
        setTooltipPopupOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider
        value={{ loggedIn: loggedIn, userEmail: userEmail }}
      >
        <div className="page__container">
          <Header onSignOut={handleSignOutClick} />

          <main>
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                component={Main}
              />

              <Route path="/signup">
                <Register onRegister={handleRegisterSubmit} />
              </Route>

              <Route path="/signin">
                <Login onLogin={handleLoginSubmit} />
              </Route>

              <Route>
                <Redirect to={`${loggedIn ? "/" : "/signin"}`} />
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </main>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />

          <PopupWithForm
            title="Вы уверены"
            name="delete-confirm"
            button="Да"
            onClose={closeAllPopups}
          ></PopupWithForm>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            isRequestCompleted={isRequestCompleted}
          />
        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
