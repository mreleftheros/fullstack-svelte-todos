const Todo = require('../model/Todo');

exports.index_post = async (req, res) => {
  try {
    const { text, err } = Todo.validate(req.body.text);
    if (Object.keys(err).length > 0) {
      return res.status(400).json({ ...err, error: 'Validation failed.' });
    }

    const { _id } = await Todo.create(text, req.user._id);

    return res.status(201).json({ _id, isDone: false, text, userId: req.user._id });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.index_get = async (req, res) => {
  try {
    const result = await Todo.getAllByUser(req.user._id);

    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_get = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.getById(id);

    if (!result) {
      return res.status(404).json({ error: 'Todo id was not found.' });
    }

    return res.json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_put = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const result = await Todo.getById(id);

    if (!result) {
      return res.status(404).json({ error: 'Todo id was not found.' });
    }

    if (result.userId !== req.user._id) {
      return res.status(403).json({ error: 'Forbidden action.' });
    }

    if (body.text) {
      const { text, err } = Todo.validate(body.text);
      if (Object.keys(err).length > 0) {
        return res.status(400).json({ ...err, error: 'Validation failed.' });
      }
    }

    if (body.isDone && result.isDone) {
      return res.status(400).json({ error: 'Todo is already done.' });
    } else if (!body.isDone && !result.isDone) {
      return res.status(400).json({ error: 'Todo is already undone.' });
    }

    await Todo.setById(id, body);

    return res.json({ ...result, ...body });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.idParam_delete = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.getById(id);

    if (!result) {
      return res.status(404).json({ error: 'Todo id was not found.' });
    }

    if (result.userId !== req.user._id) {
      return res.status(403).json({ error: 'Forbidden action.' });
    }

    await Todo.deleteById(id);

    return res.json({ ok: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
