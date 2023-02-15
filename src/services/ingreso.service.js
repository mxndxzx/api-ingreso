const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');

class Service {
    
    db = {};

    constructor() {
        this.db = connect();
        // Dev
        this.db.sequelize.sync().then( () => {
            logger.info('Synced DB');
        });
    };

    async getUser(userId) {
        try {
            const user = await this.db.ingresos.findAll({
                where : {
                    dni: userId
                }
            });
            return user;
        } catch (err) {
            logger.error('Error::' + err);
            // console.log(err.original)
            return err;
        };
    };
    
    async getDate(date) {
        try {
            const user = await this.db.ingresos.findAll({
                where : {
                    fecha_scan: date
                }
            });
            
            logger.info('Service return::' + user);
            return user;
        } catch (err) {
            logger.error('Error::' + err);
            return [];
        }
    };

    async createReg(body) {
        let data = {};

        try {
            body.fecha_scan = new Date().toISOString();
            body.logon_scan = 'lp2076';
            
            data = await this.db.ingresos.create(body);
            return data;
        } catch (err) {
            logger.error('Error::' + err);
            return [];
        }
    };

    async updateReg() {

    };

    async deleteReg(head) {
        let data = {};
        
        try {
            data = await this.db.ingresos.destroy({
                where : {
                    dni: head.dni,
                    fecha_scan: head.date,
                }
            });
        } catch (err) {
            logger.error('Error::' + err);
            return [];
        }
    };
};

module.exports = new Service();



// const getAllRegs = () => {
//     const allRegs = User.getAllRegs();
//     return allRegs;
// };

// const getDayRegs = (userId) => {
//     const user = User.getDayRegs(userId);
//     return user;
// };

// const createReg = (newReg) => {
//     const userToAdd = {
//         ...newReg,
//         // id / uuid
//         fecha_scan: new Date()
//     };

//     const createdReg = User.createReg(userToAdd);

//     return createdReg;
// };

// const updateReg = () => {
//     return;
// };

// const deleteReg = () => {
//     return;
// };

// module.exports = {
//     getAllRegs,
//     getDayRegs,
//     createReg,
//     updateReg,
//     deleteReg,
// };