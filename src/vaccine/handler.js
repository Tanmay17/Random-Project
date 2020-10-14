const { validationResult } = require( 'express-validator' );
const { Plugin: { DataReader } } = require( '../../lib' );
const { VaccineService } = require( '../../lib/service' );

let fileData;
try {
    ( async () => {

        console.log( 'Reading Pre-defined File Data' );
        fileData = await DataReader.getData();
        console.log( 'Read Pre-defined File Data' );
    
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

            console.log( 'GET /vaccine => Filtering Vaccines Data' );
            data = await VaccineService.filterData( fileData, search, filterOn );
            console.log( 'GET /vaccine => Filtered Vaccines Data' );

            if ( !data ) {

                console.error( 'GET /vaccine => Some Error Occured while Filtering Data' );
                return res.sendStatus( 422 );

            }

        }

        if ( sortType && sortOn ){

            console.log( 'GET /vaccine => Sorting Vaccines Data' );
            data = await VaccineService.sortData( fileData, sortType, sortOn );
            console.log( 'GET /vaccine => Sorted Vaccines Data' );

            if ( !data ) {

                console.error( 'GET /vaccine => Some Error Occured while Sorting Data' );
                return res.sendStatus( 422 );

            }

        }

        if ( !search && !filterOn ){

            console.log( 'GET /vaccine => Paginating Vaccines Data' );
            const paginatedData = await VaccineService.paginatedData( fileData, page );
            console.log( 'GET /vaccine => Paginated Vaccines Data' );

            if ( !paginatedData ) {

                console.error( 'GET /vaccine => Some Error Occured while Paginating Data' );
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

        console.log( 'POST /vaccine => Uploading New File' );
        await DataReader.uploadFile( file );
        console.log( 'POST /vaccine => Uploading New File' );

        console.log( 'POST /vaccine => Reading New File' );
        const newFileData = await DataReader.getData( '../../store/uploads', fileName );
        console.log( 'POST /vaccine => Read New File' );

        if ( !newFileData ) {

            console.error( 'POST /vaccine => Some Error Occured while Reading New File' );
            return res.sendStatus( 422 );

        }

        console.log( 'POST /vaccine => Updating Vaccine Data' );
        await VaccineService.updateData( fileData, newFileData );
        console.log( 'POST /vaccine => Updated Vaccine Data' );

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