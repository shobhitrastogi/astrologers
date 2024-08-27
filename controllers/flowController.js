const Astrologer = require('../models/astrologer');
const User = require('../models/user');

const allocateUsers = async () => {
  const users = await User.find({ connectedAstrologer: null });
  const astrologers = await Astrologer.find({});
  
  let totalWeight = astrologers.reduce((sum, astrologer) => sum + astrologer.flowAdjustmentFactor, 0);

  // Assign astrologers to users
  users.forEach(user => {
    let rand = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (const astrologer of astrologers) {
      cumulativeWeight += astrologer.flowAdjustmentFactor;
      if (rand <= cumulativeWeight) {
        user.connectedAstrologer = astrologer._id;
        astrologer.currentLoad++;  // Increment currentLoad for the selected astrologer
        break;
      }
    }
  });

  // Update the currentLoad for all astrologers
  await Promise.all(astrologers.map(astrologer => 
    Astrologer.findByIdAndUpdate(astrologer._id, { currentLoad: astrologer.currentLoad })
  ));

  // Update the connectedAstrologer for all users
  await Promise.all(users.map(user => 
    User.findByIdAndUpdate(user._id, { connectedAstrologer: user.connectedAstrologer })
  ));
};

const toggleFlow = async (req, res) => {
  const astrologer = await Astrologer.findById(req.params.id);
  if (!astrologer) {
    return res.status(404).json({ message: 'Astrologer not found' });
  }
  astrologer.isTop = !astrologer.isTop;
  astrologer.flowAdjustmentFactor = astrologer.isTop ? 2 : 1;
  await astrologer.save();
  res.status(200).json(astrologer);
};

const allocateUserRequests = async (req, res) => {
  await allocateUsers();
  res.status(200).json({ message: 'Users allocated successfully' });
};

module.exports = { toggleFlow, allocateUserRequests };
