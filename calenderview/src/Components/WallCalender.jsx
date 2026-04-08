// import { useState, useCallback } from "react";

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];
// const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
// const MONTH_IMAGES = [
//   "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
//   "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800&q=80",
//   "https://images.unsplash.com/photo-1490750967868-88df5691166f?w=800&q=80",
//   "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
//   "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
//   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
//   "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
//   "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80",
//   "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
//   "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
//   "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=800&q=80",
//   "https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=800&q=80",
// ];

// function getDaysInMonth(year, month) {
//   return new Date(year, month + 1, 0).getDate();
// }
// function getFirstDayOfMonth(year, month) {
//   const d = new Date(year, month, 1).getDay();
//   return d === 0 ? 6 : d - 1;
// }
// function isSameDay(a, b) {
//   return (
//     a && b &&
//     a.getFullYear() === b.getFullYear() &&
//     a.getMonth() === b.getMonth() &&
//     a.getDate() === b.getDate()
//   );
// }
// function isInRange(date, start, end) {
//   if (!start || !end || !date) return false;
//   const s = start < end ? start : end;
//   const e = start < end ? end : start;
//   return date > s && date < e;
// }

// export default function WallCalendar() {
//   const today = new Date();
//   const [year, setYear]             = useState(today.getFullYear());
//   const [month, setMonth]           = useState(today.getMonth());
//   const [rangeStart, setRangeStart] = useState(null);
//   const [rangeEnd, setRangeEnd]     = useState(null);
//   const [hoveredDate, setHoveredDate] = useState(null);
//   const [notes, setNotes]           = useState({});
//   const [noteInput, setNoteInput]   = useState("");
//   const [selecting, setSelecting]   = useState(false);

//   const daysInMonth = getDaysInMonth(year, month);
//   const firstDay    = getFirstDayOfMonth(year, month);

//   // ── Navigation ─────────────────────────────────────────
//   const prevMonth = () => {
//     if (month === 0) { setMonth(11); setYear((y) => y - 1); }
//     else setMonth((m) => m - 1);
//     setRangeStart(null); setRangeEnd(null); setSelecting(false);
//   };
//   const nextMonth = () => {
//     if (month === 11) { setMonth(0); setYear((y) => y + 1); }
//     else setMonth((m) => m + 1);
//     setRangeStart(null); setRangeEnd(null); setSelecting(false);
//   };

//   // ── Day Click ──────────────────────────────────────────
//   const handleDayClick = useCallback((day) => {
//     const clicked = new Date(year, month, day);
//     if (!selecting || !rangeStart) {
//       setRangeStart(clicked);
//       setRangeEnd(null);
//       setSelecting(true);
//       setNoteInput("");
//     } else {
//       const s = rangeStart < clicked ? rangeStart : clicked;
//       const e = rangeStart < clicked ? clicked : rangeStart;
//       setRangeStart(s);
//       setRangeEnd(e);
//       setSelecting(false);
//       const key = `${s.toDateString()}_${e.toDateString()}`;
//       setNoteInput(notes[key] || "");
//     }
//   }, [selecting, rangeStart, year, month, notes]);

//   const handleDayHover = useCallback((day) => {
//     if (selecting) setHoveredDate(new Date(year, month, day));
//   }, [selecting, year, month]);

  
//   const effectiveEnd = selecting ? hoveredDate : rangeEnd;

//   const saveNote = () => {
//     if (!rangeStart) return;
//     const end = rangeEnd || rangeStart;
//     const key = `${rangeStart.toDateString()}_${end.toDateString()}`;
//     setNotes((n) => ({ ...n, [key]: noteInput }));
//   };
//   const deleteNote = (key) => {
//     setNotes((n) => { const c = { ...n }; delete c[key]; return c; });
//   };

//   const formatRange = () => {
//     if (!rangeStart) return "";
//     const end = rangeEnd || rangeStart;
//     if (isSameDay(rangeStart, end))
//       return rangeStart.toLocaleDateString("en-US", { month: "long", day: "numeric" });
//     return `${rangeStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
//   };

//   const currentNoteKey = rangeStart
//     ? `${rangeStart.toDateString()}_${(rangeEnd || rangeStart).toDateString()}`
//     : null;

  
//   const cells = [];
//   for (let i = 0; i < firstDay; i++) cells.push(null);
//   for (let d = 1; d <= daysInMonth; d++) cells.push(d);

//   const getDayClass = (day) => {
//     const date      = new Date(year, month, day);
//     const isStart   = isSameDay(date, rangeStart);
//     const isEnd     = isSameDay(date, effectiveEnd);
//     const inRange   = isInRange(date, rangeStart, effectiveEnd);
//     const isToday   = isSameDay(date, today);
//     const dow       = (firstDay + day - 1) % 7;
//     const isWeekend = dow === 5 || dow === 6;

//     const base =
//       "aspect-square flex items-center justify-center text-[13px] cursor-pointer select-none transition-all duration-150 relative";

//     if (isStart || isEnd)
//       return `${base} rounded-full bg-blue-600 text-white font-medium`;
//     if (inRange)
//       return `${base} rounded-none bg-blue-100 text-blue-600`;
//     if (isToday)
//       return `${base} rounded-full font-bold text-blue-600 hover:bg-blue-50`;
//     if (isWeekend)
//       return `${base} rounded-full text-red-400 hover:bg-blue-50`;
//     return `${base} rounded-full text-gray-600 hover:bg-blue-50`;
//   };

  
//   return (
//     <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-[900px]">


//         <div className="flex justify-center gap-1.5 mb-2.5">
//           {Array.from({ length: 11 }).map((_, i) => (
//             <div
//               key={i}
//               className="w-5 h-3.5 rounded-lg border-[2.5px] border-gray-400 bg-[#d4d0c8]"
//             />
//           ))}
//         </div>

//         {/* Main Card */}
//         <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">

//           {/* ── Image Panel ── */}
//           <div className="relative w-full md:w-[42%] md:min-w-[260px] min-h-[200px] md:min-h-[420px] md:flex-shrink-0 overflow-hidden">
//             <img
//               src={MONTH_IMAGES[month]}
//               alt={MONTHS[month]}
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/70" />
//             <svg
//               className="absolute bottom-0 left-0 w-full h-[90px]"
//               viewBox="0 0 260 80"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d="M0,50 Q65,10 130,40 Q195,70 260,20 L260,80 L0,80 Z"
//                 fill="rgba(26,95,173,0.92)"
//               />
//             </svg>
//             <div className="absolute bottom-5 left-6 right-4">
//               <p className="text-[13px] text-white/70 tracking-widest uppercase mb-0.5">
//                 {year}
//               </p>
//               <h2 className="text-[34px] font-bold text-white leading-none tracking-tight font-serif">
//                 {MONTHS[month]}
//               </h2>
//             </div>
//           </div>

//           {/* ── Calendar Panel ── */}
//           <div className="flex-1 bg-[#fafaf8] px-6 py-7 flex flex-col gap-4">

//             {/* Month Nav */}
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={prevMonth}
//                 className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
//               >
//                 ‹
//               </button>
//               <span className="text-sm font-medium text-gray-400 tracking-widest">
//                 {MONTHS[month].slice(0, 3).toUpperCase()} {year}
//               </span>
//               <button
//                 onClick={nextMonth}
//                 className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
//               >
//                 ›
//               </button>
//             </div>

//             {/* Day Headers */}
//             <div className="grid grid-cols-7 gap-0.5">
//               {DAYS.map((d, i) => (
//                 <div
//                   key={d}
//                   className={`text-center text-[11px] font-medium tracking-widest pb-1.5 ${
//                     i >= 5 ? "text-red-400" : "text-gray-400"
//                   }`}
//                 >
//                   {d}
//                 </div>
//               ))}
//             </div>

//             {/* Day Grid */}
//             <div className="grid grid-cols-7 gap-0.5">
//               {cells.map((day, idx) => {
//                 if (!day) return <div key={`e-${idx}`} />;
//                 const date = new Date(year, month, day);
//                 const isStart = isSameDay(date, rangeStart);
//                 const isEnd   = isSameDay(date, effectiveEnd);
//                 const isToday = isSameDay(date, today);
//                 const showDot = isToday && !isStart && !isEnd;

//                 return (
//                   <div
//                     key={day}
//                     className={getDayClass(day)}
//                     onClick={() => handleDayClick(day)}
//                     onMouseEnter={() => handleDayHover(day)}
//                     onMouseLeave={() => selecting && setHoveredDate(null)}
//                   >
//                     {day}
//                     {showDot && (
//                       <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Divider */}
//             <div className="h-px bg-gray-100" />

//             {/* Notes Section */}
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-[11px] font-medium tracking-widest uppercase text-gray-400">
//                   Notes
//                 </span>
//                 {rangeStart && (
//                   <span className="text-xs font-medium text-blue-600">
//                     {formatRange()}
//                   </span>
//                 )}
//                 {currentNoteKey && notes[currentNoteKey] && (
//                   <span className="text-[11px] px-2 py-0.5 rounded-md bg-green-100 text-green-700">
//                     saved
//                   </span>
//                 )}
//               </div>

//               {!rangeStart && (
//                 <p className="text-xs text-gray-300 italic mb-2">
//                   Select a date or range to attach a note
//                 </p>
//               )}

//               {/* Ruled lines */}
//               <div className="flex flex-col gap-2 mb-3">
//                 {[0, 1, 2].map((i) => (
//                   <div key={i} className="h-px bg-gray-100" />
//                 ))}
//               </div>

//               <textarea
//                 className="w-full min-h-[80px] border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 bg-white/70 resize-y outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 placeholder={
//                   selecting
//                     ? "Select end date first…"
//                     : "Write a note for this date range…"
//                 }
//                 value={noteInput}
//                 disabled={selecting}
//                 onChange={(e) => setNoteInput(e.target.value)}
//               />

//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={saveNote}
//                   disabled={!rangeStart || selecting}
//                   className="px-5 py-2 bg-blue-600 text-white text-[13px] font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   Save note
//                 </button>
//               </div>
//             </div>

//             {/* Hint */}
//             <p className="text-[11px] text-gray-300 text-center">
//               {selecting
//                 ? "Click another day to complete your selection"
//                 : "Click a day to start selecting a range"}
//             </p>

//           </div>
//         </div>

//         {/* Saved Notes Panel */}
//         {Object.entries(notes).filter(([, v]) => v).length > 0 && (
//           <div className="mt-5 bg-white rounded-xl px-5 py-4 shadow-lg">
//             <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-3">
//               Saved Notes
//             </p>
//             <div className="flex flex-col gap-3">
//               {Object.entries(notes)
//                 .filter(([, v]) => v)
//                 .map(([key, val]) => {
//                   const [s, e] = key.split("_");
//                   const sd = new Date(s), ed = new Date(e);
//                   const label = isSameDay(sd, ed)
//                     ? sd.toLocaleDateString("en-US", { month: "short", day: "numeric" })
//                     : `${sd.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${ed.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
//                   return (
//                     <div key={key} className="flex items-start gap-3">
//                       <span className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-md bg-blue-50 text-blue-600">
//                         {label}
//                       </span>
//                       <span className="text-[13px] text-gray-600 leading-relaxed">
//                         {val}
//                       </span>
//                       <button
//                         onClick={() => deleteNote(key)}
//                         className="ml-auto text-gray-300 hover:text-red-400 text-lg leading-none transition-colors"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
import { useState, useCallback } from "react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800&q=80",
  "https://images.unsplash.com/photo-1490750967868-88df5691166f?w=800&q=80",
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
  "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=800&q=80",
  "https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=800&q=80",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function isSameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date, start, end) {
  if (!start || !end || !date) return false;
  const s = start < end ? start : end;
  const e = start < end ? end : start;
  return date > s && date < e;
}

export default function WallCalendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [selecting, setSelecting] = useState(false);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);

    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);

    setRangeStart(null);
    setRangeEnd(null);
    setSelecting(false);
  };

  const handleDayClick = useCallback((day) => {
    const clicked = new Date(year, month, day);

    if (!selecting || !rangeStart) {
      setRangeStart(clicked);
      setRangeEnd(null);
      setSelecting(true);
      setNoteInput("");
    } else {
      const s = rangeStart < clicked ? rangeStart : clicked;
      const e = rangeStart < clicked ? clicked : rangeStart;

      setRangeStart(s);
      setRangeEnd(e);
      setSelecting(false);

      const key = `${s.toDateString()}_${e.toDateString()}`;
      setNoteInput(notes[key] || "");
    }
  }, [selecting, rangeStart, year, month, notes]);

  const handleDayHover = useCallback((day) => {
    if (selecting) setHoveredDate(new Date(year, month, day));
  }, [selecting, year, month]);

  const effectiveEnd = selecting ? hoveredDate : rangeEnd;

  const saveNote = () => {
    if (!rangeStart) return;

    const end = rangeEnd || rangeStart;
    const key = `${rangeStart.toDateString()}_${end.toDateString()}`;

    setNotes((n) => ({ ...n, [key]: noteInput }));
  };

  const deleteNote = (key) => {
    setNotes((n) => {
      const c = { ...n };
      delete c[key];
      return c;
    });
  };

  const formatRange = () => {
    if (!rangeStart) return "";
    const end = rangeEnd || rangeStart;

    if (isSameDay(rangeStart, end)) {
      return rangeStart.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    }

    return `${rangeStart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} – ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  const currentNoteKey = rangeStart
    ? `${rangeStart.toDateString()}_${(rangeEnd || rangeStart).toDateString()}`
    : null;

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDayClass = (day) => {
    const date = new Date(year, month, day);
    const isStart = isSameDay(date, rangeStart);
    const isEnd = isSameDay(date, effectiveEnd);
    const inRange = isInRange(date, rangeStart, effectiveEnd);
    const isToday = isSameDay(date, today);
    const dow = (firstDay + day - 1) % 7;
    const isWeekend = dow === 5 || dow === 6;

    const base =
      "aspect-square flex items-center justify-center text-[13px] cursor-pointer select-none transition-all duration-150 relative";

    if (isStart || isEnd)
      return `${base} rounded-full bg-blue-600 text-white font-medium`;
    if (inRange)
      return `${base} bg-blue-100 text-blue-600`;
    if (isToday)
      return `${base} rounded-full font-bold text-blue-600 hover:bg-blue-50`;
    if (isWeekend)
      return `${base} rounded-full text-red-400 hover:bg-blue-50`;

    return `${base} rounded-full text-gray-600 hover:bg-blue-50`;
  };

  return (
    <div className="min-h-screen bg-[#f4f1eb] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-225">

        {/* Binding Rings */}
        <div className="flex justify-center gap-1.5 mb-2.5">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-3.5 rounded-lg border-[2.5px] border-gray-400 bg-[#d4d0c8]"
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">

          {/* Image Panel */}
          <div className="relative w-full md:w-[42%] md:min-w-65 min-h-50 md:min-h-105 md:shrink-0 overflow-hidden">
            <img
              src={MONTH_IMAGES[month]}
              alt={MONTHS[month]}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0  from-transparent via-transparent to-blue-950/70" />

            <svg
              className="absolute bottom-0 left-0 w-full h-22.5"
              viewBox="0 0 260 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q65,10 130,40 Q195,70 260,20 L260,80 L0,80 Z"
                fill="rgba(26,95,173,0.92)"
              />
            </svg>

            <div className="absolute bottom-5 left-6 right-4">
              <p className="text-[13px] text-white/70 tracking-widest uppercase mb-0.5">
                {year}
              </p>
              <h2 className="text-[34px] font-bold text-white leading-none tracking-tight font-serif">
                {MONTHS[month]}
              </h2>
            </div>
          </div>

          {/* Calendar Panel */}
          <div className="flex-1 bg-[#fafaf8] px-6 py-7 flex flex-col gap-4">

            <div className="flex items-center justify-between">
              <button onClick={prevMonth} className="w-9 h-9 rounded-full border">‹</button>
              <span className="text-sm font-medium text-gray-400">
                {MONTHS[month].slice(0, 3).toUpperCase()} {year}
              </span>
              <button onClick={nextMonth} className="w-9 h-9 rounded-full border">›</button>
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {DAYS.map((d, i) => (
                <div key={d} className={`text-center text-[11px] ${i>=5?"text-red-400":"text-gray-400"}`}>
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {cells.map((day, idx) =>
                !day ? <div key={idx}/> :
                <div
                  key={day}
                  className={getDayClass(day)}
                  onClick={()=>handleDayClick(day)}
                  onMouseEnter={()=>handleDayHover(day)}
                >
                  {day}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}