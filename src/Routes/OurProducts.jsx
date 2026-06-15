import { useEffect, useRef, useState } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from 'react-select';
import Skeleton from "react-loading-skeleton";
import AsyncSelect from 'react-select/async';
import { Heart, Star, ShoppingCart, Search, SlidersHorizontal } from 'lucide-react';

import { useAuthUser } from "../app-context/user-context";
import handleErrMsg from "../Utils/error-handler";
import PaginationLite from "../components/PaginationLite";
import { pageSizeOptions } from "../Utils/data";
import { Product } from "../Entities/Product";
import useProductController from "../api-controllers/product-controller-hook";
import useGenericController from "../api-controllers/generic-controller-hook";

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

const OurProducts = () => {
    const controllerRef = useRef(new AbortController());
    
    const navigate = useNavigate();
    const location = useLocation();

    const { filterPaginateFetch } = useProductController();
    const { performGetRequests } = useGenericController();
    const { authUser } = useAuthUser();
    const user = authUser();

    const [networkRequest, setNetworkRequest] = useState(false);
    const [productOptions, setProductOptions] = useState([]);
    const [catOptions, setCatOptions] = useState([]);
	const [catsLoading, setCatsLoading] = useState(true);
    const [brandOptions, setBrandOptions] = useState([]);
	const [brandsLoading, setBrandsLoading] = useState(true);
    const [productStatus, setProductStatus] = useState(true);

    const [searchData, setSearchData] = useState({
        name: '',
        category: null,
        brand: null,
        page: 1,
        pageSize: pageSizeOptions[1].value
    });
        
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
			const urls = [ '/brands/active/all', '/categories/active/all', `/products/active/init/${pageSize}` ];
            const response = await performGetRequests(urls, controllerRef.current.signal);
            const { 0: brandRequest, 1: categoryRequest, 2: productRequest } = response;
            //	check if the request to fetch brand doesn't fail before setting values to display
            if(brandRequest){
                setBrandsLoading(false);
				setBrandOptions(brandRequest.data.map( brand => ({label: brand.name, value: brand}) ));
            }

            //	check if the request to fetch categories doesn't fail before setting values to display
            if(categoryRequest){
				setCatsLoading(false);
                setCatOptions(categoryRequest.data.map( cat => ({label: cat.name, value: cat}) ));
            }

            //	check if the request to fetch product doesn't fail before setting values to display
            if(productRequest && productRequest.data){
                const { count, products } = productRequest.data;
                const productArr = [];
                setProductOptions(products?.map(product => {
                    const p = new Product(product);
                    productArr.push(p);
                    return { label: p.productName, value: p };
                }));
                setProducts([...productArr]);
                setTotalItemsCount(count);
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
            const temp = {...searchData};
            temp.name = inputValue;
            temp.page = 1;
            setSearchData(temp);
            const response = await filterPaginateFetch(controllerRef.current.signal, temp);
            const { count, products } = response.data;
            const productArr = [];
            const results = products.map(product => {
                const p = new Product(product);
                p.id = product.nano_id;
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

    const handleProductChange = async (val, actionMeta) => {
        const temp = {...searchData};
        // Detect when the clear button (x) is clicked
        if (actionMeta.action === 'clear') {
            temp.name = null;
            try {
                setNetworkRequest(true);
                resetAbortController();
                const response = await filterPaginateFetch(controllerRef.current.signal, temp);
                const { count, products } = response.data;
                const productArr = [];
                setProductOptions(products?.map(product => {
                    const p = new Product(product);
                    p.id = product.nano_id;
                    productArr.push(p);
                    return { label: p.productName, value: p };
                }));
                setProducts([...productArr]);
                setCurrentPage(1);
                setNetworkRequest(false);
            } catch (error) {
                if (error.name === 'AbortError' || error.name === 'CanceledError') {
                    // Request was intentionally aborted, handle silently
                    return;
                }
                setNetworkRequest(false);
                toast.error(handleErrMsg(error).msg);
            }
        }else {
            setSearchData(temp);
            setTotalItemsCount(0);
            setProducts( val ? [val.value] : [] );
        }
    };

    const handlePageSizeChanged = async (val) => {
        // whenever page size changes, make a fresh request using necessary params
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await filterPaginateFetch(controllerRef.current.signal, searchData);
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                p.id = product.nano_id;
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

    const handleBrandChanged = async (val, actionMeta) => {
        const temp = {...searchData};
        // Detect when the clear button (x) is clicked
        if (actionMeta.action === 'clear') {
            temp.brand = null;
        }else {
            temp.brand = val.value.id;
        }
        setSearchData(temp);
        // whenever brand changes, make a fresh request using necessary params
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await filterPaginateFetch(controllerRef.current.signal, temp);
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                p.id = product.nano_id;
                productArr.push(p);
                return { label: p.productName, value: p };
            }));
            setProducts([...productArr]);
            setCurrentPage(1);
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

    const handleCategoryChanged = async (val, actionMeta) => {
        const temp = {...searchData};
        // Detect when the clear button (x) is clicked
        if (actionMeta.action === 'clear') {
            temp.category = null;
        }else {
            temp.category = val.value.id;
        }
        setSearchData(temp);
        // whenever category changes, make a fresh request using necessary params
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await filterPaginateFetch(controllerRef.current.signal, temp);
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                p.id = product.nano_id;
                productArr.push(p);
                return { label: p.productName, value: p };
            }));
            setProducts([...productArr]);
            setCurrentPage(1);
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

    const setPageChanged = async (pageNumber) => {
        const temp = {...searchData};
        temp.page = pageNumber;
        setSearchData(temp);
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await filterPaginateFetch(controllerRef.current.signal, temp);
            const { count, products } = response.data;
            const productArr = [];
            setProductOptions(products?.map(product => {
                const p = new Product(product);
                p.id = product.nano_id;
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
    
    const buildProductCards = () => {
        return products.map((product, idx) => (<Col sm={12} lg={3} className="mb-4" key={idx}>
            <div className="product-card h-100">
                <div className="product-img-wrap">
                    {/* <span className="product-badge text-white" style={{ backgroundColor: '#e74c3c' }}>Best Seller</span> */}
                    <button className="product-wishlist">
                        <Heart size={16} />
                    </button>
                    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCart size={48} style={{ color: 'var(--mc-primary)', opacity: 0.3 }} />
                    </div>
                </div>
                <div className="card-body">
                    <span className="product-category"> {product.category ? product.categoryName : 'Others'} </span>
                    <h6 className="product-title">{product.productName}</h6>
                    <div className="d-flex align-items-center gap-1 mb-2">
                        {/* <div className="star-rating">
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="currentColor" />
                            <Star size={13} fill="none" />
                        </div> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="product-price">
                            {formatNaira(product.salesPrice)}
                            {/* <span className="old-price">{formatNaira(15000)}</span> */}
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ borderRadius: 8, padding: '6px 12px' }}>
                            <ShoppingCart size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </Col>))
    };
    
    const buildProductCardSkeletons = () => {
        return new Array(4).fill(1).map((val, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
                <Card className="h-100 shadow border-0 rounded-3">
                    <Skeleton height={300} />
                    <Card.Body className="d-flex flex-column">
                        <Skeleton />
                        <Skeleton count={2} />
                    </Card.Body>
                </Card>
            </div>
        ));
    };

    const resetAbortController = () => {
        // Cancel previous request if it exists
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
    };

    return (
        <>
            <section className="page-header">
                <Container>
                    <h1>Our Products</h1>
                    <p className="text-muted-custom mb-3" style={{ fontSize: '1.1rem' }}>
                        Browse our complete range of health and wellness products
                    </p>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Products</li>
                        </ol>
                    </nav>
                </Container>
            </section>
            <section className='container d-flex flex-column gap-4 mt-5' style={{minHeight: '60vh'}}>
                {/* NOTE: setting z-index of this row because of rsuite table which conflicts the drop down menu of react-select */}
                <Row className="card shadow border-0 rounded-3 z-3">
                    <div className="card-body row ms-0 me-0">
                        <div className="d-flex flex-column gap-2 align-items-center col-12 col-md-3 mb-3">
                            <span className="align-self-start text-success fw-bold">Search Product</span>
                            <AsyncSelect
                                className="text-dark w-100"
                                isClearable
                                // getOptionLabel={getOptionLabel}
                                getOptionValue={(option) => option}
                                // defaultValue={initialObject}
                                defaultOptions={productOptions}
                                cacheOptions
                                loadOptions={asyncProductSearch}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="d-flex gap-4 align-items-center justify-content-end col-12 col-md-3 mb-3">
                            <div className="d-flex flex-column w-100 gap-2">
                                <span className="align-self-start fw-bold text-success">Categories</span>
                                <Select
                                    required
                                    name="filter"
                                    placeholder="Filter..."
                                    className="text-dark w-100"
                                    defaultValue={catOptions[0]}
                                    options={catOptions}
								    isLoading={catsLoading}
								    isClearable={true}
								    // onChange={(val) => onChange(val)}
								    // value={value}
                                    onChange={handleCategoryChanged}
                                />
                            </div>
                        </div>

                        <div className="d-flex gap-4 align-items-center justify-content-end col-12 col-md-3 mb-3">
                            <div className="d-flex flex-column w-100 gap-2">
                                <span className="align-self-start fw-bold text-success">Brands</span>
                                <Select
                                    required
                                    name="filter"
                                    placeholder="Filter..."
                                    className="text-dark w-100"
                                    defaultValue={brandOptions[0]}
                                    options={brandOptions}
                                    isLoading={brandsLoading}
                                    isClearable={true}
                                    // onChange={(val) => onChange(val)}
                                    // value={value}
                                    onChange={handleBrandChanged}
                                />
                            </div>
                        </div>

                        <div className="d-flex gap-4 align-items-center justify-content-end col-12 col-md-3 mb-3">
                            <div className="d-flex flex-column w-100 gap-2">
                                <span className="align-self-start fw-bold text-success">Page Size</span>
                                <Select
                                    required
                                    name="filter"
                                    placeholder="Filter..."
                                    className="text-dark w-100"
                                    defaultValue={pageSizeOptions[2]}
                                    options={pageSizeOptions}
                                    onChange={handlePageSizeChanged}
                                />
                            </div>
                        </div>
                    </div>
                </Row>

                <Row>
                    {networkRequest && buildProductCardSkeletons()}
                    {!networkRequest && products.length === 0 && <h4 className="text-center text-success">No Product</h4>}
                    {!networkRequest && products.length > 0 && buildProductCards()}
                </Row>

                <Row className="mt-3">
                    <PaginationLite
                        itemCount={totalItemsCount}
                        pageSize={pageSize}
                        setPageChanged={setPageChanged}
                        pageNumber={currentPage}
                    />
                </Row>
            </section>
        </>
    )
}

export default OurProducts;