'use client'
import CalendarFetch from "@/components/CalendarFetch";
import { useState, useEffect } from "react"

export default function Home() {
  const [cals, setCals] = useState([])

  const todayWeek = new Date().getDay()
  const weekArray = []

  for(let i=todayWeek; i>todayWeek - 7; i--){
    let date = new Date( -86400000 + i * 86400000)
    weekArray.push(new Date(new Date() - date).getDate())
  }

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", ()=> {
      if (localStorage.getItem('calendar')) {
        setCals(JSON.parse(localStorage.getItem('calendar')))
      }

      console.log(cals)
  
    });
    document.querySelector('#button').addEventListener('click', ()=>{
      var url = document.querySelector('#url').value
      localStorage.setItem('calendar', url)
      setCals(JSON.parse(url))
      console.log(cals)
    })
    
  }, [])

  return (
    <>{cals
      ?<div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((value, index)=> (
          <div key={`weektitle${index}`} style={{overflow: 'hidden', whiteSpace: 'nowrap', borderRight: '1px solid #dddddd', borderBottom: '1px solid #dddddd', height: '2rem', fontSize: '1.5rem', fontWeight: 700, width: '100%', textAlign: 'center'}}>{weekArray[index]} {value}</div>
        ))}
        </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr', height:'calc(100dvh - 2rem)', overflow: 'auto'}}>
        {[0, 1, 2, 3, 4, 5, 6].map((value, index)=> (
          <div key={`weekday${index}`} style={{width: `${100/7}vw`, display: 'flex', flexDirection: 'column'}}>
            {index==0 
            ?<>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((value2, index2)=>(
              <div key={`hour${index2}`} id={`hour${index2}`} style={{color: '#dddddd', borderRight: '1px solid #dddddd', borderBottom: '1px solid #dddddd', width: '100%', height: `calc((100dvh - 2rem) / 24)`}}>{index2}</div>
            ))}</>
            :<>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((value2, index2)=>(
              <div key={`hour${index2}`} id={`hour${index2}`} style={{borderRight: '1px solid #dddddd', borderBottom: '1px solid #dddddd', width: '100%', height: `calc((100dvh - 2rem) / 24)`}}></div>
            ))}
            </>}
          </div>
        ))}
  
        {cals.map((calendar, index)=> (
          <CalendarFetch key={`calendar${index}`} bg={calendar.bg} fg={calendar.fg} src={calendar.src} isPlan={calendar.isPlan} />
        ))}
        </div>
        </div>
      :<div><textarea id="url" ></textarea><div id="button">불러오기</div></div>
    }
    </>
  );
}
