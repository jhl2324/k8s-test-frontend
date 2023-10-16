import React from "react";
import { Layout } from "antd";
import MainLogo from "../assets/images/SDDM_logo11.png";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const { Header, Content } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header id="header">
        <img id="mainLogo" width={220} src={MainLogo} alt={"sotif logo"} />
        {/*
          <span id="avatar">
            <Avatar size={40} icon={<UserOutlined />} />
          </span>
  */}
      </Header>

      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
