import { Box, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar"
import PetsWidget from "../../widgets/PetsWidget";
import AdvertsWidget from "../../widgets/AdvertsWidget";
import homePagePoster from "../../public/assets/homePagePoster.jpg";
import { Button } from "@mui/material";
import ChecklistIcon from '@mui/icons-material/Checklist';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import QuizIcon from '@mui/icons-material/Quiz';
import Footer from "../../footer/Footer";

const HomePage = () => {
    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    overflow: "hidden",
                }}
            >
                <img
                    src={homePagePoster}
                    alt="Home Page Poster"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "rgba(0, 0, 0, 1)"
                    }}
                />

                <Typography
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "49%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        padding: "10px",
                        fontWeight: "bold",
                        fontSize: "50px",
                        textAlign: "center",
                        textShadow: "2px 2px 4px #000",
                    }}
                >
                    Find your new best buddy!
                </Typography>

                <Typography
                    sx={{
                        position: "absolute",
                        top: "82%",
                        left: "47%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        padding: "10px",
                        fontWeight: "bold",
                        fontSize: "32px",
                        textAlign: "center",
                        textShadow: "2px 2px 4px #000",
                    }}
                >
                    Choose from 10000+ pets available in our shelter!
                </Typography>
            </Box>

            <AdvertsWidget />
            <PetsWidget />
            <Box
                sx={{
                    textAlign: 'center',
                    p: 5,
                    borderTop: "1px solid rgb(235, 230, 230);",
                    borderBottom: "1px solid rgb(235, 230, 230); ",
                    backgroundColor: "white"

                }}>
                <Typography variant="h4" gutterBottom color="grey">
                    NOT SURE IF YOU ARE READY TO ADOPT?
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mt: "5%"
                    }}>
                    <Box
                        sx={{ width: '30%', cursor: "pointer" }}>
                        <Box sx={{ mb: 2 }}>
                            <ChecklistIcon sx={{fontSize: 60}} />
                        </Box>
                        <Typography variant="h6" mb="5%" gutterBottom color="#9381ff">
                            CHECKLIST FOR STARTERS
                        </Typography>
                        <Typography gutterBottom color="grey">
                            Make the adoption transition as smooth as possible.
                        </Typography>
                        <Button 
                            sx={{
                                 mt: 2 ,
                                 borderRadius: "10px",
                                 color: "#9381ff",
                                 "&:hover": {backgroundColor: "#9381ff", color: "white"}
                                }}>
                            LEARN MORE
                        </Button>
                    </Box>
                    <Box sx={{ width: '30%', cursor: "pointer" }}>
                        <Box sx={{ mb: 2 }}>
                            <SanitizerIcon sx={{fontSize: 60}} />
                        </Box>
                        <Typography variant="h6" mb="5%" gutterBottom color="#9381ff">
                            PETS HEALTH RESOURCES
                        </Typography>
                        <Typography gutterBottom color="grey">
                            Find out the pets health needs
                        </Typography>
                        <Button sx={{
                                 mt: 2 ,
                                 borderRadius: "10px",
                                 color: "#9381ff",
                                 "&:hover": {backgroundColor: "#9381ff", color: "white"}
                                }}>
                            LEARN MORE
                        </Button>
                    </Box>
                    <Box sx={{ width: '30%', cursor: "pointer" }}>
                        <Box sx={{ mb: 2 }}>
                            <QuizIcon sx={{fontSize: 60}} />
                        </Box>
                        <Typography variant="h6" mb="5%" color="#9381ff">
                            PET ADOPTION FAQS
                        </Typography>
                        <Typography gutterBottom color="grey">
                            Get answers to all the questions you have for your adoption
                        </Typography>
                        <Button sx={{
                                 mt: 2 ,
                                 borderRadius: "10px",
                                 color: "#9381ff",
                                 "&:hover": {backgroundColor: "#9381ff", color: "white"}
                                }}>
                            LEARN MORE
                        </Button>
                    </Box>
                </Box>
            </Box>

            <AdvertsWidget />
            <Footer />

        </Box>


    )
}

export default HomePage;