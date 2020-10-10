const { validationResult } = require( 'express-validator' );
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
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        
        return res.status( 400 ).json( { errors: errors.array() } );
        
    }

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

const update_vaccine_status = async function update_vaccine_status( req, res ) {
    
    try {

        if ( !req.files || !req.files.file ) {
            
            return res.sendStatus( 400 );

        }

        const { file } = req.files;

        const fileName = file.name;
        await DataReader.uploadFile( file );
        const newFileData = await DataReader.getData( '../../store/uploads', fileName );

        if ( !newFileData ) {

            return res.sendStatus( 422 );

        }

        await VaccineService.updateData( fileData, newFileData ); 

        return res.sendStatus( 200 );

    } catch ( error ) {

        console.error( 'POST /vaccine =>', error.message );
        return res.sendStatus( 500 );
    
    }

}

module.exports = {

    get_vaccine_info,
    update_vaccine_status

}