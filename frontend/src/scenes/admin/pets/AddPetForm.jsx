import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { addPet as addPetAction } from "../../../state/petsSlice";

const addPetSchema = yup.object().shape({
    name: yup.string().required("required"),
    age: yup.number().required("required").positive(),
    category: yup.string().required("required"),
    breed: yup.string().required("required"),
    gender: yup.string().required("required"),
    size: yup.string().required("required"),
    picture: yup.string().required("required"),
    health: yup.string().required("required"),
    description: yup.string().required("required"),
    previousOwners: yup.number().required("required").positive().integer(),
});

const initialValuesAddPet = {
    name: "",
    age: 0,
    category: "",
    breed: "",
    gender: "",
    size: "",
    picture: "",
    health: "",
    description: "",
    previousOwners: 1,
};

const AddPetForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const addPet = async (values, onSubmitProps) => {
        const formData = new FormData();
        console.log(values)
        for (let value in values) {
            console.log(value, values[value])
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);
        console.log(formData);

        try {
            const savedPetResponse = await fetch("http://localhost:3001/pets/newPet", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const savedPet = await savedPetResponse.json();
            console.log(savedPet)

            dispatch(addPetAction({ savedPet }));
            onSubmitProps.resetForm();

            if (savedPet) {
                navigate(`/pets/${savedPet._id}`);
            }
        } catch (error) {
            console.error("Failed to add pet:", error);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await addPet(values, onSubmitProps);
        console.log("Pet added successfully!");
    };

    return (
        <Box>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesAddPet}
                    validationSchema={addPetSchema}
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
                                    }}
                                >
                                    Add Pet
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default AddPetForm;
