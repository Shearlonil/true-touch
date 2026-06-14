import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Index from './Routes/Index.jsx';
import About from './Routes/About.jsx';
import Contact from './Routes/Contact.jsx';
import OurProducts from './Routes/OurProducts.jsx';
import NotFound from './Routes/NotFound.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import Dashboard from './Routes/Dashboard/MainDashboard.jsx';
import TermsAndAgreementReview from './Routes/Dashboard/staff-dashboard/TermsAndAgreementReview.jsx';
import AuthPage from './Routes/auth/client-auth/AuthPage.jsx';
import StaffLoginPage from './Routes/auth/StaffLoginPage.jsx';
import Staff from './Routes/Dashboard/staff-dashboard/Staff.jsx';
import Profile from './Routes/Dashboard/MyProfilePage/MainProfile.jsx';
import Tract from './Routes/Dashboard/staff-dashboard/Tracts.jsx';
import ProductBrand from './Routes/Dashboard/staff-dashboard/ProductBrands.jsx';
import ProductCategory from './Routes/Dashboard/staff-dashboard/ProductCategory.jsx';
import Products from './Routes/Dashboard/staff-dashboard/Products.jsx';

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<OurProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/staff/login" element={<StaffLoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route index path="users" element={<Staff />} />
                <Route index path="departments" element={<Tract />} />
                <Route index path="products" element={<Products />} />
                <Route index path="brands" element={<ProductBrand />} />
                <Route index path="categories" element={<ProductCategory />} />
                <Route index path="profile" element={<Profile />} />
                <Route path="staff" >
                    <Route index path="tc" element={<TermsAndAgreementReview />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
		<ToastContainer />
    </>
);

export default App;
