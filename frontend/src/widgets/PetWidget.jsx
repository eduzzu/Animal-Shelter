import { 
    Box, 
    Card, 
    CardActionArea, 
    CardMedia, 
    CardContent, 
    Typography, 
} from "@mui/material";

const PetWidget = ({
    picturePath,
    name,
    breed

}) => {

    return (
        <Box>
            
                <Card sx={{
                    width: "15rem",
                    height: "23rem",
                    display: "flex",
                    borderRadius: "10px",
                    textAlign: "center",
                    mb: "1rem"
                }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="275"
                            image={`http://localhost:3001/assets/${picturePath}`}
                            alt={`${name} photo`}
                            sx={{
                                borderBottomLeftRadius: "999px",
                                borderBottomRightRadius: "999px",

                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" sx={{
                                color: "#9381ff",
                                textShadow: "2px 2px 4px #9381ff "
                            }}>
                                {name}
                            </Typography>
                            <Typography sx={{
                                color: "gray",
                                fontWeight: "bold",
                                textShadow: "2px 2px 4px gray"
                            }}  >
                                {breed}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            
        </Box>
    )
}

export default PetWidget;