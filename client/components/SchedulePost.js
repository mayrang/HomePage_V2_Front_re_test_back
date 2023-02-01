import React from "react";
import cls from "classnames";

const SchedulePost = ({ post }) => {
  // post의 인덱스 확인후 해당 위치에 그려주기
  return (
    <div
      className={cls(
        "w-full my-2 h-6 bg-blue-200 text-[10px] md:text-xs  overflow-hidden overflow-ellipsis whitespace-nowrap"
      )}
    >
      {post.start ? post.content : " "}
    </div>
  );
};

export default SchedulePost;
