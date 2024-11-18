import sequelize from "../config/sequelize.js";

import User from "./userModel.js";
import Client from "./clientModel.js";
import Local from "./localModel.js";
import Provider from "./providerModel.js";
import Menu from "./menuModel.js";
import Drink from "./drinkModel.js";
import Order from "./orderModel.js";
import Dish from "./dishModel.js";
import Ingredient from "./ingredientModel.js";
import IngredientHistory from "./ingredientHistoryModel.js";

// One-to-One & One-to-Many relations
Client.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(Client, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Order.belongsTo(Local, { foreignKey: 'local_id' });
Local.hasMany(Order, { foreignKey: 'local_id' });

Order.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(Order, { foreignKey: 'client_id' });

// Many-to-Many: Dish relations
Dish.belongsToMany(Ingredient, { 
    through: "dish_has_ingredient", 
    foreignKey: "dish_id",
    otherKey: "ingredient_id",
    onDelete: 'CASCADE'
});
Ingredient.belongsToMany(Dish, { 
    through: "dish_has_ingredient", 
    foreignKey: "ingredient_id",
    otherKey: "dish_id"
});

// Many-to-Many: Menu relations
Menu.belongsToMany(Dish, { 
    through: "menu_has_dish", 
    foreignKey: "menu_id",
    otherKey: "dish_id"
});
Dish.belongsToMany(Menu, { 
    through: "menu_has_dish", 
    foreignKey: "dish_id",
    otherKey: "menu_id",
    onDelete: 'CASCADE'
});

Menu.belongsToMany(Drink, { 
    through: "menu_has_drink", 
    foreignKey: "menu_id",
    otherKey: "drink_id"
});
Drink.belongsToMany(Menu, { 
    through: "menu_has_drink", 
    foreignKey: "drink_id",
    otherKey: "menu_id"
});

// Many-to-Many: Order relations
Order.belongsToMany(Dish, { 
    through: "order_has_dish", 
    foreignKey: "order_id",
    otherKey: "dish_id",
    onDelete: 'CASCADE'
});
Dish.belongsToMany(Order, { 
    through: "order_has_dish", 
    foreignKey: "dish_id",
    otherKey: "order_id"
});

Order.belongsToMany(Menu, { 
    through: "order_has_menu", 
    foreignKey: "order_id",
    otherKey: "menu_id",
    onDelete: 'CASCADE'
});
Menu.belongsToMany(Order, { 
    through: "order_has_menu", 
    foreignKey: "menu_id",
    otherKey: "order_id"
});

Order.belongsToMany(Drink, { 
    through: "order_has_drink", 
    foreignKey: "order_id",
    otherKey: "drink_id",
    onDelete: 'CASCADE'
});
Drink.belongsToMany(Order, { 
    through: "order_has_drink", 
    foreignKey: "drink_id",
    otherKey: "order_id"
});

// Many-to-Many: Provider relations
Drink.belongsToMany(Provider, { 
    through: "drink_has_provider", 
    foreignKey: "drink_id",
    otherKey: "provider_id",
    as: 'providers'
});
Provider.belongsToMany(Drink, { 
    through: "drink_has_provider", 
    foreignKey: "provider_id",
    otherKey: "drink_id",
    as: 'drinks'
});

Ingredient.belongsToMany(Provider, { 
    through: "ingredient_has_provider", 
    foreignKey: "ingredient_id",
    otherKey: "provider_id",
    as: 'providers'
});
Provider.belongsToMany(Ingredient, { 
    through: "ingredient_has_provider", 
    foreignKey: "provider_id",
    otherKey: "ingredient_id",
    as: 'ingredients'
});

// Additional configurations for junction tables with extra fields
const OrderDish = sequelize.model('order_has_dish');
OrderDish.removeAttribute('id');  // Remove auto-generated id
OrderDish.addHook('beforeCreate', (record) => {
    if (!record.quantity) record.quantity = 1;
});

const OrderMenu = sequelize.model('order_has_menu');
OrderMenu.removeAttribute('id');
OrderMenu.addHook('beforeCreate', (record) => {
    if (!record.quantity) record.quantity = 1;
});

const OrderDrink = sequelize.model('order_has_drink');
OrderDrink.removeAttribute('id');
OrderDrink.addHook('beforeCreate', (record) => {
    if (!record.quantity) record.quantity = 1;
});

const DrinkProvider = sequelize.model('drink_has_provider');
DrinkProvider.removeAttribute('id');

const IngredientProvider = sequelize.model('ingredient_has_provider');
IngredientProvider.removeAttribute('id');

// Export junction models for direct access if needed
export const JunctionTables = {
    OrderDish,
    OrderMenu,
    OrderDrink,
    DrinkProvider,
    IngredientProvider
};