import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import loginBGIMG from "../../public/assets/loginBGIMG.jpg"

const Login = () => {

    return (

        <Box
            sx={{

                backgroundImage: `url(${loginBGIMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                alignItems: "center"

            }}
        >

            <Box
                width="40%"
                p="2rem"
                m="3rem"
                border="2px solid #9381ff"
                borderRadius="1.5rem"
            >
                <Typography fontWeight="500" variant="h6" sx={{ mb: "1.5rem", color: "#9381ff", textAlign: "center" }}>
                    Welcome to Furry Friends, the place where your next pet friend is!
                </Typography>
                <Form />
            </Box>
        </Box>

    );
}

export default Login;