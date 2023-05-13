import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import { ProjectOutlined } from "@ant-design/icons";
import DropdDownUser from "./DropDownUser";
import style from "./NavBarUser.module.css";

const NavBarUser = () => {
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true) || null;

  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.navbar}>
          <div className={style.navbarBredcumb}>
            <span className={style.navbarLogo}>TASKS</span>
            {board ? (
              <Breadcrumb
                className={style.breadcrumbBoard}
                items={[
                  {
                    title: "",
                  },
                  {
                    title: (
                      <>
                        <ProjectOutlined />
                        <span>{board ? board.name : null}</span>
                      </>
                    ),
                  },
                ]}
              />
            ) : null}
          </div>
          <DropdDownUser />
        </div>
      </div>
    </header>
  );
};

export default NavBarUser;