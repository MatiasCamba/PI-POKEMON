const {DataTypes, Sequelize} = require('sequelize')

module.exports = (sequelize) => {
    const Type = sequelize.define('type',{
    id: {
        type: DataTypes.UUID,
        primaryKey : true,
        allowNull: false,
        defaultValue : Sequelize.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})


}
  

