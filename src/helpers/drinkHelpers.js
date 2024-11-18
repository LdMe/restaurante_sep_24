// helpers/drinkHelpers.js

// Etiquetas para los tipos de bebidas (según el ENUM del modelo)
export const drinkTypeLabels = {
    "juice": "Zumo",
    "water": "Agua",
    "alcoholic": "Bebida alcohólica",
    "infusion": "Infusión",
    "soft-drink": "Refresco"
};

// Función para obtener la etiqueta del tipo de bebida
export function getDrinkTypeLabel(type) {
    return drinkTypeLabels[type] || type;
}


export default {
    drinkTypeLabels,
    getDrinkTypeLabel,
};