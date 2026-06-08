import { useRef, useState } from 'react'
import {
    RiUserLine,
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine,
} from "react-icons/ri";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Button, Form, Nav } from "react-bootstrap";

import ErrorMessage from '../../../components/ErrorMessage';
import { reg_schema, emailSchema } from "../../../Utils/yup-schema-validator/user-form-schema";
import handleErrMsg from '../../../Utils/error-handler';
import { useAuth } from '../../../app-context/auth-context';
import cryptoHelper from '../../../Utils/crypto-helper';
import useGenericController from '../../../api-controllers/generic-controller-hook';
import useUserController from '../../../api-controllers/user-controller-hook';

const Signup = () => {
    const navigate = useNavigate();
    const controllerRef = useRef(new AbortController());
    
    const { clientLogin } = useAuth();
    const { performGetRequests, requestOTP } = useGenericController();
    const { onboard } = useUserController();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [networkRequest, setNetworkRequest] = useState(false);

    const emailRef = useRef();

    // Yup Integration with "react-hook-form"
	const {
		register,
        control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(reg_schema),
		defaultValues: {
			fname: "",
            lname: "",
            email: "",
		},
	});

    const verifyEmail = async () => {
        // validate email
        try {
            setNetworkRequest(true);
            emailSchema.validateSync(emailRef.current.value);
			toast.info(`sending OTP to ${emailRef.current.value}.`);
            resetAbortController();
            await requestOTP(emailRef.current.value, controllerRef.current.signal);
			toast.info(`OTP sent to ${emailRef.current.email}. If not found in your inbox, please check you spam`);
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

    const onSubmit = async (data) => {
        try {
            setNetworkRequest(true);
            const pw = cryptoHelper.encrypt(data.pw);
            data.pw = pw;
            // setNetworkRequest(false);
            navigate("/dashboard");
        } catch (ex) {
            setNetworkRequest(false);
            toast.error(handleErrMsg(ex).msg);
        }
    };

    return (
        <div className="card border-0 h-100">
            <div className="card-body p-4">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Welcome Back</h2>
                    <p className="text-muted">
                        Sign in to your Truetouch account
                    </p>
                </div>

                <Form>
                    <div className="mb-4">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <label className="form-label fw-bold">First Name</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <RiUserLine size={18} />
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        {...register("fname")}
                                    />
                                </div>
                                <ErrorMessage source={errors.fname} />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <label className="form-label fw-bold">Last Name</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <RiUserLine size={18} />
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        {...register("lname")}
                                    />
                                </div>
                                <ErrorMessage source={errors.lname} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <label className="form-label fw-bold">Password</label>
                                <div className="input-group mb-1">
                                    <span className="input-group-text bg-light">
                                        <RiLockLine size={18} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter your password"
                                        {...register("pw")}
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}  >
                                        {showPassword ? (
                                            <RiEyeOffLine size={18} />
                                        ) : (
                                            <RiEyeLine size={18} />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage source={errors.pw} />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <label className="form-label fw-bold">
                                    Confirm Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <RiLockLine size={18} />
                                    </span>
                                    <Form.Control
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        {...register("confirm_pw")}
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword) }>
                                        {showConfirmPassword ? (
                                            <RiEyeOffLine size={18} />
                                        ) : (
                                            <RiEyeLine size={18} />
                                        )}
                                    </button>
                                </div>
                                <ErrorMessage source={errors.confirm_pw} />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column mb-4">
                        <div className="row g-3">
                            <div className="col-md-8">
                                <label className="form-label fw-bold">Email</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <RiMailLine size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="john@example.com"
                                        className="form-control"
                                        ref={emailRef}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-end justify-content-end">
                                <Button type="button" className="btn btn-danger w-100 fw-bold" onClick={() => verifyEmail()}>
                                    {!networkRequest && <span><IoShieldCheckmarkSharp className="me-2" /> Verify</span>}
                                    {networkRequest && <ThreeDotLoading color="#ffffff" size="small" />}
                                </Button>
                            </div>
                        </div>
                        <ErrorMessage source={errors.email} />
                    </div>

                    <div className="mb-3">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">OTP</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">
                                        <RiUserLine size={18} />
                                    </span>
                                    <Form.Control
                                        type="text"
                                        placeholder="enter otp sent to email for verification"
                                        {...register("otp")}
                                    />
                                </div>
                                <ErrorMessage source={errors.otp} />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <label className="form-label fw-bold"></label>
                                <span className="d-flex gap-2 flex-wrap mt-3">
                                    <Controller
                                        name="accept"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Check
                                                type="checkbox"
                                                label="I agree"
                                                className="text-dark"
                                                checked={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.checked);
                                                }}
                                            />
                                        )}
                                    />
                                    <Nav.Link as={NavLink} to="/terms-and-policy" className="d-flex gap-1 fw-bold text-primary">
                                        to terms and policy
                                    </Nav.Link>
                                </span>
                                <ErrorMessage source={errors.accept} />
                            </div>
                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <Button type="submit" className="btn btn-accent w-50 mb-3" onClick={handleSubmit(onSubmit)} disabled={networkRequest}>
                            { networkRequest && <ThreeDotLoading color="#fbfafaff" size="medium" textColor="#f78419" /> }
                            {!networkRequest && `Register` }
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Signup;