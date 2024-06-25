import { useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Box, Typography, List, ListItem, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import seeAdoptionsBGIMG from "../../public/assets/seeAdoptionsBGIMG.jpg"

const SeeUserAdoptions = () => {

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { id } = useParams();
    const [userAdoptionRequests, setUserAdoptionRequests] = useState([]);

    useEffect(() => {
        const getUsersAdoptionRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3001/requests/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                setUserAdoptionRequests(data);
            } catch (error) {
                console.error("Cannot fetch user's adoption requests data.", error);
            }
        };

        getUsersAdoptionRequests();
    }, []);

    if(!userAdoptionRequests) return null;
    console.log(userAdoptionRequests)
    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                    backgroundImage: `url(${seeAdoptionsBGIMG})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end"
                }}
            >
                

                <Box
                    sx={{
                        height: "auto",
                        width: "45%",
                        margin: "5% 10%",
                        borderRadius: "10px",
                        backgroundColor: "transparent",
                        overflowY: "auto",
                       "&::-webkit-scrollbar": {
                        display: "none",
                        },
                        scrollBarWidth: "none"

                    }}
                >
                    <Typography
                        sx={{
                            m: "4% 0 1% 3%",
                            fontFamily: "revert",
                            fontSize: "22px",
                            color: "#0d1b2a",
                            fontWeight: "bold"
                        }}
                    >User's Adoption Requests:
                    </Typography>

                    <List>
                        {userAdoptionRequests.map((adoption) => (
                            <ListItem key={adoption.id}>
                                <Card
                                onClick={() => navigate(`/requests/${adoption._id}/adoption`)}
                                    sx={{
                                        width: "100%",
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        height: "8.5rem",
                                        backgroundColor: "#f5ebe0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            style={{ textShadow: "2px 2px 10px #ffafcc", color: "#ffafcc", fontSize: "26px" }}
                                        >{adoption.petName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            style={{ textShadow: "2px 2px 10px #fb8500", color: "#fb8500", fontSize: "22px" }}
                                            sx={{ mt: "1%" }}
                                        >{adoption.petBreed}, {adoption.petCategory}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{ textShadow: "2px 2px 10px #a2d2ff", color: "#a2d2ff", fontSize: "16px" }} sx={{ mt: "1%" }}>
                                            {adoption.status}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>

                        )).sort().reverse()}

                    </List>
                </Box>
                
            </Box>
            <Footer />
        </Box>

    )
}
export default SeeUserAdoptions;