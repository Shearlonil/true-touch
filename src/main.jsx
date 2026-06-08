import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/custom.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { TokenProvider } from './app-context/token-context.js';
import { AuthProvider } from './app-context/auth-context.js';
import { UserProvider } from './app-context/user-context.js';

import 'rsuite/dist/rsuite.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datetime/css/react-datetime.css";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
                <TokenProvider>
                    <AuthProvider>
                        <UserProvider>
                            <Navbar />
                            <App />
                            <Footer />
                        </UserProvider>
                    </AuthProvider>
                </TokenProvider>
        </BrowserRouter>
    </React.StrictMode>
);
