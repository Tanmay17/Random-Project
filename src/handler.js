const Joi = require( 'joi' );
const { Plugin: { DataReader } } = require( '../lib' );

const get_vaccine_info = async function get_vaccine_info ( req, res ) {

    const { filter, filterOn, sortType, sortOn } = req.query;

    // const schema =  Joi.object( {
    //     filterOn: Joi.string().valid( 'CATEGORY', 'RESEARCHER', 'STAGE' ).required(),
    //     filter: Joi.when( 'filterOn', {
    //         is: Joi.required(),
    //         then : Joi.string().disallow( '' ).disallow( null )
    //     } ),
    //     sortOn: Joi.string().valid( 'RESEARCHER', 'NAME', 'STAGE' ).optional(),
    //     sortType: Joi.string().disallow( '' ).disallow( null ).when( 'sortOn', {
    //         is: Joi.string().valid( 'ASC', 'DESC' ).required(),
    //         then: Joi.string().required()
    //     } )
    // } );

    // schema.validate( req.query, ( err ) => { 
    //     if ( err ) return res.sendStatus( 400 );
    // } );

    try {

        const file_data = await DataReader.getData();

        return res.sendStatus( 200 );

    } catch( error ) {

        console.error( 'GET /vaccine =>', error.message );
        return res.sendStatus( 500 );

    }
}

module.exports = {

    get_vaccine_info

}