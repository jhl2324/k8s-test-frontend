import React from "react";
import mainLOGO from "../../assets/images/SDDM_logo12.png";
import ACLLOGO from "../../assets/images/ACL.png";
import WISELOGO from "../../assets/images/WISE1.png";
import KATECHLOGO from "../../assets/images/KATECH1.png";
import { Button, Input, Form, Checkbox, Layout } from "antd";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";

const SignIn = () => {
  const { Content, Footer } = Layout;
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("move to main");
    navigate(`/download`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <Content>
        <div id="body">
          <main id="main">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <img
                id="sotif_logo"
                src={mainLOGO}
                width="300"
                alt="sotif logp"
              />
              <h1 id="signInText">Please Sign In</h1>
              <Form.Item
                name="username"
                wrapperCol={{ offset: 2, span: 20 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your email address!",
                  },
                ]}
              >
                <Input id="signInInput" placeholder="Email address" />
              </Form.Item>

              <Form.Item
                name="password"
                wrapperCol={{ offset: 2, span: 20 }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password id="signInInput" placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 4, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
                <Button type="primary" htmlType="submit" id="signInBtn">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </main>
        </div>
      </Content>
      <Footer id="footer">
        <img src={ACLLOGO} width={150} />
        <img src={WISELOGO} width={100} />
        <img src={KATECHLOGO} width={70} />
      </Footer>
    </Layout>
  );
};
export default SignIn;
