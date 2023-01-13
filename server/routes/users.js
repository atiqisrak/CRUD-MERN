const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create one user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    user_type: req.body.user_type,
    have_access: req.body.have_access,
    phone_number: req.body.phone_number
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
}
if (req.body.user_type != null) {
res.user.user_type = req.body.user_type;
}
if (req.body.have_access != null) {
res.user.have_access = req.body.have_access;
}
if (req.body.phone_number != null) {
res.user.phone_number = req.body.phone_number;
}
try {
const updatedUser = await res.user.save();
res.json(updatedUser);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

// Delete one user
// router.delete('/:id', getUser, async (req, res) => {
// try {
// await res.user.remove();
// res.json({ message: 'Deleted User' });
// } catch (err) {
// res.status(500).json({ message: err.message });
// }
// });

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

async function getUser(req, res, next) {
try {
user = await User.findById(req.params.id);
if (user == null) {
return res.status(404).json({ message: 'Cannot find user' });
}
} catch (err) {
return res.status(500).json({ message: err.message });
}

res.user = user;
next();
}

module.exports = router;
