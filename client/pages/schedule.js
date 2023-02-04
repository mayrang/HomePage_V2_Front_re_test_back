import React from "react";
import SchedulePost from "../components/SchedulePost";
import { displaySchedule, posts } from "../utils/DisplaySchledule";
import cls from "classnames";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";

const SchedulePage = ({ holidays }) => {
  const router = useRouter();
  const { year, month } = router.query;
  // 년도와 월을 표시하기 위한 변수
  const calendarYear = year || dayjs().format("YYYY");
  const calendarMonth = month || dayjs().format("MM");

  const schedule = displaySchedule(parseInt(calendarYear), parseInt(calendarMonth), holidays, posts);
  const weekMaxIndex = schedule.map((week) => {
    return week.reduce((prev, value) => {
      return prev.maxIndex >= value.maxIndex ? prev : value;
    }).maxIndex;
  });
  // 다음 달
  const clickNext = () => {
    if (parseInt(month) === 12) {
      router.push({
        pathname: "/schedule",
        query: {
          year: (parseInt(calendarYear) + 1).toString(),
          month: "1",
        },
      });
    } else {
      router.push({
        pathname: "/schedule",
        query: {
          year: calendarYear.toString(),
          month: (parseInt(calendarMonth) + 1).toString(),
        },
      });
    }
  };

  // 이전 달
  const clickPrev = () => {
    if (parseInt(month) === 1) {
      router.push({
        pathname: "/schedule",
        query: {
          year: (parseInt(calendarYear) - 1).toString(),
          month: "12",
        },
      });
    } else {
      router.push({
        pathname: "/schedule",
        query: {
          year: calendarYear.toString(),
          month: (parseInt(calendarMonth) - 1).toString(),
        },
      });
    }
  };
  return (
    <>
      <div className="w-full ">
        <div className="flex-col   h-screen items-center  justify-center">
          {/* year, month를 표시하는 부분 */}
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
          {/* 요일 ui를 표시하는 부분 */}
          <div className="w-full bg-white  px-3">
            <div className="flex items-center w-full  text-center">
              <div className="border flex-1 border-black bg-gray-200 grow">SUN</div>
              <div className="border flex-1 border-black bg-gray-200 grow">MON</div>
              <div className="border flex-1 border-black bg-gray-200 grow">TUE</div>
              <div className="border flex-1 border-black bg-gray-200 grow">WED</div>
              <div className="border flex-1 border-black bg-gray-200 grow">THU</div>
              <div className="border flex-1 border-black bg-gray-200 grow">FRI</div>
              <div className="border flex-1 border-black bg-gray-200 grow">SAT</div>
            </div>
            {/* calendarData 배열을 주 단위로 map */}
            {schedule?.map((week, idx) => (
              <div
                key={idx}
                className="flex  items-stretch w-full "
                style={{ height: `${weekMaxIndex[idx] >= 0 ? 20 * weekMaxIndex[idx] + 120 : 90}px` }}
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
