import { Box, Typography, } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import Chart from "./Chart";
import StatusCard from "./StatusCard";
import Menu from "./Menu"

const AdminHomePage = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "2rem",
          m: "2rem 4rem",
        }}
      >
        <Menu />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            ml: "2%",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "revert", ml: "8%", mb: "2%" }}>
            All-Time Stats
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <StatusCard number={204} text="Pets Adopted in 2023" />
            <StatusCard number={312} text="Adoption Requests in 2023" />
            <StatusCard number={127} text="Users Enrolled in 2023" />
            <StatusCard number={523} text="Rescued Pets in 2023" />
          </Box>
          <Chart />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};



 




export default AdminHomePage;
