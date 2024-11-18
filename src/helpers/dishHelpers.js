export const dishTypeLabels = {
    "starter": "Entrante",
    "first-course": "Primer plato",
    "second-course": "Segundo plato",
    "dessert": "Postre"
};

export function getDishTypeLabel(type) {
    return dishTypeLabels[type] || type;
}
