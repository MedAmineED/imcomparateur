"use client";
import React from 'react';
import { Button, Form, Input, Typography, Divider, Row, Col } from 'antd';
import styles from './Signup.module.css';
import Image from 'next/image';
import Link from 'next/link';
import RegisterServices from '../API/RegisterServices';
import ApiUrls from '../API/ApiURLs/ApiURLs';
import { RegisterEntity } from '../entities/RegisterEntity';

const { Title } = Typography;

const Page: React.FC = () => {
    // Triggered on form submission
    const onFinish = async (values: RegisterEntity): Promise<void> => {
        console.log('Form submitted with values:', values);
        try{
           const response = await RegisterServices.Register(ApiUrls.USER, values)
           //const response = await RegisterServices.SayhelloPost("http://localhost:8000/api/hello");
           console.log(response)
           console.log("adding with success")
           //console.log(response)
        } catch(error){
            console.log(error)
        }
    };

    // Capture form value changes for debugging
    const onValuesChange = (changedValues: any, allValues: any) => {
        console.log('Field changed:', changedValues);
        console.log('Current form values:', allValues);
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <a aria-label="Aller à la page d'accueil" href="/">
                    <Image width={100} height={40} src="" alt="Logo" className={styles.logo} />
                </a>
                <div className={styles.card}>
                    <Title level={4}>Créer un nouveau compte</Title>
                    <Form 
                        name="signup" 
                        layout="vertical" 
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="firstname"
                                    label="Nom"
                                    rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
                                >
                                    <Input type="text" placeholder="Entrez votre nom" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="lastname"
                                    label="Prenom"
                                    rules={[{ required: true, message: 'Veuillez saisir votre prenom!' }]}
                                >
                                    <Input type="text" placeholder="Entrez votre prenom" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="age"
                                    label="Age"
                                    rules={[
                                        { required: true, message: 'Veuillez saisir votre age!' },
                                        { pattern: /^[0-9]+$/, message: 'Veuillez entrer un âge valide' },
                                    ]}
                                >
                                    <Input type="text" placeholder="Entrez votre age" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="address"
                                    label="Adresse"
                                    rules={[{ required: true, message: 'Veuillez saisir votre adresse!' }]}
                                >
                                    <Input placeholder="Entrez votre adresse" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="tel"
                            label="Numero de telephone"
                            rules={[
                                { required: true, message: 'Veuillez saisir votre numero de telephone!' },
                                { pattern: /^\d{10}$/, message: 'Entrez un numéro valide à 10 chiffres' },
                            ]}
                        >
                            <Input type="text" placeholder="Entrez votre numero de telephone!" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Veuillez saisir votre email!' },
                                { type: 'email', message: 'Entrez un email valide' },
                            ]}
                        >
                            <Input type="email" placeholder="Entrez votre email" />
                        </Form.Item>
                        
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="password"
                                    label="Mot de passe"
                                    rules={[{ required: true, message: 'Veuillez saisir votre mot de passe!' }]}
                                >
                                    <Input type="password" placeholder="Entrez votre mot de passe" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="password_confirmation"
                                    label="Confirmer le mot de passe"
                                    rules={[{ required: true, message: 'Veuillez confirmer votre mot de passe!' }]}
                                >
                                    <Input type="password" placeholder="Confirmez votre mot de passe" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.submitButton}>
                                Créer un compte
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>Ou inscrivez-vous avec</Divider>
                    <div className={styles.socialButtons}>
                        <Button type="default" aria-label="Continuer avec Google">
                            <Image src="/images/google.png" width={20} height={20} alt="google" />
                        </Button>
                    </div>
                </div>
                <div className={styles.signInPrompt}>
                    <p>
                        Vous avez déjà un compte ? <Link href={"login"} className={styles.linkCST}> Se connecter.</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Page;
