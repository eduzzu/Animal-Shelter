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
                onClick={() => navigate("/home")}


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
                >
                    Adopt
                </Button>

                <Button
                    sx={{
                        color: "white"
                    }}
                >
                    Dogs
                </Button>

                <Button
                    sx={{
                        color: "white"
                    }}
                >
                    Cats
                </Button>

                <Button
                    sx={{
                        color: "white"
                    }}
                >
                    Hamsters
                </Button>

                <Button
                    sx={{

                        color: "white"

                    }}
                >
                    Parrots
                </Button>

            </Box>
                <Select
                    value={fullName}
                    sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 0.2rem",
                        ml: "9rem"

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