import { useState } from "react"
import {
    Button,
    TextField,
    Typography,
    Box
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/authSlice";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    location: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const initialValuesRegister = {
    fullName: "",
    location: "",
    email: "",
    password: "",
    
};

const initialValuesLogin = {
    email: "",
    password: ""
};


const Form = () => {

    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
    
        const savedUserResponse = await fetch(
          "http://localhost:3001/auth/register",
          {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
    
        if (savedUser) {
          setPageType("login");
        }
      };

      const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        
        const loggedIn = await loggedInResponse.json();
        console.log(loggedInResponse, loggedIn)
        onSubmitProps.resetForm();

        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );

          if (loggedIn.user.isAdmin) {
            navigate('/home/admin');
        } else {
            navigate('/home');
        }
        }
      };
    
      const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
      };

    return (
    
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
            }) => (
                

                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                        
                    >
                        {isRegister && (
                           
                            <>
                                <TextField
                                    label="Full Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullName}
                                    name="fullName"
                                    error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                                    helperText={touched.fullName && errors.fullName}
                                />

                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={
                                        Boolean(touched.location) && Boolean(errors.location)
                                    }
                                    helperText={touched.location && errors.location}
                                />
                            </>
                            
                        )}

                        <TextField
                           label="Email"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           value={values.email}
                           name="email"
                           error={Boolean(touched.email) && Boolean(errors.email)}
                           helperText={touched.email && errors.email}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                color: "#9381ff",
                                border: "1px solid #9381ff",
                                "&:hover": { cursor: "pointer", color: "white", backgroundColor:"#9381ff" }
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                 color:"#9381ff",
                                "&:hover": { cursor: "pointer" }
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Register here."
                                : "Already have an account? Login here."
                            }
                        </Typography>
                    </Box>
                </form>
    )}
        </Formik>
        
    )
}

export default Form;