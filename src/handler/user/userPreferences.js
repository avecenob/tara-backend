require('dotenv').config({path: __dirname + '/../../.env'});
const User = require('../../model/user');

const setUserPreferencesHandler = async (request, h) => {
  const {userId, userPreferences} = request.payload;
  const pref = JSON.stringify(userPreferences);

  const newUserPreferences = await User.update(
      {
        tourism_preferences: pref,
      },
      {
        where: {
          id: userId,
        },
      });

  if (newUserPreferences[0] === 0) {
    const response = h.response({
      error: true,
      message: 'Failed to save user preferences',
    });
    response.code(500);
    return response;
  }

  const response = h.response({
    error: false,
    message: 'User preferences saved succesfully',
  });
  response.code(200);
  return response;
};

module.exports = setUserPreferencesHandler;
