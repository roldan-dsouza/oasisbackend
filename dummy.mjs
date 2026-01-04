import users from "./model/users.mjs";
import { addReservationHolderQuery,addReservation } from "./queries/reservationHolder.mjs";


const User = users;
export const addDummyUser = async (req, res, next) => {
  try {
    const dummyUser = new User({
      username: "testuser",
      email: "test@example.com",
      phoneNumber: "1234567890",
      password: "dummyPassword123", // hash it if needed
      role: "ViceChancellor", // ✅ changed to valid role
    });

    const savedUser = await dummyUser.save();
    res.status(201).json({ message: "Dummy user added", user: savedUser });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error adding dummy user", error: err.message });
  }
};

export const deleteDummyUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Dummy user not found" });
    }
    res.status(200).json({ message: "Dummy user deleted" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting dummy user", error: err.message });
  }
};

export const temporaryVallidation = async (req, res, next) => {
  req.user = req.user || {};
  req.user.id = "681518a002d2fd8c7fde040a";
  next();
};

export const temporaryVallidationReserver = async (req, res, next) => {
  req.user = req.user || {};
  req.user.reserverId = "";
  next();
};
