import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import Image from 'next/image';
import styles from './home.module.css';
import CardsContainer from '../components/cardsContainer/CardsContainer';

const { Title, Paragraph } = Typography;

const guidesData = [
  {
    title: 'Comment changer du mutuelle sante',
    description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  },
  {
    title: 'Comment resilier sa complimentaire sante',
    description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  },
  {
    title: 'Comment me proteger des actifs frauduleux',
    description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  },
  {
    title: 'Mon droit aux subsides cantonalas',
    description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
  },
];

const actualitiesData = [
  {
    title: 'Nouveautés sur les primes d\'assurance santé 2024',
    description: 'Les nouvelles réformes impactent les primes d\'assurance pour 2024.',
    image: '/images/act1.jpg',
  },
  {
    title: 'Augmentation des tarifs de l\'assurance automobile',
    description: 'Les tarifs pour l\'assurance automobile devraient augmenter de 10% cette année.',
    image: '/images/act2.jpg',
  },
  {
    title: 'Assurance habitation : ce qu\'il faut savoir',
    description: 'Tout ce que vous devez savoir sur l\'assurance habitation et ses réformes.',
    image: '/images/act3.jpg',
  },
  {
    title: 'Les nouvelles offres d\'assurance vie',
    description: 'Découvrez les dernières offres attractives en matière d\'assurance vie.',
    image: '/images/act4.jpg',
  },
];

const Page = () => {
  return (
    <>
      <div className={styles.heroSection}>
        <Row className={"containerCST"} justify="center" align="middle" style={{ height: '100%', textAlign: 'start' }}>
          <Col xs={24} md={12} className={styles.textColumn}>
            <Title className={styles.heroTitle} level={1}>BIENVENUE SUR VOTRE GUIDE</Title>
            <Paragraph className={styles.heroParagraph}>
              FAITES BIEN VOTRE CHOIX GRÂCE À NOS ÉTUDES BIEN PRÉCISES!
            </Paragraph>
            <Button className={styles.allonsYbtn} type="primary" size="large">ALLONS-Y</Button>
          </Col>
          <Col xs={24} md={11} className={styles.imageColumn}>
            <Image
              src="/images/assurance.jpg"
              alt="Hero Image"
              width={600}
              height={400}
              layout="responsive"
              priority
            />
          </Col>
        </Row>
      </div>

      <Row className={`${styles.partnersRow} containerCST`} style={{ width: "100%", height: "100px", border: "2px solid black" }}>
        <div><Image src="/images/visana.png" alt="Hero Image" width={100} height={40} priority /></div>
        <div><Image src="/images/csslogo.png" alt="Hero Image" width={100} height={40} priority /></div>
        <div><Image src="/images/alianz.png" alt="Hero Image" width={100} height={40} priority /></div>
        <div><Image src="/images/baloise.png" alt="Hero Image" width={100} height={40} priority /></div>
        <div><Image src="/images/zurich.png" alt="Hero Image" width={100} height={40} priority /></div>
      </Row>

      <div className={`${styles.aboutSection} ${styles.whiteSec}`}>
        <Title className={styles.aboutTitle} level={3}>A PROPOS</Title>
        <Title className={styles.secondAboutTitle} level={1}>LA PREMIERE GUIDE D'ASSURANCE SUISSE !</Title>
        <div className='containerCST'>
          <div className={styles.paragCont}>
            <Paragraph className={styles.firstParag}>
              Basé sur l'intelligence artificielle et la contribution des meilleurs experts en finance!
            </Paragraph>
            <Paragraph className={styles.secondParag}>
            Notre mission est de vous dénicher les meilleures assurances au meilleur prix. Nous avons négocié les meilleurs contrats de qualité grâce aux données analysées par notre système d'intelligence artificielle et la contribution de nos partenaires de confiance.
            </Paragraph>
          </div>
        </div>
      </div>

      <CardsContainer sectionTitle='NOS GUIDES'>
        <Row gutter={[16, 16]} justify="center">
          {guidesData.map((guide, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card className={styles.cradCST} bordered={false}>
                <Title className={styles.cardTitle} level={3}>{guide.title}</Title>
                <Paragraph>{guide.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </CardsContainer>

      <CardsContainer
  paragraph={`
    Nous sommes ravis de vous présenter notre tout nouveau comparateur d'assurance, 
    conçu pour simplifier votre recherche et vous aider à trouver la couverture idéale adaptée à vos besoins ;
    comparez en quelques clics les offres des principaux assureurs,
    afin de faire un choix éclairé et économiser sur vos primes tout en bénéficiant des meilleures garanties.
  `}
  sectionTitle='ACTUALITES'
  className={styles.whiteSec}
>
  <Row gutter={[16, 16]} justify="center">
    {actualitiesData.map((guide, index) => (
      <Col xs={24} sm={12} md={8} lg={6} key={index}>
        <Card className={styles.cradCST} bordered={false}>
          {/* Add the image here */}
          <Image
            src={guide.image}
            alt={guide.title}
            className={styles.cardImage}
            width={600}
            height={150}
            layout="responsive"
            objectFit="cover"
          />
          <Title className={styles.cardTitle} level={3}>
            {guide.title}
          </Title>
          <Paragraph>{guide.description}</Paragraph>
        </Card>
      </Col>
    ))}
  </Row>
</CardsContainer>

    </>
  );
};

export default Page;
