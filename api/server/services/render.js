const axios = require('axios');

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/products
  axios.get('http://localhost:3000/api/products')
    .then(function(response) {
      res.render('index', { products: response.data }); // Send the retrieved data to the view
    })
    .catch(err => {
      console.error(err);
      res.send('Error fetching products'); // Send an error message in case of failure
    });
};

exports.add_product = (req, res) => {
  res.render('add_product');
};

exports.update_product = (req, res) => {
  res.render('update_product');
};
