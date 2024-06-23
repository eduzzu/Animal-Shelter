import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { setPets } from "../../../state/petsSlice";
import PetWidget from "../../../widgets/PetWidget";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

const SeeAllPets = () => {

    const token = useSelector((state) => state.auth.token);
    const pets = useSelector((state) => state.pets.pets);
    const [selectedPet, setSelectedPet] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getPets = async () => {
        try {
            const response = await fetch("http://localhost:3001/pets", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            dispatch(setPets({pets: data}))
        } catch (error) {
            console.error("Cannot fetch the data.", error);
        }
    }

    useEffect(() => {
        getPets();
    }, []);

    if (!pets) return null;


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
                    options={pets}
                    sx={{ width: "30%" }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <li {...props} key={option._id}>
                            {option.name} ({option.category}, {option.breed})
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Pets" />}
                    onChange={(event, newValue) => {
                        setSelectedPet(newValue);
                    }}
                />
            </Box>
            <Typography
                sx={{
                    mt: "3%",
                    ml: "13%",
                    fontSize: "32px",
                    fontFamily: "revert"
                }}
            >All Pets:</Typography> 
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4%",
                    justifyContent: "center",
                    m: "3% 7%",
                    textDecoration: "none"

                }}
            >
            {
               selectedPet ? navigate(`/pets/${selectedPet._id}`) : pets.map(
                   ({
                       _id,
                       picturePath,
                       name,
                       age,
                       category,
                       breed
                       
                   }) => {
                       
                       return (
                           <a href={`pets/${_id}`} style={{textDecoration: "none"}}>
                               <PetWidget
                                   key={_id}
                                   petId={_id}
                                   picturePath={picturePath}
                                   name={name}
                                   age={age}
                                   category={category}
                                   breed={breed}
                               />
                               
                           </a>
                           
                       )
   
                   }
               )
           }
            </Box>
            <Footer />

        </Box>
    )

}

export default SeeAllPets;