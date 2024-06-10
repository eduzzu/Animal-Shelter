import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pets: [],
};

export const petsSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload.pets;
        },

        addPet: (state, action) => {
            state.pets.push(action.payload.pet);
        },
        removePet: (state, action) => {
            state.pets = state.pets.filter(pet => pet.id !== action.payload.petId);
        },
        updatePet: (state, action) => {
            state.pets = state.pets.map(pet => {
                if(pet.id === action.payload.pet.id){
                    return action.payload.pet;
                }
                return pet;
            })
        },
        updatePetStatus: (state, action) => {
            const {petId, newStatus} = action.payload;
            const petToUpdate = state.pets.find(pet => pet.id === petId);
            if(petToUpdate){
                petToUpdate.status = newStatus;
            } else {
                console.error(`Pet with id ${id} not found.`);
            }
        }
    }
});

export const {setPets, addPet, removePet, updatePet} = petsSlice.actions;
export default petsSlice.reducer;