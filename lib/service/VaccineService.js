module.exports = {

    async filterData ( data, filter, filterOn ) {
        try {
            
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

    }

}