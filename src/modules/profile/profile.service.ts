import { ObjectId } from "mongodb";

import { client } from "../../db";

const db = client.db("sports_booking");

const userCollection = db.collection("users");
const profileCollection = db.collection("profiles");

const createProfileIntoDB = async (payload: any) => {
  //   console.log(payload);
  const { user_id, bio, address, phone, gender } = payload;
  // Fisrt check if the user is exists
  const user = await userCollection.findOne({
    _id: new ObjectId(user_id),
  });

  //   console.log(user);
  if (!user) {
    throw new Error("User not exists!");
  }

  const insertData = {
    user_id: new ObjectId(user_id),
    bio,
    address,
    phone,
    gender,
    created_at: new Date(),
  };

  const result = await profileCollection.insertOne(insertData);

  return result;
};

export const profileService = {
  createProfileIntoDB,
};
