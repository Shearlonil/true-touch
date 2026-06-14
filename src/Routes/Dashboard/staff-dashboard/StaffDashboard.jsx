import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Table, Modal } from 'react-bootstrap';
import {
    LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, DollarSign,
    UserPen, Settings, LogOut, ChevronRight, ArrowUpRight, ArrowDownRight,
    Clock, Eye, Search, Menu, X, LayoutPanelTop
} from 'lucide-react';
import { SiBrandfetch } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";
import { toast } from 'react-toastify';

import OffCanvasSideNav from '../../../components/OffCanvasSideNav';
import { useAuthUser } from '../../../app-context/user-context';
import cryptoHelper from '../../../Utils/crypto-helper';
import InputDialog from '../../../components/DialogBoxes/InputDialog';
import StaffCreationDialog from '../../../components/DialogBoxes/StaffCreationDialog';
import ConfirmDialog from '../../../components/DialogBoxes/ConfirmDialog';
import handleErrMsg from '../../../Utils/error-handler';
import useStaffController from '../../../api-controllers/staff-controller-hook';
import useTractController from '../../../api-controllers/tract-controller-hook';
import useProductBrandController from '../../../api-controllers/product-brand-controller-hook';
import useProductCategoryController from '../../../api-controllers/product-cat-controller-hook';
import ProductCreationForm from '../../../components/Forms/ProductCreationForm';
import useProductController from '../../../api-controllers/product-controller-hook';

const stats = [
    { label: 'Total Revenue for the Month', value: '₦7,244,250', change: '+12.5%', up: true, icon: DollarSign, color: 'rgba(var(--mc-primary-rgb), 0.12)', iconColor: 'var(--mc-primary)' },
    { label: 'Total Orders for the Month', value: '1,248', change: '+8.3%', up: true, icon: ShoppingCart, color: 'rgba(var(--mc-accent-rgb), 0.12)', iconColor: 'var(--mc-accent)' },
    { label: 'Total Customers', value: '3,562', change: '+5.7%', up: true, icon: Users, color: 'rgba(99, 102, 241, 0.12)', iconColor: '#6366f1' },
    { label: 'Total Active Products', value: '23.8%', change: '-2.1%', up: false, icon: TrendingUp, color: 'rgba(236, 72, 153, 0.12)', iconColor: '#ec4899' },
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

const offCanvasMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', onClickParams: {evtName: 'dashboard'} },
    { 
        icon: Users, 
        label: 'Staff Members', 
        subMenu: [
            {
                label: "Add",
                onClickParams: {evtName: 'addStaff'},
            },
            { 
                label: "View", 
                onClickParams: {evtName: 'viewStaff'} 
            },
        ]
    },
    { icon: ShoppingCart, label: 'Orders', onClickParams: {evtName: 'orders'} },
    { 
        icon: Package, 
        label: 'Products', 
        subMenu: [
            {
                label: "Add",
                onClickParams: {evtName: 'addProduct'},
            },
            { 
                label: "View", 
                onClickParams: {evtName: 'viewProducts'} 
            },
        ]
    },
    {
        icon: SiBrandfetch,
        label: "Product Brands",
        subMenu: [
            {
                label: "Add",
                onClickParams: {evtName: 'addBrand'},
            },
            { 
                label: "View", 
                onClickParams: {evtName: 'viewBrands'} 
            },
        ]
    },
    {
        icon: MdOutlineCategory,
        label: "Product Categories",
        subMenu: [
            {
                label: "Add",
                onClickParams: {evtName: 'addCategory'},
            },
            { 
                label: "View", 
                onClickParams: {evtName: 'viewCategories'} 
            },
        ]
    },
    {
        icon: LayoutPanelTop,
        label: "Product Departments",
        subMenu: [
            {
                label: "Add",
                onClickParams: {evtName: 'addDepartment'},
            },
            { 
                label: "View", 
                onClickParams: {evtName: 'viewDepartments'} 
            },
        ]
    },
    { icon: Users, label: 'Customers', onClickParams: {evtName: 'customers'} },
    { icon: UserPen, label: 'Profile', onClickParams: {evtName: 'myProfile'} },
];

const Dashboard = () => {
    const controllerRef = useRef(new AbortController());
    
    const navigate = useNavigate();
    const location = useLocation();

    const { dashboard, register } = useStaffController();
    const { createTract } = useTractController();
    const { createProductBrand } = useProductBrandController();
    const { createProductCat } = useProductCategoryController();
    const { createProduct } = useProductController();
    const { authUser } = useAuthUser();
    const user = authUser();

    const [displayMsg, setDisplayMsg] = useState("");
    const [showInputModal, setShowInputModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmDialogEvtName, setConfirmDialogEvtName] = useState(null);
    const [showStaffCreationModal, setShowStaffCreationModal] = useState(false);
    const [showProductCreationModal, setShowProductCreationModal] = useState(false);

    const [networkRequest, setNetworkRequest] = useState(false);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [newUser, setNewUser] = useState(null);
    const [inputMode, setInputMode] = useState(null);

    useEffect(() => {
        if(!user || cryptoHelper.decryptData(user.mode) === '1'){
            navigate("/");
            return;
        }

        // initialize();
        return () => {
            // This cleanup function runs when the component unmounts or when the dependencies of useEffect change (e.g., route change)
            controllerRef.current.abort();
        };
    }, [location.pathname]);

    const initialize = async () => {
        try {
            controllerRef.current = new AbortController();
            setNetworkRequest(true);
            const response = await dashboard(controllerRef.current.signal);
            setTotalOrders(response.data.total_users.total_users);
            setTotalProducts(response.data.active_courses.total_courses);
            setTotalCustomers(response.data.sub_users.sub_users);
            setTotalRevenue(response.data.total_contests);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    }

    const handleAddStaff = () => {
        setShowStaffCreationModal(true);
    }

    const handleAddProduct = () => {
        setShowProductCreationModal(true);
    }

	const handleOffCanvasMenuItemClick = async (menus, e) => {
		switch (menus.onClickParams.evtName) {
            case 'viewStaff':
                if(!user.hasAuth(103)){
                    toast.info('Account not authorized');
                    return;
                }
                navigate('/dashboard/users');
                break;
            case 'orders':
                navigate('/dashboard/orders');
                break;
            case 'viewDepartments':
                navigate('/dashboard/departments');
                break;
            case 'viewBrands':
                navigate('/dashboard/brands');
                break;
            case 'viewProducts':
                navigate('/dashboard/products');
                break;
            case 'viewCategories':
                navigate('/dashboard/categories');
                break;
            case 'addStaff':
                if(!user.hasAuth(101)){
                    toast.info('Account not authorized to create staff profile');
                    return;
                }
                handleAddStaff();
                break;
            case 'addProduct':
                if(!user.hasAuth(200)){
                    toast.info('Account not authorized');
                    return;
                }
                handleAddProduct();
                break;
            case 'addBrand':
                if(!user.hasAuth(203)){
                    toast.info('Account not authorized');
                    return;
                }
                setDisplayMsg('Enter New Product Brand');
                setInputMode('brand');
                setShowInputModal(true);
                break;
            case 'addCategory':
                if(!user.hasAuth(206)){
                    toast.info('Account not authorized');
                    return;
                }
                setDisplayMsg('Enter New Product Category');
                setInputMode('category');
                setShowInputModal(true);
                break;
            case 'addDepartment':
                if(!user.hasAuth(209)){
                    toast.info('Account not authorized');
                    return;
                }
                setDisplayMsg('Enter New Product Department');
                setInputMode('tract');
                setShowInputModal(true);
                break;
            case 'myProfile':
                navigate('/dashboard/profile');
                break;
        }
	}
  
    const handleCreateStaff = async () => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            const authArr = newUser.authorities?.map(auth => auth.value.code);
            const dto = {
                fname: newUser.fname,
                lname: newUser.lname,
                phone: newUser.phone,
                email: newUser.email,
                sex: newUser.sex.value,
                authorities: authArr ? authArr : []
            }
            const response = await register(controllerRef.current.signal, dto);
            const user = {
                id: response.data.id,
                fname: newUser.fname,
                lname: newUser.lname,
                phone: newUser.phone,
                email: newUser.email,
                sex: newUser.sex.value,
                status: 1,
                createdAt: new Date(),
            }
            setNetworkRequest(false);
            handleCloseModal();
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };

    const handleConfirmStaffCreation = staff => {
        setNewUser(staff);
        setDisplayMsg('Create new account?');
        setConfirmDialogEvtName('create');
        setShowConfirmModal(true);
    };
  
    const handleConfirm = async () => {
        setShowConfirmModal(false);
        switch (confirmDialogEvtName) {
            case "remove":
                break;
            case "restore":
                break;
            case "create":
                handleCreateStaff();
                break;
        }
    };

	const handleCloseModal = () => {
		setShowInputModal(false);
        setShowStaffCreationModal(false);
        setShowConfirmModal(false);
        setShowProductCreationModal(false);
    };
	
	const handleInputOK = async (str) => {
        switch (inputMode) {
            case "brand":
                await handleCreateBrand(str);
                break;
            case "category":
                await handleCreateCategory(str);
                break;
            case "tract":
                await handleCreateTract(str);
                break;
        }
	}

    const handleCreateBrand = async (str) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            await createProductBrand(controllerRef.current.signal, str);
            toast.info(`${str} successfully created`);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    }

    const handleCreateCategory = async (str) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            await createProductCat(controllerRef.current.signal, str);
            toast.info(`${str} successfully created`);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    }

    const handleCreateTract = async (str) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            await createTract(controllerRef.current.signal, str);
            toast.info(`${str} successfully created`);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    }
	
	const fnCreateProduct = async (item) => {
		try {
			setNetworkRequest(true);
            resetAbortController();
            const data = {
                product_name: item.productName,
                barcode: item.barcode,
                expDate: item.expDate,
                tract: item.tract.id,
                sales_price: item.unitSalesPrice,
                restock_level: 1,
                brand: item.brand?.id,
                category: item.category?.id,
            }
			await createProduct(controllerRef.current.signal, data);
            toast.info('Product creation successful');
			setNetworkRequest(false);
		} catch (error) {
            setNetworkRequest(false);
            if (error.name === 'AbortError' || error.name === 'CanceledError' || (error.response?.status === 500 && error.response?.data.message === "Invalid Token received!")) {
                // Request was intentionally aborted or Invalid Bearer Token received which requires refresh, handle silently
                return;
            }
            // display error message
            toast.error(handleErrMsg(error).msg);
            // throw error to prevent ProductScreationForm from clearing fields
            throw error;
		}
	}

    const resetAbortController = () => {
        // Cancel previous request if it exists
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
    };

    return (
        <div>
            <OffCanvasSideNav menuItems={offCanvasMenu} menuItemClick={handleOffCanvasMenuItemClick} />
            <div className="d-flex">
                {/* Main Content */}
                <div className="flex-grow-1 p-4" style={{ backgroundColor: 'var(--mc-bg-light)', minHeight: 'calc(100vh - 60px)' }}>
                    {/* Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                        <span>
                            <h3 className="mb-1">Dashboard</h3>
                            <p className="text-muted-custom mb-0" style={{ fontSize: '0.9rem' }}>
                                Welcome back! Here's what's happening with your store.
                            </p>
                        </span>
                        <span>

                        </span>
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
			<StaffCreationDialog
				show={showStaffCreationModal}
				handleClose={handleCloseModal}
				handleConfirm={handleConfirmStaffCreation}
				message={displayMsg}
                networkRequest={networkRequest}
                setNetworkREquest={setNetworkRequest}
			/>
            <InputDialog
                networkRequest={networkRequest}
                show={showInputModal}
                handleClose={handleCloseModal}
                handleConfirm={handleInputOK}
                message={displayMsg}
            />
			<ConfirmDialog
				show={showConfirmModal}
				handleClose={handleCloseModal}
				handleConfirm={handleConfirm}
				message={displayMsg}
			/>
			<Modal backdrop='static' show={showProductCreationModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title className='text-primary fw-bold'>Product Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <ProductCreationForm handleClose={handleCloseModal} fnCreateProduct={fnCreateProduct} networkRequest={networkRequest} />
				</Modal.Body>
			</Modal>
        </div>
    );
};

export default Dashboard;
