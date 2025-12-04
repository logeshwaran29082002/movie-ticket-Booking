import React from 'react'
import { newsStyles,newsCSS } from '../assets/dummyStyles'
import {sampleNews} from '../assets/newdummydata'
import { ImageIcon } from 'lucide-react'
function News() {
  return (
    <div className={newsStyles.container}>
           <style>{`@import url('https://fonts.googleapis.com/css2?family=Monoton&family=Roboto:wght@300;400;700&display=swap');`}</style>
      <header className={newsStyles.header}>
        <div className={newsStyles.headerFlex}>
            <div className={newsStyles.logoContainer}>
                <div className={newsStyles.logoText} style={{fontFamily:"Monoton, cursive"}}>
              CineNews
                </div>
                    <div
        className={newsStyles.logoSubtitle}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Latest • Curated • Cinematic
      </div>
            </div>
            <div className={newsStyles.headerButtons}>
                <button className={newsStyles.latestNewsButton}>
                    <ImageIcon size={16}/>
                    <span className={newsStyles.buttonText}>Latest News</span>
                </button>
            </div>
        </div>
      </header>
    </div>
  )
}

export default News
