import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPets } from "../../../state/petsSlice";
import { setRequests } from "../../../state/requestsSlice"
import { useNavigate } from "react-router-dom";

const Menu = () => {

    const [users, setUsers] = useState([]);
    const pets = useSelector((state) => state.pets.pets);
    const requests = useSelector((state) => state.requests.requests);
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`http://localhost:3001/users`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });

            const allUsers = await response.json();
            setUsers(allUsers);
        }
        getUsers();
    }, []);

    useEffect(() => {
        const getRequests = async () => {
            const response = await fetch(`http://localhost:3001/requests`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });

            const allRequests = await response.json();
            dispatch(setRequests({ requests: allRequests }));
        }
        getRequests();
    }, []);

    useEffect(() => {
        const getPets = async () => {
            const response = await fetch(`http://localhost:3001/pets`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });

            const allPets = await response.json();
            dispatch(setPets({ pets: allPets }));
        }
        getPets();
    }, []);


    return (
        <Box
            key={"menu"}
            sx={{
                display: "flex",
                flexDirection: "column",
                p: "1rem 1rem 0 1rem",
                m: "4% 0 0 -3%",
                width: "20%",
                height: "100%",
                border: "1px solid rgb(235, 230, 230) ",
                borderRadius: "10px",
                backgroundColor: "white"
            }}
        >
            <Typography
                sx={{
                    fontFamily: "revert",
                    mb: "10%",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderBottom: "1px solid gray",
                    pb: "5%"
                }}
            >Dashboard
            </Typography>
            <Typography
                sx={{
                    fontFamily: "revert",
                    mb: "10%",
                    cursor: "pointer"
                }}
                onClick={() => navigate("/pets")}
                >See All Pets
            </Typography>
            <Typography
                sx={{
                    fontFamily: "revert",
                    mb: "10%",
                    cursor: "pointer"

                }}
                onClick={() => navigate("/users")}
                >See All Users
            </Typography>
            <Typography
                sx={{
                    fontFamily: "revert",
                    mb: "10%",
                    cursor: "pointer"

                }}
                onClick={() => navigate("/requests")}
                >See All Requests
            </Typography>
            <Typography
                sx={{
                    fontFamily: "revert",
                    mb: "10%",
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/pets/newPet`)}
                >Add New Pet
            </Typography>
            <Typography
                sx={{
                    fontFamily: "revert",
                    mb: "10%",
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/users/${user._id}`)}
                >Profile Information
            </Typography>
        </Box>
    )

}

export default Menu;

