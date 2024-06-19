import { Box, Typography} from "@mui/material";
import adsIMG from "../public/assets/adsIMG.png"

const AdvertsWidget = () => {

    return (
        <Box
            sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                mt: "4%",
                mb: "3%"
            }}
        >

            <img
                src={`${adsIMG}`}
                width="70%"
                height="auto"
                alt="ads"
                
            />

        </Box>
    )

}

export default AdvertsWidget;