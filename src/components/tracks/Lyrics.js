import React, { Component } from 'react'
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import './Player.css';

class Lyrics extends Component {
    state ={
        track:{},
        lyrics:{},
        message:{}
    }

    componentDidMount(){   
        axios({
            "method":"GET",
            "url":`https://canarado-lyrics.p.rapidapi.com/lyrics/${this.props.match.params.name}`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"canarado-lyrics.p.rapidapi.com",
            "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
            }
            })
        .then((res)=>{
            this.setState({lyrics:res.data.content[0].lyrics})
            if((document.getElementById("card_lyrics").clientHeight + 200) > 1390){
                document.getElementById("main_wrapper").style.minHeight = document.getElementById("card_lyrics").clientHeight + 400 + "px"
            } 
        })
        .catch((error)=>{
            this.setState({message: 'No Data Found'})
        })
        axios({
            "method":"GET",
            "url":`https://deezerdevs-deezer.p.rapidapi.com/track/${this.props.match.params.id}`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
            }
        })
        .then(res =>{
            this.setState({message: 'Success'})
            this.setState({track: res.data})
            setTimeout(()=>{
                if(document.getElementById("music")===null){
                    window.location.reload()
                }
                var music = document.getElementById("music");
                var playButton = document.getElementById("play");
                var pauseButton = document.getElementById("pause");
                var playhead = document.getElementById("elapsed");
                var timeline = document.getElementById("slider");
                var timer = document.getElementById("timer");
                var duration = document.getElementById("music").duration;
                pauseButton.style.visibility = "hidden";
        
                var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
                music.addEventListener("timeupdate", timeUpdate, false);
                music.addEventListener("ended", function(){
                    music.currentTime = 0;
                    playButton.style.visibility = "visible";
                    pauseButton.style.visibility = "hidden";
               });
                function timeUpdate() {
                    var playPercent = timelineWidth * (music.currentTime / duration);
                    playhead.style.width = playPercent + "px";
        
                    var secondsIn = Math.floor(((music.currentTime / duration) / 3.5) * 100);
                    if (secondsIn <= 9) {
                        timer.innerHTML = "0:0" + secondsIn;
                    } else {
                        timer.innerHTML = "0:" + secondsIn;
                    }
  
                }
                playButton.onclick = function() {
                    music.play();
                    playButton.style.visibility = "hidden";
                    pauseButton.style.visibility = "visible";
                }
                pauseButton.onclick = function() {
                    music.pause();
                    playButton.style.visibility = "visible";
                    pauseButton.style.visibility = "hidden";
                }  
            },2700)
        })
        .catch((error)=>{
        this.setState({message: 'No Data Found'})
        })

            
    }


    render() {
        const {track,lyrics,message} = this.state;
        window.scrollTo(0,0)
        if(message === 'No Data Found'){
            return (
                <div className="wrapper" id="main_wrapper">
                <div className="header" style={{height:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,80,151,1) 52%, rgba(255,191,80,1) 100%)"}}>
                    <div className="lyrics row" style={{width: "85%",margin: "120px auto"}}>
                        <div className="col-md-7">
                        <div className="card" id="card_lyrics">
                            <h5 className="card-header">
                                {track.title} by {' '}
                                <span className="text-secondary">{track.artist.name}</span>
                            </h5>
                            <div className="card-body" style={{fontSize:"1rem"}}>
                                <p className="card-text" style={{whiteSpace:"pre"}}>No lyrics found</p>
                            </div>
                        </div>
                    </div>
                        <div className="col-md-5" style={{height:"190px"}}>
                            <div className="player">
                                <ul>
                                    <li className="cover"><img src={track.album.cover_big} alt="Cover"/></li>
                                    <li className="info">
                                        <h1 className="main_title">{track.album.title}</h1>
                                        <h4 className="main_title" >{track.artist.name}</h4>
                                        <h2 className="track_title">{track.title}</h2>
                                        <div className="button-items">
                                            <audio id="music" preload="auto">
                                                <source src={track.preview} type="audio/mp3"/>
                                            </audio>
                                            <div id="slider"><div id="elapsed"></div></div>
                                            <p id="timer">0:00</p>
                                            <div className="controls">
                                                <span className="expend_back">
                                                    <svg className="step-backward" viewBox="0 0 25 25" xmlSpace="preserve">
                                                        <g><polygon points="4.9,4.3 9,4.3 9,11.6 21.4,4.3 21.4,20.7 9,13.4 9,20.7 4.9,20.7"/></g>
                                                    </svg>
                                                </span>
                                                <svg id="play" viewBox="0 0 25 25" xmlSpace="preserve">
                                                    <defs><rect x="-49.5" y="-132.9" width="446.4" height="366.4"/></defs>
                                                    <g><circle fill="none" cx="12.5" cy="12.5" r="10.8"/>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.7,6.9V18c0,0,0.2,1.4,1.8,0l8.1-4.8c0,0,1.2-1.1-1-2L9.8,6.5 C9.8,6.5,9.1,6,8.7,6.9z"/>
                                                    </g>
                                                </svg> 
                                                <svg id="pause" viewBox="0 0 25 25" xmlSpace="preserve">
                                                    <g>
                                                        <rect x="6" y="4.6" width="3.8" height="15.7"/>
                                                        <rect x="14" y="4.6" width="3.9" height="15.7"/>
                                                    </g>
                                                </svg>
                                                <span className="expend">
                                                    <svg className="step-foreward" viewBox="0 0 25 25" xmlSpace="preserve">
                                                    <g><polygon points="20.7,4.3 16.6,4.3 16.6,11.6 4.3,4.3 4.3,20.7 16.7,13.4 16.6,20.7 20.7,20.7"/></g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul className="list-group mt-3" style={{position: "absolute",width: "90%",top: "100%"}}>
                                <li className="list-group-item">
                                    <strong>Track Duration</strong>: {track.duration}
                                </li>
                                <li className="list-group-item">
                                    <strong>Album Name</strong>: {track.album.title}
                                </li>
                                <li className="list-group-item">
                                    <strong>Album Name</strong>: {track.album.release_date}
                                </li>
                                <li className="list-group-item">
                                    <strong>Explicit Words</strong>:{' '}
                                    {track.explicit_lyrics === false ? 'No' : 'Yes'}
                                </li>
                            </ul>
                        </div>
                    </div>
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
            )
        } else if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length ===0){
            return(
                <div className="spinner_cdiv" style={{position:"absolute",height:"100%",width:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,127,80,1) 60%, rgba(97,80,255,1) 100%)"}}>
                    <Spinner></Spinner>
                </div>
            )

        } else {
            return(
                <div className="lyrics_div wrapper" id="main_wrapper">
                <div className="header" style={{height:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,80,151,1) 52%, rgba(255,191,80,1) 100%)"}}>
                    <div className="lyrics row" style={{width: "85%",margin: "120px auto"}}>
                        <div className="col-md-7">
                        <div className="card" id="card_lyrics">
                            <h5 className="card-header">
                                {track.title} by {' '}
                                <span className="text-secondary">{track.artist.name}</span>
                            </h5>
                            <div className="card-body" style={{fontSize:"1rem"}}>
                                <p className="card-text" style={{whiteSpace:"pre"}}>{lyrics}</p>
                            </div>
                        </div>
                    </div>
                        <div className="col-md-5" style={{height:"190px"}}>
                            <div className="player">
                                <ul>
                                    <li className="cover"><img src={track.album.cover_big} alt="Cover"/></li>
                                    <li className="info">
                                        <h1 className="main_title">{track.album.title}</h1>
                                        <h4 className="main_title" >{track.artist.name}</h4>
                                        <h2 className="track_title">{track.title}</h2>
                                        <div className="button-items">
                                            <audio id="music" preload="auto">
                                                <source src={track.preview} type="audio/mp3"/>
                                            </audio>
                                            <div id="slider"><div id="elapsed"></div></div>
                                            <p id="timer">0:00</p>
                                            <div className="controls">
                                                <span className="expend_back">
                                                    <svg className="step-backward" viewBox="0 0 25 25" xmlSpace="preserve">
                                                        <g><polygon points="4.9,4.3 9,4.3 9,11.6 21.4,4.3 21.4,20.7 9,13.4 9,20.7 4.9,20.7"/></g>
                                                    </svg>
                                                </span>
                                                <svg id="play" viewBox="0 0 25 25" xmlSpace="preserve">
                                                    <defs><rect x="-49.5" y="-132.9" width="446.4" height="366.4"/></defs>
                                                    <g><circle fill="none" cx="12.5" cy="12.5" r="10.8"/>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.7,6.9V18c0,0,0.2,1.4,1.8,0l8.1-4.8c0,0,1.2-1.1-1-2L9.8,6.5 C9.8,6.5,9.1,6,8.7,6.9z"/>
                                                    </g>
                                                </svg> 
                                                <svg id="pause" viewBox="0 0 25 25" xmlSpace="preserve">
                                                    <g>
                                                        <rect x="6" y="4.6" width="3.8" height="15.7"/>
                                                        <rect x="14" y="4.6" width="3.9" height="15.7"/>
                                                    </g>
                                                </svg>
                                                <span className="expend">
                                                    <svg className="step-foreward" viewBox="0 0 25 25" xmlSpace="preserve">
                                                    <g><polygon points="20.7,4.3 16.6,4.3 16.6,11.6 4.3,4.3 4.3,20.7 16.7,13.4 16.6,20.7 20.7,20.7"/></g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul className="list-group mt-3" style={{position: "absolute",width: "90%",top: "100%"}}>
                                <li className="list-group-item">
                                    <strong>Track Duration</strong>: {track.duration}
                                </li>
                                <li className="list-group-item">
                                    <strong>Album Name</strong>: {track.album.title}
                                </li>
                                <li className="list-group-item">
                                    <strong>Album Name</strong>: {track.album.release_date}
                                </li>
                                <li className="list-group-item">
                                    <strong>Explicit Words</strong>:{' '}
                                    {track.explicit_lyrics === false ? 'No' : 'Yes'}
                                </li>
                            </ul>
                        </div>
                    </div>
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
            )

        }
    }
}

export default Lyrics

