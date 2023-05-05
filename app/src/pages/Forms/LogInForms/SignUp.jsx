import {
  UserAddOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Avatar } from "antd";
import "./Forms.modules.css";

const SignUp = () => {
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
    <div className="form-container sign-up">
      <h2>Sign Up</h2>
      <Avatar
        size={54}
        style={{ backgroundColor: "#b7bdeb" }}
        icon={<UserAddOutlined />}
      />
      <Form
        autoComplete="off"
        className="login-form"
        layout="vertical"
        onFinish={(values) => {
          console.log({ values });
        }}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="fullName"
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
            prefix={<UserOutlined className="site-form-item-icon" />}
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
            prefix={<MailOutlined className="site-form-item-icon" />}
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
            { min: 6 },
            // {
            //   validator: (_, value) =>
            //     value && value.includes("A")
            //       ? Promise.resolve()
            //       : Promise.reject("Password does not match criteria."),
            // },
          ]}
          style={{ marginBottom: "14px" }}
          hasFeedback
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
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
            prefix={<LockOutlined className="site-form-item-icon" />}
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
