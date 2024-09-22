const express = require('express');
const router = express.Router();

router.post('/orderData', (req, res) => {
  console.log("Received order data:", req.body); // Log the request body

  try {
    // Process the request
    // Save order data to database or perform necessary logic
    
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error processing order:", error); // Log the error if any
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
