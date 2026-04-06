import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Nav } from 'react-bootstrap';
import {
  LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, DollarSign,
  Bell, Settings, LogOut, ChevronRight, ArrowUpRight, ArrowDownRight,
  Clock, Eye, Search, Menu, X
} from 'lucide-react';

import IMAGES from '../assets/images';

const stats = [
  { label: 'Total Revenue', value: '₦7,244,250', change: '+12.5%', up: true, icon: DollarSign, color: 'rgba(var(--mc-primary-rgb), 0.12)', iconColor: 'var(--mc-primary)' },
  { label: 'Total Orders', value: '1,248', change: '+8.3%', up: true, icon: ShoppingCart, color: 'rgba(var(--mc-accent-rgb), 0.12)', iconColor: 'var(--mc-accent)' },
  { label: 'Total Customers', value: '3,562', change: '+5.7%', up: true, icon: Users, color: 'rgba(99, 102, 241, 0.12)', iconColor: '#6366f1' },
  { label: 'Growth Rate', value: '23.8%', change: '-2.1%', up: false, icon: TrendingUp, color: 'rgba(236, 72, 153, 0.12)', iconColor: '#ec4899' },
];

const recentOrders = [
  { id: '#ORD-7821', customer: 'Sarah Johnson', products: 'Vitamin D3, Omega-3', total: '₦31,000', status: 'Delivered', statusColor: 'bg-success' },
  { id: '#ORD-7820', customer: 'Michael Chen', products: 'First Aid Kit Pro', total: '₦27,500', status: 'Processing', statusColor: 'bg-warning' },
  { id: '#ORD-7819', customer: 'Emily Rodriguez', products: 'Multivitamin, Sanitizer', total: '₦13,000', status: 'Shipped', statusColor: 'bg-info' },
  { id: '#ORD-7818', customer: 'David Kim', products: 'Blood Pressure Monitor', total: '₦45,000', status: 'Delivered', statusColor: 'bg-success' },
  { id: '#ORD-7817', customer: 'Amanda White', products: 'Immune Boost, Vitamin C', total: '₦19,000', status: 'Pending', statusColor: 'bg-secondary' },
  { id: '#ORD-7816', customer: 'James Brown', products: 'Digital Thermometer', total: '₦8,500', status: 'Delivered', statusColor: 'bg-success' },
];

const topProducts = [
  { name: 'Vitamin D3 Complex', sold: 342, revenue: '₦4,275,000' },
  { name: 'Omega-3 Fish Oil', sold: 287, revenue: '₦5,309,500' },
  { name: 'Daily Multivitamin', sold: 264, revenue: '₦2,508,000' },
  { name: 'First Aid Kit Pro', sold: 198, revenue: '₦5,445,000' },
  { name: 'Immune Boost Tablets', sold: 176, revenue: '₦2,024,000' },
];

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShoppingCart, label: 'Orders' },
  { icon: Package, label: 'Products' },
  { icon: Users, label: 'Customers' },
  { icon: TrendingUp, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Dashboard Nav */}
      <nav className="navbar-main py-2" style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
        <Container fluid className="px-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center gap-3">
              <button className="d-lg-none nav-icon-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
                <img src={IMAGES.logo} alt="Truetouch Pharmacy" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'contain' }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', color: 'var(--mc-text-dark)' }}>
                  Truetouch
                </span>
              </Link>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="nav-icon-btn"><Search size={18} /></button>
              <button className="nav-icon-btn">
                <Bell size={18} />
                <span className="nav-icon-badge">5</span>
              </button>
              <div className="d-flex align-items-center gap-2 ms-2">
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(var(--mc-primary-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mc-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  JW
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <div className={`dashboard-sidebar d-lg-block ${sidebarOpen ? 'd-block' : 'd-none'}`} style={{ width: 250, flexShrink: 0 }}>
          <Nav className="flex-column">
            {sidebarLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a key={i} href="#" className={`nav-link d-flex align-items-center ${link.active ? 'active' : ''}`}>
                  <Icon size={18} />
                  {link.label}
                </a>
              );
            })}
          </Nav>
          <hr className="mx-3 my-3" style={{ borderColor: 'var(--mc-border)' }} />
          <Nav className="flex-column">
            <a href="/" className="nav-link d-flex align-items-center text-danger">
              <LogOut size={18} className="me-2" />
              Back to Site
            </a>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: 'var(--mc-bg-light)', minHeight: 'calc(100vh - 60px)' }}>
          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div>
              <h3 className="mb-1">Dashboard</h3>
              <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
                Welcome back! Here's what's happening with your pharmacy.
              </p>
            </div>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <select className="form-select form-select-sm" style={{ width: 'auto', borderRadius: 8, borderColor: 'var(--mc-border)' }}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <Row className="g-3 mb-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Col key={index} sm={6} xl={3}>
                  <div className="stat-widget">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="text-muted-custom mb-1" style={{ fontSize: '0.85rem' }}>{stat.label}</p>
                        <h3>{stat.value}</h3>
                      </div>
                      <div className="stat-widget-icon" style={{ backgroundColor: stat.color }}>
                        <Icon size={22} style={{ color: stat.iconColor }} />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-1 mt-2">
                      {stat.up ? (
                        <ArrowUpRight size={14} style={{ color: 'var(--mc-primary)' }} />
                      ) : (
                        <ArrowDownRight size={14} style={{ color: '#e74c3c' }} />
                      )}
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: stat.up ? 'var(--mc-primary)' : '#e74c3c' }}>
                        {stat.change}
                      </span>
                      <span className="text-muted-custom" style={{ fontSize: '0.8rem' }}>vs last period</span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          <Row className="g-4">
            {/* Recent Orders */}
            <Col xl={8}>
              <div className="bg-white rounded-custom p-4" style={{ border: '1px solid var(--mc-border)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>Recent Orders</h5>
                  <a href="#" style={{ fontSize: '0.85rem', color: 'var(--mc-primary)', fontWeight: 600 }}>
                    View All <ChevronRight size={14} />
                  </a>
                </div>
                <div className="table-responsive">
                  <Table className="dashboard-table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th className="d-none d-md-table-cell">Products</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600, fontSize: '0.9rem' }}>{order.id}</td>
                          <td style={{ fontSize: '0.9rem' }}>{order.customer}</td>
                          <td className="d-none d-md-table-cell text-muted-custom" style={{ fontSize: '0.85rem' }}>{order.products}</td>
                          <td style={{ fontWeight: 600, fontSize: '0.9rem' }}>{order.total}</td>
                          <td>
                            <span className={`status-badge text-white ${order.statusColor}`}>{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>

            {/* Top Products */}
            <Col xl={4}>
              <div className="bg-white rounded-custom p-4" style={{ border: '1px solid var(--mc-border)' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>Top Products</h5>
                  <a href="#" style={{ fontSize: '0.85rem', color: 'var(--mc-primary)', fontWeight: 600 }}>
                    View All <ChevronRight size={14} />
                  </a>
                </div>
                {topProducts.map((product, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center py-3" style={{ borderBottom: i < topProducts.length - 1 ? '1px solid var(--mc-border)' : 'none' }}>
                    <div>
                      <p className="mb-0" style={{ fontWeight: 600, fontSize: '0.92rem' }}>{product.name}</p>
                      <small className="text-muted-custom">{product.sold} sold</small>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--mc-primary)', fontSize: '0.95rem' }}>{product.revenue}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-custom p-4 mt-4" style={{ border: '1px solid var(--mc-border)' }}>
                <h5 style={{ fontSize: '1.1rem' }} className="mb-3">Quick Actions</h5>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2">
                    <Package size={16} /> Add New Product
                  </button>
                  <button className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2">
                    <Eye size={16} /> View Reports
                  </button>
                  <button className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2">
                    <Clock size={16} /> Manage Inventory
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
