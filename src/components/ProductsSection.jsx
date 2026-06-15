import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import { toast } from 'react-toastify';

import useProductController from '../api-controllers/product-controller-hook';
import handleErrMsg from '../Utils/error-handler';
import { Product } from '../Entities/Product';

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

const ProductsSection = () => {
    const controllerRef = useRef(new AbortController());

    const { random } = useProductController();

    const [networkRequest, setNetworkRequest] = useState(false);
    const [products, setProducts] = useState([]);
        
    useEffect(() => {
        initialize();
        return () => {
            // This cleanup function runs when the component unmounts or when the dependencies of useEffect change (e.g., route change)
            controllerRef.current.abort();
        };
    }, []);

    const initialize = async () => {
        try {
            controllerRef.current = new AbortController();
            setNetworkRequest(true);
            const response = await random(controllerRef.current.signal);
            //	check if the request to fetch random product doesn't fail before setting values to display
            if(response && response.data){
                const productArr = response.data?.map(product => new Product(product) )
                setProducts(productArr);
            }

            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };
    
    const buildProductCards = () => {
        return products.map((product, idx) => (<Col sm={12} lg={3} className="mb-4" key={idx}>
            <div className="product-card h-100">
                <div className="product-img-wrap">
                    {/* <span className="product-badge text-white" style={{ backgroundColor: '#e74c3c' }}>Best Seller</span> */}
                    <button className="product-wishlist">
                        <Heart size={16} />
                    </button>
                    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                    </div>
                </div>
                <div className="card-body">
                    <span className="product-category"> {product.category ? product.categoryName : 'Others'} </span>
                    <h6 className="product-title">{product.productName}</h6>
                    <div className="d-flex align-items-center gap-1 mb-2">
                        {/* <div className="star-rating">
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="none" />
                        </div> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                            {formatNaira(product.salesPrice)}
                            {/* <span className="old-price">{formatNaira(15000)}</span> */}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                            <ShoppingCart size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </Col>))
    };
    
    const buildProductCardSkeletons = () => {
        return new Array(4).fill(1).map((val, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
                <Card className="h-100 shadow border-0 rounded-3">
                    <Skeleton height={300} />
                    <Card.Body className="d-flex flex-column">
                        <Skeleton />
                        <Skeleton count={2} />
                    </Card.Body>
                </Card>
            </div>
        ));
    };

    return (
        <section className="section-padding bg-section">
            <Container>
                <div className="text-center mb-5">
                    <span className="section-badge">Our Products</span>
                    <h2 className="section-title">Health & Wellness Essentials</h2>
                    <p className="section-subtitle mx-auto">
                        Discover our carefully curated selection of healthcare products for your everyday needs.
                    </p>
                </div>
                <Row className="g-4">
                    {networkRequest && buildProductCardSkeletons()}
                    {!networkRequest && products.length === 0 && <h4 className="text-center text-success">No Product</h4>}
                    {!networkRequest && products.length > 0 && buildProductCards()}
                </Row>
                <div className="text-center mt-5">
                    <Link to="/products" className="btn btn-outline-primary btn-lg px-4">
                        View All Products
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default ProductsSection;
