import React, { Component } from 'react';
import axios from 'axios';
import {Consumer} from '../../context';

class Search extends Component {
    state = {
        trackTitle:''
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    findTrack = (dispatch,e) =>{
        e.preventDefault();
            axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/search",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                },"params":{
                "q":`${this.state.trackTitle}`
                }
            })
            .then(res=>{
                dispatch({
                    type:'SEARCH_TRACKS',
                    payload:res.data.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch} = value;
                        return(
                            <div className="card card-body p-4 search" style={{background: "content-box"}}>
                                <form onSubmit={this.findTrack.bind(this,dispatch)}>
                                    <div className="form-group row">
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg"
                                            placeholder="Search Any Track And Artist...."
                                            name="trackTitle"
                                            value={this.state.trackTitle}
                                            onChange = {this.onChange.bind(this)}
                                            style={{width:"100%",borderRadius:"10px"}} />
                                        <button 
                                            className="btn btn-lg btn-block" 
                                            type="submit"
                                            style={{width:"5%",color:"black",marginLeft:"-55px"}}>
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default Search