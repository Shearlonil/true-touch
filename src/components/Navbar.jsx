import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import { Phone, Search, Heart, ShoppingCart, Menu, X, Clock } from 'lucide-react';

import IMAGES from '../assets/images';
import { useAuth } from '../app-context/auth-context';
import { useAuthUser } from '../app-context/user-context';
import ConfirmDialog from './DialogBoxes/ConfirmDialog';
import { ThreeDotLoading } from './react-loading-indicators/Indicator';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
    { label: 'Dashboard', path: '/dashboard' },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

	const { logout } = useAuth();
    const { authUser } = useAuthUser();
	const user = authUser();

    const [expanded, setExpanded] = useState(false);
    const [scrolled, setScrolled] = useState(false);

	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [displayMsg, setDisplayMsg] = useState("");

	const handleCloseModal = () => {
		setShowConfirmModal(false);
	};

	const confirmLogout = () => {
		setDisplayMsg(`Logout your account?`);
		setShowConfirmModal(true);
	};

	const handleLogout = async () => {
		// call logout endpoint
		try {
			setShowConfirmModal(false);
			setIsLoggingOut(true);
			await logout();
			setIsLoggingOut(false);
		} catch (error) {
			// display error message
			toast.error(handleErrMsg(error).msg);
			setIsLoggingOut(false);
		}
	};

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar d-none d-md-block">
                <Container className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-4">
                        <span className="d-flex align-items-center gap-1">
                            <Phone size={13} />
                            +234 (0) 800 123 4567
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <Clock size={13} />
                            Mon - Sun: 24hrs
                        </span>
                    </div>
                    <div>
                        <span>Free delivery on orders over ₦25,000 - Pharmacy, Groceries & Pet Supplies</span>
                    </div>
                </Container>
            </div>

            {/* Main Navbar */}
            <BsNavbar
                expand="lg"
                expanded={expanded}
                onToggle={setExpanded}
                sticky="top"
                className={`navbar-main ${scrolled ? 'scrolled' : ''}`}
            >
                <Container>
                    <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
                        <img src={IMAGES.logo} alt="Truetouch Pharmacy" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'contain' }} />
                        <div>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--mc-text-dark)' }}>
                                Truetouch
                            </span>
                            <span className="d-block text-muted-custom" style={{ fontSize: '0.72rem', marginTop: '-4px' }}>
                                Pharmacy, Supermarket & Pet Store
                            </span>
                        </div>
                    </Link>

                    <BsNavbar.Toggle aria-controls="main-nav" className="border-0">
                        {expanded ? <X size={24} /> : <Menu size={24} />}
                    </BsNavbar.Toggle>

                    <BsNavbar.Collapse id="main-nav">
                        <Nav className="mx-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                    onClick={() => setExpanded(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Nav>
                        <div className="d-flex align-items-center gap-1">
                            {/* <button className="nav-icon-btn"><Search size={20} /></button>
                            <button className="nav-icon-btn"><Heart size={20} /></button>
                            <button className="nav-icon-btn">
                                <ShoppingCart size={20} />
                                <span className="nav-icon-badge">3</span>
                            </button> */}
                            <Link to="/products" className="btn btn-primary btn-sm ms-2" onClick={() => setExpanded(false)}>
                                Shop Now
                            </Link>

                            {/* Desktop login/logout buttons */}
                            {!user && <Nav.Link className={`btn ms-2 ${isLoggingOut && "disabled"}`} onClick={() => navigate("/login")} >
                                Login 
                            </Nav.Link>}

                            {user && <Nav.Link className={`btn text-white ms-2 ${isLoggingOut && "disabled"} ${user && 'text-danger'}`} onClick={() => confirmLogout()} >
                                {isLoggingOut && ( <ThreeDotLoading color="#ffffffff" size="small" /> )}
                                {user && `Logout`}
                            </Nav.Link>}
                        </div>
                    </BsNavbar.Collapse>
                </Container>
            </BsNavbar>
			<ConfirmDialog
				show={showConfirmModal}
				handleClose={handleCloseModal}
				handleConfirm={handleLogout}
				message={displayMsg}
			/>
        </>
    );
};

export default Navbar;
