const express = require('express');
const controller = require('../../controller/ingreso.controller')

const router = express.Router();

// URLs
router
    // User regs
    .get('/getUser', controller.getUser)
    
    // Date regs
    .get('/getDate', controller.getDate)
    
    // Create reg
    .post('/create', controller.createReg)

    // Update reg
    .patch('/update', controller.updateReg)

    // Delete reg
    .delete('/delete', controller.deleteReg);

module.exports = router;