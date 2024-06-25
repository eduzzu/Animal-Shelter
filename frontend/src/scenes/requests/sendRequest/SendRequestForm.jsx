import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { createRequest } from "../../../state/requestsSlice";
import { useState, useEffect } from "react";


const sendRequestSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    age: yup.number().required("Age is required").positive().min(18),
    phoneNumber: yup.string().required("Phone Number is required"),
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    petName: yup.string(),
    petBreed: yup.string(),
    petCategory: yup.string(),
    message: yup.string().required("Message is required"),
});


const SendRequestForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const { petId } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const getPet = async () => {
            try {
                const response = await fetch(`http://localhost:3001/pets/${petId}`, {
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
    }, [petId, token]);

    if (!pet) return null;

    const initialValuesSendRequest = {
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
        location: "",
        occupation: "",
        petName: pet.name,
        petBreed: pet.breed,
        petCategory: pet.category,
        message: "",
    };

    const sendRequest = async (values, onSubmitProps) => {
        try {
            const savedRequestResponse = await fetch(`http://localhost:3001/pets/${petId}/adopt`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(values),
            });
            const savedRequest = await savedRequestResponse.json();

            dispatch(createRequest(savedRequest));
            onSubmitProps.resetForm();

            if (savedRequest) {
                navigate(`/requests/${savedRequest._id}/adoption`);
            }
        } catch (error) {
            console.error("Failed to send the request:", error);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await sendRequest(values, onSubmitProps);
        console.log("Request sent successfully!");
    };

    return (
        <Box>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesSendRequest}
                    validationSchema={sendRequestSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Typography
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontFamily: "revert",
                                    fontSize: "22px",
                                    mb: "3%",
                                    color: "#9381ff"
                                }}
                            >
                                Send Your Adoption Request Today!
                                Bring Your Beloved Home.
                            </Typography>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2", fontFamily: "revert" }}
                                />

                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
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
                                    label="Phone Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    name="phoneNumber"
                                    error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                    sx={{ gridColumn: "span 2", fontFamily: "revert" }}
                                />

                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                />

                                <TextField
                                    label="Pet Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.petName}
                                    name="petName"
                                    error={Boolean(touched.petName) && Boolean(errors.petName)}
                                    helperText={touched.petName && errors.petName}
                                    disabled
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                />

                                <TextField
                                    label="Pet Breed"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.petBreed}
                                    name="petBreed"
                                    error={Boolean(touched.petBreed) && Boolean(errors.petBreed)}
                                    helperText={touched.petBreed && errors.petBreed}
                                    disabled
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                />

                                <TextField
                                    label="Pet Category"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.petCategory}
                                    name="petCategory"
                                    error={Boolean(touched.petCategory) && Boolean(errors.petCategory)}
                                    helperText={touched.petCategory && errors.petCategory}
                                    disabled
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                />

                                <TextField
                                    label="Message"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.message}
                                    name="message"
                                    error={Boolean(touched.message) && Boolean(errors.message)}
                                    helperText={touched.message && errors.message}
                                    sx={{ gridColumn: "span 4", fontFamily: "revert" }}
                                />
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
                                        "&:hover": { backgroundColor: "#9381ff", color: "white", }
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default SendRequestForm;
