import React from "react";

export default function Pagination({ page, nowPage }) {
  return <nav className="flex items-center justify-center flex-wrap md:justify-between ">{nowPage !== 1 && <></>}</nav>;
}
