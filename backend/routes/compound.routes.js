const express = require('express');
const router = express.Router();
const compoundController = require('../controllers/compound.controller');

router.get('/', compoundController.getAllCompounds);
router.get('/:id', compoundController.getCompoundById);
router.post('/', compoundController.createCompound);
router.put('/:id', compoundController.updateCompound);
router.delete('/:id', compoundController.deleteCompound);

module.exports = router;
