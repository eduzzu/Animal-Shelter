import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Typography,
    Select,
    InputBase,
    MenuItem

} from "@mui/material";
import { setLogout } from "../../state/authSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const fullName = user.fullName;

    return (
        <Box
            height="4.5rem"
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="2rem"

            sx={{
                backgroundColor: "#9381ff",
                "&:hover": { cursor: "pointer" }
            }}
        >

            <Typography
                fontFamily="Pacifico" cursive="true"
                fontSize="2rem"
                color="white"
                ml="4rem"
                onClick={() => user.isAdmin === true ? navigate("/home/admin") : navigate("/home")}
            >
                Furry Friends
            </Typography>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="50%"
                gap="3rem"
                ml="6rem"
            >
                <Button
                    sx={{
                        color: "white"
                    }}
                    onClick={() => user.isAdmin === true ? navigate("/home/admin") : navigate("/home")}
                >
                    Home
                </Button>

                <Button
                    sx={{
                        color: "white"
                    }}
                    onClick={() => navigate("/pets/dogs")}
                >
                    Dogs
                </Button>

                <Button
                    sx={{
                        color: "white"
                    }}
                    onClick={() => navigate("/pets/cats")}
                    
                >
                    Cats
                </Button>

                <Button
                    sx={{
                        color: "white"
                    }}
                    onClick={() => navigate("/pets/hamsters")}
                >
                    Hamsters
                </Button>

                <Button
                    sx={{

                        color: "white"

                    }}
                    onClick={() => navigate("/pets/parrots")}
                >
                    Parrots
                </Button>

            </Box>
                <Select
                    value={fullName}
                    onClick={() => navigate(`/users/${user._id}`)}
                    sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        flexGrow: 0.1,
                        borderRadius: "0.25rem",
                        p: "0.25rem 0.2rem",
                        ml: "9%"

                    }}
                    input={<InputBase />}
                >
                    <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                </Select>
            </Box>

    )
}

export default Navbar;