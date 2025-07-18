import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../Footer/Footer.scss'
import { FaInstagram, FaFacebook, FaTwitter, FaPhone } from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate()

    return (
        <div className='bg-light' >
            {/* <h4  className= 'text-center py-5' style={{fontFamily:'Times'}} >In the new era of technology we look in the future with certainty and pride to for our company</h4> */}

            <Container fluid>
                <Row className='d-flex justify-content-between text-center text-md-start'>
                    <Col md={4}>
                        <h1 className='mt-2'>Bitezy</h1>
                        <p className='mt-4' style={{fontFamily:'Times'}}>In the new era of technology we look a in the future with certainty and pride to for our company</p>
                    </Col>
                    <Col md={4}>
                        <Row className='footer-btn mt-3'>
                        <button onClick={()=>navigate('/')}>Home</button>
                        <button onClick={()=>navigate('/about')}>About</button>
                        <button onClick={()=>navigate('/product')}>Menu</button>
                        <button onClick={()=>navigate('/contact')}>Contact</button>
                        </Row>
                    </Col>
                    <Col md={4}>
                    <Row className='address mt-4 '> 
                        <p>xxxxxxxx<br/>yyyyyyyyyyy<br/>zzzzzzzzzz<br/>475436853456</p>
                        </Row>
                        </Col>
                </Row>
                <hr className='mt-4'/>
                <Row>
                    <Col className='d-flex justify-content-center icons'>
                        <a href="https://www.facebook.com/"><FaFacebook/></a>
                        <a href="https://www.instagram.com/"><FaInstagram/></a>
                        <a href="https://x.com/?lang=en"><FaTwitter/></a>

                    </Col>
                    
                </Row>

            </Container>



        </div>
    )
}

export default Footer
