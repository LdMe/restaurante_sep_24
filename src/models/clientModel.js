import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js";

const Client = sequelize.define("client", {
    client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User, // 'User' would also work
            key: 'user_id',
        },

    }
})

/* Client.belongsTo(User,{
    foreignKey: 'user_id',
  });
User.hasOne(Client,{
    foreignKey: 'user_id',
  }); */

export default Client;