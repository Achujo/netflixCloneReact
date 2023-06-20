import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import axios from '../../axios'
import './RowPost.css'
import { imageUrl,API_KEY } from '../../constants/constants'

function RowPost(props) {

    const [movies, setMovies] = useState([])

    const [urlId, seturlId] = useState('')

    useEffect(() => {
        axios.get(props.url).then(response => {
            console.log(response.data);
            setMovies(response.data.results)
        })
    }, [])

    const opts = {
        height: '250',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const handleMovie = (id) => {
        console.log(id);
axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
    if (response.data.results.length!==0){

        seturlId(response.data.results[0])
    } else{
        console.log('Trailer not Available');
    }
})
    }


    return (
        <div className='row'> <br></br>  <br></br>

            <h2>{props.title}</h2>

            <div className='posters'>
                {movies.map((obj) =>

                    <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />


                )}




            </div>

        {urlId &&   <Youtube opts={opts} videoId={urlId.key} /> }

        </div>
    )
}

export default RowPost
