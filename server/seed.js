//seed.js
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI, {
        //     // useNewUrlParser: true,
        //     // useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // });
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            strictQuery: false,
        });
        

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();

const userData = [
  { name: "John Smith", user_type: "admin", have_access: true, phone_number: "555-555-5555" },
  { name: "Jane Doe", user_type: "user", have_access: true, phone_number: "555-555-5556" },
  { name: "Bob Johnson", user_type: "user", have_access: false, phone_number: "555-555-5557" },
  { name: "Mike Williams", user_type: "admin", have_access: true, phone_number: "555-555-5558" }
];

User.create(userData, (error, users) => {
  if (error) {
    console.log(error);
  } else {
    console.log(users);
  }
});