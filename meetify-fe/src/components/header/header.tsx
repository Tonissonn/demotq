import jwt_decode from "jwt-decode";
import { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { userContext } from "../../hooks/userProvider";
import Icon from "../icon/icon";
import "./header.scss";

const Header = (): JSX.Element => {
  const { pathname } = useLocation();
  const { logout, user } = useContext(userContext);

  useEffect(() => {
    const loadData = localStorage.getItem("access-token");
    const storageUser: UserDTO | undefined =
      loadData != null ? jwt_decode(loadData) : undefined;

    if ((storageUser ? storageUser?.exp * 1000 : 0) < Date.now()) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (pathname !== "/login") {
    return (
      <div className="header-container">
        <span className="logo-align">
          <NavLink to={"/dashboard"} className="links">
            <Icon type={"logo"} />
            <Icon type={"text"} />
          </NavLink>
        </span>
        <span className="item-align">
          <Icon type={"line"} />
        </span>
        <span className="item-align">
          <NavLink to={"/dashboard"} className="links">
            DASHBOARD
          </NavLink>
        </span>
        <span className="item-align">
          <NavLink to={"/meetingRoom"} className="links">
            MEETING ROOMS
          </NavLink>
        </span>
        <span className="item-align">
          <NavLink to={"/schedule"} className="links">
            YOUR SCHEDULE
          </NavLink>
        </span>
        <span className="right-header">
          <div className="account-header">
            <div className="header-username">{user?.name}</div>
            <div className="header-mail">{user?.email}</div>
          </div>
          <div data-initials={user?.name[0].toLocaleUpperCase()}></div>
          <span className="item-align">
            <Icon type={"line"} />
          </span>
          <span className="theme-text">Dark</span>
          <label className="theme-switch">
            <input type="checkbox" id="checkbox" />
            <span className="slider round"></span>
          </label>
          <span className="theme-text">White</span>
        </span>
      </div>
    );
  }
  return (
    <div className="header-container">
      <span className="logo-align">
        <NavLink to={"/dashboard"} className="links">
          <Icon type={"logo"} />
          <Icon type={"text"} />
        </NavLink>
      </span>
      <span className="item-align"></span>
      <span className="item-align"></span>
      <span className="item-align"></span>
      <span className="item-align"></span>
      <span className="right-header">
        <span className="theme-text">Dark</span>
        <label className="theme-switch">
          <input type="checkbox" id="checkbox" />
          <span className="slider round"></span>
        </label>
        <span className="theme-text">White</span>
      </span>
    </div>
  );
};
export default Header;
