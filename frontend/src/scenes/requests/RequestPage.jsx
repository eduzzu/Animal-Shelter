import { Box, Typography, Button, FormHelperText } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { setRequestStatus } from "../../state/requestsSlice";


const RequestPage = () => {

    const {requestId} = useParams();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getAdoptionRequest = async () => {

            try {
                const response = await fetch(`http://localhost:3001/requests/${requestId}/adoption`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                const data = await response.json();
                console.log(data)
                setRequest(data);
            } catch (error) {
                console.error("Cannot extract request data.", error);
            }
        }
        getAdoptionRequest();
    }, []);

    if(!request) return null;
    console.log(request)

    const handleAcceptRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3001/requests/${requestId}/adoption`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Accepted" }),
            });
            const data = await response.json();
            console.log(data);
            dispatch(setRequestStatus({ requestId, newStatus: "Accepted" }));
            navigate("/requests")
        } catch (error) {
            console.error("Cannot update request status.", error);
        }
    };

    const handleDeclineRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3001/requests/${requestId}/adoption`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Denied" }),
            });
            const data = await response.json();
            console.log(data); 
            dispatch(setRequestStatus({ requestId, newStatus: "Denied" }));
            navigate("/requests")
        } catch (error) {
            console.error("Cannot update request status.", error);
        }
    };
    return (
        <Box >
            <Navbar />
            <Typography sx={{
                display: "flex",
                ml: "28%",
                mt: "3%",
                fontSize: "25px",
                fontFamily: "revert"
            }}>{request.firstName} {request.lastName}'s request:</Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box
                sx={{
                    display: "grid",
                    gap: "30px",
                    p: "3%",
                    gridTemplateColumns:"repeat(3,  2fr)",
                    mb: "5%",
                    mt: "2%",
                    border: "1px solid rgb(235, 230, 230)",
                    borderRadius: "10px",
                    backgroundColor: "white"
                }}
            >
                <Box sx={{gridColumn: "span 1"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>First Name</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.firstName}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 2"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Last Name</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.lastName}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 1"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Pet Name</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.petName}</Typography>
                </Box>
                <Box sx={{gridColumn: "span 1"}}>
                <FormHelperText>Pet Breed</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.petBreed}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 1"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Pet Category</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.petCategory}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 1"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Age</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.age}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 1"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Location</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.location}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 1", width: "150%"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Occupation</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.occupation}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 3"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Phone Number</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.phoneNumber}</Typography>
                </Box>

                <Box sx={{gridColumn: "span 3"}}>
                <FormHelperText style={{color: "#9381ff", fontFamily: "revert"}}>Message</FormHelperText>
                <Typography sx={{fontFamily: "revert"}}>{request.message}</Typography>
                </Box>

                {user.isAdmin ? (
                    <Box 
                        sx={{
                            display: "flex",
                            gap: "30%"
                        }}
                    >
                    <Button
                          onClick={handleAcceptRequest}
                        sx={{
                            p: "1% 25%",
                            color: "#9381ff"
                        }}
                            ><CheckIcon style={{color: "green"}}></CheckIcon>Accept</Button>
                    <Button
                     sx={{
                        p: "1% 25%",
                        color: "#9381ff" 
                    }}
                    onClick={handleDeclineRequest }
                    > 
                        
                        <ClearIcon style={{color: "red"}}></ClearIcon>Decline</Button>
                    </Box>
                ) : (
                    undefined
                )}
                

            </Box>
            </Box>
    <Footer />
    </Box>
    )
    

}

export default RequestPage;