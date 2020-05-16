import React from 'react'
import './Track.css'
import {Link} from 'react-router-dom'

const Track = (props) => {
    const {track} = props;
    return (
        <div id="container">
            <Link to={`lyrics/track/${track.id}/${track.title} ${track.artist.name}`} className="card-link" style={{cursor:"pointer",color:"black",textDecoration:"none"}}>
                <article className="blog-card">
                    <img className="post-image" src={track.album.cover_big} alt="logo_track" />
                    <div className="article-details">
                    <h4 className="post-category">{track.artist.name}</h4>
                    <h3 className="post-title">{track.title}</h3>
                    <p className="post-description">{track.album.title}</p>
                    </div>
                </article>
            </Link>
        </div>

    )
}

export default Track;
