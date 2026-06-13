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
    
    const renameProduct = async (signal, data) => {
        return await xhrAxios.put(`/products/update`, null, {
            params: {
                name: data.name,
                id: data.id
            }
        }, {signal});
    }
    
    const activeProductPageInit = async (signal, pageSize) => {
        return await xhrAxios.get(`/products/active/init/${pageSize}`, {signal});
    }
    
    const paginateFetch = async (signal, data) => {
        return await xhrAxios.get(`/products/search/page/${data.page}`, {
            params: {
                pageSize: data.pageSize, status: data.catStatus, page: data.page
            }
        }, {signal});
    }
    
    const productSearch = async (signal, data) => {
        return await xhrAxios.get(`/products/query`, {
            params: {
                str: data.inputValue, status: data.catStatus
            }
        }, {signal});
    }

    return {
        createProduct,
        status,
        renameProduct,
        activeProductPageInit,
        paginateFetch,
        productSearch,
    }
}

export default useProductController;