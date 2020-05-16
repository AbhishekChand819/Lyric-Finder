import React, { Component } from 'react'
import { Consumer } from '../../collection' 
import Playlist from '../playlists/Playlist'

 class Playlists extends Component {
    render() {
        return (
        <Consumer>
            {value => {
                const {data,heading} = value;
                if(data === undefined || data.length === 0){
                    return (
                        <h1>No data</h1>
                    ) 
                } else {
                   return (
                    <React.Fragment>
                        <div className="playlists_div" style={{position:"absolute",top:"270px",left: "50%",width: "42.1%"}}>
                        <h3 className="text-center mb-4">{heading}</h3>
                        <div className="row">
                            {data.map(item => (
                                <Playlist key={item.id} playlist={item}></Playlist>
                            ))}
                        </div>
                        </div>
                    </React.Fragment>
                    )
                }
            }}
        </Consumer>
        )
    }
}

export default Playlists
