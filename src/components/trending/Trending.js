import React, { Component } from 'react'
import { Consumer } from '../../trending' 
import Trend from '../trending/Trend'

 class Trends extends Component {
    render() {
        return (
        <Consumer>
            {value => {
                const {data,heading} = value;
                if(data === undefined || data.length === 0){
                    return (
                        <h1>No data</h1>
                        // <div style={{position:"absolute",height:"100%",width:"100%",background: "linear-gradient(162deg, rgba(196,22,22,1) 1%, rgba(255,127,80,1) 60%, rgba(97,80,255,1) 100%)"}}>
                        //     <Spinner></Spinner>
                        // </div>
                    ) 
                } else {
                   return (
                    <React.Fragment>
                        <div className="tending_bdiv" style={{position:"absolute",top:"930px",left: "50%",width: "42.1%"}}>
                        <h3 className="text-center mb-4">{heading}</h3>
                        <div className="row collection_trends">
                            {data.map(item => (
                                <Trend key={item.id} trend={item}></Trend>
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

export default Trends
