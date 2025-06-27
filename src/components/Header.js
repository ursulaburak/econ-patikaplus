import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'

function Header() {
  return (
    <Container className='mx-auto '>
      <Row className="mt-3 bg-white">
        <Col className='pt-3'>
          <Image src='https://neal.fun/spend/billgates.jpg' alt='Bill Gates' roundedCircle style={{ width: 125, height: 125 }} className='rounded mx-auto d-block img mt-4' />
          <p className="text-center mt-4 title">
            Spend Bill Gates' Money
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default React.memo(Header);