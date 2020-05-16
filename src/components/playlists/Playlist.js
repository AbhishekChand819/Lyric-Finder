import React from 'react'
import './Playlist.css'
import {Link} from 'react-router-dom'

const Playlist = (props) => {
    const {playlist} = props;
    return (
        <Link className="playlist_card_link" to={`playlist/${playlist.id}/${playlist.title}`}>
        <div className="cardContainer">
            <div className="cards">
            <div className="side front">
            <div className="img img1">
                <img src={playlist.picture_xl} alt="logo_playlist"/>
            </div>
            <div className="info">
                <h2 className="nb_track">{playlist.nb_tracks} tracks</h2>
                <p className="playlist_title">{playlist.title}</p>
            </div>
            </div>
        </div>
        </div>
        </Link>
    )
}

export default Playlist;
