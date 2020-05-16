import React from 'react'
import Tracks from '../tracks/Tracks'
import Search from '../tracks/Search'
import Playlists from '../playlists/Playlists'
import Trending from '../trending/Trending'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <React.Fragment>
            <div className="wrapper" id="main_wrapper">
            <div className="header">
                <ul className="menu">
                <a href="http://abhishekchand.cf/" target="_blank" rel="noopener noreferrer"> 
                    <li style={{fontSize:"20px",cursor:"pointer"}}>Contact Me</li>
                </a>
                </ul>
                <Link to="/">
                    <h2 style={{cursor:"pointer"}} className="heading">LyricsFinder</h2>
                </Link>
                <img className="logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/626071/line-logo.svg" alt="img"/>
                <img className="curve" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/626071/bottom-curve_copy.svg" alt="img"/>
                <img className="waves" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/626071/waves_copy.svg" alt="img"/>
            </div>
            </div>
            <Search></Search>
            <Tracks></Tracks>
            <Playlists></Playlists>
            <Trending></Trending>
        </React.Fragment>
    )
}

export default Index
