'use client'
import { icsToJson } from "ics-to-json";
import iCalDateParser from "ical-date-parser";
import { useState } from "react";



export default function CalendarFetch({src, bg, fg, isPlan}) {

    const [cal, setCal] = useState([])

    const convert = async (fileLocation) => {
      const icsRes = await fetch(fileLocation);
      const icsData = await icsRes.text();
      // Convert
      const data = icsToJson(icsData);

      for (let el of data) {
        if(el.startDate.includes('Z')) {
            var origin = new Date() - (new Date().getDay()-1)*86400*1000 - new Date()%86400000 - 3600000*9
            el.startDate = iCalDateParser(`${el.startDate}`)
            el.endDate = iCalDateParser(`${el.endDate}`)
            el.startDateOrigin = el.startDate - origin
            el.endDateOrigin = el.endDate - origin
        } else {
            var origin = new Date() - (new Date().getDay()-1)*86400*1000 - new Date()%86400000 //- 3600000*9
            el.startDate = iCalDateParser(`${el.startDate}Z`)
            el.endDate = iCalDateParser(`${el.endDate}Z`)
            el.startDateOrigin = el.startDate - origin
            el.endDateOrigin = el.endDate - origin
        }
      }

      setCal(data.filter((el) => el.startDate >= 0))
    };

    convert(src)

    if (isPlan) {
        return (
            <div>
              {cal.map((data, index)=> (
                  <div key={`calendar${index}`} style={{padding: 5, overflow: 'hidden', whiteSpace: 'nowrap', borderRadius:7, position:'absolute', left: `${Math.floor(data.startDateOrigin/86400000)/7*100}vw`, top: `calc(${data.startDateOrigin%86400000/3600000} * (100dvh - 2rem) / 24 + 2rem)`, width: `calc(${100/7}vw - 10px)`, height: `calc(${(data.endDateOrigin - data.startDateOrigin)/3600000} * (100dvh - 2rem) / 24)`, borderLeft: `2px solid ${bg}`, background: `${bg}70`, color: fg}}>
                      <p>{data.summary}</p>
                      <p>{(parseInt(data.startDateOrigin%86400000/1800000)/2).toFixed(1)} - {(parseInt(data.endDateOrigin%86400000/1800000)/2).toFixed(1)}시</p>
                  </div>
              ))}
            </div>
          );
    }


    return (
        <div>
          {cal.map((data, index)=> (
              <div key={`calendar${index}`} style={{padding: 5, overflow: 'hidden', whiteSpace: 'nowrap', borderRadius:7, position:'absolute', left: `${Math.floor(data.startDateOrigin/86400000)/7*100+50/7}vw`, top: `calc(${data.startDateOrigin%86400000/3600000} * (100dvh - 2rem) / 24 + 2rem)`, width: `${50/7}vw`, height: `calc(${(data.endDateOrigin - data.startDateOrigin)/3600000} * (100dvh - 2rem) / 24)`, background: bg, color: fg}}>
                  <p>{data.summary}</p>
                  <p>{(parseInt(data.startDateOrigin%86400000/1800000)/2).toFixed(1)} - {(parseInt(data.endDateOrigin%86400000/1800000)/2).toFixed(1)}시</p>
              </div>
          ))}
        </div>
      );

  }