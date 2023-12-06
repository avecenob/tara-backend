require('dotenv').config({path: __dirname + '/../../.env'});
const axios = require('axios');
const {MAPS_API_KEY} = process.env;

const getTouristAttractionsHandler = async (request, h) => {
  try {
    const {city} = request.params;
    const cityDetails = await axios({
      method: 'post',
      url: 'https://places.googleapis.com/v1/places:searchText',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.id',
      },
      data: {
        'textQuery': `${city}`,
      },
    });

    const cityId = cityDetails.data.places[0].id;

    const currentCity = await axios({
      method: 'get',
      url: `https://places.googleapis.com/v1/places/${cityId}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': MAPS_API_KEY,
        'X-Goog-FieldMask': 'location',
      },
    });

    const cityLocation = currentCity['data'].location;

    const touristAttractionList = await axios({
      method: 'post',
      url: 'https://places.googleapis.com/v1/places:searchNearby',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': MAPS_API_KEY,
        // eslint-disable-next-line max-len
        'X-Goog-FieldMask': 'places.id,places.displayName,places.editorialSummary,places.photos,places.rating,places.userRatingCount,places.location',
      },
      data: {
        'includedTypes': ['tourist_attraction'],
        'languageCode': 'id',
        'locationRestriction': {
          'circle': {
            'center': {
              'latitude': cityLocation.latitude,
              'longitude': cityLocation.longitude,
            },
            'radius': 50000.0,
          },
        },
      },
    });

    const {places} = touristAttractionList['data'];

    const placeObjects = [];

    places.forEach((place) => {
      const locationName = place.displayName.text;
      const desc = place.editorialSummary ? place.editorialSummary.text : null;
      const photoName = place.photos[0].name;

      const placeObject = {
        id: place.id,
        locationName: locationName,
        description: desc,
        photoUrl: `https://places.googleapis.com/v1/${photoName}`,
        rating: place.rating,
        userRatingsTotal: place.userRatingCount,
        lat: place.location.latitude,
        lon: place.location.longitude,
      };

      placeObjects.push(placeObject);
    });

    const response = h.response({
      message: 'Success',
      touristAttractionList: placeObjects,
    });
    response.code(200);
    return response;
  } catch (error) {
    console.log(error);
    const response = h.response({
      message: 'Failed fetching data',
    });
    return response;
  }
};

module.exports = getTouristAttractionsHandler;
