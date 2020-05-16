import React, { Component } from 'react'
import spinner from './spinner.gif'

class Spinner extends Component {
    render(){
        return (
            <div className="spinner" style={{position:"absolute",left:"42%",top:"25%"}}>
                <img
                    src={spinner}
                    alt="Loading.."
                    style={{width:'200px',margin:'40px auto',display:'block'}}
                ></img>
            </div>
        )
    }
}

export default Spinner
