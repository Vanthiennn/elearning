import React from "react";

export default function PageNotFound() {
  return (
    <div>
      <div className="mars" />
      <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
      <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
      <p className="title">Oh no!!</p>
      <p className="subtitle">
        You’re either misspelling the URL <br /> or requesting a page that's no longer here.
      </p>
      <div align="center">
        <a className="btn-back" href="/">Back to previous page</a>
      </div>
      <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
      <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
    </div>
  )
}
