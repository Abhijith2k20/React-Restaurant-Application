import React, { useState, useEffect } from 'react';
import '../Styles/Home.scss'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Homeimg, Homebanner } from '../Data/Data.jsx';
import MyNavbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';



const Home = () => {

  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await res.json();
      setCategories(data.categories.slice(0, 12));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="Home">
      <MyNavbar />


      <Carousel interval={1000} fade>
        {
          Homeimg.map((item) => (
            <Carousel.Item key={item.id}>
              <img className='d-block w-100 fluid mx-auto' src={item.image} alt="" />
              <Carousel.Caption>
                {/* <h1  style={{fontFamily:'Times',fontSize:'100px'}}>{item.title}</h1> */}
                <Button className="explore-btn " onClick={() => navigate('/product')}>Explore</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        }
      </Carousel>

      <h1
        className="text-center mt-5 mb-4 df-bold bg-light responsive-heading"
        style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '60px' }}
      >
        Browse Our Menus
      </h1>

      <Container className="mb-5">
        <div className="d-flex overflow-auto gap-3 pb-3">
          {Categories.map((category) => (
            <div
              key={category.idCategory}
              className="flex-shrink-0"
              style={{ minWidth: '200px' }} // Adjust width as needed
            >
              <Card
                className="Menus-card shadow-none"
                onClick={() =>
                  navigate('/product', {
                    state: { category: category.strCategory },
                  })
                }
                style={{ border: 'none' }}
              >
                <Card.Img
                  variant="top"
                  src={category.strCategoryThumb}
                  className="w-100"
                  style={{ height: '150px', objectFit: 'contain' }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{category.strCategory}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <div className='bg-light  fluid'>
        <Container fluid className='px-4 mt-2 mb-4'>
          <Row className="align-items-center">
            {Homebanner.map((item, id) => (
              <React.Fragment key={id}>
                <Col xs={12} md={6} className="position-relative mb-4 mt-4">
                  <img
                    className="img-fluid d-block mx-auto"
                    src={item.image}
                    alt=""
                    style={{
                      height: 'auto',
                      maxHeight: '550px',
                      width: '100%',
                      borderRadius: '20px',
                      border: 'none'
                    }}
                  />
                </Col>

                <Col xs={12} md={6} className="text-center text-md-start mt-n3 px-5">
                  <h1 className=" py-3 text-start" style={{ fontFamily: 'Times' }}>
                    {item.title.split(' ').slice(0, 3).join(' ')} <br />
                    {item.title.split(' ').slice(3).join(' ')}
                  </h1>
                  <p className="fs-5 text-bold text-start">{item.des1}</p>
                  <p className="fs-6 text-muted text-start">{item.des2}</p>
                  <button className="btn" style={{ border: '1px solid', borderRadius: '20px' }} onClick={() => navigate('/about')}>More About Us</button>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />

    </div>
  );
};

export default Home;