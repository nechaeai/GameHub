import { Fragment, useEffect, useRef, useState } from 'react'
import gsap from 'https://cdn.skypack.dev/gsap'
import './WhacAMole.css'

const TIME_LIMIT = 30000
const MOLE_SCORE = 100
const NUMBER_OF_MOLES = 5
const POINTS_MULTIPLIER = 0.9
const TIME_MULTIPLIER = 1.25


const generateMoles = amount => new Array(amount).fill().map(() => ({
  speed: gsap.utils.random(0.5, 1),
  delay: gsap.utils.random(0.5, 4),
  points: MOLE_SCORE
}))

const Moles = ({ children }) => <div className="moles">{children}</div>
const Mole = ({ onWhack, points, delay, speed, pointsMin = 10 }) => {
  const [whacked, setWhacked] = useState(false)
  const bobRef = useRef(null)
  const pointsRef = useRef(points)
  const buttonRef = useRef(null)
  useEffect(() => {
    gsap.set(buttonRef.current, {
      yPercent: 100,
      display: 'block'
    })
    bobRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      duration: speed,
      yoyo: true,
      repeat: -1,
      delay: delay,
      repeatDelay: delay,
      onRepeat: () => {
        pointsRef.current = Math.floor(
          Math.max(pointsRef.current * POINTS_MULTIPLIER, pointsMin)
        )
      },
    })
    return () => {
      if (bobRef.current) bobRef.current.kill()
    }
  }, [pointsMin, delay, speed])
  
  
  useEffect(() => {
    if (whacked) {
      pointsRef.current = points
      bobRef.current.pause()
      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 3), () => {
            setWhacked(false)
            bobRef.current
             .restart()
             .timeScale(bobRef.current.timeScale() * TIME_MULTIPLIER)
          })
        },
      })
    }
  }, [whacked])
  
  const whack = () => {
    setWhacked(true)
    onWhack(pointsRef.current)   
  }
  return (
    <div className="mole-hole">
      <button
        className="mole"
        ref={buttonRef}
        onClick={whack}
      >
      
      </button>
    </div>
  )
}
const Score = ({ value }) => <div className='info-text'>{`Score: ${value}`}</div>

const Timer = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time)
  const timerRef = useRef(time)  
  const timeRef = useRef(time)
  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd()
    }
  }, [internalTime, onEnd])
  useEffect(() => {
    timerRef.current = setInterval(
      () => setInternalTime((timeRef.current -= interval)),
      interval
    )
    return () => {
      clearInterval(timerRef.current)
    }
  }, [interval])
  return <div className='info-text'>{`Time: ${internalTime / 1000}s`}</div>
}

const WhacAMole = () => {
  const [playing, setPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [moles, setMoles] = useState(generateMoles(NUMBER_OF_MOLES))
  
  const onWhack = points => setScore(score + points)
    
  const endGame = () => {
    setPlaying(false)
    setFinished(true)
  }

  const startGame = () => {
    setScore(0)
    setPlaying(true)
    setFinished(false)
  }
  
  return (
    <Fragment>
      {!playing && !finished &&
        <Fragment>
          <h1>Whac-A-Mole</h1>
          <button onClick={startGame}>Start Game</button>
        </Fragment>
      }
      {playing &&
        <Fragment>
          <button
            className="end-game"
            onClick={endGame}
           >
            End Game
          </button>
          <div className="info">
            <Score value={score} />
            <Timer
              time={TIME_LIMIT}
              onEnd={endGame}
            />
          </div>
          <Moles>
            {moles.map(({delay, speed, points}, index) => (
              <Mole
                key={index}
                onWhack={onWhack}
                points={points}
                delay={delay}
                speed={speed}
              />
            ))}
          </Moles>
        </Fragment>
      }
      {finished && 
        <Fragment>
          <Score value={score} />
          <button onClick={startGame}>Play Again</button>
        </Fragment>
      }
    </Fragment>
  )
}

export default WhacAMole
