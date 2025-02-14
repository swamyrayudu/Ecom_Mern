const { addfeatureImage, getfeatureImage, deleteFeatureImage } = require('../../controlers/admin/feature-contoller');
const express = require('express');
const router = express.Router();

router.post('/addfeature', addfeatureImage);
router.get('/getfeature', getfeatureImage);
router.delete('/deletefeature/:id', deleteFeatureImage);

module.exports = router;