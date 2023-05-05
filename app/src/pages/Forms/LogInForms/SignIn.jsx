import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Avatar } from "antd";
import "./Forms.modules.css";

const SignIn = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    navigate("/user", { replace: true });
  };

  return (
    <div className="form-container">
      <h2>Welcome</h2>
      <Avatar
        size={54}
        style={{ backgroundColor: "#b7bdeb" }}
        icon={<UserOutlined />}
      />
      <Form
        name="normal_login"
        className="login-form"
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
            prefix={<UserOutlined className="site-form-item-icon" />}
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
            prefix={<LockOutlined className="site-form-item-icon" />}
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
        Don't have an account?{" "}
        <Link
          to="/sign-up"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;