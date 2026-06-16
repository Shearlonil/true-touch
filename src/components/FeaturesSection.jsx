import { Container, Row, Col } from 'react-bootstrap';
import { homePageFeatures } from '../Utils/data';

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
                    {homePageFeatures.map((feature, index) => {
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
