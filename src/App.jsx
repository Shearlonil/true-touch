import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Routes/Index.jsx';
// import About from './Routes/About.jsx';
// import Contact from './Routes/Contact.jsx';
import Products from './Routes/Products.jsx';
import Dashboard from './Routes/Dashboard.jsx';
import NotFound from './Routes/NotFound.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
