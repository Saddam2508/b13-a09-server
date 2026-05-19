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

export const facilitiesService = {
  createFacilitiesIntoDB,
  getAllFacilitiesFromDB,
};
