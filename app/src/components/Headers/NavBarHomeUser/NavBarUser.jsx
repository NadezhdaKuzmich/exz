import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import { ProjectOutlined } from "@ant-design/icons";
import DropdDownUser from "./DropDownUser";
import "./NavBarUser.modules.css";

const NavBarUser = () => {
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);

  return (
    <header>
      <div className="container">
        <div className="navbar-user">
          <div className="nav-bar-bredcumb">
            <span className="navbar-logo-user">TASKS</span>
            <Breadcrumb
              className="breadcrumb-board"
              items={[
                {
                  title: "",
                },
                {
                  title: (
                    <>
                      <ProjectOutlined />
                      <span>{board.name}</span>
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="nav-user-btn">
            <DropdDownUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBarUser;
