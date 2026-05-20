import { ObjectId } from "mongodb";

import { client } from "../../db";
import type { IBookingPayload } from "../booking/booking.interface";

const db = client.db("sports_booking");

const bookingCollection = db.collection("booking");

// Create Booking
const createBookingIntoDB = async (payload: IBookingPayload) => {
  const {
    facilityName,
    user_email,
    facilityId,
    bookingDate,
    hours,
    availableTimeSlots,
    pricePerHour,
    status,
  } = payload;

  // Create booking

  const createData = {
    facilityName,
    user_email,
    facilityId,
    bookingDate,
    hours,
    availableTimeSlots,
    pricePerHour,
    status,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const result = await bookingCollection.insertOne(createData);

  // Get inserted facilities
  const booking = await bookingCollection.findOne({
    _id: result.insertedId,
  });

  return booking;
};

// Get All Booking
const getAllBookingFromDB = async () => {
  const allBooking = await bookingCollection.find().toArray();
  return allBooking;
};

// Get Single Booking
const getSingleBookingFromDB = async (id: string) => {
  const booking = await bookingCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!booking) {
    throw new Error("booking not found!");
  }

  return booking;
};

// Update User
const updateBookingFromDB = async (
  payload: Partial<IBookingPayload>,
  id: string,
) => {
  const {
    facilityName,
    user_email,
    facilityId,
    bookingDate,
    hours,
    availableTimeSlots,
    pricePerHour,
    status,
  } = payload;

  const updatedData: IBookingPayload = {
    facilityName: facilityName || "",
    user_email: user_email || "",
    facilityId: facilityId || "",
    bookingDate: bookingDate || new Date(),
    hours: hours ?? 0,
    availableTimeSlots: availableTimeSlots || "",
    pricePerHour: pricePerHour || 0,
    status: status || "pending",
  };

  await bookingCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updatedData,
    },
  );

  const updatedBooking = await bookingCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!updatedBooking) {
    throw new Error("Facility not found!");
  }

  return updatedBooking;
};

// Delete Booking
const deleteBookingFromDB = async (id: string) => {
  const result = await bookingCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!result) {
    throw new Error("Booking not found!");
  }

  return {
    message: "Booking deleted successfully",
  };
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  updateBookingFromDB,
  deleteBookingFromDB,
};
