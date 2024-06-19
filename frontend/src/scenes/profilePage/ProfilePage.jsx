import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import AdvertsWidget from "../../widgets/AdvertsWidget";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const ProfilePage = () => {

    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userAdoptionRequests, setUserAdoptionRequests] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Cannot fetch the user data.", error);
            }
        };

        getUser();
    }, [id, token]);

    useEffect(() => {
        const getUsersAdoptionRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3001/adoptions/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await response.json();
                const dataForProfile = data.slice(-data.length +2);
                setUserAdoptionRequests(dataForProfile);
            } catch (error) {
                console.error("Cannot fetch user's adoption requests data.", error);
            }
        };

        getUsersAdoptionRequests();
    }, [id, token]);

    if (!user) return null;

    const { fullName, location, email, isAdmin } = user;



    return (
        <Box>
            <Navbar />
            <AdvertsWidget />
            <Box
                sx={{display: "flex"}}
            >
                <Box
                    sx={{
                        height: "28rem",
                        width: "45%",
                        margin: "2% 0 1% 5%",
                        border: "1px solid rgb(235, 230, 230)",
                        borderRadius: "10px",
                        backgroundColor: "white",

                    }}
                >
                    <Typography
                        sx={{
                            m: "4% 0 5% 3%",
                            fontFamily: "revert",
                            fontSize: "22px"
                        }}
                    >User Details:
                    </Typography>

                    <Typography
                        sx={{
                            m: "5% 0 3% 3%",
                            fontFamily: "revert",

                        }}
                    >Full name: {fullName}
                    </Typography>

                    <Typography
                        sx={{
                            m: "3% 0 3% 3%",
                            fontFamily: "revert",
                        }}
                    >Email: {email}
                    </Typography>

                    <Typography
                        sx={{
                            m: "3% 0 3% 3%",
                            fontFamily: "revert",
                        }}
                    >City: {location}
                    </Typography>

                    <Typography
                        sx={{
                            m: "3% 0 3% 3%",
                            fontFamily: "revert",
                        }}
                    >Country: {"Romania"}
                    </Typography>

                    <Typography
                        sx={{
                            m: "3% 0 3% 3%",
                            fontFamily: "revert",
                        }}
                    >Admin: {isAdmin ? "TRUE" : "FALSE"}
                    </Typography>

                    <Typography
                        sx={{
                            m: "3% 0 3% 3%",
                            fontFamily: "revert",
                        }}
                    >Total adoption requests: {userAdoptionRequests.length}
                    </Typography>

                    <Typography
                        sx={{
                            m: "3% 0 3% 3%",
                            fontFamily: "revert",
                        }}
                    >Pets Watched: {Math.floor(Math.random() * 100)}
                    </Typography>

                    <Typography
                        sx={{
                            m: "4% 0 3% 3%",
                            fontFamily: "revert",
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "#9381ff"
                        }}
                        onClick={() => navigate(`/users/${id}/edit`) }
                    >Edit Profile
                    </Typography>

                </Box>

                <Box
                    sx={{
                        height: "28rem",
                        width: "45%",
                        margin: "2% 5% 1% 5%",
                        border: "1px solid rgb(235, 230, 230)",
                        borderRadius: "10px",
                        backgroundColor: "white",

                    }}
                >
                    <Typography
                        sx={{
                            m: "4% 0 1% 3%",
                            fontFamily: "revert",
                            fontSize: "22px"
                        }}
                    >User's Adoption Requests:
                    </Typography>

                    <List>
        {userAdoptionRequests.length > 0 ? (userAdoptionRequests.map((adoption) => (
            <ListItem key={adoption.id}>
                <Card
                 sx={{ 
                    width: "100%",
                    borderRadius: "20px",
                    cursor: "pointer",
                    height: "8.5rem"
                    }}
                >
      <CardContent>
        <Typography 
        variant="h5" 
        component="div" 
        style={{textShadow: "2px 2px 10px #ffafcc", color:"#ffafcc", fontSize: "26px"}}
        >{adoption.petName}
        </Typography>
        <Typography 
            variant="body2"
            color="text.secondary" 
            style={{textShadow: "2px 2px 10px #fb8500", color:"#fb8500", fontSize: "22px"}}
            sx={{mt: "1%"}}
            >{adoption.petBreed}, {adoption.petCategory}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{textShadow: "2px 2px 10px #a2d2ff", color:"#a2d2ff", fontSize: "16px"}} sx={{mt: "1%"}}>
         {adoption.status}
        </Typography>
      </CardContent>
    </Card>
            </ListItem>
            
        ))
     ) :(
            <Typography
        sx={{
            width: "100%",
            textAlign: "center",
            m: "19% 0",
            fontSize: "32px",
            color: "#9381ff"
        }}
        >This user has no adoption requests.
        </Typography>
        )}
    </List>
    {userAdoptionRequests.length >=2 ? (
        <Button
        onClick={() => navigate(`/adoptions/${id}`)}
        sx={{
            width: "43%",
            m: "1% 0 1% 3%",
            border: "1px solid #9381ff",
            borderRadius: "10px",
            color: "#9381ff",
            position: "relative",
            "&:hover": {backgroundColor: "#9381ff", color: "white"}
        }}
    >
        See all Adoption Requests
    </Button>
    ) : userAdoptionRequests.length === 1 ? (
        <Button
        onClick={() => navigate(`/adoptions/${id}`)}
        sx={{
            width: "43%",
            m: "23% 0 1% 3%",
            border: "1px solid #9381ff",
            borderRadius: "10px",
            color: "#9381ff",
            position: "relative",
            "&:hover": {backgroundColor: "#9381ff", color: "white"}
            
            
        }}
    >
        See all Adoption Requests
    </Button>
    ) : (
        null
    )}
    
                </Box>
            </Box>
            <AdvertsWidget />
            <Footer />
        </Box>
    )

}
export default ProfilePage;