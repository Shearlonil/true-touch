import * as yup from "yup";

const productCreationSchema = yup.object().shape({
	product_name: yup.string().required("Product name required!"),
	restock_level: yup
		.number()
		.positive("Qty/Pkg must be positive")
		.required("Qty/Pkg is required"),
	sales_price: yup
		.number()
		.positive("Sales Price must be positive")
		.required("Sales Price is required"),
	brand: yup.object().typeError("Select a valid brand"),
	category: yup.object().typeError("Select a valid category"),
	tract: yup.object().typeError("Select a valid department"),
});

const restockSchema = yup.object().shape({
	item: yup.object().required("Select an item"),
	total_qty: yup
		.number()
		.positive("Quantity must be positive")
		.required("Quantity is required"),
	qty_type: yup.object().required("Select a packaging option"),
	qty_per_pkg: yup
		.number()
		.positive("Qty/Pkg must be positive")
		.required("Qty/Pkg is required"),
	unit_stock: yup
		.number()
		.positive("Unit Stock Price must be positive")
		.required("Unit Stock Price is required"),
	unit_sales: yup
		.number()
		.positive("Unit Sales Price must be positive")
		.required("Unit Sales Price is required"),
	pkg_stock_price: yup
		.number()
		.positive("Pkg Stock Price must be positive")
		.required("Pkg Stock Price is required"),
	pkg_sales_price: yup
		.number()
		.positive("Pkg Sales Price must be positive")
		.required("Pkg Sales Price is required"),
	markup: yup
		.number()
		.nullable()
		.min(0, 'Markup cannot be less than 0')
		.required("Markup is required"),
	vendor: yup.object().required("Vendor is required"),
	amount_paid: yup
		.number()
		.required("Amount Paid is required"),
});

const itemUpdateSchema = yup.object().shape({
	product_name: yup.string().required("Item name required!"),
	barcode: yup.string(),
	restock_level: yup
		.number()
		.positive("Restock Level must be positive")
		.required("Restock Level is required"),
	unit_sales: yup
		.number()
		.positive("Unit Sales Price must be positive")
		.required("Unit Sales Price is required"),
	pkg_sales_price: yup
		.number()
		.positive("Pkg Sales Price must be positive")
		.required("Pkg Sales Price is required"),
});

//	used in PurchasesUpdateForm
const purchasesUpdateSchema = yup.object().shape({
	qty_per_pkg: yup
		.number()
		.positive("Qty/Pkg must be positive")
		.required("Qty/Pkg is required"),
	total_qty: yup
		.number()
		.positive("Quantity must be positive")
		.required("Quantity is required"),
	qty_type: yup.object().required("Select a packaging option"),
	unit_stock: yup
		.number()
		.positive("Unit Stock Price must be positive")
		.required("Unit Stock Price is required"),
	amount_paid: yup
		.number()
		.required("Amount Paid is required"),
});

export { productCreationSchema, restockSchema, itemUpdateSchema, purchasesUpdateSchema };
