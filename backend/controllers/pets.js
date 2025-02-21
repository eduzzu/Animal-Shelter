import Pet from "../models/Pet.js";
import Request from "../models/Request.js"

export const addPet = async (req, res) => {
    try {
        const {
            name,
            age,
            category,
            breed,
            gender,
            size,
            picturePath,
            health,
            description,
            previousOwners
        } = req.body;

        const newPet = new Pet({
            name,
            age,
            category,
            breed,
            gender,
            size,
            picturePath,
            health,
            description,
            previousOwners,
            status: "Available",
            viewedPet: Math.floor(Math.random() * 100)
        });

        const savedPet = await newPet.save();
        return res.status(201).json(savedPet);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const editPet = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            age,
            size,
            picturePath,
            health,
            status,
            description,
            previousOwners
        } = req.body;

        const updatedPet = await Pet.findByIdAndUpdate(
            id,
            {
                name,
                age,
                size,
                picturePath,
                health,
                status,
                description,
                previousOwners
            }, { new: true }
        );

        if (!updatedPet) {
            return res.status(404).json("Pet not found.")
        }

        return res.status(200).json(updatedPet);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findByIdAndDelete(id);

        if (!pet) {
            return res.status(404).json("Can not delete. Pet not found.");
        }

        await Request.deleteMany({ petId: id });

        return res.status(200).json("Pet deleted successfully!");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

export const getPets = async (req, res) => {
    try {
        const pet = await Pet.find();
        return res.status(200).json(pet);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPet = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json("Pet not found.")
        }

        return res.status(200).json(pet);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const filterPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        let results = pets;
        for (let param in req.query) {
            switch (param) {
                case "category":
                    results = results.filter(pet => pet.category === req.query.category);
                    break;

                case "age":
                    results = results.filter(pet => pet.age === req.query.age);
                    break;

                case "breed":
                    results = results.filter(pet => pet.breed === req.query.breed);
                    break;

                case "gender":
                    results = results.filter(pet => pet.gender === req.query.gender);
                    break;

                default: break;
            }
        }

        return res.status(200).json(results);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const updatePetStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json(`Pet not found.`)
        }

        pet.status = status;
        await pet.save();

        if (status === "Adopted") {
            await Pet.findByIdAndDelete(id);
            return res.status(200).json("Pet status successfully updated and removed from the database!");
        } else {
            return res.status(200).json("Pet status successfully updated!");
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
