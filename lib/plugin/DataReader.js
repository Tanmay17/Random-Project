const csv = require( 'csv-parser' );
const path = require( 'path' );
const fs = require( 'fs' );

const results = [];

module.exports = {

    getData: ()=> {
        return new Promise( ( resolve, reject )=> {

            let stream = fs.createReadStream( 
                path.join( __dirname, '../../store/COVID-19 Tracker-Vaccines (1).csv' ))
                .pipe( csv() )

            stream.on( 'data', ( data ) => results.push(data) )

            stream.on('error', e => {
                reject(e);
            });

            return stream.on( 'end', () => {
                resolve( results );
            } );

        } );
    }

}
