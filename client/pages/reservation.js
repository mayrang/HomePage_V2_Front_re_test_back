import CalendarYearMonth from "../components/CalendarYearMonth";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import CalendarDay from "../components/CalendarDay";
import displayCalendar, { reservationPosts } from "./../utils/displayCalendar";
import cls from "classnames";
import axios from "axios";
import { useState } from "react";
import ReservationTimeZone from "../components/ReservationTimeZone";

const timeZone = [
  { start: "00:00", end: "01:00" },
  { start: "01:00", end: "02:00" },
  { start: "02:00", end: "03:00" },
  { start: "03:00", end: "04:00" },
  { start: "04:00", end: "05:00" },
  { start: "05:00", end: "06:00" },
  { start: "06:00", end: "07:00" },
  { start: "07:00", end: "08:00" },
  { start: "08:00", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
  { start: "17:00", end: "18:00" },
  { start: "18:00", end: "19:00" },
  { start: "19:00", end: "20:00" },
  { start: "20:00", end: "21:00" },
  { start: "21:00", end: "22:00" },
  { start: "22:00", end: "23:00" },
  { start: "23:00", end: "24:00" },
];

const ReservationPage = ({ holidays }) => {
  const [selectDate, setSelectDate] = useState();
  const [selectDateReservation, setSelectDateReservation] = useState(null);
  const router = useRouter();
  const { year, month } = router.query;

  // 년도와 월을 표시하기 위한 변수
  const calendarYear = year || dayjs().format("YYYY");
  const calendarMonth = month || dayjs().format("MM");
  const reservation = displayCalendar(parseInt(calendarYear), parseInt(calendarMonth), holidays, reservationPosts);

  const clickDate = (dayFormat, posts) => {
    setSelectDate(dayFormat);
    setSelectDateReservation(posts);
  };

  return (
    <div className="flex w-9/12 h-4/5 justify-center items-center">
      <div className="w-1/2 h-5/6">
        <div className="flex flex-col h-full items-center  justify-center">
          <CalendarYearMonth type={"reservation"} calendarMonth={calendarMonth} calendarYear={calendarYear} />
          <div className="w-full bg-white  px-3">
            <CalendarDay />
            {reservation?.map((week, idx) => (
              <div className="flex w-full h-24" key={idx}>
                {/* 각 week를 date단위로 map */}
                {week.map((date, idx) => (
                  // 각 date ui 부분 content나 username이 길어질시 ...으로 자르도록 했음
                  <div
                    key={idx}
                    // onClick={() => clickPostsModal(date)}
                    className={cls("relative  w-full  flex-1 border", {
                      "bg-yellow-300": date.dayFormat === selectDate && !date.type,
                    })}
                    onClick={() => clickDate(date.dayFormat, date.posts)}
                  >
                    <div>
                      {/* 날짜 표시하는 부분(공휴일이거나 휴일일시 text-red, 해당 날짜가 오늘일시 bg에 blue 추가) */}
                      <small
                        className={cls(
                          "text-xs ml-1 font-semibold  ",

                          { "text-red-500": date.holiday || idx % 7 === 0 },
                          { "text-gray-300": date.type === "prev" || date.type === "next" },
                          { " bg-blue-200 bg-rounded rounded-full ": date.dayFormat === dayjs().format("YYYYMMDD") }
                        )}
                      >
                        {date.date}{" "}
                      </small>
                      {/* 공휴일 ui 부분 */}
                      <small className="text-[10px] text-red-500">{date.holiday?.dateName}</small>
                    </div>
                    {!date.type && (
                      <div className="text-sm">
                        예약: {date.posts && date.posts.length > 0 ? date.posts.length : "0"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2 py-14 overflow-auto">
        <table className=" table-auto w-full h-full ">
          <thead className=" bg-gray-200">
            <tr>
              <th className=" w-1/12">선택</th>
              <th className="w-5/12">이용시간</th>
              <th className="w-3/12">상태</th>
              <th className="w-3/12 ">예약자</th>
            </tr>
          </thead>
          <tbody>
            {selectDateReservation &&
              timeZone.map((timeObj) => (
                <ReservationTimeZone
                  key={timeObj.start}
                  {...timeObj}
                  reservationList={selectDateReservation}
                  selectDate={selectDate}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  try {
    const { year, month } = query;

    if (year && month) {
      if (
        year.match(/^[0-9]+$/) === null ||
        month.match(/^[0-9]+$/) === null ||
        parseInt(month) < 0 ||
        parseInt(month) > 13
      ) {
        return {
          redirect: {
            permanent: false,
            destination: "/schedule",
          },
        };
      }
      const calendarMonth = parseInt(month) < 10 ? "0" + month : month;
      const result = await axios.get(
        `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`
      );
      let holidays = result.data.response?.body?.items?.item || [];
      if (!Array.isArray(holidays)) {
        holidays = [holidays];
      }

      return {
        props: {
          holidays,
        },
      };
    } else {
      const calendarMonth = dayjs().get("month") + 1 < 10 ? "0" + month : (dayjs().get("month") + 1).toString();
      const result = await axios.get(
        `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${dayjs()
          .get("year")
          .toString()}&solMonth=${calendarMonth}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`
      );
      console.log(result.data);
      let holidays = result.data.response?.body?.items?.item || [];
      if (!Array.isArray(holidays)) {
        holidays = [holidays];
      }
      return {
        props: {
          holidays,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default ReservationPage;
