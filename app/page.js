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
    <div style={{width: '100%', maxWidth: 400, margin: '100px auto', textAlign: 'center', lineHeight: 2, fontSize: 16}}>
      <h2>PlanDo</h2>
      <div>82.peacht.art</div>
      <div style={{marginBottom: '5rem'}}>about</div>
      <div>URL for Calendar JSON:</div>
      <input id="input" onInput={changeUrl} style={{width: '100%', marginBottom:10, fontSize: 16}}/>
      <div id="button"><a href={url} style={{padding: 10, borderRadius: 15, background: '#000', color: '#fff'}}>See Calendar</a></div>
    </div>
    )
}