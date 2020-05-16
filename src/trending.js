import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class TrendingPro extends Component {
    state = {
        data: [],
        heading:'Trending Tracks'
    }
    collection = [];
    componentDidMount(){ 
            axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/6600320724",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                }
                })
                .then(res=>{
                    for(let i=0;i<6;i++){
                        this.collection.push(res.data.tracks.data[i])
                    }
                    this.setState({data:this.collection})
                })
                                
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;