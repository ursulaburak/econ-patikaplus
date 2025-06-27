import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { productList, buy, sell, updateTotalPrice, updateInput } from '../redux/spend/spendSlice';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SpendMoney.css'

function SpendMoney() {

  const dispatch = useDispatch()
  const balanceValue = useSelector(state => state.spend.value);
  const [animatedBalanceValue, setAnimatedBalanceValue] = useState(balanceValue);
  const productsAll = useSelector(productList);
  const [quantities, setQuantities] = useState({});

  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;
  const hundred = 100;
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBalanceValue(prevValue => {
        if (prevValue > balanceValue) {
          if (prevValue - balanceValue >= billion) {
            return prevValue - 100000001723;
          } else if (prevValue - balanceValue >= million) {
            return prevValue - 1000000;
          } else if (prevValue - balanceValue >= thousand) {
            return prevValue - 156;
          } else if (prevValue - balanceValue >= hundred) {
            return prevValue - 13;
          } else {
            return prevValue - 1;
          }
        } else {
          return balanceValue;
        }
      });
    }, 1);

    return () => clearInterval(interval);
  }, [balanceValue]);


  const handleBuy = (itemId) => {
    const currentQuantity = quantities[itemId] || 0;
    const quantityToBuy = currentQuantity + 1;
    setQuantities(prevState => ({ ...prevState, [itemId]: quantityToBuy }));
    dispatch(buy({ itemId, quantity: quantityToBuy }));
  };

  const handleSell = (itemId) => {
    const currentQuantity = quantities[itemId] || 0;
    if (currentQuantity > 0) {
      const quantityToSell = currentQuantity - 1;
      setQuantities(prevState => ({ ...prevState, [itemId]: quantityToSell }));
      dispatch(sell({ itemId, quantity: quantityToSell }));
    }
  };

  const calculateMaxQuantity = (itemId) => {
    const product = productsAll.find(item => item.id === itemId);
    return Math.floor(balanceValue / product.price);
};
  

  const handleQuantityChange = (itemId, value) => {
    const newQuantity = parseInt(value) || 0;
    const previousQuantity = quantities[itemId] || 0;
    const maxQuantity = calculateMaxQuantity(itemId);
    console.log(newQuantity, previousQuantity, maxQuantity);
    const quantityToSell = Math.min(newQuantity, maxQuantity);
      if (newQuantity >= previousQuantity) {
        const diff = (newQuantity - previousQuantity);
        dispatch(updateTotalPrice({ itemId, quantity: diff }));
        setQuantities(prevState => ({ ...prevState, [itemId]: quantityToSell }));
    } else {
        const diff = (previousQuantity - quantityToSell);
        dispatch(updateInput({ itemId, quantity: diff }));
        setQuantities(prevState => ({ ...prevState, [itemId]: quantityToSell }));
    }

    //   if(newQuantity>=quantityToSell){
    //     dispatch(updateTotalPrice({ itemId, quantity: quantityToSell }));
    //     setQuantities(prevState => ({ ...prevState, [itemId]: quantityToSell }));
    //   } 
      
      
      
    //   else if (newQuantity >= previousQuantity) {
    //   const diff = (newQuantity - previousQuantity);
    //   dispatch(updateTotalPrice({ itemId, quantity: diff }));
    //   setQuantities(prevState => ({ ...prevState, [itemId]: newQuantity }));
    // } else if(newQuantity<previousQuantity) {
    //   const diff = (previousQuantity - newQuantity)
    //   dispatch(updateInput({ itemId, quantity: diff }));
    //   setQuantities(prevState => ({ ...prevState, [itemId]: newQuantity }));
    // } else{
    //   return null;
    // }
  };


  return (
    <>

      <Container className='mx-auto mt-2 text-center text-white sticky-top balanceValue'>
        <Row>
          <p className='mt-3 money'>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(animatedBalanceValue)}
          </p>
        </Row>
      </Container>

      <Container className='container-fluid mx-auto text-center p-0 m-0' style={{ backgroundColor: "#f1f2f6" }} >
        <Row className="card-columns gx-2">
          {productsAll.map((item) => (
            <Col md={4} key={item.id} className='g-2'>
              <Card className=" mx-auto d-block py-4 border-0 rounded-0">
                <Card.Img variant="top" src={item.imageUrl} style={{ objectFit: "contain", height: 120 }} />
                <Card.Body>
                  <Card.Title className="mb-0 item-name">{item.title}</Card.Title>
                  <Card.Text className="mt-0 item-price">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </Card.Text>
                  <div className='input-group justify-content-center'>
                    <button
                      className='btn  me-2 px-4 opacity-100 border-0 buttons item-sell'
                      type='button'
                      disabled={quantities[item.id] <= 0 || item.piece === 0}
                      onClick={(e) => handleSell(item.id, e)}>
                      Sell
                    </button>

                    <input
                      className='text-center w-25 me-2 item-input ps-3'
                      type='number'
                      value={quantities[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      onFocus={(e) => e.target.value = ""}
                    />

                    <button
                      className='btn px-4 opacity-100 border-0 buttons item-buy'
                      type='button'
                      disabled={balanceValue === 0}
                      onClick={(e) => handleBuy(item.id, e)}>
                      Buy
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default SpendMoney