//Dependencies 
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Define Routes

// (I)NDEX ROUTE
router.get('/', async (req, res) => {
   try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('meetings/index.ejs', {
        meetings: currentUser.meetings,
    });
   } catch (error) {
    console.log(error);
    res.redirect('/');
   }
});

// (N)EW ROUTE 
router.get('/new', async (req, res) => {
    res.render('meetings/new.ejs')
});

// (D)ELETE ROUTE
router.delete('/:meetingId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.meetings.id(req.params.meetingId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/meetings`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

// (U)PDATE ROUTE
router.put('/:meetingId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const meeting = currentUser.meetings.id(req.params.meetingId);
        meeting.set(req.body);
        await currentUser.save();
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// (C)REATE ROUTE
router.post('/', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id) 
    currentUser.meetings.push(req.body); 
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/meetings`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// (E)DIT ROUTE
router.get('/:meetigId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const meeting = currentUser.meetings.id(req.params.meetingId);
    res.render('meetings/edit.ejs', {
        meeting: meeting,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// (S)HOW ROUTE 
router.get('/:meetingId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const meeting = currentUser.meetings.id(req.params.meetingId);
    res.render('meetings/show.ejs', {
        meeting: meeting,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;