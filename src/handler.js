const Joi = require( 'joi' );

const get_vaccine_info = function get_vaccine_info ( req, res ) {

    const data = { filter, filterOn, sortType, sortOn } = req.query;

    // const schema =  Joi.object( {
    //     filterOn: Joi.string().valid( 'CATEGORY', 'RESEARCHER', 'STAGE' ).optional(),
    //     filter: Joi.string().when( 'filterOn' ),
    //     sortOn: Joi.string().valid( 'RESEARCHER', 'NAME', 'STAGE' ).optional(),
    //     sortType: Joi.string().when( 'sortOn' ).valid( 'ASC', 'DESC' ).default( 'ASC' )
    // } );

    try {

        return res.sendStatus( 200 );

    } catch( error ) {

        console.error( 'GET /vaccine =>', error.message );
        return res.sendStatus( 500 );

    }
}

module.exports = {

    get_vaccine_info

}