'use client'
import CalendarFetch from "@/components/CalendarFetch";
import { useState, useEffect } from "react";

export default function Home() {
  const [cals, setCals] = useState([]);

  const todayWeek = new Date().getDay();
  const weekArray = [];

  for (let i = todayWeek; i > todayWeek - 7; i--) {
    let date = new Date(-86400000 + i * 86400000);
    weekArray.push(new Date(new Date() - date).getDate());
  }

  useEffect(() => {
    // 로컬스토리지에서 값 불러오기 (안전한 파싱 처리)
    try {
      const storedCals = localStorage.getItem("calendar");
      if (storedCals) {
        setCals(JSON.parse(storedCals));
      }
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
      setCals([]); // 오류 발생 시 빈 배열 사용
    }
  }, []);

  useEffect(() => {
    const button = document.querySelector("#button");
    if (button) {
      const handleClick = () => {
        const url = document.querySelector("#url").value;
        localStorage.setItem("calendar", JSON.stringify(url)); // JSON 문자열로 저장
        setCals(url);
      };

      button.addEventListener("click", handleClick);
      return () => button.removeEventListener("click", handleClick); // 클린업
    }
  }, []);

  return (
    <>
      {cals.length > 0 ? (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
            }}
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (value, index) => (
                <div
                  key={`weektitle${index}`}
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    borderRight: "1px solid #ddd",
                    borderBottom: "1px solid #ddd",
                    height: "2rem",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {weekArray[index]} {value}
                </div>
              )
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              height: "calc(100dvh - 2rem)",
              overflow: "auto",
            }}
          >
            {[...Array(7)].map((_, index) => (
              <div
                key={`weekday${index}`}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {[...Array(24)].map((_, index2) => (
                  <div
                    key={`hour${index2}`}
                    style={{
                      borderRight: "1px solid #ddd",
                      borderBottom: "1px solid #ddd",
                      height: `calc((100dvh - 2rem) / 24)`,
                      color: index === 0 ? "#ddd" : "inherit",
                    }}
                  >
                    {index === 0 && index2}
                  </div>
                ))}
              </div>
            ))}

            {cals.map((calendar, index) => (
              <CalendarFetch
                key={`calendar${index}`}
                bg={calendar.bg}
                fg={calendar.fg}
                src={calendar.src}
                isPlan={calendar.isPlan}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <textarea id="url"></textarea>
          <div id="button">불러오기</div>
        </div>
      )}
    </>
  );
}