import React from "react";
import SchedulePost from "../components/SchedulePost";
import { displaySchedule, posts } from "../utils/DisplaySchledule";
import cls from "classnames";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const SchedulePage = () => {
  const router = useRouter();
  const { year, month } = router.query;
  // 년도와 월을 표시하기 위한 변수
  const calendarYear = year || dayjs().format("YYYY");
  const calendarMonth = month || dayjs().format("MM");

  const schedule = displaySchedule(parseInt(calendarYear), parseInt(calendarMonth), [], posts);

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
              <div key={idx} className="flex  items-stretch h-full min-h-[8rem]">
                {/* 각 week를 date단위로 map */}
                {week.map((date, idx) => (
                  // 각 date ui 부분 content나 username이 길어질시 ...으로 자르도록 했음
                  <div
                    key={idx}
                    // onClick={() => clickPostsModal(date)}
                    className=" w-full h-auto flex-1 border overflow-hidden overflow-ellipsis  whitespace-nowrap"
                  >
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
                    {/* 각 post표시 ui 컴포넌트 */}
                    {date.posts?.map((post) => (
                      <SchedulePost key={post.calendarId} post={post} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* 로그인 여부와 해당 유저의 레벨 체크후 각 path에 맞게 추가 버튼 ui 생성
          {user &&
            path === "/reservation" &&
            (user.level === "Root" || user.level === "Manager" || user.level === "Member") && (
              <div className="flex justify-end items-center py-2 px-3">
                <button
                  onClick={clickAdd}
                  className="border rounded border-blue-500 text-sm md:text-lg  bg-white p-2 hover:bg-blue-500 hover:text-white"
                >
                  예약 추가하기
                </button>
              </div>
            )}
          {user && path === "/schedule" && (user.level === "Root" || user.level === "Manager") && (
            <div className="flex justify-end items-center py-2 px-3">
              <button
                onClick={clickAdd}
                className="border rounded border-blue-500 text-sm md:text-lg  bg-white p-2 hover:bg-blue-500 hover:text-white"
              >
                일정 추가하기
              </button>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
