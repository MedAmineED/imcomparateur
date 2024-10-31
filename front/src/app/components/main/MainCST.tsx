'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer } = Layout;

const items = [
  { key: '/', label: 'Accueil' },
  { key: '/assurance', label: 'Assurance' },
  { key: '/comparator', label: 'Comparateur' },
  { key: '/actualites', label: 'Actualités' },
  { key: '/contact', label: 'Contact' },
  { key: '/signup', label: 'Inscription' },
  { key: '/login', label: <button className= {'border-btn'}> Se Connecter</button> },
];

const MainCST = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleMenuClick = (e) => {
    router.push(e.key);
    onClose();
  };

  return (
    <Layout className="layout">
      <Header className="header containerCST">
        <div className="logo">Logo</div>
        {isLargeScreen ? (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[router.pathname]}
            items={items.map((item) => ({
              key: item.key,
              label: <Link href={item.key}>{item.label}</Link>,
            }))}
            onClick={handleMenuClick}
            className="desktop-menu"
          />
        ) : (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="menu-button"
          />
        )}
      </Header>
      <Drawer
        title={<div className="drawer-title">Menu</div>}
        placement="right"
        onClose={onClose}
        open={visible}
        closeIcon={<CloseOutlined style={{ fontSize: '18px' }} />}
        width={280}
      >
        <Menu
          theme="light"
          mode="vertical"
          selectedKeys={[router.pathname]}
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
          onClick={handleMenuClick}
          className="mobile-menu"
        />
      </Drawer>
      <Content className="content">
        {children}
      </Content>
      <Footer className="footer">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Footer>
      <style jsx global>{`
        .layout {
          min-height: 100vh;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: fixed;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          background-color: #37517ec9;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: white;
        }
        .desktop-menu {
          flex: 1;
          min-width: 0;
          justify-content: flex-end;
          background-color: transparent;
        }
        .menu-button {
          color: white;
          font-size: 18px;
        }
        .drawer-title {
          font-size: 20px;
          font-weight: bold;
        }
        .mobile-menu {
          border-right: none;
        }
        .content {
          padding: 0;
        }
        .footer {
          text-align: center;
          background: #001529;
          color: rgba(255, 255, 255, 0.65);
        }
        @media (max-width: 767px) {
          .header {
            padding: 0 16px;
          }
          .content {
            padding: 16px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default MainCST;