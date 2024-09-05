const mongoose = require('mongoose');
const mongodb = async ()=> await mongoose.connect("mongodb+srv://nandishbt2001:socialApp@cluster0.odsm2.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0");

module.exports = mongodb