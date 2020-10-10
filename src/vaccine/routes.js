const express = require( 'express' );
const { get_vaccine_info, update_vaccine_status } = require( './handler' );

const router = express.Router();

// To get the vaccine info.
router.get( '/vaccine', get_vaccine_info );

// To update the vaccine status
router.post( '/vaccine', update_vaccine_status );

module.exports = router;