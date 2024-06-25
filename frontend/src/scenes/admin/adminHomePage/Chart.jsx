import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LineChart } from '@mui/x-charts/LineChart';

const Chart = () => {

    const token = useSelector((state) => state.auth.token);
    const [availablePets, setAvailablePets] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [totalRequests, setTotalRequests] = useState([]);
  
    useEffect(() => {
      const getPets = async () => {
        const response = await fetch(`http://localhost:3001/pets`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const allPetsData = await response.json();
        const availablePetsData = allPetsData.filter((pet) => pet.status === "Available");
        setAvailablePets(availablePetsData);
      }
      getPets();
    }, []);
  
    useEffect(() => {
      const getUsers = async () => {
        const response = await fetch(`http://localhost:3001/users`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const allUsersData = await response.json();
        setAllUsers(allUsersData);
      }
      getUsers();
    }, []);
  
    useEffect(() => {
      const getAdoptionRequests = async () => {
        const response = await fetch(`http://localhost:3001/requests`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
  
        const allAdoptionRequestsData = await response.json();
        setTotalRequests(allAdoptionRequestsData);
      }
      getAdoptionRequests();
    }, []);
  
    
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          sx={{ mt: "3%", border: "1px solid rgb(235, 230, 230)", borderRadius: "10px", backgroundColor: "white", width: "85%", pb: "2%" }}
        >
          <LineChart sx={{ ml: "6%" }}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
              {
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * availablePets.length)).fill(0, 6, 12),
                area: true,
                color: "#9381ff",
  
              },
            ]}
            width={850}
            height={500}
  
          />
          <Typography sx={{ textAlign: "center", fontFamily: "revert" }}>Available Pets in 2024</Typography>
        </Box>
  
        <Box sx={{ mt: "7%", border: "1px solid rgb(235, 230, 230)", borderRadius: "10px", backgroundColor: "white", width: "85%", pb: "2%" }}>
          <LineChart sx={{ ml: "6%" }}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
              {
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * totalRequests.length) + 1).fill(0, 6, 12),
                area: true,
                color: "#ffc300"
              },
            ]}
            width={850}
            height={300}
          />
          <Typography sx={{ textAlign: "center", fontFamily: "revert" }}>Adoption Requests in 2024</Typography>
        </Box>
  
        <Box sx={{ mt: "7%", border: "1px solid rgb(235, 230, 230)", borderRadius: "10px", backgroundColor: "white", width: "85%", pb: "2%" }}>
          <LineChart sx={{ ml: "6%" }}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
              {
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * allUsers.length) + 1).sort((a,b) => a-b).fill(0, 6, 12),
                area: true,
                color: "#fb6f92"
              },
            ]}
            width={850}
            height={400}
          />
          <Typography sx={{ textAlign: "center", fontFamily: "revert" }}>Users Enrolled in 2024</Typography>
        </Box>
      </Box>
    );
  }

  export default Chart;