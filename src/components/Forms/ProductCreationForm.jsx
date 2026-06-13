import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Datetime from "react-datetime";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { format } from "date-fns";

import { productCreationSchema } from "../../Utils/yup-schema-validator/product-form-schema";
import ErrorMessage from "../ErrorMessage";
import handleErrMsg from '../../Utils/error-handler';
import { ThreeDotLoading } from "../react-loading-indicators/Indicator";
import useGenericController from "../../api-controllers/generic-controller-hook";

//	ref:	https://help.nextar.com/tutorial/stock-control
const ProductCreationForm = (props) => {
	const controllerRef = useRef(new AbortController());
	const { data, fnSave, networkRequest }  = props;
	
	const navigate = useNavigate();

	const { performGetRequests, get } = useGenericController();
	// for tracts
	const [tractOptions, setTractOptions] = useState([]);
	const [tractsLoading, setTractsLoading] = useState(true);

	// for brands
	const [brandOptions, setBrandOptions] = useState([]);
	const [brandsLoading, setBrandsLoading] = useState(true);

	// for categories
	const [catOptions, setCatOptions] = useState([]);
	const [catsLoading, setCatsLoading] = useState(true);
	
	//	for form calculation
	const [totalQty, setTotalQty] = useState(0);
	const [qtyType, setQtyType] = useState(null);
	const [qtyPerPkg, setQtyPerPkg] = useState(0);
	const [unitStockPrice, setUnitStockPrice] = useState(0);
	const [markup, setMarkup] = useState(0);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		resetField,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(productCreationSchema),
		defaultValues: {
			product_name: null,
			// restock_level: 0,
			sales_price: 0,
			tract: null,
			category: null,
			brand: null,
		},
	});

    useEffect( () => {
		initialize();
        return () => {
            // This cleanup function runs when the component unmounts or when the dependencies of useEffect change (e.g., route change)
            controllerRef.current.abort();
        };
    }, []);

	const initialize = async () => {
		try {
            controllerRef.current = new AbortController();
			const urls = [ '/brands/active/all', '/categories/active/all', '/tracts/active/all' ];
            const response = await performGetRequests(urls, controllerRef.current.signal);
            const { 0: brandRequest, 1: categoryRequest, 2: tractRequest } = response;
            //	check if the request to fetch brand doesn't fail before setting values to display
            if(brandRequest){
                setBrandsLoading(false);
				setBrandOptions(brandRequest.data.map( brand => ({label: brand.name, value: brand})));
            }

            //	check if the request to fetch categories doesn't fail before setting values to display
            if(categoryRequest){
				setCatsLoading(false);
                setCatOptions(categoryRequest.data.map( cat => ({label: cat.name, value: cat})));
            }

            //	check if the request to fetch tracts doesn't fail before setting values to display
            if(tractRequest){
				setTractsLoading(false);
                setTractOptions(tractRequest.data.map( tract => ({label: tract.name, value: tract})));
            }

			if(data){
				setValue("product_name", data.productName);
				setValue("barcode", data.barcode);
				setValue("sales_price", numeral(data.unitSalesPrice).value());
				setValue("tract", {value: data.tract, label: data.tract.name});
				setValue("brand", {value: data.brand, label: data.brand.name});
				setValue("category", {value: data.category, label: data.category.name});
				setValue("expDate", data.expDate);
			}
		} catch (error) {
            if (error.name === 'AbortError' || error.name === 'CanceledError') {
                // Request was intentionally aborted, handle silently
                return;
            }
            // display error message
            toast.error(handleErrMsg(error).msg);
		}
	};

	const onSubmit = async (formData) => {
		try {
			if(props.data?.id){
				//	if data has id, then update mode
				setItem(props.data, formData);
				await fnSave(props.data);
			}else {
				// 	else, create new item
				const item = {};
				setItem(item, formData);
				await fnSave(item);
				//	only reset when new item is added and not edited
				reset();
			}
		} catch (error) {
			// do nothing.... just don't clear fields
		}
	};

	const setItem = (item, formData) => {
		item.productName = formData.product_name;
		item.barcode = formData.barcode;
		item.unitSalesPrice = formData.sales_price;
		item.expDate = formData.expDate ? format(formData.expDate, "yyyy-MM-dd") : null;

		if(formData.brand){
			const brand = {
				id: formData.brand.value.id,
				brandName: formData.brand.value.name,
			};
			item.brand = brand;
		}

		if(formData.category){
			const category = {
				id: formData.category.value.id,
				catName: formData.category.value.name,
			};
			item.category = category;
		}

		const tract = {
			id: formData.tract.value.id,
			tractName: formData.tract.value.name,
		};
		item.tract = tract;
	}

	const reset = () => {
		resetField('tract');
		resetField('product_name');
		resetField('barcode');
		resetField('sales_price');
		resetField('category');
		resetField('brand');
		resetField('expDate');
	}

	return (
		<>
			<Form className="d-flex flex-column gap-2">
				<Controller
					name="tract"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							required
							placeholder="Choose Department..."
							className="text-dark col-12 mb-3"
							options={tractOptions}
							isLoading={tractsLoading}
							onChange={(val) => onChange(val)}
							value={value}
						/>
					)}
				/>
				<ErrorMessage source={errors.tract} />

				<Form.Group className="mb-3" controlId="product_name">
					<Row>
						<Col sm={"12"} md="4">
							<Form.Label>Name</Form.Label>
						</Col>
						<Col sm={"12"} md="8">
							<Form.Control
								type="text"
								placeholder="Item Name"
								{...register("product_name")}
							/>
							<ErrorMessage source={errors.product_name} />
						</Col>
					</Row>
				</Form.Group>


				<Form.Group className="mb-3" controlId="barcode">
					<Row>
						<Col sm={"12"} md="4">
							<Form.Label>Barcode</Form.Label>
						</Col>
						<Col sm={"12"} md="8">
							<Form.Control
								type="text"
								placeholder="Scan Code"
								{...register("barcode")}
							/>
							<ErrorMessage source={errors.barcode} />
						</Col>
					</Row>
				</Form.Group>

				<Form.Group className="mb-3" controlId="exp_date">
					<Row>
						<Col sm={"12"} md="4">
							<Form.Label>Exp Date:</Form.Label>
						</Col>
						<Col sm={"12"} md="8">
							<Controller
								name="expDate"
								control={control}
								render={({ field }) => (
									<Datetime
										{...field}
										timeFormat={false}
										closeOnSelect={true}
										dateFormat="DD/MM/YYYY"
										inputProps={{
											placeholder: "Choose exp. date",
											className: "form-control",
											readOnly: true, // Optional: makes input read-only
										}}
										value={field.value ? new Date(field.value) : null}
										onChange={(date) => field.onChange(date ? date.toDate() : null)}
										/*	react-hook-form is unable to reset the value in the Datetime component because of the below bug.
											refs:
												*	https://stackoverflow.com/questions/46053202/how-to-clear-the-value-entered-in-react-datetime
												*	https://stackoverflow.com/questions/69536272/reactjs-clear-date-input-after-clicking-clear-button
											there's clearly a rendering bug in component if you try to pass a null or empty value in controlled component mode: 
											the internal input still got the former value entered with the calendar (uncontrolled ?) despite the fact that that.state.value
											or field.value is null : I've been able to "patch" it with the renderInput prop :*/
										renderInput={(props) => {
											return <input {...props} value={field.value ? props.value : ''} />
										}}
									/>
								)}
							/>
						</Col>
					</Row>
				</Form.Group>
				
				<hr className="mt-0" />

				<Form.Group className="mb-3" controlId="sales_price">
					<Row>
						<Col sm={"12"} md="4">
							<Form.Label>Sales Price</Form.Label>
						</Col>
						<Col sm={"12"} md="8">
							<Form.Control
								type="number"
								placeholder="0"
								{...register("sales_price")}
							/>
							<ErrorMessage source={errors.sales_price} />
						</Col>
					</Row>
				</Form.Group>

				<Form.Group className="mb-3" controlId="amount_paid">
					<h5 className="text-primary">Product Category</h5>
					<Controller
						name="category"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select
								required
								name="category"
								placeholder="Choose Category..."
								className="text-dark col-12"
								options={catOptions}
								isLoading={catsLoading}
								isClearable={true}
								onChange={(val) => onChange(val)}
								value={value}
							/>
						)}
					/>
					<ErrorMessage source={errors.category} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="amount_paid">
					<h5 className="text-primary">Product Brand</h5>
					<Controller
						name="brand"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select
								required
								name="brand"
								placeholder="Choose Product Brand..."
								className="text-dark col-12"
								options={brandOptions}
								isLoading={brandsLoading}
								isClearable={true}
								onChange={(val) => onChange(val)}
								value={value}
							/>
						)}
					/>
					<ErrorMessage source={errors.brand} />
				</Form.Group>

				<Button
					className="w-75 mx-auto mb-2"
					variant="primary"
					disabled={networkRequest}
					onClick={handleSubmit(onSubmit)}
				>
					{ (networkRequest) && <ThreeDotLoading color="#ffffff" size="small" /> }
					{ (!networkRequest) && `Save` }
				</Button>
			</Form>
		</>
	);
};

export default ProductCreationForm;
