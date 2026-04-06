import { Container, Row, Col } from 'react-bootstrap';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { name: 'Vitamin D3 Complex', category: 'Supplements', price: 12500, oldPrice: 15000, rating: 4.8, reviews: 124, badge: 'Best Seller', badgeColor: '#e74c3c' },
  { name: 'Daily Multivitamin', category: 'Vitamins', price: 9500, rating: 4.6, reviews: 89, badge: null },
  { name: 'Omega-3 Fish Oil', category: 'Supplements', price: 18500, oldPrice: 22000, rating: 4.9, reviews: 203, badge: 'Sale', badgeColor: 'var(--mc-accent)' },
  { name: 'First Aid Kit Pro', category: 'Medical Supplies', price: 27500, rating: 4.7, reviews: 67, badge: 'New', badgeColor: 'var(--mc-primary)' },
  { name: 'Blood Pressure Monitor', category: 'Devices', price: 45000, oldPrice: 60000, rating: 4.8, reviews: 156, badge: 'Sale', badgeColor: 'var(--mc-accent)' },
  { name: 'Organic Hand Sanitizer', category: 'Personal Care', price: 3500, rating: 4.5, reviews: 312, badge: null },
  { name: 'Immune Boost Tablets', category: 'Supplements', price: 11500, rating: 4.7, reviews: 178, badge: 'Popular', badgeColor: '#9b59b6' },
  { name: 'Digital Thermometer', category: 'Devices', price: 8500, rating: 4.6, reviews: 94, badge: null },
];

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

const ProductsSection = () => {
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
          {products.slice(0, 8).map((product, index) => (
            <Col key={index} sm={6} lg={3}>
              <div className="product-card">
                <div className="product-img-wrap">
                  {product.badge && (
                    <span className="product-badge text-white" style={{ backgroundColor: product.badgeColor }}>
                      {product.badge}
                    </span>
                  )}
                  <button className="product-wishlist">
                    <Heart size={16} />
                  </button>
                  <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                  </div>
                </div>
                <div className="card-body">
                  <span className="product-category">{product.category}</span>
                  <h6 className="product-title">{product.name}</h6>
                  <div className="d-flex align-items-center gap-1 mb-2">
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <small className="text-muted-custom">({product.reviews})</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="product-price">
                      {formatNaira(product.price)}
                      {product.oldPrice && <span className="old-price">{formatNaira(product.oldPrice)}</span>}
                    </div>
                    <button className="btn btn-primary btn-sm" style={{ borderRadius: '8px', padding: '6px 12px' }}>
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
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
