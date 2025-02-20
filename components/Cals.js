'use client'
import CalendarFetch from "@/components/CalendarFetch";
import { useState, useEffect } from "react";

export default function Cals() {
  const [cals, setCals] = useState([]); // 🚀 초깃값을 배열로 설정

  useEffect(() => {
    const storedCals = localStorage.getItem("calendar");
    console.log("🔍 localStorage에서 가져온 값:", storedCals);

    try {
      if (storedCals) {
        setCals(JSON.parse(storedCals)); // ✅ JSON 파싱 후 상태 저장
      } else {
        setCals([]); // ✅ 값이 없으면 빈 배열로 초기화
      }
    } catch (error) {
      console.error("❌ JSON 파싱 오류:", error);
      setCals([]); // 오류 발생 시 빈 배열로 초기화
    }
  }, []);

  useEffect(() => {
    console.log("✅ 업데이트된 cals 값:", cals); // 🚀 상태가 업데이트될 때마다 확인
  }, [cals]);

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
          <div
            id="button"
            onClick={() => {
              const url = document.querySelector("#url").value;
              const newData = [{ src: url }];

              localStorage.setItem("calendar", JSON.stringify(newData)); // ✅ JSON 형식으로 저장
              setCals(newData); // ✅ 상태 업데이트
            }}
          >
            불러오기
          </div>
        </div>
      )}
    </>
  );
}
