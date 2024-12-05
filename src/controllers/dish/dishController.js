//import dishModel from "../../models/dishModel.js"
import dishModel from "../../models/dishModel.js";
import Ingredient from "../../models/ingredientModel.js";


async function getAll(){
   const dishes = await dishModel.findAll({
    include: Ingredient
   });
   return dishes;
}

async function getById(id){
    const dish = await dishModel.findByPk(id,{
      include: Ingredient
     });
    return dish;
}

async function create(name,description,price,type,ingredients){
    const newDish = await dishModel.create({
      name,
      description,
      price:price*100,
      type,
    });
    await newDish.addIngredients(ingredients.split(","))
   return newDish;
}

/**
 * Get a dish with its ingredients.
 * @param {number} id - The id of the dish
 * @returns {Promise<DishModel>} The dish with its ingredients
 */
async function getDishWithIngredients(id) {
  const dish = await dishModel.findByPk(id, {
    include: Ingredient,
  });
  return dish;
}

async function addIngredients(id,ingredients){
  const dish = await dishModel.findByPk(id);
  await dish.addIngredients(ingredients);
  return dish;
}

async function update(id,name,description,price,type){
    const newPrice = price * 100;
    const dish = await dishModel.findByPk(id);
    dish.name=name;
    dish.description=description;
    dish.price=newPrice;
    dish.type=type;
    await dish.save();
    return dish;
}

async function remove(id){
    const dishToRemove = await dishModel.findByPk(id);
    await dishToRemove.destroy();
    return dishToRemove;
}


export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
}
export default functions;
