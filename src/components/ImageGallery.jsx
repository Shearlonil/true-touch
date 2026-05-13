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

import IMAGES from '../assets/images';

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

  const galleryData = {
    store: {
      title: 'Our Store',
      icon: Store,
      count: 8,
      description: 'Explore our modern pharmacy, supermarket, and pet store facilities',
      images: [
        {
          id: 1,
          src: IMAGES.image10,
          title: 'Pharmacy Section',
          subtitle: 'Modern & Well-Organized',
          description: 'Our state-of-the-art pharmacy with comfortable waiting areas and professional service counters.',
          category: 'Pharmacy'
        },
        {
          id: 2,
          src: IMAGES.image54,
          title: 'Supermarket Aisles',
          subtitle: 'Fresh & Organized',
          description: 'Wide aisles stocked with quality groceries, household essentials, and fresh produce.',
          category: 'Supermarket'
        },
        // {
        //   id: 3,
        //   src: image03,
        //   title: 'Pet Supplies Section',
        //   subtitle: 'Everything for Pets',
        //   description: 'Premium pet food, toys, accessories, and healthcare products for your furry friends.',
        //   category: 'Pet Store'
        // },
        {
          id: 4,
          src: IMAGES.image06,
          title: 'Drug Dispensation',
          subtitle: 'Professional Service',
          description: 'Our licensed pharmacists ready to assist with prescriptions and health consultations.',
          category: 'Pharmacy'
        },
        // {
        //   id: 5,
        //   src: image05,
        //   title: 'Fresh Produce Area',
        //   subtitle: 'Farm Fresh Daily',
        //   description: 'Fresh fruits and vegetables sourced from local farms and trusted suppliers.',
        //   category: 'Supermarket'
        // },
        // {
        //   id: 6,
        //   src: image06,
        //   title: 'Pet Care Corner',
        //   subtitle: 'Pet Wellness',
        //   description: 'Dedicated section for pet healthcare, grooming supplies, and expert advice.',
        //   category: 'Pet Store'
        // },
        // {
        //   id: 7,
        //   src: image07,
        //   title: 'Store Entrance',
        //   subtitle: 'Welcome to Truetouch',
        //   description: 'Our welcoming entrance designed for easy access and convenient shopping.',
        //   category: 'Store'
        // },
        {
          id: 8,
          src: IMAGES.image02,
          title: 'Enquiries',
          subtitle: 'Private & Comfortable',
          description: 'Private spaces for health consultations and personalized service.',
          category: 'Pharmacy'
        }
      ]
    },
    staff: {
      title: 'Our Team',
      icon: Users,
      count: 6,
      description: 'Meet our dedicated team of professionals',
      images: [
        {
          id: 1,
          src: IMAGES.image08,
          title: 'Pharmacy Team',
          subtitle: 'Licensed Professionals',
          description: 'Our certified pharmacists with years of experience in pharmaceutical care.',
          category: 'Staff'
        },
        {
          id: 2,
          src: IMAGES.image60,
          title: 'Customer Service',
          subtitle: 'Friendly & Helpful',
          description: 'Dedicated customer service team ready to assist with all your shopping needs.',
          category: 'Staff'
        },
        // {
        //   id: 3,
        //   src: image11,
        //   title: 'Management Team',
        //   subtitle: 'Leadership Excellence',
        //   description: 'Experienced leadership committed to quality service and customer satisfaction.',
        //   category: 'Staff'
        // },
        // {
        //   id: 4,
        //   src: image12,
        //   title: 'Pet Care Specialists',
        //   subtitle: 'Pet Experts',
        //   description: 'Knowledgeable staff trained in pet care, nutrition, and product recommendations.',
        //   category: 'Staff'
        // },
        {
          id: 5,
          src: IMAGES.image62,
          title: 'Grocery Team',
          subtitle: 'Fresh & Quality',
          description: 'Team dedicated to maintaining fresh produce and quality grocery standards.',
          category: 'Staff'
        },
        // {
        //   id: 6,
        //   src: image14,
        //   title: 'Delivery Team',
        //   subtitle: 'Fast & Reliable',
        //   description: 'Our delivery personnel ensuring your orders reach you on time.',
        //   category: 'Staff'
        // }
      ]
    },
    customers: {
      title: 'Happy Customers',
      icon: Heart,
      count: 6,
      description: 'Moments with our valued customers',
      images: [
        {
          id: 1,
          src: IMAGES.image61,
          title: 'Family Shopping',
          subtitle: 'One-Stop Shopping',
          description: 'Families enjoying the convenience of pharmacy, groceries, and pet supplies in one place.',
          category: 'Customers'
        },
        {
          id: 2,
          src: IMAGES.image48,
          title: 'Health Consultation',
          subtitle: 'Expert Advice',
          description: 'Customers receiving personalized health consultations from our pharmacists.',
          category: 'Service'
        },
        // {
        //   id: 3,
        //   src: image17,
        //   title: 'Pet Parents',
        //   subtitle: 'Pet Lovers',
        //   description: 'Pet owners finding the perfect products for their beloved companions.',
        //   category: 'Customers'
        // },
        {
          id: 4,
          src: IMAGES.image01,
          title: 'Quick Checkout',
          subtitle: 'Efficient Service',
          description: 'Fast and efficient checkout process for a smooth shopping experience.',
          category: 'Service'
        },
        // {
        //   id: 5,
        //   src: image19,
        //   title: 'Senior Care',
        //   subtitle: 'Special Attention',
        //   description: 'Providing extra care and assistance for our elderly customers.',
        //   category: 'Service'
        // },
        {
          id: 6,
          src: IMAGES.image68,
          title: 'Community Love',
          subtitle: '25+ Years of Trust',
          description: 'Building lasting relationships with our community over two decades.',
          category: 'Community'
        }
      ]
    }
  };

  const currentData = galleryData[activeTab];

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
            {Object.entries(galleryData).map(([key, data]) => {
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
        <div 
          key={activeTab}
          className="tab-description text-center mb-4"
        >
          <p className="text-muted">{currentData.description}</p>
        </div>
      </Container>

      {/* Image Grid */}
      <Container>
        <Row className="g-4">
          {currentData.images.map((image, index) => (
            <GalleryItem 
              key={`${activeTab}-${image.id}`}
              image={image}
              index={index}
              onClick={openLightbox}
            />
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
              <span className="stat-value">25+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <Heart size={24} />
            <div>
              <span className="stat-value">50K+</span>
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
        <Modal 
          show={true} 
          onHide={closeLightbox}
          size="lg"
          centered
          className="gallery-lightbox"
        >
          <Modal.Body className="p-0">
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            
            <div className="lightbox-content">
              <button 
                className="lightbox-nav prev"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={32} />
              </button>
              
              <div className="lightbox-image-wrapper">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="lightbox-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
              
              <button 
                className="lightbox-nav next"
                onClick={() => navigateImage('next')}
              >
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
