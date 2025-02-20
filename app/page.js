'use client'
import { useState } from "react"

export default function Home() {

  const [url, setUrl] = useState('')

  function changeUrl(e) {
    setUrl(encodeURIComponent(e.target.value))
  }

  return (
    <div>
      URL : <input id="input" onInput={changeUrl} />
      <div id="button"><a href={url}>See Calendar</a></div>
    </div>
    )
}

  
