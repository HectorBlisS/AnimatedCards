import React, { useState, useEffect } from 'react'
import { useSpring, animated, config, interpolate } from 'react-spring'

const calc = (x, y) => {
    let h = window.innerHeight
    let w = window.innerWidth
    let a = -(y - h / 2) / 20
    let b = (x - w / 2) / 20
    return [a, b, 1.1]
}
//const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
const trans = (x, y, z) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${z})`

function Card({ pic, func }) {
    let [on, toggle] = useState(false)
    //const props = useSpring({ xys: [0, 0, 1], config:config.wobbly })
    let [{ xyz, z }, set] = useSpring(() => ({ z: 2, xyz: [0, 20, 1], config: config.slow }))

    useEffect(() => {
        setTimeout(() => set({ xyz: [0, 180, 1] }), 2000)
    }, [])



    function doToggle({ clientX: x, clientY: y }) {
        //toggle(!on)
        if (on) return
        set({ xyz: [-(y - window.innerHeight / 2) / 10, (x - window.innerWidth / 2) / 10, 1] })
        //else set({xyz:[0,0,1]})
    }
    function doClick() {

        toggle(true)
        //if (on) 
        set({ xyz: [0, 360, 2.5], z: 1 })
        //else set({xyz:[0,0,1]})
    }

    function doLeave() {
        if (!on) return
        toggle(false)
        set({ xyz: [0, 0, 1] })
    }

    return (
        <div style={{ position: "relative" }}>
            <animated.div

                onClick={doClick}

                class="card-two"
                style={{
                    top: 0,
                    left: 0,
                    transform: xyz.interpolate(trans),
                    zIndex: on ? 1000 : null, position: "absolute"
                }}

            ></animated.div>
            <animated.div
                class="card"
                //onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                //onMouseLeave={() => set({ xys: [0, 0, 1] })}
                onMouseMove={doToggle}
                onMouseLeave={doLeave}
                style={{
                    backgroundImage: `url(${pic})`,
                    transform: xyz.interpolate(trans),
                    zIndex: on ? 1000 : null,
                    position: "relative"
                }}
            />

        </div>
    )
}

function Cards() {
    let [pair, setPair] = useState([])
    let cards = [
        "https://pbs.twimg.com/profile_images/779305023507271681/GJJhYpD2_400x400.jpg",
        "https://disruptivoo.com/wp-content/uploads/2019/03/Los-mejores-wallpapers-de-los-Simpsons-23.jpg",
        "https://i.blogs.es/4aec21/alone_1280x800/450_1000.jpg",
        "https://pbs.twimg.com/profile_images/779305023507271681/GJJhYpD2_400x400.jpg",
        "https://tt.tudocdn.net/338603?h=345",
        "https://i.blogs.es/4aec21/alone_1280x800/450_1000.jpg",
        "http://blog.fixter.org/content/images/2017/04/firebaseM-1.jpg",
        "https://tt.tudocdn.net/338603?h=345",
        "https://disruptivoo.com/wp-content/uploads/2019/03/Los-mejores-wallpapers-de-los-Simpsons-23.jpg",

    ]

    function doCompare() {
        if (pair.length < 2) return
        if (pair[0] === pair[1]) return setPair([])
    }

    function renderCard(i, index) {
        return <Card pic={i} key={index} />
    }
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {cards.map(renderCard)}
        </div>
    )
}

export default Cards
