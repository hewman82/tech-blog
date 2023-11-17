const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth.js');

// Get homepage populated with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Get signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

// Get dashboard
router.get('/dashboard', withAuth, async (req, res, next) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
  
    res.render('dashboard', { 
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;