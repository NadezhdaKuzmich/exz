import { useDispatch } from "react-redux";
import { register } from "../../../slices/AuthSlice/AuthSlise";
import { useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Avatar } from "antd";
import styles from "./Forms.module.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(register(values))
    navigate("/user");
  };

  return (
    <div className={`${styles.form} ${styles.signUp}`}>
      <h2>Sign Up</h2>
      <Avatar
        size={54}
        style={{ backgroundColor: "#b7bdeb" }}
        icon={<UserAddOutlined />}
      />
      <Form
        autoComplete="off"
        className={styles.login}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="username"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          style={{ marginBottom: "14px" }}
          hasFeedback
        >
          <Input
            size="large"
            placeholder="Type your name"
            autoComplete="username"
            prefix={<UserOutlined className={styles.icon} />}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            { type: "email", message: "Please enter a valid email" },
          ]}
          style={{ marginBottom: "14px" }}
          hasFeedback
        >
          <Input
            size="large"
            prefix={<MailOutlined className={styles.icon} />}
            autoComplete="email"
            placeholder="Type your email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
            { min: 8 },
          ]}
          style={{ marginBottom: "14px" }}
          hasFeedback
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className={styles.icon} />}
            autoComplete="new-password"
            placeholder="Type your password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered does not match."
                );
              },
            }),
          ]}
          style={{ marginBottom: "34px" }}
          hasFeedback
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className={styles.icon} />}
            autoComplete="new-password"
            placeholder="Confirm your password"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: "0" }}>
          <Button
            size="large"
            type="primary"
            className="form-button"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
