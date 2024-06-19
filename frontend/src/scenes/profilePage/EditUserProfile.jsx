import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdvertsWidget from "../../widgets/AdvertsWidget";
import Footer from "../footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import editAccBGIMG from "../../public/assets/editAccBGIMG.png"
import Navbar from "../navbar/Navbar";

const EditUserProfile = () => {

    const token = useSelector((state) => state.auth.token)
    const { id } = useParams();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const editUserAccount = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                setFullName(data.fullName);
                setLocation(data.location);
                setEmail(data.email);
                setPassword(data.password);
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error("Cannot fetch the user data.", error);
            }
        };

        editUserAccount();
    }, [id, token]);

    const handleEditUserProfile = (e) => {
        e.preventDefault();
        const updatedUser = { fullName, location, email, password, isAdmin };

        fetch(`http://localhost:3001/users/${id}/edit`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser),
        },)
            .then(response => response.json())
            .then(navigate(`/users/${id}`))
            .catch(error => {
                console.error('Eroare la actualizarea profilului utilizatorului:', error);
            })
    }

    return (
        <Box
            sx={{
                backgroundImage: `url(${editAccBGIMG})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >   <Navbar />
            <Box
                sx={{
                    height: "100%",
                    width: "45%",
                    margin: "5% 1% 5% 3%",
                    pb: "1.5%",
                    border: "1px solid rgb(235, 230, 230)",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-disabled fieldset': {
                            borderColor: 'white',
                        },
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'white',
                            WebkitTextFillColor: 'white',
                        },
                        '& .MuiOutlinedInput-root.Mui-disabled': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                        }
                    }
                }}
            >
                <Typography
                    sx={{
                        m: "4% 0 5% 3%",
                        fontFamily: "revert",
                        fontSize: "22px",
                        color: "white"
                    }}
                >Edit your account details:
                </Typography>

                <form style={{ color: "white" }} onSubmit={handleEditUserProfile} >
                    <Typography sx={{ ml: "3%" }}>Full Name:</Typography>
                    <TextField
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        sx={{
                            width: "55%",
                            ml: "3%",
                            mb: "2%",
                        }}
                    />

                    <Typography sx={{ ml: "3%" }}>Location:</Typography>
                    <TextField
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{
                            width: "55%",
                            ml: "3%",
                            mb: 2
                        }}
                    />

                    <Typography sx={{ ml: "3%" }}>Email:</Typography>
                    <TextField
                        type="email"

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            width: "55%",
                            ml: "3%",
                            mb: 2,

                        }}
                    />

                    <Typography sx={{ ml: "3%" }}>Password:</Typography>
                    <TextField
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            width: "55%",
                            ml: "3%",
                            mb: 2,

                        }}
                    />

                    <Typography sx={{ ml: "3%" }}>isAdmin:</Typography>
                    <TextField
                        type="text"
                        value={isAdmin}
                        disabled
                        sx={{
                            width: "55%",
                            ml: "3%",
                            mb: 2
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="warning"
                        sx={{ ml: "-55%", mt: "11.5%" }}
                    >Save Changes
                    </Button>
                </form>

            </Box>
            <AdvertsWidget />
            <Footer />
        </Box>
    )

}

export default EditUserProfile;