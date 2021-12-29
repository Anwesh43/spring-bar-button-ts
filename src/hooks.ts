import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, ,n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const background = 'indigo'
    const size = Math.min(w, h) / 11.9 
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2) 
    const lineHeight : number = Math.min(w, h) / 90
    return {
        squareStyle() : CSSProperties {
            const left : string = `${w / 2 - size / 2}px`
            const top : string = `${h / 2 - size / 2 + (size - lineHeight)}px`
            const width : string = `${size}px`
            const height : string = `${size - (size - lineHeight) * sf2}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background 
            }
        },
        circleStyle() : CSSProperties {
            const left : string = `${w / 2 - size / 2}px`
            const top : string = `${-size + (h / 2 - size / 2) * sf1 + (size - lineHeight) * sf2}px`
            const width : string = `${size}px`
            const height : string = `${size}px`
            const borderRadius : string = `50%`
            return {
                position, 
                left,
                top, 
                width, 
                height, 
                borderRadius, 
                background 
            } 
        }
    }
}