import React, { Component } from 'react'
import {connect} from 'react-redux'

class Home extends Component {
    render() {
        return (
            <div>
                {this.props.notes.map((v) => (
                    <div key={v.id}>
                        {
                            v.id + ': ' + v.text
                        }
                    </div>
                ))}
            </div>
        )
    }
}

const mapState = (state) => ({
    notes: state.notes
})

export default connect(mapState, null)(Home)