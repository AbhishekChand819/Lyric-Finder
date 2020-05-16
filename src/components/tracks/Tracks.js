import React, { Component } from 'react'
import { Consumer } from '../../context' 
import Track from '../tracks/Track'

 class Tracks extends Component {
    render() {
        return (
        <Consumer>
            {value => {
                const {track_list,heading} = value;
                if(track_list === undefined || track_list.length === 0){
                    return (
                        <h1>No data</h1>
                        // <div style={{position:"absolute",height:"100%",width:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,127,80,1) 60%, rgba(97,80,255,1) 100%)"}}>
                        //     <Spinner></Spinner>
                        // </div>
                    ) 
                } else {
                   return (
                       <React.Fragment>
                           <div className="divs" style={{position:"absolute",top:"270px",left: "10%",width: "35%"}}>
                           <h3 className="text-center mb-4">{heading}</h3>
                            <div className="row">
                                {track_list.map(item => (
                                    <Track key={item.id} track={item}></Track>
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

export default Tracks
