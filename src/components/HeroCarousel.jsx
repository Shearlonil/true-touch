import { Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { carouselSlides } from '../Utils/data';

const HeroCarousel = () => {
    return (
        <Carousel fade interval={5000} className="hero-carousel" controls indicators>
            {carouselSlides.map((slide, index) => (
                <Carousel.Item key={index}>
                    <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }} >
                        <div className="hero-overlay">
                            <Container>
                                <div className="hero-content fade-in-up">
                                    <span className="hero-badge">{slide.subtitle}</span>
                                    <h1>{slide.title}</h1>
                                    <p>{slide.description}</p>
                                    <div className="hero-buttons d-flex gap-3 flex-wrap">
                                        <Link to={slide.ctaLink} className={`btn btn-primary btn-lg`} >
                                            {slide.cta}
                                        </Link>
                                        <Link to="/about" className={`btn btn-outline-light btn-lg`} >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default HeroCarousel;
