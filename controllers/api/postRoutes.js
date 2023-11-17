const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      creator: req.session.username,
      created_on: req.body.created_on,
      post: req.body.post,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /project/:id route renders an individual project's details based on the route parameter id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [ 
        {
          model: Comment,
          attributes: [
            'content',
            'creator',
            'created_on'
          ]
        },
      ]
    });
    console.log(postData);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('singlePost', { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.body.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
    try {
      const postData = await Post.update({ 
        title: req.body.updTitle, post: req.body.updBody 
      },
      {
        where: {
          id: req.body.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
