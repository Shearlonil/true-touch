import { useState } from 'react'
import {
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

import ErrorMessage from '../../../components/ErrorMessage';
import handleErrMsg from '../../../Utils/error-handler';
import { useAuth } from '../../../app-context/auth-context';
import cryptoHelper from '../../../Utils/crypto-helper';
import { ThreeDotLoading } from '../../../components/react-loading-indicators/Indicator';
import { login_schema } from '../../../Utils/yup-schema-validator/user-form-schema';

const Login = () => {
    const navigate = useNavigate();

    const { clientLogin } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

	const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Yup Integration with "react-hook-form"
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(login_schema),
    });

    const onSubmit = async (data) => {
        try {
            setIsLoggingIn(true);
            const pw = cryptoHelper.encrypt(data.pw);
            data.pw = pw;
            await clientLogin(data);
            setIsLoggingIn(false);
            navigate("/dashboard");
        } catch (ex) {
            setIsLoggingIn(false);
            toast.error(handleErrMsg(ex).msg);
        }
    };

    return (
        <div className="card border-0 shadow-lg h-100">
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Welcome Back</h2>
                    <p className="text-muted">
                        Sign in to your Truetouch account
                    </p>
                </div>

                <Form>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Email Address</label>
                        <div className="input-group mb-1">
                            <span className="input-group-text bg-light">
                                <RiMailLine size={18} />
                            </span>
                            <input 
                                type="email" 
                                className="form-control"  
                                placeholder="Enter your email"
                                {...register("email")}
                            />
                        </div>
                        <ErrorMessage source={errors.email} />
                    </div>

                    <div className="mb-4">
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

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <a className="text-primary text-decoration-none small" >
                            Forgot Password?
                        </a>
                    </div>

                    <Button type="submit" className="btn custom-btn w-100 mb-3" onClick={handleSubmit(onSubmit)} disabled={isLoggingIn}>
                        { isLoggingIn && <ThreeDotLoading color="#fbfafaff" size="medium" textColor="#f78419" /> }
                        {!isLoggingIn && `Sign In` }
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;