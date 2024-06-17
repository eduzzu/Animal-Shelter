import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PetWidget from "../../widgets/PetWidget";
import { Box, FormHelperText, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Select from "react-select";
import AdvertsWidget from "../../widgets/AdvertsWidget";
import Footer from "../../footer/Footer";

const Parrots = () => {


    const [parrots, setParrots] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const getParrots = async () => {
        try {
            const response = await fetch("http://localhost:3001/pets", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            const parrotsFiltered = data.filter(parrot => parrot.category === "Parrot");
            setParrots(parrotsFiltered);
        } catch (error) {
            console.error("Cannot fetch the data.", error);
        }
    }

    useEffect(() => {
        getParrots();
    }, []);

    if (!parrots) return null;

    const breeds = Array.from(new Set(parrots.map((p) => p.breed)));
    const ages = Array.from(new Set(parrots.map((p) => p.age)));
    const genders = Array.from(new Set(parrots.map((p) => p.gender)));
    const sizes = Array.from(new Set(parrots.map((p) => p.size)));

    const breedsOptions = breeds.map((breed) => ({ value: breed, label: breed }));
    const agesOptions = ages.map((age) => ({ value: age, label: age }));
    const gendersOptions = genders.map((gender) => ({ value: gender, label: gender }));
    const sizesOptions = sizes.map((size) => ({ value: size, label: size }));

    const filterParrots = parrots.filter((parrot) => {
        return (
            (!selectedBreed || parrot.breed === selectedBreed.value) &&
            (!selectedAge || parrot.age === selectedAge.value) &&
            (!selectedGender || parrot.gender === selectedGender.value) &&
            (!selectedSize || parrot.size === selectedSize.value)
        );
    });

    const displayParrots = filterParrots.length > 0 ? filterParrots : 0;

    return (
        <Box>
            <Navbar />
            <AdvertsWidget />
            <Box
                sx={{
                    width: "20%",
                    mt: "3%",
                    ml: "5%",
                    display: "flex",
                    flexDirection: "column",

                }}
            > <Box>
                    <Box sx={{ mb: "10%" }}>
                        <FormHelperText sx={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontFamily: "revert",
                            fontWeight: "bold"
                        }}
                        >
                            BREED
                        </FormHelperText>
                        <Select
                            options={breedsOptions}
                            isClearable
                            onChange={(selectOption) => setSelectedBreed(selectOption)}
                            value={selectedBreed}
                        />
                    </Box>

                    <Box sx={{ mb: "10%" }}>
                        <FormHelperText sx={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontFamily: "revert",
                            fontWeight: "bold"
                        }}
                        >
                            AGE
                        </FormHelperText>
                        <Select
                            options={agesOptions}
                            isClearable
                            onChange={(selectOption) => setSelectedAge(selectOption)}
                            value={selectedAge}
                        />
                    </Box>

                    <Box sx={{ mb: "10%" }}>
                        <FormHelperText sx={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontFamily: "revert",
                            fontWeight: "bold"
                        }}
                        >
                            GENDER
                        </FormHelperText>
                        <Select
                            options={gendersOptions}
                            isClearable
                            onChange={(selectOption) => setSelectedGender(selectOption)}
                            value={selectedGender}
                        />
                    </Box>

                    <FormHelperText sx={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontFamily: "revert",
                        fontWeight: "bold"
                    }}
                    >
                        SIZE
                    </FormHelperText>
                    <Select
                        options={sizesOptions}
                        isClearable
                        onChange={(selectOption) => setSelectedSize(selectOption)}
                        value={selectedSize}
                    />

                </Box>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 0.30fr)",
                    justifyContent: "center",
                    m: "-22% 2% 5% 30%",
                    textDecoration: "none"
                }}
            >
                {displayParrots.length > 0 ? (
                    displayParrots.map(({ _id, picturePath, name, age, category, breed }) => (
                        <a key={_id} href={`/pets/${_id}`} style={{ textDecoration: 'none' }}>
                            <PetWidget
                                petId={_id}
                                picturePath={picturePath}
                                name={name}
                                age={age}
                                category={category}
                                breed={breed}
                            />
                        </a>
                    ))
                ) : (
                    <Typography
                        sx={{
                            pb: "100%",
                            ml: "25%",
                            width: "200%",
                            textAlign: "center",
                            fontSize: "32px",
                            color: "#9381ff"
                        }}
                    >No results matching your criteria. Consider broadening your search.
                    </Typography>
                )}

            </Box>
            <AdvertsWidget />
            <Footer />

        </Box>
    )

}

export default Parrots;