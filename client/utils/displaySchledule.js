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
  let monthArray = [];
  let weekArray = [];
  let prevDayPost = [];
  let dayFormat = "";
  let count = 0;

  //이전 날짜
  let prevLastDate = new Date(year, month - 1, 0).getDate();
  let prevLastDay = new Date(year, month - 1, 0).getDay();

  //다음 날짜
  const nextDay = new Date(year, month, 0).getDay();
  const nextDate = new Date(year, month, 0).getDate();

  if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      weekArray.unshift({ date: prevLastDate - i, type: "prev" });
      if (count === 6) {
        monthArray.push(weekArray);
        weekArray = [];
        count = 0;
      } else {
        count++;
      }
    }
  }

  for (let i = 1; i < nextDate + 1; i++) {
    let indexingPost = [];

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
      for (const post of checkPost) {
        const findIndex = prevDayPost.find((prevPost) => (prevPost.scheduleId = post.scheduleId));
        if (findIndex) {
          indexingPost.push({ ...post, index: findIndex.index, start: dayjs(post.date).get("date") === i });
        } else {
          const index = indexingPost[-1]?.index ? indexingPost[-1].index + 1 : 0;
          indexingPost.push({ ...post, index, start: dayjs(post.date).get("date") === i });
        }
      }
    }
    weekArray.push({ date: i, dayFormat, posts: [...indexingPost] });
    prevDayPost = [...indexingPost];
    if (count === 6) {
      monthArray.push(weekArray);
      weekArray = [];
      count = 0;
    } else {
      count++;
    }
  }
  // for (let i = 1; i < nextDate + 1; i++) {
  //
  //   const dayPosts = posts.filter(
  //     (post) =>
  //       dayjs(post.startTime).format("YYYYMMDD") <= dayFormat && dayFormat <= dayjs(post.endTime).format("YYYYMMDD")
  //   );
  //   let mapPosts = [];

  //   //console.log("dayPost", dayPosts);

  //   // dayposts 정렬 1. 시작날짜순 2. 총 날짜 길이순
  //   const sortedPosts = dayPosts.sort(function (a, b) {
  //     let aStartDate = parseInt(dayjs(a.startTime).format("YYYYMMDD"));
  //     let bStartDate = parseInt(dayjs(b.startTime).format("YYYYMMDD"));
  //     let aDate = parseInt(dayjs(a.endTime).format("YYYYMMDD")) - parseInt(dayjs(a.startTime).format("YYYYMMDD"));
  //     let bDate = parseInt(dayjs(b.endTime).format("YYYYMMDD")) - parseInt(dayjs(b.startTime).format("YYYYMMDD"));

  //     // startDate 가 빠른 포스트의 인덱스를 체크하기 위해
  //     if (aStartDate > bStartDate) return 1;
  //     if (aStartDate < bStartDate) return -1;

  //     // 같은 날짜일때는 날짜가 긴 순서대로
  //     if (aDate > bDate) return -1;
  //     if (aDate < bDate) return 1;
  //     return 0;
  //   });

  //   // 화면에 표시할 index
  //   let index = [1, 2, 3];
  //   for (const post of sortedPosts) {
  //     // 각 날짜에 맵핑될 포스트 배열
  //     let mapPost = {};

  //     const checkPost = allPosts.find((it) => it.scheduleId === post.scheduleId);

  //     // index가 존재하는 allPosts에 존재하는 포스트인지 체크
  //     if (checkPost) {
  //       mapPost = {
  //         ...post,
  //         start: false,
  //         multiple: true,
  //         index: checkPost.index,
  //         startTime: post.startTime,
  //         endTime: post.endTime,
  //       };
  //       // 해당 index 필터링
  //       index = index.filter((num) => num !== checkPost.index);
  //     } else {
  //       // 남아있는 index가 있는지?
  //       if (index.length > 0) {
  //         // 시작날짜 포스트인지 체크
  //         if (dayFormat === dayjs(post.startTime).format("YYYYMMDD")) {
  //           if (dayjs(post.startTime).format("YYYYMMDD") !== dayjs(post.endTime).format("YYYYMMDD")) {
  //             mapPost = {
  //               ...post,
  //               start: true,
  //               multiple: true,
  //               index: index.shift(),
  //               startTime: post.startTime,
  //               endTime: post.endTime,
  //             };

  //             allPosts.push(mapPost);
  //           } else {
  //             mapPost = {
  //               ...post,
  //               start: true,
  //               multiple: false,
  //               index: index.shift(),
  //               startTime: post.startTime,
  //               endTime: post.endTime,
  //             };
  //             allPosts.push(mapPost);
  //           }
  //         } else {
  //           //(아닐 시 다중날짜 포스트이면서 시작날짜 당시 화면 표시 X 였으므로 mapPosts에만 넣어줌)
  //           mapPost = { ...post, startTime: post.startTime, endTime: post.endTime };
  //         }
  //       } else {
  //         // 남아있는 index가 없으므로 mapPosts에만 넣어줌
  //         mapPost = { ...post, startTime: post.startTime, endTime: post.endTime };
  //       }
  //     }

  //     mapPosts.push(mapPost);
  //   }

  //   // 공휴일 여부 체크
  //   if (holidays) {
  //     const holiday = holidays?.find((holiday) => holiday.locdate?.toString() === dayFormat);
  //     // console.log("holiday", holiday, dayFormat)
  //     if (holiday) {
  //       weekArray.push({ date: i, dayFormat, type: "now", posts: mapPosts, holiday: holiday });
  //     } else {
  //       weekArray.push({ date: i, dayFormat, type: "now", posts: mapPosts });
  //     }
  //   }

  //   if (count === 6) {
  //     monthArray.push(weekArray);
  //     weekArray = [];
  //     count = 0;
  //   } else {
  //     count++;
  //   }
  // }
  for (let i = 1; i < 7 - nextDay; i++) {
    weekArray.push({ date: i, type: "next" });
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
