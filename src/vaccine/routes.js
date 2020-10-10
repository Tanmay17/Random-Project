const express = require( 'express' );
const { Validator } = require( '../../lib/plugin' );
const { get_vaccine_info, update_vaccine_status } = require( './handler' );

const router = express.Router();

// To get the vaccine info.
router.get( '/vaccine', Validator.validate( 'getVaccine' ), get_vaccine_info );

// To update the vaccine status
// req.files.file
router.post( '/vaccine', update_vaccine_status );

module.exports = router;