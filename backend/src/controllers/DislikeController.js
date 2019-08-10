const Dev = require('../models/Dev');

module.exports = {
  async store(request, res) {
    const { devId } = request.params;
    const { user } = request.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev does not exist' });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
