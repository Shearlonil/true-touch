import { useAxiosInterceptor } from '../axios/axios-interceptors';

// https://stackoverflow.com/questions/75319009/how-to-use-hooks-within-function-in-react-js
const useProductBrandController = () => {
    const { xhrAxios } = useAxiosInterceptor();

    const createProductBrand = async (signal, name) => {
        return await xhrAxios.post('/brands/create', null, {
            params: { brand_name: name }
        }, {signal});
    }
    
    const status = async (signal, data) => {
        return await xhrAxios.put(`/brands/status`, data, {signal});
    }
    
    const renameProductBrand = async (signal, data) => {
        return await xhrAxios.put(`/brands/update`, null, {
            params: {
                name: data.name,
                id: data.id
            }
        }, {signal});
    }
    
    const activeProductBrandPageInit = async (signal, pageSize) => {
        return await xhrAxios.get(`/brands/active/init/${pageSize}`, {signal});
    }
    
    const paginateFetch = async (signal, data) => {
        return await xhrAxios.get(`/brands/search/page/${data.page}`, {
            params: {
                pageSize: data.pageSize, status: data.brandStatus, page: data.page
            }
        }, {signal});
    }
    
    const productBrandSearch = async (signal, data) => {
        return await xhrAxios.get(`/brands/query`, {
            params: {
                str: data.inputValue, status: data.brandStatus
            }
        }, {signal});
    }

    return {
        createProductBrand,
        status,
        renameProductBrand,
        activeProductBrandPageInit,
        paginateFetch,
        productBrandSearch,
    }
}

export default useProductBrandController;