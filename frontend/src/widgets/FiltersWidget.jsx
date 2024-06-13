import { 
    Box,
    FormControl, 
    Select ,
    MenuItem,
    FormHelperText
} from "@mui/material";
import React from "react";

const FilterWidget = ({
    category,
    setCategory,
    breed,
    setBreed,
    age,
    setAge,
    gender,
    setGender,
    size,
    setSize
}) => {
   
    return (
        <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <FormHelperText>Category</FormHelperText>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Dogs"}>Dogs</MenuItem>
                    <MenuItem value={"Cats"}>Cats</MenuItem>
                    <MenuItem value={"Hamsters"}>Hamsters</MenuItem>
                    <MenuItem value={"Parrots"}>Parrots</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <FormHelperText>Breed</FormHelperText>
                <Select
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Dogs"}>Dogs</MenuItem>
                    <MenuItem value={"Cats"}>Cats</MenuItem>
                    <MenuItem value={"Hamsters"}>Hamsters</MenuItem>
                    <MenuItem value={"Parrots"}>Parrots</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <FormHelperText>Category</FormHelperText>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Dogs"}>Dogs</MenuItem>
                    <MenuItem value={"Cats"}>Cats</MenuItem>
                    <MenuItem value={"Hamsters"}>Hamsters</MenuItem>
                    <MenuItem value={"Parrots"}>Parrots</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <FormHelperText>Category</FormHelperText>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Dogs"}>Dogs</MenuItem>
                    <MenuItem value={"Cats"}>Cats</MenuItem>
                    <MenuItem value={"Hamsters"}>Hamsters</MenuItem>
                    <MenuItem value={"Parrots"}>Parrots</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <FormHelperText>Category</FormHelperText>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Dogs"}>Dogs</MenuItem>
                    <MenuItem value={"Cats"}>Cats</MenuItem>
                    <MenuItem value={"Hamsters"}>Hamsters</MenuItem>
                    <MenuItem value={"Parrots"}>Parrots</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
};
export default FilterWidget;