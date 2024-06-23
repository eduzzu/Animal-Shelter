import { Box, Typography, Card, CardContent, List, ListItem } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SeeAllUsers = () => {

    const token = useSelector((state) => state.auth.token);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Cannot fetch the data.", error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    if (!users) return null;


    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                     mt : "3%", display: "flex", justifyContent: "center"
                }}
            >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={users}
                    sx={{ width: "30%" }}
                    getOptionLabel={(option) => option.fullName}
                    renderOption={(props, option) => (
                        <li {...props} key={option._id}>
                            {option.fullName} ({option.email})
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Users" />}
                    onChange={(event, newValue) => {
                        setSelectedUser(newValue);
                    }}
                />
            </Box>
            <Typography
                sx={{
                    mt: "3%",
                    ml: "8%",
                    fontSize: "32px",
                    fontFamily: "revert"
                }}
            > 
                All Users:</Typography> 
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",  
                    gap: "4%",
                    justifyContent: "center",
                    m: "1% 7% 3% 7%",
                    textDecoration: "none"
                }}
            >
                <List>
                    {selectedUser ? navigate(`/users/${selectedUser._id}`) : users.map((user) => (
                        <ListItem key={user._id}>
                            <Card
                                sx={{
                                    width: "100%",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                    height: "5%",
                                    backgroundColor: "#white"
                                }}
                                onClick={() => navigate(`/users/${user._id}`)}
                            >
                                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography
                                        component="div"
                                        sx={{ color: "#9381ff", fontSize: "22px", display: "flex", alignItems: "center" }}
                                    >
                                        {user.fullName}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        style={{ textShadow: "2px 2px 10px #fb8500", color: "#fb8500", fontSize: "22px" }}
                                        sx={{ display: "flex", justifyContent: "center" }}
                                    >
                                        {user.email}
                                    </Typography>
                                    <Typography color="text.secondary" style={{ color: "#ff006e", fontSize: "16px" }}>
                                        Online: {Math.floor(Math.random() * 500) + 1} hours ago.
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
export default SeeAllUsers;