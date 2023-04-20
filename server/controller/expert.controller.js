const Expert = require('../models/expert.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dgsx9bvvf',
  api_key: '781359287982441',
  api_secret: '7hNsft3DsqCYAcy9kl8e4noM7zI',
});

const expertSignup = async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      // console.log(result);
      const expert = new Expert({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        degree: req.body.degree,
        category: req.body.category,
        role: req.body.role,
        consultationFee: req.body.consultationFee,
        url: result.url,
        pending: [],
        approved: [],
      });
      expert.save().then((response) => {
        console.log(response);
        res.status(200).json({
          message: 'Signup was successful',
        });
      });
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'Signup failed',
    });
  }
};

const expertLogin = async (req, res) => {
  console.log(req.body);
  try {
    const expert = await Expert.find({ name: req.body.name });
    console.log(expert);
    if (expert && expert.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        expert[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            name: expert[0].name,
            expertId: expert[0]._id,
          },
          process.env.secret_sign,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          _id: expert[0]._id,
          name: expert[0].name,
          email: expert[0].email,
          degree: expert[0].degree,
          category: expert[0].category,
          role: expert[0].role,
          token: token,
          url: expert[0].url,
          message: 'Login successful',
        });
      } else {
        res.status(401).json({
          error: 'Authentication failed!',
        });
      }
    } else {
      res.status(401).json({
        error: 'Authentication failed!',
      });
    }
  } catch (error) {
    res.status(401).json({
      error: 'Authentication failed!',
    });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    console.log(req.params.id);
    const expert = await Expert.findById(req.params.id);
    console.log(expert);
    res.status(200);
    res.send({
      status: 'success',
      data: expert.pending,
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const approvedRequestedCustomer = async (req, res) => {
  try {
    // console.log(req.params.id);
    const expert = await Expert.findById(req.params.id);
    console.log(req.body);
    const newPendingList = expert.pending.filter(
      (customer) => customer._id !== req.body._id
    );
    // console.log(newPendingList);
    const updatedExpert = await Expert.findByIdAndUpdate(
      req.params.id,
      { pending: newPendingList, approved: [...expert.approved, req.body] },
      {
        new: true,
      }
    );
    res.status(200);
    res.send({
      status: 'success',
      message: 'Approved requested customer successfully',
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const getApprovedCustomers = async (req, res) => {
  try {
    console.log(req.params.id);
    const expert = await Expert.findById(req.params.id);
    console.log(expert);
    res.status(200);
    res.send({
      status: 'success',
      data: expert.approved,
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const removeCustomer = async (req, res) => {
  try {
    // console.log(req.body);
    const expert = await Expert.findById(req.body.expertId);
    const newApprovedList = expert.approved.filter(
      (customer) => customer._id !== req.body.customerId
    );
    // console.log(newPendingList);
    const updatedExpert = await Expert.findByIdAndUpdate(
      req.body.expertId,
      { approved: newApprovedList },
      {
        new: true,
      }
    );
    res.status(200);
    res.send({
      status: 'success',
      message: 'Customer deleted successfully',
      scheduledCustomers: newApprovedList,
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

module.exports = {
  expertSignup,
  expertLogin,
  getPendingRequests,
  approvedRequestedCustomer,
  getApprovedCustomers,
  removeCustomer,
};
