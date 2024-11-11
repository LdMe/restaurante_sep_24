import dishModel from "../../models/dishModel.js"

function getAll(req,res){
   res.json( dishModel.getAll());
}

function getById(req,res){
    const id = parseInt(req.params.id);
    console.log(id,dishModel.getById(id));
    res.json(dishModel.getById(id));
}

function createForm(req,res){
    const form =  `
    <form class="max-w-md mx-auto p-4 bg-white shadow rounded-lg" method="POST" action="/dish/new">
      <h2 class="text-xl font-bold mb-4">Crear Nuevo Plato</h2>
      
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre del plato *
        </label>
        <input 
          type="text" 
          id="name" 
          name="name"
          required
          maxlength="50"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Paella Valenciana"
        >
      </div>
    
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea 
          id="description"
          name="description"
          maxlength="200"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Describe los ingredientes y preparación..."
        ></textarea>
      </div>
    
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
          Precio (€) *
        </label>
        <input 
          type="number"
          id="price"
          name="price"
          required
          min="0"
          step="0.01"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
        >
      </div>
    
      <div class="mb-4">
        <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
          Tipo de plato *
        </label>
        <select 
          id="type"
          name="type"
          required
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona un tipo</option>
          <option value="starter">Entrante</option>
          <option value="first-course">Primer plato</option>
          <option value="second-course">Segundo plato</option>
          <option value="dessert">Postre</option>
        </select>
      </div>
    
      <div class="flex justify-end gap-2">
        <button 
          type="button" 
          class="px-4 py-2 border rounded hover:bg-gray-100"
          onclick="handleCancel()"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Plato
        </button>
      </div>
    </form>
    `;
    res.send(form);
}

function updateForm(req,res){
    const form = `
    <form class="max-w-md mx-auto p-4 bg-white shadow rounded-lg" method="POST" action="/dish">
      <h2 class="text-xl font-bold mb-4">Actualizar Plato</h2>
      
      <input type="hidden" id="dish_id" name="dish_id">
      
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre del plato *
        </label>
        <input 
          type="text" 
          id="name" 
          name="name"
          required
          maxlength="50"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Paella Valenciana"
        >
      </div>
    
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea 
          id="description"
          name="description"
          maxlength="200"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Describe los ingredientes y preparación..."
        ></textarea>
      </div>
    
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
          Precio (€) *
        </label>
        <input 
          type="number"
          id="price"
          name="price"
          required
          min="0"
          step="0.01"
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
        >
      </div>
    
      <div class="mb-4">
        <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
          Tipo de plato *
        </label>
        <select 
          id="type"
          name="type"
          required
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona un tipo</option>
          <option value="starter">Entrante</option>
          <option value="first-course">Primer plato</option>
          <option value="second-course">Segundo plato</option>
          <option value="dessert">Postre</option>
        </select>
      </div>
    
      <div class="flex justify-end gap-2">
        <button 
          type="button" 
          class="px-4 py-2 border rounded hover:bg-gray-100"
          onclick="handleCancel()"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Actualizar Plato
        </button>
      </div>
    </form>
    `;
    res.send(form);
}

function create(req,res){
    const {name,description,price,type} = req.body;
    const newDish = dishModel.create(name,description,price,type);
    res.json(newDish);
}

function update(req,res){
    const {name,description,price,type} = req.body;
    const id = parseInt(req.params.id);
    const updatedDish = dishModel.update(id,{name,description,price,type});
    res.json(updatedDish);
}

function remove(req,res){
    const id = parseInt(req.params.id);
    const removedDish = dishModel.remove(id);
    res.json(removedDish);
}


export const functions = {
    getAll,
    getById,
    create,
    createForm,
    updateForm,
    update,
    remove
}
export default functions;
