import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { client } from "../../db";
const db = client.db("sports_booking");
const userCollection = db.collection("users");
// Create User
const createUserIntoDB = async (payload) => {
    const { name, email, password, age, role } = payload;
    // Check existing user
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists!");
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // Create user
    const createData = {
        name,
        email,
        password: hashPassword,
        age,
        role: role || "user",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
    const result = await userCollection.insertOne(createData);
    // Get inserted user
    const user = await userCollection.findOne({
        _id: result.insertedId,
    });
    if (user) {
        delete user.password;
    }
    return user;
};
// Get All Users
const getAllUsersFromDB = async () => {
    const users = await userCollection.find().toArray();
    const filteredUsers = users.map((user) => {
        delete user.password;
        return user;
    });
    return filteredUsers;
};
// Get Single User
const getSingleUserFromDB = async (id) => {
    const user = await userCollection.findOne({
        _id: new ObjectId(id),
    });
    if (!user) {
        throw new Error("User not found!");
    }
    delete user.password;
    return user;
};
// Update User
const updateUserFromDB = async (payload, id) => {
    const { name, password, age, is_active } = payload;
    const updatedData = {
        updated_at: new Date(),
    };
    if (name)
        updatedData.name = name;
    if (age)
        updatedData.age = age;
    if (typeof is_active === "boolean") {
        updatedData.is_active = is_active;
    }
    // Hash password if exists
    if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
    }
    await userCollection.updateOne({ _id: new ObjectId(id) }, {
        $set: updatedData,
    });
    const updatedUser = await userCollection.findOne({
        _id: new ObjectId(id),
    });
    if (!updatedUser) {
        throw new Error("User not found!");
    }
    delete updatedUser.password;
    return updatedUser;
};
// Delete User
const deleteUserFromDB = async (id) => {
    const result = await userCollection.deleteOne({
        _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
        throw new Error("User not found!");
    }
    return {
        message: "User deleted successfully",
    };
};
export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
};
//# sourceMappingURL=user.service.js.map