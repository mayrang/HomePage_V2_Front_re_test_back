import CalendarYearMonth from "../components/CalendarYearMonth";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import CalendarDay from "../components/CalendarDay";
import displayCalendar, { reservationPosts } from "./../utils/displayCalendar";
import cls from "classnames";
import axios from "axios";

const ReservationPage = ({ holidays }) => {
  const router = useRouter();
  const { year, month } = router.query;
  // 년도와 월을 표시하기 위한 변수
  const calendarYear = year || dayjs().format("YYYY");
  const calendarMonth = month || dayjs().format("MM");
  const reservation = displayCalendar(parseInt(calendarYear), parseInt(calendarMonth), holidays, reservationPosts);
  return (
    <div className="flex w-9/12 h-auto justify-center items-center">
      <div className="w-1/2">
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
                    <div>예약: {date.posts && date.posts.length > 0 ? date.posts.length : "0"}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
