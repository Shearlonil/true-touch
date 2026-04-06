import { Container, Row, Col } from 'react-bootstrap';
import { Truck, Shield, Clock, HeartPulse, ShoppingBasket, Award } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'Free shipping on orders over ₦25,000. Fast and reliable delivery for all your shopping needs.' },
  { icon: Shield, title: 'Quality Guaranteed', desc: '100% authentic products from medicines to groceries and pet supplies - all sourced from trusted suppliers.' },
  { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support for all your shopping queries and emergency needs.' },
  { icon: HeartPulse, title: 'Pet Care Services', desc: 'Professional pet care advice and premium pet healthcare products for your beloved companions.' },
  { icon: ShoppingBasket, title: 'One-Stop Shop', desc: 'Everything you need - pharmacy, fresh groceries, household items, and premium pet supplies under one roof.' },
  { icon: Award, title: '25+ Years Trusted', desc: 'Over two decades of serving our community with excellence, quality, and dedication.' },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Your Complete Shopping Solution</h2>
          <p className="section-subtitle mx-auto">
            We combine pharmacy expertise, quality groceries, and premium pet supplies to provide you with everything you need in one place.
          </p>
        </div>
        <Row className="g-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Col key={index} md={6} lg={4}>
                <div className={`feature-card fade-in-up delay-${index % 4 + 1}`}>
                  <div className="feature-icon">
                    <Icon size={28} />
                  </div>
                  <h5>{feature.title}</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>{feature.desc}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
