import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Mock data for booking trends
export const getBookingTrends = (req, res) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    data: [50, 75, 100, 125, 150], // Example booking counts
  };
  res.json(data);
};

// Mock data for sales performance
export const getSalesPerformance = (req, res) => {
  const data = {
    labels: ['Theater A', 'Theater B', 'Theater C'],
    data: [5000, 3000, 2000], // Example revenue in dollars
  };
  res.json(data);
};

// Mock data for user activity
export const getUserActivity = (req, res) => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [100, 150, 200, 250], // Example active user counts
  };
  res.json(data);
};

// Send booking confirmation via email
export const sendBookingConfirmation = async (req, res) => {
  const { email, bookingDetails } = req.body;

  // Email configuration using Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable
      pass: process.env.EMAIL_PASS, // Use environment variable
    },
  });

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Confirmation',
    text: `Your booking is confirmed! Details: ${JSON.stringify(bookingDetails)}`,
  };

  try {
    // Send email
    await transporter.sendMail(emailOptions);

    res.status(200).json({ message: 'Booking confirmation sent via email.' });
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    res.status(500).json({ error: 'Failed to send booking confirmation.' });
  }
};