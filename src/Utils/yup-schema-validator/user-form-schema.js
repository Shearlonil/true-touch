import * as yup from "yup";

let email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const reg_schema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    pw: yup.string().min(6, "Password must be at least 6 characters").required(),
    confirm_pw: yup.string().oneOf([yup.ref("pw"), null], "Passwords must match").required("Confirm Password is required"),
	accept: yup.boolean().required('You must accept Terms And Policy to continue'),
    // otp sent to mail for registration
    otp: yup.string().required('otp is required for email verfication'),
});

export const login_schema = yup.object().shape({
    email: yup
        .string()
        .email("A valid email format is required")
        .required("Email is required"),
    pw: yup
        .string()
        // .min(6, "Password must be a min of 6 characters!")
        .required("Password is requird"),
});

export const personal_info_schema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    dob: yup.date().required("date of birth is required"),
    sex: yup.object().typeError("Select gender from the list").required("Select gender from the list"),
});

export const pw_schema = yup.object().shape({
    current_pw: yup.string().required("Current password is required"),
    pw: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_pw: yup.string().oneOf([yup.ref("pw"), null], "Passwords must match").required("Password needs confirmation"),
});

export const otp_schema = yup.object().shape({
    otp: yup.string().required('otp is required for email verfication'),
});

export const emailSchema = yup.string().matches(email_regx, 'A valid email format example@mail.com is required');