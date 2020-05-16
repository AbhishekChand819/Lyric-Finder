import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state,action) =>{
    switch(action.type){
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading:'Search Result'
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        track_list: [],
        heading:'Global Top 10',
        dispatch: action => this.setState(state => reducer(state,action))
    }
    array = [];
    componentDidMount(){     
            axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/3155776842",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                }
                })
            .then(res=>{
                for(let i=0;i<10;i++){
                    this.array.push(res.data.tracks.data[i])
                }
                this.setState({track_list:this.array})
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