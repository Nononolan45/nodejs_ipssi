const Post = require('../models/postModel');

exports.list_all_posts = (req, res) => {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(500);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(200);
            res.json(posts);
        }
    });
}

exports.create_a_post = (req, res) => {
    let new_post = new Post(req.body);
    new_post.save((error, post) => {
        if (error) {
            res.status(500);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(201);
            res.json(post);
        }
    });
}

exports.get_a_post = (req, res) => {
    Post.findById(req.params.post_id, (error, post) => {
        if (error) {
            res.status(500);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(200);
            res.json(post);
        }
    });
}

exports.update_a_post = (req, res) => {
    Post.findOneAndUpdate({ "_id": req.params.post_id }, req.body, { new: true, useFindAndModify: false }, (error, post) => {
        if (error) {
            res.status(500);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(200);
            res.json(post);
        }
    });
}

exports.delete_a_post = (req, res) => {
    Post.findByIdAndDelete({ "_id": req.params.post_id }, (error) => {
        if (error) {
            res.status(500);
            res.json({ message: "Erreur serveur." })
        }
        else {
            res.status(200);
            res.end();
        }
    })
}