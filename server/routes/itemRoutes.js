const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../config/multer');
const { check } = require('express-validator');

router.post(
  '/',
  upload.single('image'),
  [
    check('type').notEmpty().withMessage('Type is required'),
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('category').notEmpty().withMessage('Category is required'),
    check('location').notEmpty().withMessage('Location is required')
  ],
  itemController.createItem
);

router.get('/', itemController.getAllItems);
router.put('/:id/resolve', itemController.resolveItem);
router.delete('/:id', itemController.softDeleteItem);

module.exports = router;