import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Row = ({title, fetchURL}) => {
        const[movies,setMovies] = useState([])

        useEffect(()=> {
            axios.get(fetchURL).then((response) =>{
                setMovies(response.data.results)
            })
        }, [fetchURL])

        console.log(movies)



  return (
    <div> 
        <h2 className='text-white font-bold md:text-xl p-4'> {title}</h2>
        <div className='relative flex items-center'>
            <div>
                <div id={'slider'}>
                    {movies.map }




                </div>

            </div>

        </div>


    </div>
  )
}

export default Row