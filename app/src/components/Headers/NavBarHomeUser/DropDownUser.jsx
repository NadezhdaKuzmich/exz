import React from "react";
import {
  UserOutlined,
  SolutionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Avatar, Button } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    label: <span className="account">Account</span>,
    key: "0",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    label: (
      <Link to="/profile">
        <Button type="link">
          <SolutionOutlined /> <span className="drop-btn">profile</span>
        </Button>
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link to="/">
        <Button type="link">
          <LogoutOutlined /> <span className="drop-btn">sign out</span>
        </Button>
      </Link>
    ),
    key: "2",
  },
];

const DropdDownUser = () => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      overlayClassName="dropdown"
      arrow
    >
      <a href="!#" onClick={(e) => e.preventDefault()}>
        <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#6775d842' }}/>
      </a>
    </Dropdown>
  );
};

export default DropdDownUser;
