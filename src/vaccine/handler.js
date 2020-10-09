const Joi = require( 'joi' );
const { Plugin: { DataReader } } = require( '../../lib' );
const { VaccineService } = require( '../../lib/service' );

let fileData;
try {
    ( async () => {
        fileData = await DataReader.getData();
    } )();
} catch( err ) {
    console.log( err );
}

const get_vaccine_info = async function get_vaccine_info ( req, res ) {

    const { search, filterOn, sortType, sortOn, page } = req.query;

    // const schema =  Joi.object( {
    //     page: Joi.number(),
    //     filterOn: Joi.string().valid( 'CATEGORY', 'RESEARCHER', 'STAGE' ).required(),
    //     search: Joi.when( 'filterOn', {
    //         is: Joi.required(),
    //         then : Joi.string().disallow( '' ).disallow( null )
    //     } ),
    //     sortOn: Joi.string().valid( 'RESEARCHER', 'STAGE' ).optional(), //array
    //     sortType: Joi.string().disallow( '' ).disallow( null ).when( 'sortOn', {
    //         is: Joi.string().valid( 'ASC', 'DESC' ).required(),
    //         then: Joi.string().required()
    //     } )
    // } );

    // schema.validate( req.query, ( err ) => { 
    //     if ( err ) return res.sendStatus( 400 );
    // } );

    try {

        var data;

        if ( search && filterOn ){

            data = await VaccineService.filterData( fileData, search, filterOn );

            if ( !data ) {

                return res.sendStatus( 422 );

            }

        }

        if ( sortType && sortOn ){

            data = await VaccineService.sortData( fileData, sortType, sortOn );

            if ( !data ) {

                return res.sendStatus( 422 );

            }

        }

        if ( !search && !filterOn ){

            const paginatedData = await VaccineService.paginatedData( fileData, page );

            if ( !paginatedData ) {

                return res.sendStatus( 422 );

            }

            return res.send( { data: paginatedData } ).status( 200 );

        }
        return res.send( { data } ).status( 200 );

    } catch( error ) {

        console.error( 'GET /vaccine =>', error.message );
        return res.sendStatus( 500 );

    }
}

module.exports = {

    get_vaccine_info

}