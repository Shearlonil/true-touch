import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

import IMAGES from '../assets/images';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const services = ['Prescription Filling', 'Grocery Shopping', 'Pet Care Products', 'Home Delivery', 'Health Products'];

  return (
    <footer className="footer">
      <Container>
        <Row className="g-4">
          {/* Brand */}
          <Col lg={3} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={IMAGES.logo} alt="Truetouch Pharmacy" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'contain' }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: '#fff' }}>
                Truetouch
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Your trusted neighborhood store committed to providing quality pharmacy products, 
              fresh groceries, premium pet supplies, and personalized service for over 25 years.
            </p>
            <div className="d-flex">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-icon">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((item) => (
                <li key={item.label} className="mb-2">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Services */}
          <Col lg={3} md={6}>
            <h5>Our Services</h5>
            <ul className="list-unstyled">
              {services.map((item) => (
                <li key={item} className="mb-2">
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={3} md={6}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start gap-2 mb-3">
                <MapPin size={18} style={{ color: 'var(--mc-primary)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>123 Health Street, Lagos, Nigeria</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-3">
                <Phone size={18} style={{ color: 'var(--mc-primary)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>+234 (0) 800 123 4567</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-3">
                <Mail size={18} style={{ color: 'var(--mc-primary)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>info@truetouchpharmacy.com</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Clock size={18} style={{ color: 'var(--mc-primary)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Mon - Sat: 8AM - 9PM</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>© 2026 Truetouch Pharmacy, Supermarket & Pet Store. All rights reserved.</span>
          <div className="d-flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
