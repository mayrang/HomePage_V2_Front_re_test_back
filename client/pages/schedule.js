import React from "react";
import SchedulePost from "../components/SchedulePost";
import displayCalendar, { schedulePosts } from "../utils/displayCalendar";
import cls from "classnames";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";
import CalendarYearMonth from "../components/CalendarYearMonth";
import CalendarDay from "./../components/CalendarDay";

const SchedulePage = ({ holidays }) => {
  const router = useRouter();
  const { year, month } = router.query;
  // 년도와 월을 표시하기 위한 변수
  const calendarYear = year || dayjs().format("YYYY");
  const calendarMonth = month || dayjs().format("MM");

  const schedule = displayCalendar(parseInt(calendarYear), parseInt(calendarMonth), holidays, schedulePosts);
  const weekMaxIndex = schedule.map((week) => {
    return week.reduce((prev, value) => {
      return prev.maxIndex >= value.maxIndex ? prev : value;
    }).maxIndex;
  });

  return (
    <>
      <div className="w-full h-screen">
        <div className="flex flex-col   h-screen items-center  justify-center">
          <CalendarYearMonth type={"schedule"} calendarMonth={calendarMonth} calendarYear={calendarYear} />

          <div className="w-full bg-white  px-3">
            <CalendarDay />
            {/* calendarData 배열을 주 단위로 map */}
            {schedule?.map((week, idx) => (
              <div
                key={idx}
                className="flex  items-stretch w-full "
                style={{ height: `${weekMaxIndex[idx] >= 0 ? 25 * weekMaxIndex[idx] + 90 : 90}px` }}
              >
                {/* 각 week를 date단위로 map */}
                {week.map((date, idx) => (
                  // 각 date ui 부분 content나 username이 길어질시 ...으로 자르도록 했음
                  <div
                    key={idx}
                    // onClick={() => clickPostsModal(date)}
                    className="relative  w-full  flex-1 border"
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
                    {/* 각 post표시 ui 컴포넌트 */}

                    {date.posts?.map((post) => (
                      <SchedulePost key={post.scheduleId} post={post} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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

export default SchedulePage;
