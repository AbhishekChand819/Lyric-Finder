
import React from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner' 
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
 
export default class Playlist extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      tracks:{},
      slides:[],
    };
  }
 
  componentDidMount() {
    axios({
        "method":"GET",
        "url":`https://deezerdevs-deezer.p.rapidapi.com/playlist/${this.props.match.params.id}`,
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
        }
    })
    .then((res)=>{
      this.setState({tracks:res.data.tracks.data})
      var arr=[];
      var finalarr = [];
      var incr;
      if(window.screen.width<500)
      { incr = 6; } else { incr = 20; }
      var slidescount = Math.ceil(this.state.tracks.length/incr)
      var intial=0;
      var final = incr;
      for(let j=0;j<slidescount;j++){
        if(j>0){
          intial += incr;
          final += incr;
          if(final>this.state.tracks.length){
            final = this.state.tracks.length
          }
        }
        for(let i=intial;i<final;i++){
          arr.push(this.state.tracks[i])
        }
        finalarr.push(arr)
        arr =[];
      }
      this.setState({slides:finalarr})
    })
  }
 
  render() {
    const {tracks,slides} = this.state;
    if(tracks === undefined || Object.keys(tracks).length ===0){
      return(
          <div className="playlist_div" style={{position:"absolute",height:"100%",width:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,127,80,1) 60%, rgba(97,80,255,1) 100%)"}}>
              <Spinner></Spinner>
          </div>
      )} else {
        return (
          <React.Fragment>
            <div className="wrapper playlist_collect" id="main_wrapper" style={{minHeight:"890px"}}>
              <div className="header" style={{height:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,80,151,1) 52%, rgba(255,191,80,1) 100%)"}}>
                <div className="row" style={{width: "85%",margin: "120px auto"}}>
                  <h1 style={{width:"100%",color:"white",fontWeight:"bolder",fontSize:"30px"}}>{this.props.match.params.name}</h1>
                  <Carousel>
                    {slides.map(track=>
                      <div key={track} className="row slide_div">
                        {track.map(item => 
                            <div id="container" style={{width:"19%",height: "100%",marginRight:"10px"}} key={item.id}>
                              <Link to={`../../lyrics/track/${item.id}/${item.title} ${item.artist.name}`} className="card-link" style={{cursor:"pointer",color:"black",textDecoration:"none"}}>
                                <article className="blog-card playlist">
                                    <div className="article-details">
                                    <h4 className="post-category playlist">{item.artist.name}</h4>
                                    <h3 className="post-title playlist">{item.title}</h3>
                                    </div>
                                </article>
                            </Link>
                            </div>
                        )}
                      </div>
                    )}
                  </Carousel>
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
      </React.Fragment>
        );
      }
  }
}

