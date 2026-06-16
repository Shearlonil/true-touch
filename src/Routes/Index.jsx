import HeroCarousel from '../components/HeroCarousel.jsx';
import FeaturesSection from '../components/FeaturesSection.jsx';
import ProductsSection from '../components/ProductsSection.jsx';
import ImageGallery from '../components/ImageGallery.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';
import CTASection from '../components/CTASection.jsx';
import ChatWithUs from '../components/ChatWithUs';

const Index = () => {
    return (
        <div>
            <main>
                <HeroCarousel />
                <FeaturesSection />
                <ProductsSection />
                <ImageGallery />
                <TestimonialsSection />
                <CTASection />
                <ChatWithUs />
            </main>
        </div>
    );
};

export default Index;
