const argon = require('argon2');
const user = require('../Models/userSchema');
const forgot = require('../Models/otpSchema');
const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
    Service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

const postData = async (req, res) => {
    console.log(req.body);
    req.body.password = await argon.hash(req.body.password);

    try {
        await user.create(req.body);
        return res.status(200).json({ status: "success" });
    } catch (err) {
        return res.status(500).json({ status: "failed" });
    }
}

const getData = async (req, res) => {
    try {
        const data = await user.find();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

const getDatabyId = async (req, res) => {
    try {
        const dataById = await user.findById(req.params.userId)
        return res.status(200).json(dataById);
    } catch (err) {

        return res.status(500).json(err.message)

    }
}

const deleteData = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.userId)
        return res.status(200).json('deleted successfully')
    } catch (err) {
        return res.status(500).json(err.message)
    }
}


const updateData = async (req, res) => {
    try {
        await user.findByIdAndUpdate(req.params.userId, req.body)
        return res.status(200).json('updated successfully')
    }catch(err){
        return res.status(500).json(err.message)
    }
}

const generateOtp=()=>{
    return Math.round(Math.random()*1000+2000)
}

const forgotPassword = async (req,res) => {

    // console.log("otp value: ",forgotPassword);
    const {email} = req.body

    const otp = generateOtp()

    console.log("otp value: ",otp);
    
    try{
        await forgot.create({email,otp});
        await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "Sent OTP", // Subject line
            text: "Your OTP is Here", // plain text body
            html: `<b>Your OTP {otp}</b>`, // html body
          });
        return res.status(200).json('OTP Stored Successfully')
    }catch(err){
        return res.status(500).json(err.message)
    }
}




module.exports = { postData, getData, getDatabyId, deleteData, updateData, forgotPassword }