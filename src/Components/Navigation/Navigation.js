import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import style from "./Navigation.module.css";
const Navigation = () => {
  return (
    <div>
      <NavLink to={routes.HOME_PAGE.path} className={style.link}>
        Домашня сторінка
      </NavLink>
      <NavLink to={routes.BOYARMAP_PAGE.path} className={style.link}>
        Карта Бояр
      </NavLink>
      <NavLink to={routes.BOYARMAP_EXPORT_PAGE.path} className={style.link}>
  export      </NavLink>
    </div>
  );
};

export default Navigation;
