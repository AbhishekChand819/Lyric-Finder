import React from 'react'
import {Link} from 'react-router-dom'
import './Trending.css'

const Trend = (props) => {
    const {trend} = props;
    return (
        <div id="containers">
            <Link to={`lyrics/track/${trend.id}/${trend.title} ${trend.artist.name}`} className="card-link" style={{cursor:"pointer",color:"black",textDecoration:"none"}}>
                <article className="blog-card">
                    <img className="post-image" src={trend.album.cover_big} alt="logo_trend" />
                    <div className="article-details">
                    <h4 className="post-category">{trend.artist.name}</h4>
                    <h3 className="post-title">{trend.title}</h3>
                    <p className="post-description">{trend.album.title}</p>
                    </div>
                </article>
            </Link>
        </div>
    )
}

export default Trend;
