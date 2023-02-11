import { useRouter } from "next/router";

{
  /* year, month를 표시하는 부분 */
}
const CalendarYearMonth = ({ calendarMonth, calendarYear, type }) => {
  const router = useRouter();
  // 다음 달
  const clickNext = () => {
    if (parseInt(calendarMonth) === 12) {
      router.push({
        pathname: `/${type}`,
        query: {
          year: (parseInt(calendarYear) + 1).toString(),
          month: "1",
        },
      });
    } else {
      router.push({
        pathname: `/${type}`,
        query: {
          year: calendarYear.toString(),
          month: (parseInt(calendarMonth) + 1).toString(),
        },
      });
    }
  };

  // 이전 달
  const clickPrev = () => {
    if (parseInt(calendarMonth) === 1) {
      router.push({
        pathname: `/${type}`,
        query: {
          year: (parseInt(calendarYear) - 1).toString(),
          month: "12",
        },
      });
    } else {
      router.push({
        pathname: `/${type}`,
        query: {
          year: calendarYear.toString(),
          month: (parseInt(calendarMonth) - 1).toString(),
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-between w-full  p-3 ">
      <div onClick={clickPrev} className="text-2xl">
        {"<"}
      </div>
      <div className="text-2xl">
        {calendarYear}년 {calendarMonth}월
      </div>
      <div onClick={clickNext} className="text-2xl">
        {">"}
      </div>
    </div>
  );
};

export default CalendarYearMonth;
