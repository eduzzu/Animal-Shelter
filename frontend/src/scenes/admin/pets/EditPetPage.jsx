import { Box, Typography } from "@mui/material";
import EditPetForm from "./EditPetForm";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

const EditPetPage = () => {

    return (
        <Box>
            <Navbar />
          <Box
            width="100%"
            backgroundColor={"white"}
            p="0 6%"
            textAlign="center"
          >
            
          </Box>
    
          <Box
            width={"50%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={"white"}
          ><Typography
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "revert",
                fontSize: "22px",
                mb: "3%",
                color: "#9381ff"
            }}
          >Edit Pet Info</Typography>
            <EditPetForm />
          </Box>
        <Footer />
        </Box>
      );
    

}

export default EditPetPage;