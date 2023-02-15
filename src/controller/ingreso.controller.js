const service = require('../services/ingreso.service');
const logger = require('../logger/api.logger');

// Methods controller
class Controller {

    async getUser(req,res) {
        const userId = req.body.dni;
        logger.info('Controller:: ' + userId);
        await service.getUser(userId);
        
        // res.send(new Date());
    };

    async getDate(req,res) {
        const date = req.body.date;
        logger.info('Controller::' + date);
        return await service.getDate(date);
    };

    async createReg(req,res) {
        const { body } = req;
        logger.info('Controller::' + body);
        return await service.createReg(body);
        // body == undefined ? res.status(500).send('body does not contain nothing') : res.status(200).send(body);
    };

    async updateReg(req,res) {
        const { body } = req;
        logger.info('Controller::' + body);
        return await service.updateReg(body);
    };

    async deleteReg(req,res) {
        const data = {
            dni: req.headers.dni,
            date: req.headers.flavio,
        };
        logger.info('Controller::' + data);
        return await service.deleteReg(data);
    };
};

module.exports = new Controller();









// // Methods
// const getAll = (req, res) => {
//     const allRegs = ingresoService.getAllRegs();
//     res.send( { status: 200, user: allRegs } );
// };

// const getUser = (req, res) => {
//     const getDayRegs = ingresoService.getDayRegs();
//     res.send(`Get one reg (controller)`);
// };

// const createReg = (req, res) => {
//     const { body } = req;

//     if (
//         !body.user.nombre ||
//         !body.user.apellido ||
//         !body.user.dni
//     ) { return res.send( { status: 404, error: 'Cannot validate' } ) }
//     // else { res.send( { status: 404, error: 'Cannot validate' } ) };

//     const newReg = {
//         id: body.user.id,
//         tramite: body.user.tramite,
//         apellido: body.user.apellido,
//         nombre: body.user.nombre,
//         sexo: body.user.sexo,
//         dni: body.user.dni,
//         ejemplar: body.user.ejemplar,
//         fecha_nacimiento: body.user.fecha_nacimiento,
//         fecha_emision: body.user.fecha_emision,
//         cuil: body.user.cuil,
//         logon_scan: body.user.logon_scan
//     };
    
//     const createdReg = ingresoService.createReg(newReg);
    
//     res.status(201).send( { user: createdReg } )
// };

// const updateReg = (req, res) => {
//     const updatedReg = ingresoService.updateReg();
//     res.send('Update existing reg (controller)');
// };

// const deleteReg = (req, res) => {
//     ingresoService.deleteReg();
//     res.send('Delete existing reg (controller)');
// };

// module.exports = {
//     getAllRegs,
//     getDayRegs,
//     createReg,
//     updateReg,
//     deleteReg,
// };