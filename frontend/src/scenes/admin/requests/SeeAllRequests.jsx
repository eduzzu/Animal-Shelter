import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, List, ListItem, Card, CardContent } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { setRequests } from "../../../state/requestsSlice";
import adminSeeAllAdoptions from "../../../public/assets/adminSeeAllAdoptions.jpg";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

const SeeAllRequests = () => {

    const token = useSelector((state) => state.auth.token);
    const requests = useSelector((state) => state.requests.requests);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAdoptionRequests = async () => {
        try {
            const response = await fetch("http://localhost:3001/requests", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            dispatch(setRequests({requests: data}))
        } catch (error) {
            console.error("Cannot fetch the data.", error);
        }
    }

    useEffect(() => {
        getAdoptionRequests();
    }, []);

    if (!requests) return null;


    return (
        <Box
            sx={{
                backgroundImage: `url(${adminSeeAllAdoptions})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <Navbar />
            <Box
                sx={{
                     mt : "3%", display: "flex", justifyContent: "center"
                }}
            >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={requests}
                    sx={{ width: "30%" }}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    renderOption={(props, option) => (
                        <li {...props} key={option._id}>
                            {option.firstName} {option.lastName} ({option.petName}, {option.petBreed})
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Adoption Requests" />}
                    onChange={(event, newValue) => {
                        setSelectedRequest(newValue);
                    }}
                />
            </Box>
            <Typography
                sx={{
                    mt: "3%",
                    ml: "13%",
                    fontSize: "32px",
                    fontFamily: "revert"
                }}
            >All Adoption Requests:</Typography> 
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column-reverse",  
                    gap: "4%",
                    justifyContent: "center",
                    m: "3% 7%",
                    textDecoration: "none"

                }}
            > <List>
            {selectedRequest ? navigate(`/requests/${selectedRequest._id}/adoption`) : requests.map((request) => (
                <ListItem key={request.id}>
                    <Card
                        onClick={() => navigate(`/requests/${request._id}/adoption`)}
                        sx={{
                            width: "40%",
                            borderRadius: "20px",
                            cursor: "pointer",
                            height: "8.5%",
                            backgroundColor: "#e5e5e5"
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="div"
                                style={{ textShadow: "2px 2px 10px #ffafcc", color: "#ffafcc", fontSize: "26px" }}
                            >{request.petName}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{ textShadow: "2px 2px 10px #fb8500", color: "#fb8500", fontSize: "22px" }}
                                sx={{ mt: "1%" }}
                            >{request.petBreed}, {request.petCategory}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ textShadow: "2px 2px 10px #a2d2ff", color: "#a2d2ff", fontSize: "16px" }} sx={{ mt: "1%" }}>
                                {request.status}
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem>

            )).sort().reverse()}

        </List>
            </Box>
            <Footer />

        </Box>
    )

}

export default SeeAllRequests;