'use client'
import CalendarFetch from "@/components/CalendarFetch";
import { useState, useEffect } from "react";
export const dynamic = 'force-dynamic';

export default function Home() {
  const [cals, setCals] = useState([]);

  useEffect(() => {
    const storedCals = localStorage.getItem("calendar");
    console.log("🔍 localStorage에서 가져온 값:", storedCals);

    try {
      if (storedCals) {
        setCals(JSON.parse(storedCals)); // JSON 파싱
      } else {
        setCals([]); // 값이 없으면 빈 배열로 설정
      }
    } catch (error) {
      console.error("❌ JSON 파싱 오류:", error);
      setCals([]); // 오류 발생 시 빈 배열로 초기화
    }
  }, []);

  useEffect(() => {
    const button = document.querySelector("#button");
    if (button) {
      const handleClick = () => {
        const url = document.querySelector("#url").value;
        const newData = [{ src: url }];

        localStorage.setItem("calendar", JSON.stringify(newData)); // JSON 문자열로 저장
        setCals(newData); // 상태 업데이트
      };

      button.addEventListener("click", handleClick);
      return () => button.removeEventListener("click", handleClick);
    }
  }, []);

  return (
    <>
      {Array.isArray(cals) && cals.length > 0 ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((value, index) => (
              <div key={`weektitle${index}`} style={{ borderRight: "1px solid #ddd", borderBottom: "1px solid #ddd", height: "2rem", fontSize: "1.5rem", fontWeight: 700, textAlign: "center" }}>
                {value}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", height: "calc(100dvh - 2rem)", overflow: "auto" }}>
            {cals.map((calendar, index) => (
              <CalendarFetch key={`calendar${index}`} {...calendar} />
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