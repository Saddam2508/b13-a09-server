

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_node_dns = __toESM(require("dns"), 1);

// src/app.ts
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_express5 = __toESM(require("express"), 1);

// src/middleware/logger.ts
var import_fs = __toESM(require("fs"), 1);
var logger = (req, res, next) => {
  console.log("Method - URL - Time:", req.method, req.url, Date.now());
  const log = `
Method -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}
`;
  import_fs.default.appendFile("logger.txt", log, (err) => {
  });
  next();
};
var logger_default = logger;

// src/modules/auth/auth.route.ts
var import_express = require("express");

// src/modules/auth/auth.service.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/config/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);
import_dotenv.default.config({
  path: import_path.default.join(process.cwd(), ".env")
});
var config = {
  connection_string: process.env.CONNECTIONSTRING,
  client_uri: process.env.CLIENT_URL,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET
};
var config_default = config;

// src/db/index.ts
var import_mongodb = require("mongodb");
var uri = config_default.connection_string;
var client = new import_mongodb.MongoClient(uri, {
  serverApi: {
    version: import_mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
var initDB = async () => {
  try {
    await client.connect();
    const result = await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return result;
  } catch (error) {
    console.log(error);
  } finally {
  }
};

// src/modules/auth/auth.service.ts
var db = client.db("sports_booking");
var userCollection = db.collection("users");
var loginUserIntoDB = async (payload) => {
  const { email, password } = payload;
  const userData = await userCollection.findOne({ email });
  if (!userData) {
    throw new Error("Invalid Credentials!");
  }
  const matchPassword = await import_bcryptjs.default.compare(password, userData.password);
  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }
  const jwtpayload = {
    id: userData.id,
    name: userData.name,
    role: userData.role,
    is_active: userData.is_active,
    email: userData.email
  };
  const accessToken = import_jsonwebtoken.default.sign(jwtpayload, config_default.secret, {
    expiresIn: "1d"
  });
  const refreshToken2 = import_jsonwebtoken.default.sign(jwtpayload, config_default.refresh_secret, {
    expiresIn: "10d"
  });
  return { accessToken, refreshToken: refreshToken2 };
};
var generateFreshToken = async (token) => {
  if (!token) {
    throw new Error("Unauthorized");
  }
  const decoded = import_jsonwebtoken.default.verify(
    token,
    config_default.refresh_secret
  );
  const userData = await userCollection.findOne({ email: decoded.email });
  if (!userData) {
    throw new Error("User not found!!");
  }
  if (!userData?.is_active) {
    throw new Error("Forbidden!!");
  }
  const jwtpayload = {
    id: userData.id,
    name: userData.name,
    role: userData.role,
    is_active: userData.is_active,
    email: userData.email
  };
  const accessToken = import_jsonwebtoken.default.sign(jwtpayload, config_default.secret, {
    expiresIn: "1d"
  });
  return { accessToken };
};
var authService = {
  loginUserIntoDB,
  generateFreshToken
};

// src/modules/auth/auth.controller.ts
var loginUser = async (req, res) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { refreshToken: refreshToken2 } = result;
    res.cookie("refreshToken", refreshToken2, {
      secure: false,
      // In production => True
      httpOnly: true,
      sameSite: "lax"
    });
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var refreshToken = async (req, res) => {
  try {
    const result = await authService.generateFreshToken(
      req.cookies.refreshToken
    );
    res.status(200).json({
      success: true,
      message: "Acess token generated!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var authController = {
  loginUser,
  refreshToken
};

// src/modules/auth/auth.route.ts
var router = (0, import_express.Router)();
router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
var authRoute = router;

// src/modules/user/user.route.ts
var import_express2 = require("express");

// src/middleware/auth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var db2 = client.db("sports_booking");
var userCollection2 = db2.collection("users");
var auth = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!!"
        });
      }
      const decoded = import_jsonwebtoken2.default.verify(token, config_default.secret);
      const user = await userCollection2.findOne({
        email: decoded.email
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!"
        });
      }
      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!"
        });
      }
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!, This role has no access!"
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth;

// src/types/index.ts
var USER_ROLE = {
  admin: "admin",
  agent: "agent",
  user: "user"
};

// src/utility/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    error: data.error
  });
};
var sendResponse_default = sendResponse;

// src/modules/user/user.service.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);
var import_mongodb2 = require("mongodb");
var db3 = client.db("sports_booking");
var userCollection3 = db3.collection("users");
var createUserIntoDB = async (payload) => {
  const { name, email, password, age, role } = payload;
  const existingUser = await userCollection3.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists!");
  }
  const hashPassword = await import_bcryptjs2.default.hash(password, 10);
  const createData = {
    name,
    email,
    password: hashPassword,
    age,
    role: role || "user",
    is_active: true,
    created_at: /* @__PURE__ */ new Date(),
    updated_at: /* @__PURE__ */ new Date()
  };
  const result = await userCollection3.insertOne(createData);
  const user = await userCollection3.findOne({
    _id: result.insertedId
  });
  if (user) {
    delete user.password;
  }
  return user;
};
var getAllUsersFromDB = async () => {
  const users = await userCollection3.find().toArray();
  const filteredUsers = users.map((user) => {
    delete user.password;
    return user;
  });
  return filteredUsers;
};
var getSingleUserFromDB = async (id) => {
  const user = await userCollection3.findOne({
    _id: new import_mongodb2.ObjectId(id)
  });
  if (!user) {
    throw new Error("User not found!");
  }
  delete user.password;
  return user;
};
var updateUserFromDB = async (payload, id) => {
  const { name, password, age, is_active } = payload;
  const updatedData = {
    updated_at: /* @__PURE__ */ new Date()
  };
  if (name) updatedData.name = name;
  if (age) updatedData.age = age;
  if (typeof is_active === "boolean") {
    updatedData.is_active = is_active;
  }
  if (password) {
    updatedData.password = await import_bcryptjs2.default.hash(password, 10);
  }
  await userCollection3.updateOne(
    { _id: new import_mongodb2.ObjectId(id) },
    {
      $set: updatedData
    }
  );
  const updatedUser = await userCollection3.findOne({
    _id: new import_mongodb2.ObjectId(id)
  });
  if (!updatedUser) {
    throw new Error("User not found!");
  }
  delete updatedUser.password;
  return updatedUser;
};
var deleteUserFromDB = async (id) => {
  const result = await userCollection3.deleteOne({
    _id: new import_mongodb2.ObjectId(id)
  });
  if (result.deletedCount === 0) {
    throw new Error("User not found!");
  }
  return {
    message: "User deleted successfully"
  };
};
var userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB
};

// src/modules/user/user.controller.ts
var createUser = async (req, res) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "User Created successfully!",
      data: result
    });
  } catch (error) {
    sendResponse_default(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error
    });
  }
};
var getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {}
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.updateUserFromDB(req.body, id);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User Not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};

// src/modules/user/user.route.ts
var router2 = (0, import_express2.Router)();
router2.post("/", userController.createUser);
router2.get(
  "/",
  auth_default(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  userController.getAllUsers
);
router2.get("/:id", userController.getSingleUser);
router2.put("/:id", userController.updateUser);
router2.delete("/:id", userController.deleteUser);
var userRoute = router2;

// src/middleware/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/modules/facilities/facilities.route.ts
var import_express3 = require("express");

// src/modules/facilities/facilities.service.ts
var import_mongodb3 = require("mongodb");
var db4 = client.db("sports_booking");
var facilitiesCollection = db4.collection("facilities");
var createFacilitiesIntoDB = async (payload) => {
  const {
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
    availableTimeSlots,
    description,
    email
  } = payload;
  const existingFacilities = await facilitiesCollection.findOne({
    facilityName
  });
  if (existingFacilities) {
    throw new Error("Facilities already exists!");
  }
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
    created_at: /* @__PURE__ */ new Date(),
    updated_at: /* @__PURE__ */ new Date()
  };
  const result = await facilitiesCollection.insertOne(createData);
  const facilities = await facilitiesCollection.findOne({
    _id: result.insertedId
  });
  return facilities;
};
var getAllFacilitiesFromDB = async (search, type) => {
  const query = {};
  if (search) {
    query.facilityName = { $regex: search, $options: "i" };
  }
  if (type) {
    query.facilityType = { $in: [type] };
  }
  const allFacilities = await facilitiesCollection.find(query).toArray();
  return allFacilities;
};
var getSingleFacilitiesFromDB = async (id) => {
  const facility = await facilitiesCollection.findOne({
    _id: new import_mongodb3.ObjectId(id)
  });
  if (!facility) {
    throw new Error("User not found!");
  }
  return facility;
};
var updateFacilityFromDB = async (payload, id) => {
  const {
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
    availableTimeSlots,
    description,
    email
  } = payload;
  const updatedData = {
    facilityName: facilityName || "",
    facilityType: facilityType || "",
    image: image || "",
    location: location || "",
    pricePerHour: pricePerHour || 0,
    capacity: capacity || 0,
    availableTimeSlots: availableTimeSlots || "",
    description: description || "",
    email: email || ""
  };
  await facilitiesCollection.updateOne(
    { _id: new import_mongodb3.ObjectId(id) },
    {
      $set: updatedData
    }
  );
  const updatedFacility = await facilitiesCollection.findOne({
    _id: new import_mongodb3.ObjectId(id)
  });
  if (!updatedFacility) {
    throw new Error("Facility not found!");
  }
  return updatedFacility;
};
var deleteFacilityFromDB = async (id) => {
  const result = await facilitiesCollection.deleteOne({
    _id: new import_mongodb3.ObjectId(id)
  });
  if (!result) {
    throw new Error("Facility not found!");
  }
  return {
    message: "Facility deleted successfully"
  };
};
var facilitiesService = {
  createFacilitiesIntoDB,
  getAllFacilitiesFromDB,
  getSingleFacilitiesFromDB,
  updateFacilityFromDB,
  deleteFacilityFromDB
};

// src/modules/facilities/facilities.controller.ts
var createFacilities = async (req, res) => {
  try {
    const result = await facilitiesService.createFacilitiesIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "facility Created successfully!",
      data: result
    });
  } catch (error) {
    sendResponse_default(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error
    });
  }
};
var getAllFacilities = async (req, res) => {
  try {
    const search = req.query.search;
    const type = req.query.type;
    const result = await facilitiesService.getAllFacilitiesFromDB(search, type);
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var updateFacility = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await facilitiesService.updateFacilityFromDB(
      req.body,
      id
    );
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Facility Not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "Facility updated successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var deleteFacility = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await facilitiesService.deleteFacilityFromDB(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Facility Not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "Facility deleted successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var facilitiesController = {
  createFacilities,
  getAllFacilities,
  updateFacility,
  deleteFacility
};

// src/utility/verifyToken.ts
var import_jose = require("jose");
var JWKS = (0, import_jose.createRemoteJWKSet)(new URL(`${config_default.client_uri}/api/auth/jwks`));
var verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return sendResponse_default(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized"
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return sendResponse_default(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized"
    });
  }
  try {
    const { payload } = await (0, import_jose.jwtVerify)(token, JWKS);
    next();
  } catch (error) {
    return sendResponse_default(res, {
      statusCode: 403,
      success: false,
      message: "Forbidden"
    });
  }
};
var verifyToken_default = verifyToken;

// src/modules/facilities/facilities.route.ts
var router3 = (0, import_express3.Router)();
router3.post("/", verifyToken_default, facilitiesController.createFacilities);
router3.get("/", facilitiesController.getAllFacilities);
router3.put("/:id", verifyToken_default, facilitiesController.updateFacility);
router3.delete("/:id", verifyToken_default, facilitiesController.deleteFacility);
var facilitiesRoute = router3;

// src/modules/booking/booking.route.ts
var import_express4 = require("express");

// src/modules/booking/booking.service.ts
var import_mongodb4 = require("mongodb");
var db5 = client.db("sports_booking");
var bookingCollection = db5.collection("booking");
var createBookingIntoDB = async (payload) => {
  const {
    facilityName,
    user_email,
    facilityId,
    bookingDate,
    hours,
    availableTimeSlots,
    pricePerHour,
    status
  } = payload;
  const existingBooking = await bookingCollection.findOne({
    facilityId,
    bookingDate,
    availableTimeSlots
  });
  if (existingBooking) {
    throw new Error("This slot is already booked");
  }
  const createData = {
    facilityName,
    user_email,
    facilityId,
    bookingDate,
    hours,
    availableTimeSlots,
    pricePerHour,
    status,
    created_at: /* @__PURE__ */ new Date(),
    updated_at: /* @__PURE__ */ new Date()
  };
  const result = await bookingCollection.insertOne(createData);
  const booking = await bookingCollection.findOne({
    _id: result.insertedId
  });
  return booking;
};
var getAllBookingFromDB = async () => {
  const allBooking = await bookingCollection.find().toArray();
  return allBooking;
};
var getSingleBookingFromDB = async (id) => {
  const booking = await bookingCollection.findOne({
    _id: new import_mongodb4.ObjectId(id)
  });
  if (!booking) {
    throw new Error("booking not found!");
  }
  return booking;
};
var updateBookingFromDB = async (payload, id) => {
  const {
    facilityName,
    user_email,
    facilityId,
    bookingDate,
    hours,
    availableTimeSlots,
    pricePerHour,
    status
  } = payload;
  const updatedData = {
    facilityName: facilityName || "",
    user_email: user_email || "",
    facilityId: facilityId || "",
    bookingDate: bookingDate || /* @__PURE__ */ new Date(),
    hours: hours ?? 0,
    availableTimeSlots: availableTimeSlots || "",
    pricePerHour: pricePerHour || 0,
    status: status || "pending"
  };
  await bookingCollection.updateOne(
    { _id: new import_mongodb4.ObjectId(id) },
    {
      $set: updatedData
    }
  );
  const updatedBooking = await bookingCollection.findOne({
    _id: new import_mongodb4.ObjectId(id)
  });
  if (!updatedBooking) {
    throw new Error("Facility not found!");
  }
  return updatedBooking;
};
var deleteBookingFromDB = async (id) => {
  const result = await bookingCollection.deleteOne({
    _id: new import_mongodb4.ObjectId(id)
  });
  if (!result) {
    throw new Error("Booking not found!");
  }
  return {
    message: "Booking deleted successfully"
  };
};
var bookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  updateBookingFromDB,
  deleteBookingFromDB
};

// src/modules/booking/booking.controller.ts
var createBooking = async (req, res) => {
  try {
    const result = await bookingService.createBookingIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "Booking Created successfully!",
      data: result
    });
  } catch (error) {
    sendResponse_default(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error
    });
  }
};
var getAllBooking = async (req, res) => {
  try {
    const result = await bookingService.getAllBookingFromDB();
    res.status(200).json({
      success: true,
      message: "Booking retrived successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await bookingService.updateBookingFromDB(
      req.body,
      id
    );
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Booking Not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await bookingService.deleteBookingFromDB(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Booking Not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error
    });
  }
};
var bookingController = {
  createBooking,
  getAllBooking,
  updateBooking,
  deleteBooking
};

// src/modules/booking/booking.route.ts
var router4 = (0, import_express4.Router)();
router4.post("/", verifyToken_default, bookingController.createBooking);
router4.get("/", verifyToken_default, bookingController.getAllBooking);
router4.put("/:id", verifyToken_default, bookingController.updateBooking);
router4.delete("/:id", verifyToken_default, bookingController.deleteBooking);
var bookingRoute = router4;

// src/app.ts
var app = (0, import_express5.default)();
app.use((0, import_cookie_parser.default)());
app.use(import_express5.default.json());
app.use(import_express5.default.text());
app.use(import_express5.default.urlencoded({ extended: true }));
app.use(logger_default);
app.use(
  (0, import_cors.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    // ✅
    credentials: true
  })
);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level"
  });
});
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/facilities", facilitiesRoute);
app.use("/api/booking", bookingRoute);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
import_node_dns.default.setServers(["8.8.8.8", "8.8.4.4"]);
var main = async () => {
  await initDB();
  app_default.listen(config_default.port, () => {
    console.log(`Example app listening on port ${config_default.port}`);
  });
};
main();
//# sourceMappingURL=server.cjs.map