import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, Typography } from 'antd';
import { CloseOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './RegisterForm.module.css';

interface RegisterFormProps {
  children: React.ReactNode;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <>
      <div onClick={toggleForm}>{children}</div>

      {isVisible && (
        <div className={styles.overlay} onClick={toggleForm}>
          <div className={styles.card} onClick={(e) => e.stopPropagation()}>
            <CloseOutlined className={styles.closeIcon} onClick={toggleForm} />
            <Typography.Title level={2} className={styles.title}>
              Rejoignez-nous! <SmileOutlined />
            </Typography.Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstname"
                    label="Nom"
                    rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
                  >
                    <Input placeholder="Ex : Superman" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastname"
                    label="Prénom"
                    rules={[{ required: true, message: 'Veuillez saisir votre prénom!' }]}
                  >
                    <Input placeholder="Ex : Kent" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="age"
                    label="Âge"
                    rules={[
                      { required: true, message: 'Veuillez saisir votre âge!' },
                      { pattern: /^[0-9]+$/, message: 'Veuillez entrer un âge valide' },
                    ]}
                  >
                    <Input placeholder="Entrez votre âge (18+)" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="address"
                    label="Adresse"
                    rules={[{ required: true, message: 'Veuillez saisir votre adresse!' }]}
                  >
                    <Input placeholder="Ex : 221B Baker Street" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="tel"
                label="Numéro de téléphone"
                rules={[
                  { required: true, message: 'Veuillez saisir votre numéro de téléphone!' },
                  { pattern: /^\d{10}$/, message: 'Entrez un numéro valide à 10 chiffres' },
                ]}
              >
                <Input placeholder="Ex : 0612345678" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Veuillez saisir votre email!' },
                  { type: 'email', message: 'Entrez un email valide' },
                ]}
              >
                <Input placeholder="Ex : exemple@domain.com" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[{ required: true, message: 'Veuillez saisir votre mot de passe!' }]}
                  >
                    <Input.Password placeholder="Sécurité maximum!" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="password_confirmation"
                    label="Confirmer le mot de passe"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Veuillez confirmer votre mot de passe!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Les mots de passe ne correspondent pas!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Répétez-le, juste pour être sûr" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  S'inscrire
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
