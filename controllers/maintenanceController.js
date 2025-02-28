import MaintenanceRequest from "../models/maintenanceRequest.js";


// Get all maintenance requests
export const getRequests = async (req, res) => {
    try {
      const requests = await MaintenanceRequest.find();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Create a maintenance request
  export const createRequest = async (req, res) => {
    const { issue, priority } = req.body;
    try {
      const request = new MaintenanceRequest({ issue, priority });
      await request.save();
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Update maintenance request status
  export const updateRequestStatus = async (req, res) => {
    try {
      const request = await MaintenanceRequest.findById(req.params.id);
      if (!request) return res.status(404).json({ message: "Request not found" });
  
      request.status = req.body.status;
      await request.save();
      res.json(request);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };