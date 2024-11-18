import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Local from "./localModel.js";
import Client from "./clientModel.js";

const Order = sequelize.define('order', {
    order_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

/* Order.belongsTo(Local, { foreignKey: 'local_id' });
Order.belongsTo(Client, { foreignKey: 'client_id' });
 */
export default Order;