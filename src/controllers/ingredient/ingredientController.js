//import dishModel from "../../models/dishModel.js"
import ingredientModel from "../../models/ingredientModel.js";


async function getAll(){
   const ingredients = await ingredientModel.findAll();
   return ingredients;
}

async function getById(id){
    const ingredient = await ingredientModel.findByPk(id);
    return ingredient;
}

/* function createForm(req,res){
    res.render("ingredient/new")
} */


async function create(name){
    const newIngredient = await ingredientModel.create({
      name
    });
    return newIngredient;
}


async function remove(id){
    const ingredientToRemove = await ingredientModel.findByPk(id);
    await ingredientToRemove.destroy();
    return ingredientToRemove;
}


export const functions = {
    getAll,
    getById,
    create,
    remove
}
export default functions;
