const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Adjust if your frontend runs on a different port
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Create nodemailer transporter
const createTransporter = () => {
  // Use environment variables or provide defaults for testing
  const user = process.env.EMAIL_USER || 'test@example.com';
  const pass = process.env.EMAIL_PASS || 'password';
  
  console.log(`Setting up email with user: ${user.substring(0, 3)}...`); // Log only first few chars for security
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
};

// Booking form endpoint with improved error handling
app.post('/api/booking', (req, res) => {
  // Wrap in try/catch to handle multer errors
  try {
    // Use multer middleware for this route only
    upload.single('referenceImage')(req, res, async function(err) {
      // Handle multer errors
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ 
          success: false, 
          message: err.message || 'Error uploading file' 
        });
      }
      
      try {
        console.log('Received booking request:', req.body);
        
        const {
          fullName,
          phoneNumber,
          email,
          city,
          tattooDescription,
          serviceType,
          preferredDate,
          preferredTime
        } = req.body;

        // Check for required fields
        if (!fullName || !phoneNumber || !email || !city || !tattooDescription || !serviceType || !preferredDate || !preferredTime) {
          return res.status(400).json({ 
            success: false, 
            message: 'Missing required fields' 
          });
        }

        // Create email content
        let emailContent = `
          <h2>New Tattoo Booking Request</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime}</p>
          <p><strong>Tattoo Description:</strong> ${tattooDescription}</p>
        `;

        // Setup email options
        const mailOptions = {
          from: process.env.EMAIL_USER || 'noreply@example.com',
          to: process.env.RECIPIENT_EMAIL || 'jenish.1442004@gmail.com',
          subject: `New Tattoo Booking Request from ${fullName}`,
          html: emailContent,
        };

        // Attach the image if uploaded
        if (req.file) {
          mailOptions.attachments = [
            {
              filename: req.file.originalname,
              path: req.file.path
            }
          ];
        }

        // For testing/debugging without sending actual emails
        if (process.env.NODE_ENV === 'development' && process.env.SKIP_EMAIL === 'true') {
          console.log('Email would be sent with:', mailOptions);
          
          // Clean up the uploaded file if any
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          
          return res.status(200).json({ 
            success: true, 
            message: 'Booking request processed (email sending skipped in development)' 
          });
        }
        
        try {
          // Send email
          const transporter = createTransporter();
          await transporter.sendMail(mailOptions);
          
          // Clean up the uploaded file after sending
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          
          console.log('Email sent successfully');
          res.status(200).json({ success: true, message: 'Booking request sent successfully!' });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          
          // Clean up the uploaded file on email error
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          
          res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Please try again later.'
          });
        }
      } catch (processingError) {
        console.error('Error processing booking request:', processingError);
        res.status(500).json({ 
          success: false, 
          message: 'Error processing booking request' 
        });
      }
    });
  } catch (outerError) {
    console.error('Outer error in booking endpoint:', outerError);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Detailed health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running!',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origin: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});