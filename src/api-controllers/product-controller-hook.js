import { useAxiosInterceptor } from '../axios/axios-interceptors';

// https://stackoverflow.com/questions/75319009/how-to-use-hooks-within-function-in-react-js
const useProductController = () => {
    const { xhrAxios } = useAxiosInterceptor();

    const createProduct = async (signal, data) => {
        return await xhrAxios.post('/products/create', data, {signal});
    }
    
    const status = async (signal, data) => {
        return await xhrAxios.put(`/products/status`, data, {signal});
    }
    
    const updateProduct = async (signal, data) => {
        return await xhrAxios.put(`/products/update`, data, {signal});
    }
    
    const activeProductPageInit = async (signal, pageSize) => {
        return await xhrAxios.get(`/products/active/init/${pageSize}`, {signal});
    }
    
    const paginateFetch = async (signal, data) => {
        return await xhrAxios.get(`/products/search/page/${data.page}`, {
            params: {
                pageSize: data.pageSize, status: data.productStatus, page: data.page
            }
        }, {signal});
    }
    
    const filterPaginateFetch = async (signal, data) => {
        return await xhrAxios.get(`/products/query/filter`, {
            params: {
                pageSize: data.pageSize, 
                brand: data.brand, 
                page: data.page,
                category: data.category,
                name: data.name,
            }
        }, {signal});
    }
    
    const productSearch = async (signal, data) => {
        return await xhrAxios.get(`/products/query`, {
            params: {
                str: data.inputValue, status: data.productStatus
            }
        }, {signal});
    }
    
    const random = async (signal) => {
        return await xhrAxios.get(`/products/random`, {signal});
    }

    return {
        createProduct,
        status,
        updateProduct,
        activeProductPageInit,
        paginateFetch,
        filterPaginateFetch,
        productSearch,
        random,
    }
}

export default useProductController;