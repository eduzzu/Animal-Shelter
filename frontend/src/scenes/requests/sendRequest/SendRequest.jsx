import { Box } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import SendRequestForm from "./SendRequestForm";

const SendRequest = () => {

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
          >
            <SendRequestForm />
          </Box>
        <Footer />
        </Box>
      );

}

export default SendRequest;