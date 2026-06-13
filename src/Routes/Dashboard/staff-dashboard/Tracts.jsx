import { useEffect, useRef, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { IoMdAddCircle } from "react-icons/io";
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc';
import { TbRestore } from "react-icons/tb";
import { Table, IconButton, Input, NumberInput, DatePicker } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

import { useAuthUser } from "../../../app-context/user-context";
import handleErrMsg from "../../../Utils/error-handler";
import IMAGES from "../../../assets/images";
import PaginationLite from "../../../components/PaginationLite";
import ConfirmDialog from "../../../components/DialogBoxes/ConfirmDialog";
import { pageSizeOptions, statusOptions } from "../../../Utils/data";
import RsuiteTableSkeletonLoader from "../../../components/RsuiteTableSkeletonLoader";
import useTractController from "../../../api-controllers/tract-controller-hook";
import InputDialog from "../../../components/DialogBoxes/InputDialog";
import DropDownDialog from "../../../components/DialogBoxes/DropDownDialog";

const columns = [
    {
        key: 'name',
        label: 'Name',
        fixed: true,
        flexGrow: 2,
        // width: 200
    },
    {
        key: 'fname',
        label: 'Creator',
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

function toValueString(value, dataType) {
    return (dataType === 'date') ? value?.toLocaleDateString() : value;
}

const fieldMap = {
    string: Input,
    number: NumberInput,
    date: DatePicker
};

const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, ...props }) => {
    const editing = rowData.mode === 'EDIT';

    const Field = fieldMap[dataType];
    const value = rowData[dataKey];
    const text = toValueString(value, dataType);

    return (
        <Cell
            {...props}
            className={editing ? 'table-cell-editing' : ''}
            onDoubleClick={() => {
                onEdit?.(rowData.id);
            }}
        >
            {editing ? (
                <Field
                    defaultValue={value}
                    onChange={value => {
                        onChange?.(rowData.id, dataKey, value);
                    }}
                />
            ) : (
                text
            )}
        </Cell>
    );
};

const ActionCell = ({ rowData, dataKey, onEdit, changeStatus, onRestore, onSave, ...props }) => {
    return (
        <Cell {...props} style={{ padding: '6px', display: 'flex', gap: '4px', width: '400px' }}>
            <IconButton appearance="subtle" icon={rowData.mode === 'EDIT' ? <VscSave /> : <VscEdit />} onClick={() => { onEdit(rowData.id); }}/>
            <IconButton appearance="subtle" icon={rowData.status == true ? <VscRemove /> : <TbRestore />} onClick={() => { changeStatus(rowData); }}  />
            <IconButton icon={<VscSave color='green' />} onClick={() => { onSave(rowData); }}  />
        </Cell>
  );
};

const Tract = () => {
    const controllerRef = useRef(new AbortController());
    
    const navigate = useNavigate();
    const location = useLocation();

    const { paginateFetch, tractSearch, activate, deactivate, rename, createTract, activeTractPageInit } = useTractController();
    const { authUser } = useAuthUser();
    const user = authUser();

    const [networkRequest, setNetworkRequest] = useState(false);
    const [tractOptions, setTractOptions] = useState([]);
    const [tractStatus, setTractStatus] = useState(true);
	const [displayMsg, setDisplayMsg] = useState("");
    const [confirmDialogEvtName, setConfirmDialogEvtName] = useState(null);
    const [editedTract, setEditedTract] = useState(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showInputModal, setShowInputModal] = useState(false);
    const [showDropDownModal, setShowDropDownModal] = useState(false);
        
    //	for pagination
    const [pageSize, setPageSize] = useState(pageSizeOptions[2].value);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    //  data returned from DataPagination
    const [tracts, setTracts] = useState([]);
    
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
            const response = await activeTractPageInit(controllerRef.current.signal, pageSize);

            //	check if the request to fetch tract doesn't fail before setting values to display
            if(response && response.data){
                const { count, results } = response.data;
                setTractOptions(results?.map(tract => ({label: tract.name, value: tract})));
                if(results && count){
                    setTracts(results);
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

    const asyncTractSearch = async (inputValue, callback) => {
        /*  refs: https://stackoverflow.com/questions/65963103/how-can-i-setup-react-select-to-work-correctly-with-server-side-data-by-using  */
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await tractSearch(controllerRef.current.signal, {inputValue, tractStatus});
            const results = response.data.map(tract => ({label: tract.name, value: tract}));
            setTractOptions(results);
            setTracts(response.data);
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

    const handleTractChange = (val) => {
        setTotalItemsCount(0);
        setTracts( val ? [val.value] : [] );
    };

    const handleStatusChange = async (val) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await paginateFetch(controllerRef.current.signal, {page: 1, pageSize, tractStatus: val.value});
            const { count, results } = response.data;
            setTractOptions(results.map(tract => ({label: tract.name, value: tract})));
            setTracts(results);
            setCurrentPage(1);
            setTotalItemsCount(count);
            setTractStatus(val.value);
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
            const response = await paginateFetch(controllerRef.current.signal, {page: 1, pageSize: val.value, tractStatus});
            const { count, results } = response.data;
            setTractOptions(results.map(tract => ({label: tract.name, value: tract})));
            setTracts(results);
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

    const setPageChanged = async (pageNumber) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await paginateFetch(controllerRef.current.signal, {page: pageNumber, pageSize, tractStatus});
            const { count, results } = response.data;
            setTractOptions(results.map(tract => ({label: tract.name, value: tract})));
            setTracts(results);
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

	const restoreTract = async () => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            await activate(controllerRef.current.signal, editedTract.id);
            setTracts(tracts.filter(tract => editedTract.id !== tract.id));
            setTotalItemsCount(tracts.length - 1);
            setEditedTract(null);
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
    
    const delTract = async (destinationTract) => {
        setShowDropDownModal(false);
        if(editedTract.id === destinationTract.id){
            toast.error('Deleted Department and Product Destination Department cannot be same');
            return;
        }
        try {
            setNetworkRequest(true);
            resetAbortController();
            await deactivate(controllerRef.current.signal, {id: editedTract.id, destination_id: destinationTract.id});
            setTracts(tracts.filter(tract => editedTract.id !== tract.id));
            setTotalItemsCount(tracts.length - 1);
            setEditedTract(null);
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

    const handleChangeStatus = tract => {
        if(!user.hasAuth(210)){
            toast.info('Account not authorized');
            return;
        }
        if(tract.status){
            setConfirmDialogEvtName('remove');
            setDisplayMsg(`Delete ${tract.name} from active list?`);
            setShowConfirmModal(true);
            setEditedTract(tract);
        }else {
            setConfirmDialogEvtName('restore');
            setDisplayMsg(`Restore ${tract.name} from list of inactive department?`);
            setShowConfirmModal(true);
            setEditedTract(tract);
        }
    };

    const updateTract = async () => {
        if(!user.hasAuth(211)){
            toast.info('Account not authorized');
            return;
        }
        try {
            setNetworkRequest(true);
            resetAbortController();
            await rename(controllerRef.current.signal, {id: editedTract.id, name: editedTract.name});
            setEditedTract(null);
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

    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], tracts);
        nextData.find(item => item.id === id)[key] = value;
        setTracts(nextData);
    };

    const handleEdit = id => {
        const nextData = Object.assign([], tracts);
        const activeItem = nextData.find(item => item.id === id);

        activeItem.mode = activeItem.mode ? null : 'EDIT';

        setTracts(nextData);
    };
  
    const handleSave = async (tract) => {
        setConfirmDialogEvtName('save');
        setDisplayMsg(`Save changes made to ${tract.name}?`);
        setShowConfirmModal(true);
        setEditedTract(tract);
    };

    const handleAddTract = () => {
        if(!user.hasAuth(209)){
            toast.info('Account not authorized');
            return;
        }
        setDisplayMsg('Add New Department');
        setShowInputModal(true);
    }

	const handleCloseModal = () => {
        setShowConfirmModal(false);
        setShowInputModal(false);
		setShowDropDownModal(false);
    };
  
    const handleConfirm = async () => {
        setShowConfirmModal(false);
        switch (confirmDialogEvtName) {
            case "remove":
                setShowDropDownModal(true);
                break;
            case "restore":
                restoreTract();
                break;
            case 'save':
                updateTract();
                break;
        }
    };
	
	const handleInputOK = async (str) => {
        try {
            setNetworkRequest(true);
            resetAbortController();
            const response = await createTract(controllerRef.current.signal, str);
            const t = response.data;
            t.fname = user.firstName;
            setTracts([...tracts, t]);
            setShowInputModal(false);
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

    const resetAbortController = () => {
        // Cancel previous request if it exists
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
    };

    return (
        <section className='container d-flex flex-column gap-4' style={{minHeight: '60vh'}}>
            <Row className='d-flex align-items-center'>
                <div className="d-flex flex-wrap gap-4 align-items-center col-12 col-md-10 mt-4" >
                    <img src={IMAGES.svg_user} alt ="Avatar" className="rounded-circle" width={100} height={100} />
                    <div className="d-flex flex-wrap gap-2 fw-bold h2">
                        <span>{user.firstName}</span>
                        <span> {user.lastName}</span>
                    </div>
                </div>
                <div className=" col-12 col-md-2 mt-4">
                    <Button variant="success fw-bold d-flex gap-3 align-items-center justify-content-center" className="w-100" onClick={handleAddTract}>
                        <IoMdAddCircle size='32px' /> Add
                    </Button>
                </div>
            </Row>
            {/* NOTE: setting z-index of this row because of rsuite table which conflicts the drop down menu of react-select */}
            <Row className="card shadow border-0 rounded-3 z-3">
                <div className="card-body row ms-0 me-0">
                    <div className="d-flex gap-2 align-items-center col-12 col-md-5 mb-3">
                        <img src={IMAGES.tracts} alt ="Avatar" className="rounded-circle" width={50} height={50} />
                        <span className="text-danger fw-bold h2 text-truncate">Product Departments</span>
                    </div>

                    <div className="d-flex flex-column gap-2 align-items-center col-12 col-md-3 mb-3">
                        <span className="align-self-start fw-bold">Search</span>
                        <AsyncSelect
                            className="text-dark w-100"
                            isClearable
                            // getOptionLabel={getOptionLabel}
                            getOptionValue={(option) => option}
                            // defaultValue={initialObject}
                            defaultOptions={tractOptions}
                            cacheOptions
                            loadOptions={asyncTractSearch}
                            onChange={(val) => handleTractChange(val) }
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

            <Table loading={networkRequest} rowKey="id" data={tracts} affixHeader affixHorizontalScrollbar 
                renderLoading={() => <RsuiteTableSkeletonLoader withPlaceholder={true} rows={10} cols={5} />} 
                autoHeight={true} hover={true}>
                    
                {columns.map((column, idx) => {
                    const { key, label, ...rest } = column;
                    if(idx < 1){
                        return (
                            <Column {...rest} key={key}>
                                <HeaderCell>{label}</HeaderCell>
                                <EditableCell
                                    fullText
                                    dataKey={key}
                                    dataType="string"
                                    onChange={handleChange}
                                    onEdit={handleEdit}
                                    style={{ padding: 6 }}
                                />
                            </Column>
                        )
                    }
                    return (
                        <Column {...rest} key={key} fullText>
                            <HeaderCell>{label}</HeaderCell>
                            <Cell dataKey={key} style={{ padding: 6 }} />
                        </Column>
                    );
                })}
                <Column width={150} >
                    <HeaderCell>Actions...</HeaderCell>
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
            <InputDialog
                show={showInputModal}
                handleClose={handleCloseModal}
                handleConfirm={handleInputOK}
                message={displayMsg}
                networkRequest={networkRequest}
            />
            <DropDownDialog
                show={showDropDownModal}
                handleClose={handleCloseModal}
                handleConfirm={delTract}
                message={'Select destination Section where items will be moved to'}
                options={tractOptions}
            />
        </section>
    )
}

export default Tract;