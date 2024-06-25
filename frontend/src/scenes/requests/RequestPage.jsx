import { Box, Typography, Button, FormHelperText } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { setRequestStatus } from "../../state/requestsSlice";
import requestsBG from "../../public/assets/requestsBG.jpg";

const RequestPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getAdoptionRequest = async () => {
            try {
                const response = await fetch(`http://localhost:3001/requests/${id}/adoption`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                const data = await response.json();
                setRequest(data);
            } catch (error) {
                console.error("Cannot extract request data.", error);
            }
        };
        getAdoptionRequest();
    }, []);

    if (!request) return null;

    const handleAcceptRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3001/requests/${id}/adoption`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Accepted" }),
            });
            const data = await response.json();
            dispatch(setRequestStatus({ requestId: id, newStatus: "Accepted" }));
            navigate("/requests");
        } catch (error) {
            console.error("Cannot update request status.", error);
        }
    };

    const handleDeclineRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3001/requests/${id}/adoption`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Denied" }),
            });
            const data = await response.json();
            dispatch(setRequestStatus({ requestId: id, newStatus: "Denied" }));
            navigate("/requests");
        } catch (error) {
            console.error("Cannot update request status.", error);
        }
    };

    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                    backgroundImage: `url(${requestsBG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    p: "2%",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "#9381ff",
                        mb: "2%",
                        ml: "3%"
                    }}
                >
                    {request.firstName} {request.lastName}'s request:
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gap: "20px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(3, 1fr))",
                        gridTemplateRows: "repeat(3, auto)",
                        width: "100%",
                        maxWidth: "50%",
                        border: "1px solid rgb(235, 230, 230)",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        p: "2%",
                        opacity: "0.7",
                        ml: "3%"
                    }}
                >
                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>First Name</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.firstName}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Last Name</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.lastName}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Age</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.age}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Pet Name</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.petName}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Pet Breed</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.petBreed}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Pet Category</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.petCategory}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Location</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.location}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Occupation</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.occupation}</Typography>
                    </Box>

                    <Box>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Phone Number</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.phoneNumber}</Typography>
                    </Box>

                    <Box sx={{ gridColumn: "span 3" }}>
                        <FormHelperText style={{ color: "#9381ff", fontFamily: "revert" }}>Message</FormHelperText>
                        <Typography sx={{ fontFamily: "revert" }}>{request.message}</Typography>
                    </Box>

                    {user.isAdmin && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: "2%",
                                gridColumn: "span 3",
                            }}
                        >
                            <Button
                                onClick={handleAcceptRequest}
                                sx={{
                                    p: "1% 2.5%",
                                    color: "#9381ff",
                                    backgroundColor: "transparent",
                                    border: "1px solid #00e676",
                                    "&:hover": {
                                        backgroundColor: "#00e676",
                                        color: "white",
                                    },
                                }}
                            >
                                <CheckIcon style={{ color: "#00e676", marginRight: "5%" }} /> Accept
                            </Button>
                            <Button
                                onClick={handleDeclineRequest}
                                sx={{
                                    p: "1% 2.5%",
                                    color: "#9381ff",
                                    backgroundColor: "transparent",
                                    border: "1px solid #ff1744",
                                    "&:hover": {
                                        backgroundColor: "#ff1744",
                                        color: "white",
                                    },
                                }}
                            >
                                <ClearIcon style={{ color: "#ff1744", marginRight: "5%" }} /> Decline
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default RequestPage;
