import { useAxiosInterceptor } from '../axios/axios-interceptors';

// https://stackoverflow.com/questions/75319009/how-to-use-hooks-within-function-in-react-js
const useTractController = () => {
    const { xhrAxios } = useAxiosInterceptor();

    const createTract = async (signal, name) => {
        return await xhrAxios.post('/tracts/create', { tract_name: name }, {signal});
    }

    const deactivate = async (signal, data) => {
        return await xhrAxios.put(`/tracts/status/deactivate`, data, {signal});
    }
    
    const activate = async (signal, nano_id) => {
        return await xhrAxios.put(`/tracts/status/activate/${nano_id}`, {signal});
    }
    
    const rename = async (signal, data) => {
        return await xhrAxios.put(`/tracts/update`, null, {
            params: {
                name: data.name,
                id: data.id
            }
        }, {signal});
    }
    
    const activeTractPageInit = async (signal, pageSize) => {
        return await xhrAxios.get(`/tracts/active/init/${pageSize}`, {signal});
    }
    
    const paginateFetch = async (signal, data) => {
        return await xhrAxios.get(`/tracts/search/page/${data.page}`, {
            params: {
                pageSize: data.pageSize, status: data.tractStatus, page: data.page
            }
        }, {signal});
    }
    
    const tractSearch = async (signal, data) => {
        return await xhrAxios.get(`/tracts/query`, {
            params: {
                str: data.inputValue, status: data.tractStatus
            }
        }, {signal});
    }

    return {
        createTract,
        deactivate,
        activate,
        rename,
        activeTractPageInit,
        paginateFetch,
        tractSearch,
    }
}

export default useTractController;