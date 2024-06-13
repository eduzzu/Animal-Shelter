import { useDispatch, useSelector } from "react-redux";
import PetWidget from "./PetWidget";
import {setPets} from "../state/petsSlice.js"
import { useEffect } from "react";
import { Box } from "@mui/material";

const PetsWidget = () => {
    const pets = useSelector((state) => state.pets.pets);
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch();

    const getPets = async() => {
        const response = await fetch(`http://localhost:3001/pets`, {
            method: "GET",
            headers: {Authorization:`Bearer ${token}`},
        });
        const data = await response.json();
        const shuffledPets = data.sort(() => 0.5 - Math.random());
        const selectedPets = shuffledPets.slice(0,4);
        dispatch(setPets({pets: selectedPets}))
  
        console.log(pets)
    };

    useEffect(() => {
        getPets();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4%",
                justifyContent: "center",
                m: "5% 7%",
            }}
        >
        {
             pets.map(
                ({
                    _id,
                    picturePath,
                    name,
                    age,
                    category,
                    breed
                    
                }) => {
                    return (
                        <PetWidget
                            key={_id}
                            petId={_id}
                            picturePath={picturePath}
                            name={name}
                            age={age}
                            category={category}
                            breed={breed}
                        />
                    )

                }
            )
        }
           
        </Box>
    )
}



export default PetsWidget;