import {
  addHall,
  deleteHall,
  updateHall,
} from "../services/queries/hallQuery.mjs";
export const addHallCtrl = async (req, res) => {
  const hallData = req.body;
  try {
    const result = await addHall(hallData);
    return res.status(201).json({
      message: "Hall added successfully.",
      data: result,
    });
  } catch (error) {
    if (error.message.includes("The following required fields are missing")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes("A hall with this name already exists")) {
      return res.status(409).json({ error: error.message });
    }

    console.error("Unexpected Error in addHallCtrl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteHallCtrl = async (req, res) => {
  const { hallId } = req.params;
  try {
    const result = await deleteHall(hallId);
    return res.status(200).json({
      message: "Hall deleted successfully.",
      data: result,
    });
  } catch (error) {
    if (error.message.includes("hallId is required to delete a hall"))
      return res.status(400).json({ error: error.message });

    if (error.message.includes("Hall not found")) {
      return res.status(404).json({ error: error.message });
    }
    console.error("Unexpected Error in deleteHallCtrl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateHallCtrl = async (req, res) => {
  try {
    const { hallId, field_name, changes } = req.body;

    const updatedField = await updateHall(hallId, field_name, changes);
    return res.status(200).json(updatedField);
  } catch (error) {
    // Custom error messages
    if (error.message.includes("Invalid column name"))
      return res.status(400).json({ error: error.message });

    if (error.message.includes("must be a"))
      return res.status(400).json({ error: error.message });

    if (error.message.includes("Invalid hallId format"))
      return res.status(400).json({ error: error.message });

    if (error.message.includes("No hall found"))
      return res.status(404).json({ error: error.message });

    if (error.message.includes("required"))
      return res.status(400).json({ error: error.message });

    // Unhandled errors
    console.error("Unexpected error in updateHallEntry:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
