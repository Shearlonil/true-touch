import { Container, Row, Col } from 'react-bootstrap';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    initial: 'S',
    rating: 5,
    text: "Truetouch has been my go-to pharmacy for years. The staff is incredibly knowledgeable and always takes the time to explain my medications. Their delivery service is a lifesaver!",
  },
  {
    name: 'Michael Chen',
    role: 'Health Enthusiast',
    initial: 'M',
    rating: 5,
    text: "I love the wide range of health and wellness products they carry. The quality is always top-notch, and the prices are very competitive. Highly recommend!",
  },
  {
    name: 'Emily Rodriguez',
    role: 'Mother of Three',
    initial: 'E',
    rating: 5,
    text: "As a busy mom, I appreciate the convenience of their online ordering and home delivery. The pharmacists are always patient with my questions about children's medications.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Don't just take our word for it — hear from people who trust us with their health.
          </p>
        </div>
        <Row className="g-4">
          {testimonials.map((t, index) => (
            <Col key={index} md={4}>
              <div className={`testimonial-card fade-in-up delay-${index + 1}`}>
                <Quote size={28} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} className="mb-3" />
                <p className="testimonial-quote mb-4">"{t.text}"</p>
                <div className="d-flex align-items-center gap-3">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <h6 className="mb-0" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{t.name}</h6>
                    <small className="text-muted-custom">{t.role}</small>
                  </div>
                </div>
                <div className="star-rating mt-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
