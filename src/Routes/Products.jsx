import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Heart, Star, ShoppingCart, Search, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Supplements', 'Vitamins', 'Medical Supplies', 'Personal Care', 'Devices', 'Pain Relief', 'Skin Care'];

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="page-header">
          <Container>
            <h1>Our Products</h1>
            <p className="text-muted-custom mb-3" style={{ fontSize: '1.1rem' }}>
              Browse our complete range of health and wellness products
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Products</li>
              </ol>
            </nav>
          </Container>
        </section>

        {/* Products */}
        <section className="section-padding">
          <Container>
            {/* Search & Filter */}
            <div className="d-flex flex-column flex-md-row gap-3 mb-4 align-items-md-center justify-content-between">
              <div className="position-relative" style={{ maxWidth: 360, flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: 42, borderRadius: 8, borderColor: 'var(--mc-border)' }}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <SlidersHorizontal size={16} className="text-muted-custom" />
                <span className="text-muted-custom" style={{ fontSize: '0.9rem' }}>16 products</span>
              </div>
            </div>

            {/* Category Filters */}
            <div className="d-flex flex-wrap gap-2 mb-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <Row className="g-4">
              {/* Vitamin D3 Complex */}
              {(activeCategory === 'All' || activeCategory === 'Supplements') && (!searchTerm || 'vitamin d3 complex'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: '#e74c3c' }}>Best Seller</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Supplements</span>
                      <h6 className="product-title">Vitamin D3 Complex</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(124)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(12500)}
                          <span className="old-price">{formatNaira(15000)}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Daily Multivitamin */}
              {(activeCategory === 'All' || activeCategory === 'Vitamins') && (!searchTerm || 'daily multivitamin'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Vitamins</span>
                      <h6 className="product-title">Daily Multivitamin</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(89)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(9500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Omega-3 Fish Oil */}
              {(activeCategory === 'All' || activeCategory === 'Supplements') && (!searchTerm || 'omega-3 fish oil'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: 'var(--mc-accent)' }}>Sale</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Supplements</span>
                      <h6 className="product-title">Omega-3 Fish Oil</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                        </div>
                        <small className="text-muted-custom">(203)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(18500)}
                          <span className="old-price">{formatNaira(22000)}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* First Aid Kit Pro */}
              {(activeCategory === 'All' || activeCategory === 'Medical Supplies') && (!searchTerm || 'first aid kit pro'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: 'var(--mc-primary)' }}>New</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Medical Supplies</span>
                      <h6 className="product-title">First Aid Kit Pro</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(67)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(27500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>

            {/* Blood Pressure Monitor */}
            <Row className="g-4">
              {(activeCategory === 'All' || activeCategory === 'Devices') && (!searchTerm || 'blood pressure monitor'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: 'var(--mc-accent)' }}>Sale</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Devices</span>
                      <h6 className="product-title">Blood Pressure Monitor</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(156)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(45000)}
                          <span className="old-price">{formatNaira(60000)}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Organic Hand Sanitizer */}
              {(activeCategory === 'All' || activeCategory === 'Personal Care') && (!searchTerm || 'organic hand sanitizer'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Personal Care</span>
                      <h6 className="product-title">Organic Hand Sanitizer</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(312)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(3500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Immune Boost Tablets */}
              {(activeCategory === 'All' || activeCategory === 'Supplements') && (!searchTerm || 'immune boost tablets'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: '#9b59b6' }}>Popular</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Supplements</span>
                      <h6 className="product-title">Immune Boost Tablets</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(178)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(11500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Digital Thermometer */}
              {(activeCategory === 'All' || activeCategory === 'Devices') && (!searchTerm || 'digital thermometer'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Devices</span>
                      <h6 className="product-title">Digital Thermometer</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(94)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(8500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>

            {/* Third Row of Products */}
            <Row className="g-4">
              {/* Vitamin C 1000mg */}
              {(activeCategory === 'All' || activeCategory === 'Vitamins') && (!searchTerm || 'vitamin c 1000mg'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Vitamins</span>
                      <h6 className="product-title">Vitamin C 1000mg</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(267)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(7500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Pain Relief Gel */}
              {(activeCategory === 'All' || activeCategory === 'Pain Relief') && (!searchTerm || 'pain relief gel'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: 'var(--mc-accent)' }}>Sale</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Pain Relief</span>
                      <h6 className="product-title">Pain Relief Gel</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(143)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(6500)}
                          <span className="old-price">{formatNaira(8000)}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Moisturizing Cream */}
              {(activeCategory === 'All' || activeCategory === 'Skin Care') && (!searchTerm || 'moisturizing cream'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Skin Care</span>
                      <h6 className="product-title">Moisturizing Cream</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(89)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(10500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Zinc Supplements */}
              {(activeCategory === 'All' || activeCategory === 'Supplements') && (!searchTerm || 'zinc supplements'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Supplements</span>
                      <h6 className="product-title">Zinc Supplements</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(76)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(5500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>

            {/* Fourth Row of Products */}
            <Row className="g-4">
              {/* Bandage Roll Set */}
              {(activeCategory === 'All' || activeCategory === 'Medical Supplies') && (!searchTerm || 'bandage roll set'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Medical Supplies</span>
                      <h6 className="product-title">Bandage Roll Set</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(201)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(4500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Sunscreen SPF 50 */}
              {(activeCategory === 'All' || activeCategory === 'Skin Care') && (!searchTerm || 'sunscreen spf 50'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: '#9b59b6' }}>Popular</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Skin Care</span>
                      <h6 className="product-title">Sunscreen SPF 50</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(185)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(8500)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Ibuprofen Tablets */}
              {(activeCategory === 'All' || activeCategory === 'Pain Relief') && (!searchTerm || 'ibuprofen tablets'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Pain Relief</span>
                      <h6 className="product-title">Ibuprofen Tablets</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(456)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(3200)}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}

              {/* Pulse Oximeter */}
              {(activeCategory === 'All' || activeCategory === 'Devices') && (!searchTerm || 'pulse oximeter'.toLowerCase().includes(searchTerm.toLowerCase())) && (
                <Col sm={6} lg={3}>
                  <div className="product-card">
                    <div className="product-img-wrap">
                      <span className="product-badge text-white" style={{ backgroundColor: 'var(--mc-accent)' }}>Sale</span>
                      <button className="product-wishlist">
                        <Heart size={16} />
                      </button>
                      <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <span className="product-category">Devices</span>
                      <h6 className="product-title">Pulse Oximeter</h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <div className="star-rating">
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="currentColor" />
                          <Star size={13} fill="none" />
                        </div>
                        <small className="text-muted-custom">(112)</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                          {formatNaira(22000)}
                          <span className="old-price">{formatNaira(30000)}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
