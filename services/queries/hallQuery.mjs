import halls from "../model/halls.mjs";
const Hall = halls;
import mongoose from "mongoose";

export const addHall = async (hallData) => {
  try {
    const missingFields = [];

    if (!hallData.hallName) missingFields.push("hallName");
    if (!hallData.hallFacility) missingFields.push("hallFacility");
    if (hallData.capacity === undefined) missingFields.push("capacity");
    if (!hallData.type) missingFields.push("type");
    if (!hallData.primaryInCharge) missingFields.push("primaryInCharge");

    if (missingFields.length > 0) {
      throw new Error(
        `The following required fields are missing: ${missingFields.join(
          ", "
        )}. Please provide all required information and try again.`
      );
    }

    // Optional: Check for duplicate hall name
    const existing = await Hall.findOne({ hall_name: hallData.hallName });
    if (existing) {
      throw new Error(
        "A hall with this name already exists. Please choose a different name."
      );
    }

    const newHall = new Hall({
      hall_name: hallData.hallName,
      hall_facility: hallData.hallFacility,
      capacity: hallData.capacity,
      type: hallData.type,
      primary_in_charge: hallData.primaryInCharge,
    });

    const result = await newHall.save();
    return result;
  } catch (error) {
    throw new Error(`Error adding hall: ${error.message}`);
  }
};

export const deleteHall = async (hallId) => {
  try {
    if (!hallId) {
      throw new Error("hallId is required to delete a hall.");
    }

    const deletedHall = await Hall.findByIdAndDelete(hallId);

    if (!deletedHall) {
      throw new Error("Hall not found. It may have already been deleted.");
    }

    return deletedHall;
  } catch (error) {
    throw new Error(`Error deleting hall: ${error.message}`);
  }
};

export const updateHall = async (hallId, columnName, newValue) => {
  try {
    const validColumns = [
      "hallName",
      "hallFacility",
      "capacity",
      "type",
      "primaryInCharge",
    ];

    // ✅ Check for missing values
    if (!hallId || !columnName || newValue === undefined) {
      throw new Error("hallId, columnName, and newValue are required.");
    }

    // ✅ Validate hallId format (must be a valid MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(hallId)) {
      throw new Error("Invalid hallId format.");
    }

    // ✅ Validate column name
    if (!validColumns.includes(columnName)) {
      throw new Error(
        `Invalid column name: ${columnName}. Valid columns are: ${validColumns.join(
          ", "
        )}`
      );
    }

    // ✅ Optional: Add type validation per field (if needed)
    if (columnName === "capacity" && typeof newValue !== "number") {
      throw new Error("Capacity must be a number.");
    }

    if (
      ["hallName", "hallFacility", "type", "primaryInCharge"].includes(
        columnName
      ) &&
      typeof newValue !== "string"
    ) {
      throw new Error(`${columnName} must be a string.`);
    }

    const update = { [columnName]: newValue };

    const result = await Hall.findByIdAndUpdate(hallId, update, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw new Error(`No hall found with ID "${hallId}" to update.`);
    }

    return {
      message: `Hall with ID "${hallId}" has been updated.`,
      data: result,
    };
  } catch (error) {
    console.error("Error updating hall entry:", error.message);
    throw error;
  }
};
