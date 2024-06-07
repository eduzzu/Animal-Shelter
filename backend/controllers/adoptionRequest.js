import Adoption from "../models/Adoption.js";

export const createRequest = async (req, res) => {
    try {
        const { petId } = req.params;
        const {
            firstName,
            lastName,
            age,
            location,
            occupation,
            appointmentDate,
            message
        } = req.body;

        const newRequest = new Adoption({
            userId: req.user.id,
            petId,
            firstName,
            lastName,
            age,
            location,
            occupation,
            appointmentDate,
            message,
        });

        const savedRequest = await newRequest.save();

        if (!savedRequest) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(201).json(savedRequest);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Adoption.findByIdAndDelete(requestId);

        if (!request) {
            return res.status(404).json(`Adoption request not found.`);
        }

        return res.status(200).json(`Adoption request deleted successfully!`);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}