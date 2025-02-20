'use client'
import { useState, useEffect } from "react"

export default function Home() {

  const [url, setUrl] = useState('')

  useEffect(()=>{
    if (localStorage.getItem('calendarUrl') && localStorage.getItem('calendarUrl') != '') {
      setUrl(localStorage.getItem('calendarUrl'))
      location.href = '/'+localStorage.getItem('calendarUrl')
    }
  }, [])

  function changeUrl(e) {
    setUrl(encodeURIComponent(e.target.value))
    localStorage.setItem('calendarUrl', encodeURIComponent(e.target.value))
  }

  return (
    <div>
      URL : <input id="input" onInput={changeUrl} />
      <div id="button"><a href={url}>See Calendar</a></div>
    </div>
    )
}

  
