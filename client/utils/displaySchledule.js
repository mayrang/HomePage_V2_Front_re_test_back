import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const posts = [
  {
    scheduleId: 1,
    content: "일정1",
    date: dayjs("2023-01-03 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 777600000,
  },
  {
    scheduleId: 2,
    content: "일정2",
    date: dayjs("2023-01-04 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 172800000,
  },
  {
    scheduleId: 3,
    content: "일정3",
    date: dayjs("2023-01-03 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 345600000,
  },
  {
    scheduleId: 4,
    content: "일정4",
    date: dayjs("2023-01-06 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 3119800000,
  },
  {
    scheduleId: 5,
    content: "일정5",
    date: dayjs("2023-01-09 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 691200000,
  },
  {
    scheduleId: 6,
    content: "일정6",
    date: dayjs("2023-01-04 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 691200000,
  },
  {
    scheduleId: 7,
    content: "일정7",
    date: dayjs("2023-01-13 00:00:00", "YYYY-MM-DD HH:mm:ss"),
    time: 518400000,
  },
];

export const displaySchedule = (year, month, holidays, posts) => {
  //월 배열
  let monthArray = [];
  //주 배열
  let weekArray = [];
  //전날의 스케쥴 목록
  let prevDayPost = [];
  // YYYYMMDD 형식으로 저장할 문자열 변수
  let dayFormat = "";
  // 일요일인지 확인하기 위한 count
  let count = 0;

  //이전 날짜
  let prevLastDate = new Date(year, month - 1, 0).getDate();
  let prevLastDay = new Date(year, month - 1, 0).getDay();

  //다음 날짜
  const nextDay = new Date(year, month, 0).getDay();
  const nextDate = new Date(year, month, 0).getDate();

  if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      weekArray.unshift({ date: prevLastDate - i, type: "prev", maxIndex: -1 });
      count++;
    }
  }

  for (let i = 1; i < nextDate + 1; i++) {
    let indexingPost = [];
    let maxIndex = 0;
    console.log(i, indexingPost);
    dayFormat =
      year.toString() +
      (parseInt(month) < 10 ? "0" + month.toString() : month.toString()) +
      (i < 10 ? "0" + i.toString() : i.toString());
    // const checkStartPost = posts.filter((post) => {
    //   return dayjs(post.date).get("date") === i;
    // });
    const checkPost = posts.filter((post) => {
      return (
        dayjs(dayFormat, "YYYYMMDD").isSameOrAfter(dayjs(post.date)) &&
        dayjs(dayFormat, "YYYYMMDD").isSameOrBefore(dayjs(post.date).add(post.time, "millisecond"))
      );
    });

    const sortedPost = checkPost.sort((a, b) => a.date - b.date || a.time - b.time);
    if (dayjs(dayFormat, "YYYYMMDD").get("day") === 0 || i === 1) {
      indexingPost = sortedPost.map((post, idx) => {
        return {
          ...post,
          index: idx,
          start: true,
        };
      });
    } else {
      for (const post of sortedPost) {
        const findIndex = prevDayPost.find((prevPost) => prevPost.scheduleId === post.scheduleId);
        if (findIndex) {
          indexingPost.push({ ...post, index: findIndex.index, start: dayjs(post.date).get("date") === i });
        } else {
          const index = isNaN(indexingPost[indexingPost.length - 1]?.index)
            ? 0
            : indexingPost[indexingPost.length - 1].index + 1;

          indexingPost.push({ ...post, index, start: dayjs(post.date).get("date") === i });
        }
      }
    }
    indexingPost = indexingPost.sort((a, b) => a.index - b.index);
    if (indexingPost && indexingPost.length > 0) {
      maxIndex = indexingPost.reduce((prev, value) => (prev.index >= value.index ? prev : value)).index;
    } else {
      maxIndex = -1;
    }
    const holiday = holidays?.find((holiday) => holiday.locdate?.toString() === dayFormat);
    // console.log("holiday", holiday, dayFormat)
    if (holiday) {
      weekArray.push({ date: i, dayFormat, posts: [...indexingPost], holiday: holiday, maxIndex });
    } else {
      weekArray.push({ date: i, dayFormat, posts: [...indexingPost], maxIndex });
    }

    prevDayPost = [...indexingPost];
    if (count === 6) {
      monthArray.push(weekArray);
      weekArray = [];
      count = 0;
    } else {
      count++;
    }
  }

  for (let i = 1; i < 7 - nextDay; i++) {
    weekArray.push({ date: i, type: "next", maxIndex: -1 });
    if (count === 6) {
      monthArray.push(weekArray);
      weekArray = [];
      count = 0;
    } else {
      count++;
    }
  }

  console.log(monthArray);
  return monthArray;
};
