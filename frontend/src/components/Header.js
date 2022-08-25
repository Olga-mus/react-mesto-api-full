import { useState, useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../images/header-logo.svg";

function Header(props) {
  const { onSignOut } = props;
  const { loggedIn, userEmail } = useContext(AuthContext);

  const headerLink = (
    <Switch>
      <Route path="/signin">
        <Link to="/signup" className="link header__link">Регистрация</Link>
      </Route>
      <Route path="/signup">
        <Link to="/signin" className="link header__link">Войти</Link>
      </Route>
    </Switch>
  );

  return (
    <header className="header">
      <img src={logo} alt="Логотип Мэсто" className="header__logo" />
      <div className="header__contact">
        { loggedIn && <p className="header__email">{userEmail} </p> }
        { !loggedIn && headerLink }
        { loggedIn && <Link to="/#" onClick={onSignOut} className="header__exit link"> Выйти
        </Link> }
      </div>
    </header>
  );
}

export default Header;