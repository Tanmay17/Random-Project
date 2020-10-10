const moment = require( 'moment' );
const { DataReader } = require( '../plugin' );

module.exports = {

    async filterData ( data, search, filterOn ) {
        try {

            switch ( filterOn ) {

                case 'CATEGORY':
                    data = data.filter( f => f[ 'Product Category' ].toLowerCase().search( search.toLowerCase() ) > -1 );
                    break;
                case 'RESEARCHER':
                    data = data.filter( f => f[ '\ufeffDeveloper / Researcher' ].toLowerCase().search( search.toLowerCase() ) > -1 );
                    break;
                case 'STAGE':
                    data = data.filter( f => f[ 'Stage of Development' ].toLowerCase() === search.toLowerCase() );
                    break;
                default: 
                    throw new Error( 'Incorrect Filter Strategy' );
            
            }

            return data;

        } catch (error) {

            throw error;

        }
    },

    async sortData ( data, sortType, sortOn ) {

        try {
        
            if ( sortOn.includes( 'RESEARCHER' ) ) {
                sortOn = '\ufeffDeveloper / Researcher';
            
                switch( sortType ){
                    case 'ASC':
                        data = data.sort( ( a, b )=> {
                            return a[ sortOn ] < b[ sortOn ] ? -1 : a[ sortOn ] > b[ sortOn ] ? 1 : 0;
                        } )
                        break;
                    case 'DESC':
                        data = data.sort( ( a, b )=> {
                            return a[ sortOn ] > b[ sortOn ] ? -1 : a[ sortOn ] < b[ sortOn ] ? 1 : 0;
                        } )
                        break;
                    default:
                        throw new Error( 'Incorrect Sorting Type' );
                }
            
            }
    
            if ( sortOn.includes( 'STAGE' ) ) {
            
                sortOn = 'Stage of Development';
                let preList = [];
                let p1List = [];
                let p2List = [];
                let p3List = [];
            
                for ( const obj of data ) {
                    if ( obj[ 'Stage of Development' ] === 'Pre-clinical' ) {
    
                        preList.push( obj );
    
                    } else if ( obj[ 'Stage of Development' ] === 'Phase I' ) {
    
                        p1List.push( obj );
    
                    } else if ( obj[ 'Stage of Development' ] === 'Phase II' ) {
    
                        p2List.push( obj );
    
                    } else if ( obj[ 'Stage of Development' ] === 'Phase III' ) {
    
                        p3List.push( obj );
    
                    }
                }
    
                switch( sortType ){
                    case 'ASC':
                        data = preList.concat( p1List, p2List, p3List );
                        break;
                    case 'DESC':
                        data = p3List.concat( p2List, p1List, preList );
                        break;
                    default:
                        throw new Error( 'Incorrect Sorting Type' );
                }
            
            }
            
            return data;
        
        } catch (error) {

            throw error;
        
        }

    },

    async paginatedData( data, page=0 ) {

        try {
            
            const size = 10
            const pageNo = parseInt( page );
            const totalSize = data.length;

            if( totalSize <= size ) {

                return {
                    data,
                    page: {
                        prev: 0,
                        curr: 0,
                        next: null
                    }
                }

            } else {
                
                const curr = pageNo;
                var prev;
            
                const windowData = data.slice( (pageNo * size), ( (pageNo + 1) * size) );
                const prevList = data.slice( (( pageNo - 1 ) * size), (( pageNo ) * size) );
                
                if ( (pageNo - 1) < 0 ){

                    prev = 0;
                
                } else {
                    
                    if( !prevList.length ) {
                        prev = null;
                    } else {
                        prev = pageNo-1;
                    }
                
                }

                const nextList = data.slice( (( pageNo + 1 ) * size), ((pageNo + 2) * size) );
                const next = ( !nextList.length )? null: ( pageNo+1 );
                
                return {
                    data: windowData,
                    page: {
                        prev,
                        curr,
                        next
                    }
                }

            }

        } catch ( error ) {

            throw error;

        }

    },

    async updateData( oldData, newData ) {
        
        try {
            
            const newDictionary = {};

            for ( const val of newData ) {

                const researcher = val[ 'Developer / Researcher' ];
                const stage = val[ 'Stage of Development' ];
                newDictionary[ researcher ] = stage;

            }

            for ( const val of oldData ) {

                if( newDictionary.hasOwnProperty( val[ '\ufeffDeveloper / Researcher' ] )  ) {

                    val[ 'Stage of Development' ] = newDictionary[ val[ '\ufeffDeveloper / Researcher' ] ];
                    val[ 'Date Last Updated' ] = moment().format( 'L' );

                }

            }
            
            await DataReader.updateFileData( oldData );
            
        } catch ( error ) {

            throw error;

        }

    }

}