import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PetWidget from "../../widgets/PetWidget";
import { Box, FormHelperText, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import Select from "react-select";
import AdvertsWidget from "../../widgets/AdvertsWidget";
import Footer from "../../footer/Footer";

const Hamsters = () => {


    const [hamsters, setHamsters] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const getHamsters = async () => {
        try {
            const response = await fetch("http://localhost:3001/pets", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            const HamstersFiltered = data.filter(hamster => hamster.category === "Hamster");
            setHamsters(HamstersFiltered);
        } catch (error) {
            console.error("Cannot fetch the data.", error);
        }
    }

    useEffect(() => {
        getHamsters();
    }, []);

    if (!hamsters) return null;
   
    const breeds = Array.from(new Set(hamsters.map((h) => h.breed)));
    const ages = Array.from(new Set(hamsters.map((h) => h.age)));
    const genders = Array.from(new Set(hamsters.map((h) => h.gender)));
    const sizes = Array.from(new Set(hamsters.map((h) => h.size)));

    const breedsOptions = breeds.map((breed) => ({ value: breed, label: breed }));
    const agesOptions = ages.map((age) => ({ value: age, label: age }));
    const gendersOptions = genders.map((gender) => ({ value: gender, label: gender }));
    const sizesOptions = sizes.map((size) => ({ value: size, label: size }));

    const filterHamsters = hamsters.filter((hamster) => {
        return (
            (!selectedBreed || hamster.breed === selectedBreed.value) &&
            (!selectedAge || hamster.age === selectedAge.value) &&
            (!selectedGender || hamster.gender === selectedGender.value) &&
            (!selectedSize || hamster.size === selectedSize.value)
        );
    });

    const displayHamsters = filterHamsters.length > 0 ? filterHamsters : 0;

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
                {displayHamsters.length > 0 ? (
        displayHamsters.map(({ _id, picturePath, name, age, category, breed }) => (
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

export default Hamsters;