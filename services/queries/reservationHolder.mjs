import reservationHolder from "../model/reservationHolder.mjs";
import reservation from "../model/reservation.mjs";



export const addReservationHolderQuery = async (reservationHolderData) => {
  const { reserver_name, reserver_phoneNumber, reserver_email, user_id } =
    reservationHolderData;

  try {
    const newReservationHolder = new reservationHolder({
      reserver_name,
      reserver_phoneNumber,
      reserver_email,
      user_id,
    });
    const result = await newReservationHolder.save();
    return { message: "Reservation holder added successfully", result: result };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reservation holder" });
  }
};

export const addReservation = async (reservationData) => {
  const {
    reserver_id,
    hall_id,
    start_date,
    end_date,
    start_time,
    end_time,
    purpose,
    status,
    food_requirement,
  } = reservationData;

  try {
    const newReservation = new reservation({
      reserver_id,
      hall_id,
      start_date,
      end_date,
      start_time,
      end_time,
      purpose,
      status,
      food_requirement,
    });
    const result = await newReservation.save();
    return { message: "Reservation added successfully", result: result };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reservation" });
  }
};

export const deleteReservationById = async (id) => {
  try {
    const deletedReservation = await reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return { message: "Reservation not found" };
    }

    const reserverId = deletedReservation.reserver_id;
    if (reserverId) {
      await reservationHolder.findByIdAndDelete(reserverId);
    }

    return {
      message: "Reservation and associated reserver deleted successfully",
      deletedReservation: deletedReservation,
    };
  } catch (error) {
    console.error(error);
    return { message: "Error deleting reservation" };
  }
};

const killMyself = () => {
  console.log("I am killing myself");
}