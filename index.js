const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const bodyParser = require( 'body-parser' );

const app = express()
const routes = require( './src/vaccine/routes' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( fileUpload( {
        createParentPath: true
    } ) 
);

app.use( '/', routes );

app.listen( 3000, () => {

    console.log( 'Server is listening on port 3000' );

} );

module.exports = {
    app
}