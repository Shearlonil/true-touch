import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { 
    Store, 
    Users, 
    Heart, 
    X, 
    ChevronLeft, 
    ChevronRight,
    ZoomIn,
    Camera,
    MapPin,
    Clock,
    Loader2
} from 'lucide-react';
import { homePageGalleryData } from '../Utils/data';

// Custom hook for intersection observer
const useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setIsIntersecting(true);
              observer.disconnect();
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, [options]);

    return [ref, isIntersecting];
};

// Optimized Gallery Item Component
const GalleryItem = ({ image, index, onClick }) => {
    const [ref, isVisible] = useIntersectionObserver({ 
        threshold: 0.1,
        rootMargin: '50px'
    });
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Col lg={3} md={4} sm={6} ref={ref}>
            <div 
                className={`gallery-item-modern ${isVisible ? 'is-visible' : ''}`}
                onClick={() => onClick(image, index)}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`
                }}
            >
                <div className="gallery-image-container">
                    {isVisible && (
                        <>
                            {!isLoaded && (
                                <div className="gallery-image-placeholder">
                                    <Loader2 className="spinner" size={24} />
                                </div>
                            )}
                            <img 
                                src={image.src} 
                                alt={image.title}
                                className={`gallery-img-modern ${isLoaded ? 'loaded' : ''}`}
                                loading="lazy"
                                onLoad={() => setIsLoaded(true)}
                                decoding="async"
                            />
                        </>
                    )}
                    <div className="gallery-overlay-modern">
                        <div className="overlay-content">
                            <span className="image-category">{image.category}</span>
                            <h5 className="image-title">{image.title}</h5>
                            <p className="image-subtitle">{image.subtitle}</p>
                            <button className="view-btn">
                                <ZoomIn size={18} />
                                <span>View</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="gallery-item-info">
                    <h6>{image.title}</h6>
                    <p>{image.subtitle}</p>
                </div>
            </div>
        </Col>
    );
};

const ImageGallery = () => {
    const [activeTab, setActiveTab] = useState('store');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Small delay to prevent initial render blocking
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const currentData = homePageGalleryData[activeTab];

    const openLightbox = useCallback((image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setSelectedImage(null);
    }, []);

    const navigateImage = useCallback((direction) => {
        const newIndex = direction === 'next' 
            ? (currentIndex + 1) % currentData.images.length
            : (currentIndex - 1 + currentData.images.length) % currentData.images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(currentData.images[newIndex]);
    }, [currentIndex, currentData.images]);

    // Memoize tab change handler
    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
        setSelectedImage(null);
    }, []);

    return (
        <section className="gallery-modern-section">
            {/* Header */}
            <div className="gallery-header">
                <Container>
                    <div 
                        className="text-center"
                        style={{
                            opacity: isLoaded ? 1 : 0,
                            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 0.6s ease, transform 0.6s ease'
                        }}
                    >
                        <div className="gallery-badge">
                            <Camera size={16} />
                            <span>Photo Gallery</span>
                        </div>
                        <h2 className="gallery-title">Explore Truetouch</h2>
                        <p className="gallery-subtitle">
                            Take a visual journey through our pharmacy, supermarket, and pet store
                        </p>
                    </div>
                </Container>
            </div>

            {/* Tab Navigation */}
            <Container>
                <div className="gallery-tabs-wrapper">
                    <div className="gallery-tabs-modern">
                        {Object.entries(homePageGalleryData).map(([key, data]) => {
                            const TabIcon = data.icon;
                            return (
                                <button
                                    key={key}
                                    className={`gallery-tab-modern ${activeTab === key ? 'active' : ''}`}
                                    onClick={() => handleTabChange(key)}
                                >
                                    <TabIcon size={20} />
                                    <span className="tab-label">{data.title}</span>
                                    <span className="tab-count">{data.images.length}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Description */}
                <div key={activeTab} className="tab-description text-center mb-4">
                    <p className="text-muted">{currentData.description}</p>
                </div>
            </Container>

            {/* Image Grid */}
            <Container>
                <Row className="g-4">
                    {currentData.images.map((image, index) => (
                        <GalleryItem key={`${activeTab}-${image.id}`} image={image} index={index} onClick={openLightbox} />
                    ))}
                </Row>
            </Container>

            {/* Stats Bar */}
            <Container className="mt-5">
                <div className="gallery-stats">
                    <div className="stat-item">
                        <MapPin size={24} />
                        <div>
                            <span className="stat-value">3-in-1</span>
                            <span className="stat-label">Store Concept</span>
                        </div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <Clock size={24} />
                        <div>
                            <span className="stat-value">5+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <Heart size={24} />
                        <div>
                            <span className="stat-value">5K+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <Store size={24} />
                        <div>
                            <span className="stat-value">10K+</span>
                            <span className="stat-label">Products</span>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Lightbox Modal - Only render when needed */}
            {selectedImage && (
                <Modal show={true} onHide={closeLightbox} size="lg" centered className="gallery-lightbox" >
                    <Modal.Body className="p-0">
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <X size={24} />
                        </button>
                        
                        <div className="lightbox-content">
                          <button className="lightbox-nav prev" onClick={() => navigateImage('prev')} >
                              <ChevronLeft size={32} />
                          </button>
                          
                          <div className="lightbox-image-wrapper">
                              <img src={selectedImage.src} alt={selectedImage.title} className="lightbox-image" loading="eager" decoding="async" />
                          </div>
                          
                          <button className="lightbox-nav next" onClick={() => navigateImage('next')} >
                              <ChevronRight size={32} />
                          </button>
                        </div>
                        
                        <div className="lightbox-info">
                            <span className="lightbox-category">{selectedImage.category}</span>
                            <h4>{selectedImage.title}</h4>
                            <p>{selectedImage.description}</p>
                            <div className="lightbox-counter">
                                {currentIndex + 1} / {currentData.images.length}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </section>
    );
};

export default ImageGallery;
