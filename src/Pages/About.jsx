import React from 'react'
import MyNavbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Container, Col, Row,Card } from 'react-bootstrap'
import {Homebanner,testimonial } from '../Data/Data.jsx';
import { useNavigate } from 'react-router-dom';
import Food2 from '../Assets/food2.jpg'
import video1 from '../Assets/video.mp4'

const About = () => {
  const navigate = useNavigate()
  return (
    <div>
      <MyNavbar />
      <div className='bg-light  fluid'>
        <Container fluid className='px-4 mt-2 mb-4'>
          <Row className="align-items-center">
            {Homebanner.map((item, id) => (
              <React.Fragment key={id}>
                <Col xs={12} md={6} className="position-relative mb-4 mt-4">
                  <img
                    className="img-fluid d-block mx-auto"
                    src={Food2}
                    alt=""
                    style={{
                      height: 'auto',
                      maxHeight: '550px',
                      width: '100%',
                      borderRadius: '20px',
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
      <Container>
        <div className="  my-5">
          <div className="ratio ratio-16x9">
            <video
              src={video1}
              controls
              muted
              autoPlay
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </Container>
      <h1 className='text-center mt-5 mb-5 df-bold' style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '60px' }}>What Our Customer Says</h1>
<Container className="mb-4 pb-5">
  <Row className="gx-4 gy-4 justify-content-center">
    {testimonial.map((item, index) => (
      <Col xs={12} sm={6} md={4} lg={3} key={index}>
        <Card className="border-0 custom-card">
          <Card.Body>
            <Card.Title className="text-class text-center">{item.title}</Card.Title>
            <Card.Text className="text-class text-center" style={{ fontFamily: "Times" }}>{item.des}</Card.Text>
            <Card.Text className="text-class text-center fw-bold mb-0">{item.name}</Card.Text>
            <Card.Text className="text-class text-center">{item.location}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

      

      <Footer />

    </div>
  )
}

export default About
