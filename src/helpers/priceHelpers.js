/**
 * Formatea un precio de céntimos a euros con 2 decimales
 * @param {number} cents - Precio en céntimos
 * @returns {string} Precio formateado en euros con 2 decimales
 */
export function formatPrice(cents) {
    return (cents / 100).toFixed(2);
}

/**
 * Formatea un precio para mostrarlo con símbolo de moneda
 * @param {number} cents - Precio en céntimos
 * @param {string} currency - Símbolo de moneda (por defecto €)
 * @returns {string} Precio formateado con símbolo de moneda
 */
export function formatPriceWithCurrency(cents, currency = '€') {
    return `${formatPrice(cents)}${currency}`;
}