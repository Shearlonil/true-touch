import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  { icon: Phone, title: 'Phone', detail: '+234 (0) 800 123 4567', sub: 'Mon-Sat, 8AM-9PM' },
  { icon: Mail, title: 'Email', detail: 'info@truetouchpharmacy.com', sub: 'We reply within 24 hours' },
  { icon: MapPin, title: 'Address', detail: '123 Health Street', sub: 'Lagos, Nigeria' },
  { icon: Clock, title: 'Working Hours', detail: 'Mon - Sat: 8AM - 9PM', sub: 'Sunday: 10AM - 6PM' },
];

const faqs = [
  { q: 'How can I refill my prescription?', a: 'You can refill your prescription online through our website, by calling us, or by visiting our store. We also offer automatic refill reminders.' },
  { q: 'Do you offer home delivery?', a: 'Yes! We offer free home delivery for orders over ₦25,000. Standard delivery takes 1-2 business days within our service area.' },
  { q: 'Can I consult with a pharmacist?', a: 'Absolutely! Our licensed pharmacists are available for free consultations during store hours. You can also book a virtual consultation.' },
  { q: 'What insurance plans do you accept?', a: 'We accept most major insurance plans including HMO providers. Please contact us or visit our store with your insurance card for verification.' },
  { q: 'Do you offer vaccination services?', a: 'Yes, we provide a range of vaccination services including flu shots, COVID-19 vaccines, and travel vaccinations. Walk-ins are welcome.' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="page-header">
          <Container>
            <h1>Contact Us</h1>
            <p className="text-muted-custom mb-3" style={{ fontSize: '1.1rem' }}>
              We'd love to hear from you. Get in touch with our team.
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Contact</li>
              </ol>
            </nav>
          </Container>
        </section>

        {/* Contact Info Cards */}
        <section className="section-padding">
          <Container>
            <Row className="g-4 mb-5">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Col key={index} sm={6} lg={3}>
                    <div className="contact-info-card">
                      <div className="contact-icon">
                        <Icon size={24} />
                      </div>
                      <h6>{info.title}</h6>
                      <p className="mb-0" style={{ fontWeight: 600, fontSize: '0.95rem' }}>{info.detail}</p>
                      <small className="text-muted-custom">{info.sub}</small>
                    </div>
                  </Col>
                );
              })}
            </Row>

            {/* Contact Form + FAQ */}
            <Row className="g-5">
              <Col lg={7}>
                <h3 className="mb-4">Send Us a Message</h3>
                {submitted ? (
                  <div className="text-center py-5">
                    <CheckCircle size={48} style={{ color: 'var(--mc-primary)' }} />
                    <h4 className="mt-3">Message Sent!</h4>
                    <p className="text-muted-custom">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <Row className="g-3">
                      <Col md={6}>
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                      </Col>
                      <Col md={6}>
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                      </Col>
                      <Col xs={12}>
                        <label className="form-label">Subject</label>
                        <select className="form-select" name="subject" value={formData.subject} onChange={handleChange} required>
                          <option value="">Select a subject</option>
                          <option value="prescription">Prescription Inquiry</option>
                          <option value="product">Product Information</option>
                          <option value="consultation">Book Consultation</option>
                          <option value="delivery">Delivery Question</option>
                          <option value="other">Other</option>
                        </select>
                      </Col>
                      <Col xs={12}>
                        <label className="form-label">Message</label>
                        <textarea className="form-control" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." required />
                      </Col>
                      <Col xs={12}>
                        <button type="submit" className="btn btn-primary btn-lg">
                          <Send size={16} className="me-2" />
                          Send Message
                        </button>
                      </Col>
                    </Row>
                  </form>
                )}
              </Col>
              <Col lg={5}>
                <h3 className="mb-4">Frequently Asked Questions</h3>
                <Accordion>
                  {faqs.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={String(index)} className="mb-2 border rounded-custom overflow-hidden">
                      <Accordion.Header>{faq.q}</Accordion.Header>
                      <Accordion.Body className="text-muted-custom" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
                        {faq.a}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
