var express = require('express');
var router = express.Router();
const axios = require("axios");


router.post('/getdish', function(req, res, next) {
  const dishes = async () => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOON_KEY}&number=1&tags=${country}`)
          res.json(response.data)
      } catch (error) {
        console.log(error)
      }
    }

  const country = req.body.cuisine.toLowerCase();
  dishes();

});

module.exports = router;
