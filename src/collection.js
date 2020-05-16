import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class CollectionPro extends Component {
    state = {
        data: [],
        heading:'Playlist'
    }
    collection = [];
    componentDidMount(){ 
        axios.all([
            axios({
                "method":"GET",
                "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/2484256828",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                }
                }),
                axios({
                    "method":"GET",
                    "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/2484268228",
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                    }
                }),
                axios({
                    "method":"GET",
                    "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/2484277448",
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                    }
                    }),
                    axios({
                        "method":"GET",
                        "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/2559261564",
                        "headers":{
                        "content-type":"application/octet-stream",
                        "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                        "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                        }
                        }),
                        axios({
                            "method":"GET",
                            "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/2672023804",
                            "headers":{
                            "content-type":"application/octet-stream",
                            "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                            "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                            }
                        }),
                            axios({
                                "method":"GET",
                                "url":"https://deezerdevs-deezer.p.rapidapi.com/playlist/1996494362",
                                "headers":{
                                "content-type":"application/octet-stream",
                                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                                "x-rapidapi-key":"dcebda00e7msh0523c51c5379044p180a66jsnf27b2f8ac9a4"
                                }
                            })
                
        ])
        .then(axios.spread((data1,data2,data3,data4,data5,data6)=>{
            this.collection.push(data1.data,data2.data,data3.data,data4.data,data5.data,data6.data)
            this.setState({data:this.collection})
        }))
        .catch(err=>console.log(err))
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