module.exports = (sequelize, DataTypes, Model) => {

    class User extends Model { otherPublicField; };

    User.init({

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        tramite: {
            type: DataTypes.INTEGER,
        },
        
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },

        sexo: {
            type: DataTypes.STRING,
        },

        dni: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        ejemplar: {
            type: DataTypes.STRING,
        },

        fecha_nacimiento: {
            type: DataTypes.DATE,
        },

        fecha_emision: {
            type: DataTypes.DATE,
        },

        fecha_scan: {
            type: DataTypes.DATE,
            allowNull: false
        },

        logon_scan: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'users',
        modelName: 'User',
        timestamps: false,
        sequelize
    });

    return User;
};