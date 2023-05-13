import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../slices/AuthSlice/AuthSlise";
import {
  UserOutlined,
  SolutionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Avatar, Button } from "antd";
import styles from "./DropDownUser.module.css";

const DropdDownUser = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const items = [
    {
      label: <span className={styles.account}>{user.username}</span>,
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
            <SolutionOutlined /> <span className={styles.dropBtn}>profile</span>
          </Button>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Button type="link" onClick={() => dispatch(logout())}>
          <LogoutOutlined /> <span className={styles.dropBtn}>sign out</span>
        </Button>
      ),
      key: "2",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      overlayClassName={styles.dropdown}
      arrow
    >
      <a href="!#" onClick={(e) => e.preventDefault()}>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{ backgroundColor: "#6775d842"}}
        />
      </a>
    </Dropdown>
  );
};

export default DropdDownUser;