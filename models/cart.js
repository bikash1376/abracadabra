const { name } = require('ejs');
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://bksh2674:jKX6a9do8HrFN6Gu@cluster0.qmxuyle.mongodb.net/auth_demo?retryWrites=true&w=majority&appName=Cluster0');


const cartSchema = mongoose.Schema({
    name: String,
    image: String
})

module.exports = mongoose.model('cart', cartSchema)