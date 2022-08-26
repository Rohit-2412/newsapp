import React from 'react'
import loading from './loading.gif'

// export default class Spinner extends Component {
const Spinner = () => {
    // render() {
    return (
        <div className='text-center my-4'>
            <img src={loading} alt="loading" />
        </div>
    )
    // }
}

export default Spinner