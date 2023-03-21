import React from "react";
import QnACard from "./QnACard";
import { qna } from "./../public/dummy/qna";

export default function QnAList() {
  return (
    <ul>
      {qna.map((post) => (
        <QnACard post={post} key={post.order} />
      ))}
    </ul>
  );
}
