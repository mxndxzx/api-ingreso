const service = require('../services/ingreso.service');
const logger = require('../logger/api.logger');

// Methods controller
class Controller {

    async getUser(req,res) {
        const userId = req.body.dni;
        // logger.info('Controller:: ' + userId);

        const response = await service.getUser(userId);

        if ( response != '' && !response.message ) {
            res.status(200).send({
                status: "OK",
                data: response,
            });
        } else if (response.name) {
            res.status(500).send({
                status: "FAILED",
                msg: response.message,
            });
        } else {
            res.status(400).send({
                status: "ERROR",
                msg: "No records found with the given userId"
            });
        };
        // Ready
    };

    async getDate(req,res) {
        const date = req.body.date;
        // logger.info('Controller::' + date);
        const response = await service.getDate(date);

        if ( response != '' ) {
            res.status(200).send({
                status: "OK",
                data: response,
            });
        } else if (response.name) {
            res.status(500).send({
                status: "FAILED",
                msg: response.message,
            });
        } else {
            res.status(400).send({
                status: "ERROR",
                msg: "No records found with the given date"
            });
        };
        // Ready
    };

    async createReg(req,res) {
        const { body } = req;
        // console.log(req.body)
        // logger.info('Controller::' + body);
        const response = await service.createReg(body);

        if (response.id) {
            res.status(201).send({
                status: "OK",
                data: response
            })
        } else {
            res.status(400).send({
                status: "ERROR",
                msg: response.message
            })
        };
        // Ready
    };

    async updateReg(req,res) {
        const { body } = req;
        logger.info('Controller::' + body);
        return await service.updateReg(body);
        // Pending
    };

    async deleteReg(req,res) {
        const data = {
            dni: req.headers.dni,
            date: req.headers.flavio,
        };
        logger.info('Controller::' + data);
        return await service.deleteReg(data);
        // Pending
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