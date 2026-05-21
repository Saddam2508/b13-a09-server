import { ObjectId } from "mongodb";
import { client } from "../../db";
const db = client.db("sports_booking");
const facilitiesCollection = db.collection("facilities");
// Create facilities
const createFacilitiesIntoDB = async (payload) => {
    const { facilityName, facilityType, image, location, pricePerHour, capacity, availableTimeSlots, description, email, } = payload;
    // Check existing facilities
    const existingFacilities = await facilitiesCollection.findOne({
        facilityName,
    });
    if (existingFacilities) {
        throw new Error("Facilities already exists!");
    }
    // Create facilities
    const createData = {
        facilityName,
        facilityType,
        image,
        location,
        pricePerHour,
        capacity,
        availableTimeSlots,
        description,
        email,
        created_at: new Date(),
        updated_at: new Date(),
    };
    const result = await facilitiesCollection.insertOne(createData);
    // Get inserted facilities
    const facilities = await facilitiesCollection.findOne({
        _id: result.insertedId,
    });
    return facilities;
};
// Get All Users
const getAllFacilitiesFromDB = async () => {
    const allFacilities = await facilitiesCollection.find().toArray();
    return allFacilities;
};
// Get Single facilities
const getSingleFacilitiesFromDB = async (id) => {
    const facility = await facilitiesCollection.findOne({
        _id: new ObjectId(id),
    });
    if (!facility) {
        throw new Error("User not found!");
    }
    return facility;
};
// Update User
const updateFacilityFromDB = async (payload, id) => {
    const { facilityName, facilityType, image, location, pricePerHour, capacity, availableTimeSlots, description, email, } = payload;
    const updatedData = {
        facilityName: facilityName || "",
        facilityType: facilityType || "",
        image: image || "",
        location: location || "",
        pricePerHour: pricePerHour || 0,
        capacity: capacity || 0,
        availableTimeSlots: availableTimeSlots || "",
        description: description || "",
        email: email || "",
    };
    await facilitiesCollection.updateOne({ _id: new ObjectId(id) }, {
        $set: updatedData,
    });
    const updatedFacility = await facilitiesCollection.findOne({
        _id: new ObjectId(id),
    });
    if (!updatedFacility) {
        throw new Error("Facility not found!");
    }
    return updatedFacility;
};
// Delete Facility
const deleteFacilityFromDB = async (id) => {
    const result = await facilitiesCollection.deleteOne({
        _id: new ObjectId(id),
    });
    if (!result) {
        throw new Error("Facility not found!");
    }
    return {
        message: "Facility deleted successfully",
    };
};
export const facilitiesService = {
    createFacilitiesIntoDB,
    getAllFacilitiesFromDB,
    getSingleFacilitiesFromDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
};
//# sourceMappingURL=facilities.service.js.map