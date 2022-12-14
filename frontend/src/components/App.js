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

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    console.log('token', token);

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
      // ???????????????? ?????????????????? ???????????? ...
      Promise.all([api.getProfile(token), api.getInitialCards(token)])
        .then(resData => {
          const [userData, cardList] = resData;
          setCurrentUser(userData.data);
          setCards(cardList.reverse());
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn, token]);

  function handleCardLike(card) {
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
        console.log('card._id', card._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true); //???????????????????? ??????????????????, ???????????????????? ???? ??????????????????
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true); //???????????????????? ??????????????????, ???????????????????? ???? ??????????????????
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true); //???????????????????? ??????????????????, ???????????????????? ???? ??????????????????
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
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
      .addCard(card, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //???????????????? ??????????????
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipPopupOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .editProfile(data, token)
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
      .updateAvatar(avatar, token)
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
            title="???? ??????????????"
            name="delete-confirm"
            button="????"
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
