const Shopping = require('../models/shoppingModel');

exports.getPrevShopping = (req, res, next) => {
  Shopping.find(req.query)
    .sort({ date: -1 })
    .then(shoppings => {
      res.status(200).send({ shoppings });
    });
};

exports.createShoppingList = (req, res, next) => {
  let totalDistance = 0;
  req.body.items.forEach(item => (totalDistance += item.distance));
  const newShoppingList = new Shopping({
    email: req.body.email,
    total_items: req.body.items.length,
    total_distance: totalDistance,
    items: req.body.items
  });
  newShoppingList.save().then(shoppingList => {
    res.status(201).send({ shoppingList });
  });
};

exports.deleteShoppingList = (req, res, next) => {
  Shopping.deleteOne(req.params).then(() => res.sendStatus(204));
};

exports.getShoppingListById = (req, res, next) => {
  Shopping.find(req.params).then(([shoppingList]) =>
    res.status(200).send({ shoppingList })
  );
};
