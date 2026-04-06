import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Heart, Users, Award, Shield, Target, Leaf, Eye, Handshake } from 'lucide-react';

const About = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="page-header">
          <Container>
            <h1>About Truetouch Pharmacy, Supermarket & Pet Store</h1>
            <p className="text-muted-custom mb-3" style={{ fontSize: '1.1rem' }}>
              Serving our community with pharmacy care, quality groceries, and pet supplies since 2001
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">About Us</li>
              </ol>
            </nav>
          </Container>
        </section>

        {/* Mission Section */}
        <section className="section-padding">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <span className="section-badge">Our Mission</span>
                <h2 className="section-title">Dedicated to Your Complete Shopping Needs</h2>
                <p className="text-muted-custom" style={{ lineHeight: 1.8 }}>
                  Since 2001, Truetouch has been a cornerstone of our community, offering more than just pharmacy services. 
                  We believe that everyone deserves access to quality medications, fresh groceries, premium pet supplies, 
                  and exceptional service all under one roof.
                </p>
                <p className="text-muted-custom" style={{ lineHeight: 1.8 }}>
                  Our team of licensed pharmacists, grocery experts, and pet care specialists work tirelessly to ensure 
                  you receive the best possible service. From prescription medications to fresh produce and premium pet food, 
                  we're here to support your complete shopping experience.
                </p>
                <a href="/contact" className="btn btn-primary mt-2">Get in Touch</a>
              </Col>
              <Col lg={6}>
                <div className="rounded-custom overflow-hidden" style={{ 
                  background: 'linear-gradient(135deg, rgba(var(--mc-primary-rgb), 0.1), rgba(var(--mc-accent-rgb), 0.1))',
                  padding: '3rem',
                  textAlign: 'center'
                }}>
                  <Users size={120} style={{ color: 'var(--mc-primary)', opacity: 0.4 }} />
                  <h4 className="mt-3" style={{ color: 'var(--mc-primary)' }}>25+ Years of Excellence</h4>
                  <p className="text-muted-custom mb-0">Trusted by over 50,000 customers</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Stats */}
        <section className="bg-section section-padding">
          <Container>
            <Row>
              <Col sm={6} lg={3}>
                <div className="stat-card">
                  <div className="stat-number">25+</div>
                  <p className="text-muted-custom mt-2 mb-0" style={{ fontWeight: 500 }}>Years of Service</p>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="stat-card">
                  <div className="stat-number">50K+</div>
                  <p className="text-muted-custom mt-2 mb-0" style={{ fontWeight: 500 }}>Happy Customers</p>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="stat-card">
                  <div className="stat-number">10K+</div>
                  <p className="text-muted-custom mt-2 mb-0" style={{ fontWeight: 500 }}>Products Available</p>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="stat-card">
                  <div className="stat-number">98%</div>
                  <p className="text-muted-custom mt-2 mb-0" style={{ fontWeight: 500 }}>Customer Satisfaction</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Values */}
        <section className="section-padding">
          <Container>
            <div className="text-center mb-5">
              <span className="section-badge">Our Values</span>
              <h2 className="section-title">What Drives Us Forward</h2>
              <p className="section-subtitle mx-auto">
                Our core values shape every interaction and decision we make.
              </p>
            </div>
            <Row className="g-4">
              <Col md={6} lg={4}>
                <div className="value-card">
                  <div className="value-icon">
                    <Heart size={26} />
                  </div>
                  <h5>Compassion</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>We treat every customer with genuine care and empathy, understanding their shopping and health needs.</p>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="value-card">
                  <div className="value-icon">
                    <Shield size={26} />
                  </div>
                  <h5>Trust</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>Building lasting relationships through transparency, honesty, and reliable service.</p>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="value-card">
                  <div className="value-icon">
                    <Target size={26} />
                  </div>
                  <h5>Excellence</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>Committed to the highest standards in pharmaceutical care and customer service.</p>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="value-card">
                  <div className="value-icon">
                    <Leaf size={26} />
                  </div>
                  <h5>Quality</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>Promoting excellence in every product we offer - from medications to groceries and pet supplies.</p>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="value-card">
                  <div className="value-icon">
                    <Eye size={26} />
                  </div>
                  <h5>Innovation</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>Embracing modern solutions to make shopping more convenient and accessible for all your needs.</p>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="value-card">
                  <div className="value-icon">
                    <Handshake size={26} />
                  </div>
                  <h5>Community</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.92rem' }}>Active participants in community initiatives, supporting local farmers and pet welfare programs.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Team */}
        <section className="bg-section section-padding">
          <Container>
            <div className="text-center mb-5">
              <span className="section-badge">Our Team</span>
              <h2 className="section-title">Meet the Experts</h2>
              <p className="section-subtitle mx-auto">
                Our dedicated team of professionals is here to serve all your shopping needs.
              </p>
            </div>
            <Row className="g-4 justify-content-center">
              <Col sm={6} lg={3}>
                <div className="team-card">
                  <div className="team-avatar">JW</div>
                  <h5 style={{ fontSize: '1.1rem' }}>Dr. James Wilson</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>Head Pharmacist</p>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="team-card">
                  <div className="team-avatar">SM</div>
                  <h5 style={{ fontSize: '1.1rem' }}>Dr. Sarah Mitchell</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>Clinical Pharmacist</p>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="team-card">
                  <div className="team-avatar">RC</div>
                  <h5 style={{ fontSize: '1.1rem' }}>Robert Chen</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>Operations Manager</p>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="team-card">
                  <div className="team-avatar">LT</div>
                  <h5 style={{ fontSize: '1.1rem' }}>Lisa Thompson</h5>
                  <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>Customer Relations</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
