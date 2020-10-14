const { query, body } = require( 'express-validator' )

exports.validate = ( method ) => {

    switch ( method ) {
        case 'getVaccine': {
            return [ 
                query( 'page' ).isInt().optional(),
                query( 'filterOn', 'Invalid Filter' ).isIn( [ 'CATEGORY', 'RESEARCHER', 'STAGE' ] ).if( query( 'search' ).exists() ).optional(),
                query( 'search', 'Invalid Search Strategy' ).if( query( 'filterOn' ).exists() ).isString(),
                query( 'sortOn', 'Invalid Sort On' ).isArray().isIn( [ 'RESEARCHER', 'STAGE' ] ).if( query( 'sortType' ).exists() ).optional(),
                query( 'sortType', 'Invalid Sort Strategy' ).if( query( 'sortOn' ).isIn( [ 'ASC', 'DESC' ] ).exists() ).isString(),
            ]   
        }
    }
}