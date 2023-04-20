const User = require('../models/user.model');
const Expert = require('../models/expert.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dgsx9bvvf',
  api_key: '781359287982441',
  api_secret: '7hNsft3DsqCYAcy9kl8e4noM7zI',
});

const userSignup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      console.log(result);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        degree: req.body.degree,
        role: req.body.role,
        url: result.url,
        booked: [],
      });
      user.save().then((response) => {
        console.log(response);
        res.status(200).json({
          message: 'Customer signup was successful',
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: 'Customer signup failed',
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.find({ name: req.body.name });
    console.log(user);
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            name: user[0].name,
            userId: user[0]._id,
          },
          process.env.secret_sign,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          _id: user[0]._id,
          name: user[0].name,
          role: user[0].role,
          token: token,
          url: user[0].url,
          message: 'Customer login successful',
        });
      } else {
        res.status(401).json({
          error: 'Customer authentication failed!',
        });
      }
    } else {
      res.status(401).json({
        error: 'Customer authentication failed!',
      });
    }
  } catch (error) {
    res.status(401).json({
      error: 'Customer authentication failed!',
    });
  }
};

const getAllExperts = async (req, res) => {
  try {
    const allExperts = await Expert.find();
    const listOfExperts = [];
    const allFeeArr = [];
    let minimumFee = '';
    let maximumFee = '';
    allExperts.map((item) => {
      const tempExpert = {
        name: item.name,
        category: item.category,
        consultationFee: item.consultationFee,
        url: item.url,
        _id: item._id,
      };
      listOfExperts.push(tempExpert);
      allFeeArr.push(item.consultationFee);
    });
    minimumFee = Math.min(...allFeeArr);
    maximumFee = Math.max(...allFeeArr);
    // console.log(minimumFee);
    // console.log(maximumFee);
    res.status(201);
    res.send({
      status: 'success',
      listOfExperts: listOfExperts,
      minimumFee: minimumFee,
      maximumFee: maximumFee,
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const getExpertById = async (req, res) => {
  console.log(req.params.id);
  try {
    const expert = await Expert.findById(req.params.id);
    console.log(expert);
    const expertInfo = {
      name: expert.name,
      email: expert.email,
      category: expert.category,
      consultationFee: expert.consultationFee,
      url: expert.url,
      _id: expert._id,
    };
    res.status(201);
    res.send({
      status: 'success',
      expertProfile: expertInfo,
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const addBookedExpert = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.params.id);
    const expert = await Expert.findById(req.body.expertProfile._id);
    const userExist = expert.pending.find(
      (customer) => customer._id === req.params.id
    );
    console.log(userExist);
    if (userExist) {
      res.status(201);
      res.send({
        status: 'failure',
        message: 'Already you have booked this expert',
      });
    } else {
      const booked = [...user.booked, req.body];
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { booked: booked },
        {
          new: true,
        }
      );
      const requestedUser = {
        _id: req.params.id,
        name: user.name,
        email: user.email,
        degree: user.degree,
        url: user.url,
        description: req.body.clientDescription,
      };
      const pending = [...expert.pending, requestedUser];
      const updatedExpert = await Expert.findByIdAndUpdate(
        req.body.expertProfile._id,
        { pending: pending },
        {
          new: true,
        }
      );
      // console.log(updatedExpert);
      res.status(201);
      res.send({
        status: 'success',
        message: 'Consultation booking done successfully',
      });
    }
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const getBookedExperts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user);
    res.status(201);
    res.send({
      status: 'success',
      bookedExpert: user.booked,
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
  userSignup,
  userLogin,
  getAllExperts,
  getExpertById,
  addBookedExpert,
  getBookedExperts,
};
