const express = require('express')

const { get_vaccine_info } = require( './handler' );

const router = express.Router();

// To get vaccine info.
router.get( '/vaccine', get_vaccine_info );

module.exports = router;