import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState, useEffect } from "react";
import { updatePet } from "../../../state/petsSlice";

const editPetSchema = yup.object().shape({
    name: yup.string().required("required"),
    age: yup.number().required("required").positive(),
    category: yup.string().required("required"),
    breed: yup.string().required("required"),
    gender: yup.string().required("required"),
    size: yup.string().required("required"),
    picture: yup.string().required("required"),
    health: yup.string().required("required"),
    status: yup.string().required("required"),
    description: yup.string().required("required"),
    previousOwners: yup.number().required("required").positive().integer(),
});



const EditPetForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [pet, setPet] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const getPet = async () => {
            try {
                const response = await fetch(`http://localhost:3001/pets/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });
                const petData = await response.json();
                setPet(petData);
            } catch (error) {
                console.error('Failed to fetch pet details:', error);
            }
        };

        getPet();
    }, []);

    if (!pet) return null;

    const initialValuesEditPet = {
        name: pet.name,
        age: pet.age,
        category: pet.category,
        breed: pet.breed,
        gender: pet.gender,
        size: pet.size,
        picture: pet.picture,
        health: pet.health,
        status: pet.status,
        description: pet.description,
        previousOwners: pet.previousOwners,
    };

    const handleEditPet = async (values) => {
        const updatedPet = {
            ...values,
        };
        try {
            const response = await fetch(`http://localhost:3001/pets/${id}/editPet`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedPet),
            });
            const updatedPetData = await response.json();
            dispatch(updatePet({ pet: updatedPetData }));
            navigate(`/pets/${id}`);
        } catch (error) {
            console.error('Cannot update the pet:', error);
        }
    };

    return (
        <Box>
            <Box>
                <Formik
                    onSubmit={handleEditPet}
                    initialValues={initialValuesEditPet}
                    validationSchema={editPetSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >
                                <>
                                    <TextField
                                        label="Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        error={Boolean(touched.name) && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        sx={{ gridColumn: "span 2", fontFamily: "revert" }}
                                    />
                                    <TextField
                                        label="Age"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.age}
                                        name="age"
                                        error={Boolean(touched.age) && Boolean(errors.age)}
                                        helperText={touched.age && errors.age}
                                        sx={{ gridColumn: "span 2", fontFamily: "revert" }}
                                    />
                                    <TextField
                                        label="Category"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.category}
                                        name="category"
                                        error={Boolean(touched.category) && Boolean(errors.category)}
                                        helperText={touched.category && errors.category}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />
                                    <TextField
                                        label="Breed"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.breed}
                                        name="breed"
                                        error={Boolean(touched.breed) && Boolean(errors.breed)}
                                        helperText={touched.breed && errors.breed}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />

                                    <TextField
                                        label="Gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.gender}
                                        name="gender"
                                        error={Boolean(touched.gender) && Boolean(errors.gender)}
                                        helperText={touched.gender && errors.gender}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />
                                    <FormControl
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    error={Boolean(touched.size) && Boolean(errors.size)}
                                >
                                    <InputLabel id="Size">Size</InputLabel>
                                    <Select
                                        label="Size"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.size}
                                        name="size"
                                        fullWidth
                                    >
                                        <MenuItem value="Small">Small</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="Large">Large</MenuItem>
                                    </Select>
                                    <FormHelperText>
                                        {touched.size && errors.size}
                                    </FormHelperText>
                                </FormControl>

                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid #9381ff`}
                                        borderRadius="5px"
                                        p="1rem"
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])
                                            }
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed #9381ff`}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p style={{color: "#9381ff", fontFamily: "revert"}}>Add Picture Here</p>
                                                    ) : (
                                                        <Box>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlinedIcon />
                                                        </Box>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>

                                    <TextField
                                        label="Health"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.health}
                                        name="health"
                                        error={Boolean(touched.health) && Boolean(errors.health)}
                                        helperText={touched.health && errors.health}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />

                                    <TextField
                                        label="Status"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.status}
                                        name="status"
                                        error={Boolean(touched.status) && Boolean(errors.status)}
                                        helperText={touched.status && errors.status}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />

                                    <TextField
                                        label="Description"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        name="description"
                                        error={Boolean(touched.description) && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />

                                    <TextField
                                        label="Previous Owners"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.previousOwners}
                                        name="previousOwners"
                                        error={Boolean(touched.previousOwners) && Boolean(errors.previousOwners)}
                                        helperText={touched.previousOwners && errors.previousOwners}
                                        sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                    />
                                </>
                            </Box>

                            <Box>
                                <Button
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: "#9381ff",
                                        color: "white",
                                        "&:hover": {backgroundColor: "#9381ff", color: "white",}
                                    }}
                                >
                                    Edit Pet
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default EditPetForm;
