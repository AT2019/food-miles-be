const shoppingRouter = require('express').Router();
const {
  getPrevShopping,
  createShoppingList,
  deleteShoppingList,
  getShoppingListById
} = require('../controllers/shoppingController');

shoppingRouter.get('/', getPrevShopping);
shoppingRouter.post('/', createShoppingList);
shoppingRouter
  .route('/:_id')
  .get(getShoppingListById)
  .delete(deleteShoppingList);

module.exports = shoppingRouter;
