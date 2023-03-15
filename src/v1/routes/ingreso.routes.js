const express = require('express');
const controller = require('../../controller/ingreso.controller')

const router = express.Router();

// URLs
router
    // User regs
    .get('/users/:userId', controller.getUser)
    
    // Date regs
    .get('/date/:date', controller.getDate)
    
    // Create reg
    .post('/users', controller.createReg)

    // Update reg
    .patch('/users/:recId', controller.updateReg)

    // Delete reg
    .delete('/users/:recId', controller.deleteReg);

module.exports = router;