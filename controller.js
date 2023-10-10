
// Example controller structure
const detailsController = (req, res) => {
  const { user_id } = req.params;
  User.findByPk(user_id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ user_details: user });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};
