import {useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
    const taglines = [
        'Home',
        'Obsession',
        'Blog',
        'Network',
        'News Source',
        'Meme Hub',
        'Soapbox',
        'Trend Center',
        'Community'
    ]
    const navigate = useNavigate()

    const [idx, setIdx] = useState(0)
    function cycleIdx(){
        setIdx((idx+1)%taglines.length)
    }

    const intervalRef = useRef()

    useEffect(()=>{
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(cycleIdx, 1000)
    })

  return (
    <div className="page landing">
        <div className="banner">
            <h1 className='sitename'>example.social</h1>
            <img src="" alt="logo" className="logoDisplay" />
            <div className='bannerMessage'>
                <span>Join Your</span>
                <b className='radiantTxt'>New</b>
                <span className="tagline">{taglines[idx]}</span>
            </div>
            <button className="joinBtn"
            onClick={()=>navigate('/login')}>
                Join Us
            </button>
        </div>
    </div>
  )
}

export default Landing