import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Routes/Index.jsx';
import About from './Routes/About.jsx';
import Contact from './Routes/Contact.jsx';
import Products from './Routes/Products.jsx';
import NotFound from './Routes/NotFound.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import Dashboard from './Routes/Dashboard/MainDashboard.jsx';
import TermsAndAgreementReview from './Routes/Dashboard/staff-dashboard/TermsAndAgreementReview.jsx';
import AuthPage from './Routes/auth/client-auth/AuthPage.jsx';
import StaffLoginPage from './Routes/auth/StaffLoginPage.jsx';

const App = () => (
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/staff/login" element={<StaffLoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="staff" >
                {/* <Route index path="membership/plans" element={<MembershipPlans />} /> */}
                <Route index path="tc" element={<TermsAndAgreementReview />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default App;
