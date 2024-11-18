// helpers/orderHelpers.js
import { dishTypeLabels } from './dishHelpers.js';



/**
 * Formatea una fecha a formato local español
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export function formatDate(date) {
    if (!date) return '';
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}

/**
 * Calcula el total de un pedido
 * @param {Object} order - Objeto pedido con sus items
 * @returns {number} Total en céntimos
 */
export function calculateOrderTotal(order) {
    let total = 0;

    // Sumar platos
    if (order.dishes) {
        total += order.dishes.reduce((sum, dish) => {
            return sum + (dish.price * (dish.order_has_dish?.quantity || 1));
        }, 0);
    }

    // Sumar bebidas
    if (order.drinks) {
        total += order.drinks.reduce((sum, drink) => {
            return sum + (drink.price * (drink.order_has_drink?.quantity || 1));
        }, 0);
    }

    // Sumar menús
    if (order.menus) {
        total += order.menus.reduce((sum, menu) => {
            return sum + (menu.price * (menu.order_has_menu?.quantity || 1));
        }, 0);
    }

    return total;
}

/**
 * Calcula el subtotal de un tipo específico de item
 * @param {Array} items - Array de items (platos, bebidas o menús)
 * @param {string} type - Tipo de item ('dish', 'drink', o 'menu')
 * @returns {number} Subtotal en céntimos
 */
export function calculateItemsSubtotal(items, type) {
    if (!items || !items.length) return 0;

    return items.reduce((sum, item) => {
        const quantity = item[`order_has_${type}`]?.quantity || 1;
        return sum + (item.price * quantity);
    }, 0);
}

/**
 * Obtiene un resumen del pedido
 * @param {Object} order - Objeto pedido
 * @returns {Object} Resumen con cantidades y totales
 */
export function getOrderSummary(order) {
    return {
        totalItems: (
            (order.dishes?.length || 0) +
            (order.drinks?.length || 0) +
            (order.menus?.length || 0)
        ),
        dishesTotal: calculateItemsSubtotal(order.dishes, 'dish'),
        drinksTotal: calculateItemsSubtotal(order.drinks, 'drink'),
        menusTotal: calculateItemsSubtotal(order.menus, 'menu'),
        total: calculateOrderTotal(order)
    };
}







export const helpers = {
    formatDate,
    calculateOrderTotal,
    calculateItemsSubtotal,
    getOrderSummary,
};

export default helpers;