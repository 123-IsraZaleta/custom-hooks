import { useEffect, useRef, useState } from 'react';

import '../components/02-useEffect/effects.css';

export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ loading: true, data: null, error: null });


    useEffect( () => {

        return () => {
            isMounted.current = false;
        }

    }, []);

    useEffect(() => {

        setState({ loading: true, data: null, error: null });
        
        fetch(url)
            .then( resp => resp.json())
            .then( data => {

                if ( isMounted.current ){

                    setState({
                        loading: false,
                        error: null,
                        data,
                    })
                }
            })
            .catch( () => {
                setState({
                    data:null,
                    loading: true,
                    error: 'No se encontro URL',
                })
            })

    }, [url]);

    return state;

}
