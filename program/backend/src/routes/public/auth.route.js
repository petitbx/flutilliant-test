const { authController, addressController, contactController, visitController} = require('../../controllers');
const express = require('express');
const { authValidator, addressValidator, contactValidator, visitValidator} = require('../../validator');
const router = express.Router();
const validate = require('../../middlewares/validator.middleware')
const verifyToken = require('../../middlewares/token.middleware');

router.post('/logout', verifyToken, authController.logout);
router.post('/login', validate(authValidator.login), authController.login);
router.post('/address', [verifyToken, validate(addressValidator.addressBody)], addressController.createAddress)
router.put('/address/:id', [verifyToken, validate(addressValidator.addressBody)], addressController.updateAddress)
router.get('/address', [verifyToken], addressController.getAddresses);
router.get('/address/:id', [verifyToken], addressController.getAddress);
router.post('/contact', [verifyToken, validate(contactValidator.contactBody)], contactController.createContact)
router.put('/contact/:id', [verifyToken, validate(contactValidator.contactBody)], contactController.updateContact)
router.get('/contact', [verifyToken], contactController.getContacts);
router.get('/contact/:id', [verifyToken], contactController.getContact);
router.post('/visit', [verifyToken, validate(visitValidator.visitBody)], visitController.createVisit);
router.put('/visit/:id', [verifyToken, validate(visitValidator.visitBody)], visitController.updateVisit);
router.delete('/visit/:id', verifyToken, visitController.deleteVisit)
router.get('/visit', verifyToken, visitController.getVisitsFiltered);


module.exports = router;