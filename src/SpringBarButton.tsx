import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface SBBProps {
    w : number,
    h : number, 
    scale : number, 
    onClick : Function 
}
const SpringBarButton = (props : SBBProps) => {
    const {squareStyle, circleStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {squareStyle()} onClick = {() => props.onClick()}></div>
            <div style = {circleStyle()} onClick = {() => props.onClick()}></div>
        </React.Fragment>
    )
}

export default withContext(SpringBarButton)