import { useEffect, useRef, useState } from "react";
import { Button, Row, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { IoMdAddCircle } from "react-icons/io";
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc';
import { TbRestore } from "react-icons/tb";
import { Table, IconButton } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { Package, Users, UserPen, LayoutPanelTop } from 'lucide-react';
import { SiBrandfetch } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";

import { useAuthUser } from "../../../app-context/user-context";
import handleErrMsg from "../../../Utils/error-handler";
import IMAGES from "../../../assets/images";
import PaginationLite from "../../../components/PaginationLite";
import ConfirmDialog from "../../../components/DialogBoxes/ConfirmDialog";
import { pageSizeOptions, statusOptions } from "../../../Utils/data";
import RsuiteTableSkeletonLoader from "../../../components/RsuiteTableSkeletonLoader";
import useProductController from "../../../api-controllers/product-controller-hook";
import { Product } from "../../../Entities/Product";
import ProductCreationForm from "../../../components/Forms/ProductCreationForm";
import OffcanvasMenu from '../../../components/OffCanvasSideNav';

const columns = [
    {
        key: 'productName',
        label: 'Name',
        fixed: true,
        flexGrow: 2,
        // width: 200
    },
    {
        key: 'salesPrice',
        label: 'Price',
        flexGrow: 1,
        // width: 100
    },
    {
        key: 'barcode',
        label: 'Barcode',
        flexGrow: 1,
        // width: 100
    },
    {
        key: 'expDate',
        label: 'Exp. Date',
        flexGrow: 1,
        // width: 100
    },
    {
        key: 'tractName',
        label: 'Department',
        flexGrow: 1,
        // width: 100
    },
    {
        key: 'brandName',
        label: 'Brand',
        flexGrow: 1,
        // width: 100
    },
    {
        key: 'categoryName',
        label: 'Cagegory',
        flexGrow: 1,
        // width: 100
    },
    {
        key: 'createdAt',
        label: 'Created At',
        flexGrow: 1,
        // width: 100
    },
];

const offCanvasMenu = [
    // { icon: LayoutDashboard, label: 'Dashboard', onClickParams: {evtName: 'dashboard'} },
    { icon: Users, label: 'Staff Members', onClickParams: {evtName: 'viewStaff'},},
    // { icon: ShoppingCart, label: 'Orders', onClickParams: {evtName: 'orders'} },
    { icon: SiBrandfetch, label: "Product Brands", onClickParams: {evtName: 'viewBrands'}, },
    { icon: MdOutlineCategory, label: "Product Categories", onClickParams: {evtName: 'viewCategories'}, },
    { icon: LayoutPanelTop, label: "Product Departments", onClickParams: {evtName: 'viewDepartments'}, },
    { icon: UserPen, label: 'Profile', onClickParams: {evtName: 'myProfile'} },
];

const ActionCell = ({ rowData, dataKey, onEdit, changeStatus, onRestore, onSave, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px', display: 'flex', gap: '4px', width: '400px' }}>
            <IconButton appearance="subtle" icon={rowData.mode === 'EDIT' ? <VscSave /> : <VscEdit />} onClick={() => { onEdit(rowData); }}/>
            <IconButton appearance="subtle" icon={rowData.status == true ? <VscRemove /> : <TbRestore />} onClick={() => { changeStatus(rowData); }}  />
            <IconButton icon={<VscSave color='green' />} onClick={() => { onSave(rowData); }}  />
        </Cell>
  );
};

const Products = () => {
    const controllerRef = useRef(new AbortController());
    
    const navigate = useNavigate();
    const location = useLocation();

    const { paginateFetch, productSearch, status, updateProduct, createProduct, activeProductPageInit } = useProductController();
    const { authUser } = useAuthUser();
    const user = authUser();

    const [networkRequest, setNetworkRequest] = useState(false);
    const [productOptions, setProductOptions] = useState([]);
    const [productStatus, setProductStatus] = useState(true);
    const [displayMsg, setDisplayMsg] = useState("");
    const [confirmDialogEvtName, setConfirmDialogEvtName] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const [showProductCreationModal, setShowProductCreationModal] = useState(false);
        
    //	for pagination
    const [pageSize, setPageSize] = useState(pageSizeOptions[1].value);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    //  data returned from DataPagination
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        if(!user){
            navigate("/");
            return;
        }

        initialize();
        return () => {
            // This cleanup function runs when the component unmounts or when the dependencies of useEffect change (e.g., route change)
            controllerRef.current.abort();
        };
    }, [location.pathname]);

    const initialize = async () => {
        try {
            controllerRef.current = new AbortController();
            setNetworkRequest(true);
            const response = await activeProductPageInit(controllerRef.current.signal, pageSize);

            //	check if the request to fetch product doesn't fail before setting values to display
            if(response && response.data){
                const { count, products } = response.data;
                const productArr = [];
                setProductOptions(products?.map(product => {
                    const p = new Product(product);
                    productArr.push(p);
                    return { label: p.productName, value: p };
                }));
                if(products && count){
                    setProducts([...productArr]);
                    setTotalItemsCount(count);
                }
            }

            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };

    const asyncProductSearch = async (inputValue, callback) => {
        /*  refs: https://stackoverflow.com/questions/65963103/how-can-i-setup-react-select-to-work-correctly-with-server-side-data-by-using  */
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await productSearch(controllerRef.current.signal, {inputValue, productStatus});
            const productArr = [];
            const results = response.data.map(product => {
                const p = new Product(product);
                productArr.push(p);
                return { label: p.productName, value: p };
            });
            setProductOptions(results);
            setProducts([...productArr]);
            setTotalItemsCount(0);
            setNetworkRequest(false);
            callback(results);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };

    const handleProductChange = (val) => {
        setTotalItemsCount(0);
        setProducts( val ? [val.value] : [] );
    };

    const handleStatusChange = async (val) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await paginateFetch(controllerRef.current.signal, {page: 1, pageSize, productStatus: val.value});
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                productArr.push(p);
                return { label: p.productName, value: p };
            }));
            setProducts([...productArr]);
            setCurrentPage(1);
            setTotalItemsCount(count);
            setProductStatus(val.value);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };

    const handlePageSizeChanged = async (val) => {
        // whenever page size changes, make a fresh request using necessary params
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await paginateFetch(controllerRef.current.signal, {page: 1, pageSize: val.value, productStatus});
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                productArr.push(p);
                return { label: p.productName, value: p };
            }));
            setProducts([...productArr]);
            setCurrentPage(1);
            setTotalItemsCount(count);
            setPageSize(val.value);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };

	const handleOffCanvasMenuItemClick = async (menus, e) => {
		switch (menus.onClickParams.evtName) {
            case 'viewStaff':
                if(!user.hasAuth(103)){
                    toast.info('Account not authorized');
                    return;
                }
                navigate('/dashboard/users');
                break;
            case 'viewDepartments':
                navigate('/dashboard/departments');
                break;
            case 'viewBrands':
                navigate('/dashboard/brands');
                break;
            case 'viewCategories':
                navigate('/dashboard/categories');
                break;
            case 'myProfile':
                navigate('/dashboard/profile');
                break;
        }
	}

    const setPageChanged = async (pageNumber) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await paginateFetch(controllerRef.current.signal, {page: pageNumber, pageSize, productStatus});
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                productArr.push(p);
                return { label: p.productName, value: p };
            }));
            setProducts([...productArr]);
            setCurrentPage(pageNumber);
            setTotalItemsCount(count);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };

    const restoreProduct = async () => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            await status(controllerRef.current.signal, { id: editedProduct.id, status: true });
            setProducts(products.filter(product => editedProduct.id !== product.id));
            setTotalItemsCount(products.length - 1);
            setEditedProduct(null);
            setNetworkRequest(false);
        } catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            setNetworkRequest(false);
            toast.error(handleErrMsg(error).msg);
        }
    };
    
    const delProduct = async () => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            await status(controllerRef.current.signal, {id: editedProduct.id, status: false});
            setProducts(products.filter(product => editedProduct.id !== product.id));
            setTotalItemsCount(products.length - 1);
            setEditedProduct(null);
            setNetworkRequest(false);
        } catch (error) {
            setNetworkRequest(false);
            if (error.name === 'AbortError' || error.name === 'CanceledError' || (error.response?.status === 500 && error.response?.data.message === "Invalid Token received!")) {
                // Request was intentionally aborted or Invalid Bearer Token received which requires refresh, handle silently
                return;
            }
            // display error message
            toast.error(handleErrMsg(error).msg);
        }
    };

    const handleChangeStatus = product => {
        if(!user.hasAuth(201)){
            toast.info('Account not authorized');
            return;
        }
        if(product.status){
            setConfirmDialogEvtName('remove');
            setDisplayMsg(`Delete ${product.productName} from active list?`);
            setShowConfirmModal(true);
            setEditedProduct(product);
        }else {
            setConfirmDialogEvtName('restore');
            setDisplayMsg(`Restore ${product.productName} from list of inactive department?`);
            setShowConfirmModal(true);
            setEditedProduct(product);
        }
    };
	
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
			const response = await createProduct(controllerRef.current.signal, data);
            const p = new Product(response.data);
            setProducts([...products, p]);
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

    const fnUpdateProduct = async (item) => {
        if(!user.hasAuth(202)){
            toast.info('Account not authorized');
            return;
        }
        try {
            setNetworkRequest(true);
            resetAbortController();
            const data = {
                id: item.id,
                product_name: item.productName,
                barcode: item.barcode,
                expDate: item.expDate,
                tract: item.tract.id,
                sales_price: item.unitSalesPrice,
                restock_level: 1,
                brand: item.brand?.id,
                category: item.category?.id,
            }
            await updateProduct(controllerRef.current.signal, data);
            setShowProductCreationModal(false);
            setEditedProduct(null);
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

    const handleEdit = product => {
        setEditedProduct(product);
        setShowProductCreationModal(true);
    };
  
    const handleSave = async (product) => {
        setConfirmDialogEvtName('save');
        setDisplayMsg(`Save changes made to ${product.name}?`);
        setShowConfirmModal(true);
        setEditedProduct(product);
    };

    const handleAddProduct = () => {
        if(!user.hasAuth(200)){
            toast.info('Account not authorized');
            return;
        }
        setDisplayMsg('Add New Department');
        setShowProductCreationModal(true);
    }

    const handleCloseModal = () => {
        setShowConfirmModal(false);
        setShowInputModal(false);
        setShowProductCreationModal(false);
    };
  
    const handleConfirm = async () => {
        setShowConfirmModal(false);
        switch (confirmDialogEvtName) {
            case "remove":
                delProduct();
                break;
            case "restore":
                restoreProduct();
                break;
        }
    };

    const resetAbortController = () => {
        // Cancel previous request if it exists
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
    };

    return (
        <section className='container d-flex flex-column gap-4' style={{minHeight: '60vh'}}>
            <OffcanvasMenu menuItems={offCanvasMenu} menuItemClick={handleOffCanvasMenuItemClick} />
            <Row className='d-flex align-items-center'>
                <div className="d-flex flex-wrap gap-4 align-items-center col-12 col-md-10 mt-4" >
                    <img src={IMAGES.svg_user} alt ="Avatar" className="rounded-circle" width={100} height={100} />
                    <div className="d-flex flex-wrap gap-2 fw-bold h2">
                        <span>{user.firstName}</span>
                        <span> {user.lastName}</span>
                    </div>
                </div>
                <div className=" col-12 col-md-2 mt-4">
                    <Button variant="success fw-bold d-flex gap-3 align-items-center justify-content-center" className="w-100" onClick={handleAddProduct}>
                        <IoMdAddCircle size='32px' /> Add
                    </Button>
                </div>
            </Row>
            {/* NOTE: setting z-index of this row because of rsuite table which conflicts the drop down menu of react-select */}
            <Row className="card shadow border-0 rounded-3 z-3">
                <div className="card-body row ms-0 me-0">
                    <div className="d-flex gap-2 align-items-center col-12 col-md-5 mb-3">
                        <Package />
                        <span className="text-danger fw-bold h2 text-truncate">Product</span>
                    </div>

                    <div className="d-flex flex-column gap-2 align-items-center col-12 col-md-3 mb-3">
                        <span className="align-self-start fw-bold">Search</span>
                        <AsyncSelect
                            className="text-dark w-100"
                            isClearable
                            // getOptionLabel={getOptionLabel}
                            getOptionValue={(option) => option}
                            // defaultValue={initialObject}
                            defaultOptions={productOptions}
                            cacheOptions
                            loadOptions={asyncProductSearch}
                            onChange={(val) => handleProductChange(val) }
                        />
                    </div>

                    <div className="d-flex gap-4 align-items-center justify-content-end col-12 col-md-4 mb-3">
                        <div className="d-flex flex-column w-50 gap-2">
                            <span className="align-self-start fw-bold">Status</span>
                            <Select
                                required
                                name="filter"
                                placeholder="Filter..."
                                className="text-dark w-100"
                                defaultValue={statusOptions[0]}
                                options={statusOptions}
                                onChange={(val) => { handleStatusChange(val) }}
                            />
                        </div>
                        <div className="d-flex flex-column w-50 gap-2">
                            <span className="align-self-start fw-bold">Page Size</span>
                            <Select
                                required
                                name="filter"
                                placeholder="Filter..."
                                className="text-dark w-100"
                                defaultValue={pageSizeOptions[2]}
                                options={pageSizeOptions}
                                onChange={(val) => { handlePageSizeChanged(val) }}
                            />
                        </div>
                    </div>
                </div>
            </Row>
            
            <Table loading={networkRequest} rowKey="id" data={products} affixHeader affixHorizontalScrollbar
                renderLoading={() => <RsuiteTableSkeletonLoader withPlaceholder={true} rows={10} cols={5} />} 
                autoHeight hover={true}>
                {columns.map((column, idx) => {
                    const { key, label, ...rest } = column;
                    return (
                        <Column {...rest} key={key} fullText>
                            <HeaderCell className='fw-bold text-success fs-6'>{label}</HeaderCell>
                            <Cell dataKey={key} style={{ padding: 6 }} />
                        </Column>
                    );
                })}
                <Column width={150} >
                    <HeaderCell className='fw-bold text-success fs-6'>Actions...</HeaderCell>
                    <ActionCell changeStatus={handleChangeStatus} onEdit={handleEdit} onSave={handleSave} />
                </Column>
            </Table>
            <Row className="mt-3">
                <PaginationLite
                    itemCount={totalItemsCount}
                    pageSize={pageSize}
                    setPageChanged={setPageChanged}
                    pageNumber={currentPage}
                />
            </Row>
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
                    <ProductCreationForm handleClose={handleCloseModal} fnCreateProduct={fnCreateProduct} fnUpdateProduct={fnUpdateProduct} networkRequest={networkRequest} data={editedProduct} />
				</Modal.Body>
			</Modal>
        </section>
    )
}

export default Products;