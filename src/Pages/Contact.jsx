import React, { useState } from 'react';
import MyNavbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer' 
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {

  const [result, setResult] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div>
      <MyNavbar />

      <div className='container mb-4' style={{ width: '100%', height: '400px' }}>
        <iframe
          title="My Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31277.155242922425!2d76.46711164948837!3d11.505554626208571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8a722ce0fff11%3A0x4abee536cee1126d!2sGudalur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1752243998423!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
       <Container className="my-5">
      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <h1 className='text-center' style={{fontFamily:'Times'}}>Contact Us</h1>
          <Col md={6}>
          
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message" rows={4} placeholder="Type your message" required />
        </Form.Group>

        <Button type="submit" variant="primary">Submit Form</Button>

        <div className="mt-3 text-success">{result}</div>
      </Form>
    </Container>
      <Footer />
    </div>
  );
};

export default Contact;
