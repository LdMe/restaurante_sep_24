import menuModel from "../../models/menuModel.js";



async function getAll(){
   const menus = await menuModel.findAll();
   return menus;
}

async function getById(id){
    const menu = await menuModel.findByPk(id);
    return menu;
}

async function create(name,price){
    const newMenu = await menuModel.create({
      name,
      price:price*100,
    });
   return newMenu;
}


async function update(id,name,price){
    const newPrice = price * 100;
    const menu = await menuModel.findByPk(id);
    menu.name=name;
    menu.price=newPrice;
    await menu.save();
    return menu;
}

async function remove(id){
    const menuToRemove = await menuModel.findByPk(id);
    await menuToRemove.destroy();
    return menuToRemove;
}


export const functions = {
    getAll,
    getById,
    create,
    update,
    remove
}
export default functions;

