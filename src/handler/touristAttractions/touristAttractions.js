require('dotenv').config({path: __dirname + '/../../.env'});
const User = require('../../model/user');
const TouristAttraction = require('../../model/touristAttraction');
const axios = require('axios');

const placeResponseData = (place) => {
  return {
    id: place.id,
    locationName: place.name,
    description: place.description,
    photoUrl: place.photo,
    rating: place.rating,
    userRatingsTotal: place.total_user_rating,
    lat: place.latitude,
    lon: place.longitude,
  };
};

const getTouristAttractionsHandler = async (request, h) => {
  const {userId} = request.payload;

  const user = await User.findByPk(userId);
  const userPreferences = user.tourism_preferences;

  const placeRecords = await TouristAttraction.findAll({
    where: {
      city: 'Yogyakarta',
    },
  });

  if (!userPreferences) {
    const response = h.response({
      error: false,
      message: 'ok',
      touristAttractionList: placeRecords.map(placeResponseData),
    });
    response.code(200);
    return response;
  }

  // eslint-disable-next-line max-len
  const placeRecommendations = await axios.post('https://tara-ml-72oh4bxmxq-as.a.run.app/get_recommendations', {
    userPreferences: userPreferences,
  }).catch((error) => {
    console.log(error);
  });

  const placeIds = [];

  placeRecommendations['data'].forEach((place) => {
    placeIds.push(place.Place_Id);
  });

  // eslint-disable-next-line max-len
  const placeList = placeRecords.filter((placeRecord) => placeIds.includes(placeRecord.id));

  const response = h.response({
    error: false,
    message: 'ok',
    touristAttractionList: placeList.map(placeResponseData),
  });
  response.code(200);
  return response;
};

module.exports = getTouristAttractionsHandler;
