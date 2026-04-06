import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Send, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="cta-section">
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Stay Updated with Shopping Deals & Offers</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Subscribe to our newsletter and get exclusive deals on pharmacy products, groceries, pet supplies, and new arrivals delivered straight to your inbox.
            </p>
            {submitted ? (
              <div className="d-flex align-items-center justify-content-center gap-2" style={{ color: '#fff', fontSize: '1.1rem' }}>
                <CheckCircle size={22} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="cta-input-group input-group" style={{ maxWidth: 480 }}>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-accent">
                    <Send size={16} className="me-1" /> Subscribe
                  </button>
                </div>
              </form>
            )}
            <p className="mt-3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTASection;
