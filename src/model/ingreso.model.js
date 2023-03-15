module.exports = (sequelize, DataTypes, Model) => {

    class User extends Model {};

    User.init({

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        user_surname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING(7),
            allowNull: false
        },

        scan_time: {
            type: DataTypes.DATE,
            allowNull: false
        },

        area: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        description: {
            type: DataTypes.STRING(500),
        },

        scan_logon: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
    }, {
        tableName: process.env.DB_TABLE,
        modelName: 'User',
        createdAt: false,
        updatedAt: true,
        sequelize
    });
    
    return User;
};