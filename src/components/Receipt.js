import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { productList } from '../redux/spend/spendSlice'
import { Container, Row, Table, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Receipt.css'

function formatPrice(price) {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;
    if (price >= billion) {
        return `$${(price / billion).toFixed(1)}b`;
    } else if (price >= million) {
        return `$${(price / million).toFixed(0)}m`;
    } else if (price >= thousand) {
        const formattedPrice = (price / thousand).toFixed(1);
        const decimalPart = formattedPrice.split('.')[1];
        if (decimalPart !== '0') {
            return `$${formattedPrice}k`;
        } else {
            return `$${Math.floor(price / thousand)}k`; 
        }
    } else {
        return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
}
function Receipt() {
    const productsAll = useSelector(productList);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    console.log(purchasedProducts);

    let totalAmount = 0;
    purchasedProducts.forEach((item) => {
        totalAmount += item.piece * item.price;
    });

    useEffect(() => {
        const updatedPurchasedProducts = productsAll.filter((item) => item.piece > 0);
        setPurchasedProducts(updatedPurchasedProducts);
    }, [productsAll]);

    if (purchasedProducts.length === 0) {
        return null;
    }

    const sortedProducts = [...purchasedProducts].sort((a, b) => a.price - b.price);


    return (
        <Container className='bg-white mb-3 text-color mt-2'>
            <Row>
                <Col></Col>
                <Col>
                    <h1 className='py-3 title text-center mt-3'>Your Receipt</h1>
                    <Table borderless>
                        <tbody style={{ borderBottom: "1px solid #333" }}>
                            {sortedProducts.map((item) => (
                                <tr key={item.id}>
                                    <td className='py-0 text-color'>{item.title}</td>
                                    <td className='py-0  text-color'>x{item.piece}</td>
                                    <td className='py-0 item-price text-end'>{formatPrice(item.piece * item.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody  >
                            <tr>
                                <td className='text-color text-total pt-3'>TOTAL</td>
                                <td></td>
                                <td className='total-price pt-3 ps-5 text-end'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(totalAmount)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Receipt;
