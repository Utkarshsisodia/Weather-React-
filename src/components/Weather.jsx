import React from 'react'

function Weather() {
  return (
    <div className="wheather">
        <div className="search-bar">
            <input type="text" placeholder='Search' />
            <img src="src/assets/search.png" alt="img" />
        </div>
    </div>
  )
}

export default Weather