import React from "react";
import cls from "classnames";

const SchedulePost = ({ post }) => {
  // post의 인덱스 확인후 해당 위치에 그려주기
  return (
    <div
      className={cls(
        `absolute w-full h-6  bg-blue-200 text-[10px] md:text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap`
      )}
      style={{ top: `${post.index * 2 + 1.5}rem` }}
    >
      {post.start ? post.content : " "}
    </div>
  );
};

export default SchedulePost;
