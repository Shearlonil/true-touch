import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <section className="section-padding" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <Container className="text-center">
          <h1 style={{ fontSize: '8rem', fontWeight: 700, color: 'var(--mc-primary)', opacity: 0.2, lineHeight: 1 }}>404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted-custom mb-4" style={{ maxWidth: 450, margin: '0 auto' }}>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/" className="btn btn-primary d-flex align-items-center gap-2">
              <Home size={16} /> Go Home
            </Link>
            <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={() => window.history.back()}>
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default NotFound;
