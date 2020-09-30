import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading({ message }) {
    return (
        <div>
            {/* need to make sure that the circular progress is indented in the middle of message  */}
            <CircularProgress color="secondary" />
            <p> {message} </p>
        </div >
    )
}
