import { useState } from "react";
import { useEffect } from "react";

export default function usePagination(data, nowPage) {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const totalPage = Math.ceil(data.length / 10);
      setPage(totalPage);
      const startIndex = 10 * (nowPage - 1);
      const endIndex = nowPage === totalPage ? data.length : startIndex + 10;
      setPageData(data.slice(startIndex, endIndex));
    }
  }, [data, nowPage]);

  return {
    page,
    pageData,
  };
}
