import Pet from "../models/Pet.js";

export const addPet = async(req, res) => {
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
            viewedPet: Math.floor(Math.random() * 100)
        });

        const savedPet = await newPet.save();
        return res.status(201).json(savedPet);

    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

export const editPet = async(req, res) => {
    try{
        const {id} = req.params;
    const {
        name,
        age,
        size,
        picturePath,
        health,
        description,
        previousOwners
    } = req.body;

    if(!name || !age || !size || !picturePath || !health || !description || !previousOwners) {
        return res.status(400).json("Please fill all these fields correctly!");
    }

    const updatedPet = await Pet.findByIdAndUpdate(
        id,
        {
            name,
            age,
            size,
            picturePath,
            health,
            description,
            previousOwners
        }, {new: true}
    );

    if(!updatedPet) {
        return res.status(404).json("Pet not found.")
    }

    return res.status(200).json(updatedPet);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
    
};

export const deletePet = async(req, res) => {
    try{
        const {id} = req.params;
        const pet = await Pet.findByIdAndDelete(id);
        
        if(!pet) {
            return res.status(404).json("Can not delete. Pet not found.");
        }
    
        return res.status(200).json("Pet deleted successfully!");
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
   
};

export const getPets = async(req, res) => {
    try{    
        const pet = await Pet.find();
        return res.status(200).json(pet);

    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}

export const getPet = async(req, res) => {
    try{
        const {id} = req.params;
        const pet = await Pet.findById(id);

        if(!pet){
            return res.status(404).json("Pet not found.")
        }

        return res.status(200).json(pet);

    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}

export const filterPets = async(req, res) => {
    try{    
        const pets = await Pet.find();
        let results = pets;
        for(let param in req.query) {
            switch(param) {
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

    } catch(error) {
        res.status(500).json({message: error.message})
    }
   
}