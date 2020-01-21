import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSpring, animated, config, interpolate } from 'react-spring'
import Cards from './Cards'

function App() {
  let [isToggled, set] = useState(true)
  let [value, setValue] = useState(20)
  let fade = useSpring({
    opacity: isToggled ? 0 : 1,
    config: config.stiff
  })
  let number = useSpring({
    x: isToggled ? 100 : 1
  })
  let move = useSpring({
    opacity: !isToggled ? 1 : .5,
    transform: !isToggled ? 'translate3d(0px,-30px,0) scale(1.7)' : 'translate3d(0px,-10px,0) scale(1)',
    config: config.wobbly
  })

  const multiAnimation = useSpring({
    from: { opacity: 0, color: 'red' },
    to: [
      { opacity: 1, color: '#ffaaee' },
      { opacity: 1, color: 'red' },
      { opacity: .5, color: '#008000' },
      { opacity: .8, color: 'white' },
      { opacity: 0, color: 'white' }
    ],
    config: config.wobbly
  });

  let bar = useSpring({
    width: isToggled ? "0%" : `${value}%`,
    backgroundColor: "yellow",
    height: "100%",
    // config: config.molasses
  })

  const { o, xyz, color } = useSpring({
    o: isToggled ? 1 : 0,
    xyz: isToggled ? [10, 20, 5] : [10, 10, 10],
    color: isToggled ? 'green' : "red"
  })

  const asy = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 1, color: '#ffaaee' })
      await next({ opacity: 0, color: 'rgb(14,26,19)' })
    },
    from: { opacity: 0, color: 'red' }
  })

  useEffect(() => {
    set(!isToggled)
  }, [])

  return <Cards />
  return (
    <div className="App">
      <animated.div style={asy}>I will fade in and out</animated.div>
      <header className="App-header">
        <animated.div style={move}>
          <img style={move} src={logo} className="App-logo" alt="logo" />
        </animated.div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <animated.div style={multiAnimation}>
          I'm going to Fade!
        </animated.div>
        <animated.span style={move}>
          {number.x.interpolate(x => x.toFixed(0))}
        </animated.span>
        <button
          style={{ padding: "20px 50px", cursor: "pointer" }}
          onClick={() => set(!isToggled)}
        >
          Fade!
        </button>

        <animated.div
          style={{
            // If you can, use plain animated values like always, ...
            // You would do that in all cases where values "just fit"
            color,
            // Unless you need to interpolate them
            background: o.interpolate(o => `rgba(500, 257, 177, ${o})`),
            // Which works with arrays as well
            transform: xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
            // If you want to combine multiple values use the "interpolate" helper
            border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
            // You can also form ranges, even chain multiple interpolations
            padding: o.interpolate({ range: [0, 0.5, 1], output: [0, 0, 7] }).interpolate(o => {
              // console.log(o)
              return `${o}%`
            }),
            // Interpolating strings (like up-front) through ranges is allowed ...
            borderColor: o.interpolate({ range: [0, 1], output: ['red', '#ffaabb'] }),
            // There's also a shortcut for plain, optionless ranges ...
            // opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1])
          }}
        >

        </animated.div>

        <div style={styles.bar}>
          <animated.div style={bar} />
        </div>

        <button
          style={{ padding: "20px 50px", cursor: "pointer" }}
          onClick={() => value < 100 ? setValue(value + 20) : setValue(20)}
        >
          Sumar!
        </button>



      </header>
    </div>
  );
}

export default App;

let styles = {
  bar: {
    borderRadius: "50%",
    overflow: "hidden",
    marginTop: 20,
    width: 200,
    height: 200,
    border: "1px solid orange",
    backgroundColor: "transparent"
  }
}
