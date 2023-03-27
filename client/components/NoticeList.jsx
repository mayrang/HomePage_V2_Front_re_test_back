import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import NoticeCard from "./NoticeCard";
import axios from "axios";
import usePagination from "./../hooks/usePagination";
import { useRouter } from "next/router";

export default function NoticeList() {
  const router = useRouter();
  const { nowPage } = router.query;
  const {
    data: notices,
    isLoading,
    error,
  } = useQuery(["notice"], async () => {
    const result = await axios.get("/dummy/notice.json");
    console.log(result);
    return result.data.items;
  });
  const { page, pageData } = usePagination(notices, nowPage ? parseInt(nowPage) : 1);
  console.log(page, pageData);
  return (
    <div className="p-3 flex-shrink basis-0 grow max-w-[1130px]">
      <div className="mb-[32px]">{notices && notices.map((post) => <NoticeCard post={post} key={post.order} />)}</div>
    </div>
  );
}
