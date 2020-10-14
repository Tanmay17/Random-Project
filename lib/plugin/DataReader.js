const csv = require( 'csv-parser' );
const converter = require( 'json-2-csv' );
const path = require( 'path' );
const fs = require( 'fs' );

module.exports = {

    getData: ( join_path='../../store/', filename='COVID-19 Tracker-Vaccines (1).csv' )=> {
        const results = [];

        return new Promise( ( resolve, reject )=> {

            const stream = fs.createReadStream( 
                path.join( __dirname, join_path, filename ))
                .pipe( csv() )

            stream.on( 'data', ( data ) => results.push( data ) )

            stream.on('error', e => {
                reject(e);
            });

            return stream.on( 'end', () => {
                resolve( results );
            } );

        } );
    },

    uploadFile: async ( file ) => {
        try {
            
            file.mv( path.join( __dirname, '../../store/uploads', file.name ), ( err )=> {

                if ( err ) throw new Error( 'Error Occured in Uploading Files' );

            } );

        } catch ( error ) {
            
            throw new Error( error );

        }
    },

    updateFileData: async ( data ) => {
        try {
            
            converter.json2csv( data, (err, csv) => {
            
                if (err) {
                    throw err;
                }
            
            } );
            
        } catch ( error ) {
            
            throw new Error( error );

        }
    }

}
