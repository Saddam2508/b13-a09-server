import { ObjectId } from "mongodb";

import { client } from "../../db";

import type { IFacility } from "./facilities.interface";

const db = client.db("sports_booking");

const facilitiesCollection = db.collection("facilities");

// Create facilities
const createFacilitiesIntoDB = async (payload: IFacility) => {
  const {
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
    availableTimeSlots,
    description,
    email,
  } = payload;

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
const getSingleFacilitiesFromDB = async (id: string) => {
  const facility = await facilitiesCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!facility) {
    throw new Error("User not found!");
  }

  return facility;
};

// Update User
const updateFacilityFromDB = async (
  payload: Partial<IFacility>,
  id: string,
) => {
  const {
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
    availableTimeSlots,
    description,
    email,
  } = payload;

  const updatedData: IFacility = {
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

  await facilitiesCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updatedData,
    },
  );

  const updatedFacility = await facilitiesCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!updatedFacility) {
    throw new Error("Facility not found!");
  }

  return updatedFacility;
};

// Delete Facility
const deleteFacilityFromDB = async (id: string) => {
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
