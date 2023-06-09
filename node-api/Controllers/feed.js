exports.getPosts = (req, res, next) => {
  res.json(req.body);
};

exports.postPosts = (req, res, next) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};


