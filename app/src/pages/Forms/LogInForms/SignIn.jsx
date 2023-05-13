import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../slices/AuthSlice/AuthSlise";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Avatar } from "antd";
import styles from "./Forms.module.css";
import { useEffect } from "react";

const SignIn = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username && user.password) {
      navigate("/user");
    }
  }, [user, navigate]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.form}>
      <h2>Welcome</h2>
      <Avatar
        size={54}
        style={{ backgroundColor: "#b7bdeb" }}
        icon={<UserOutlined />}
      />
      <Form
        name="normal_login"
        className={styles.login}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className={styles.icon} />}
            placeholder="Username"
            autoComplete="username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.icon} />}
            type="password"
            placeholder="Password"
            size="large"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
