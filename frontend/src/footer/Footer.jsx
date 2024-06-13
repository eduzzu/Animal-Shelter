import { Box, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import PetsIcon from '@mui/icons-material/Pets';

const Footer = () => {

    return (
        <Box
            sx={{
                p: "1%",
                mt: "3rem",
                backgroundColor: "#9381ff",
                display: "flex",
                alignItems: "center",
                gap: "20%"

            }}
        >
            <Typography>
                <PetsIcon sx={{
                        fontSize: "30px", 
                        color: "white",
                        cursor: "pointer"
                    
                    }} 
                />
            </Typography>
            <Typography
                sx={{
                    ml: "-5%",
                    color: "white",
                    cursor: "initial"
                }}
            >
            ©2024 FurryFriends.com All trademarks are owned by Furry Friends and must be used with permission.
            </Typography>

            <Typography
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: "1rem",
                    ml: "-4.5%",
                    color: "white",
                    cursor: "pointer"
                }}
            >
            <InstagramIcon />
            <FacebookOutlinedIcon />
            <YouTubeIcon />
            <XIcon />
            </Typography>
            
        </Box>
    )

}

export default Footer;