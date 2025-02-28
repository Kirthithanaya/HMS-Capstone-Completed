import Room from "../models/Rooms.js"
import Resident from "../models/Resident.js"

// Create a new room
export const createRoom = async (req, res) => {
    try {
      const { roomNumber, type } = req.body;
      const room = new Room({ roomNumber, type });
      await room.save();
      res.status(201).json(room);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('resident');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new resident
export const createResident = async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const resident = new Resident({ name, email, phone });
      await resident.save();
      res.status(201).json(resident);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all residents
export const getResidents = async (req, res) => {
  try {
    const residents = await Resident.find().populate("room");
    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a resident
export const updateResident = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResident = await Resident.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedResident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    res.status(200).json(updatedResident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a resident
export const deleteResident = async (req, res) => {
  try {
    const { id } = req.params;
    const resident = await Resident.findByIdAndDelete(id);

    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    res.status(200).json({ message: "Resident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a room to a resident (Check-In)
export const assignRoom = async (req, res) => {
    const { residentId, roomNumber } = req.body;
    
    const room = await Room.findOne({ roomNumber });
    if (!room || room.status === 'Occupied') return res.status(400).json({ message: 'Room not available' });
  
    const resident = await Resident.findById(residentId);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });
  
    room.status = 'Occupied';
    room.resident = residentId;
    resident.room = room._id;
    resident.checkInDate = new Date();
  
    await room.save();
    await resident.save();
    res.json({ message: 'Room assigned successfully' });
  };


// Check-Out a Resident
export const checkOutResident = async (req, res) => {
    const { residentId } = req.body;

    const resident = await Resident.findById(residentId);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });

    const room = await Room.findById(resident.room);
    if (room) {
        room.status = 'Available';
        room.resident = null;
        await room.save();
    }

    resident.room = null;
    resident.checkOutDate = new Date();
    await resident.save();

    res.json({ message: 'Resident checked out successfully' });
};


  