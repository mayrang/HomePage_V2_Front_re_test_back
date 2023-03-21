import React from "react";
import dayjs from "dayjs";
import { FaComment } from "react-icons/fa";

export default function QnACard({ post }) {
  console.log(post);
  return (
    <li className="max-w-[655px] border-b border-b-zinc-500">
      <a className="cursor-pointer ">
        <div className="flex md:py-[18px] md:px-[16px] py-[18px] border-b-zinc-300">
          <div className="flex-auto w-full">
            <div className="flex flex-col md:mb-[4px] md:items-center items-start">
              <div className="flex items-center">
                <span className="font-bold overflow-hidden text-ellipsis line-clamp-1 md:hidden">{post.category}</span>
              </div>
              <h3 className="w-full overflow-hidden text-ellipsis whitespace-normal leading-6 max-h-12 text-left break-all line-clamp-2">
                {post.title}
              </h3>
            </div>
            <p className="h-[24px] overflow-hidden text-ellipsis whitespace-normal leading-6 max-h-6 text-left break-all box line-clamp-1 text-xs">
              {post.content}
            </p>
            <div className="flex mt-[8px] min-h-[32px]">
              {post.tagF && (
                <button className="bg-slate-100 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none text-black leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[4px] font-medium cursor-pointer">
                  #{post.tagF}
                </button>
              )}
              {post.tagS && (
                <button className="bg-slate-100 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none text-black leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[4px] font-medium cursor-pointer">
                  #{post.tagS}
                </button>
              )}
              {post.tagT && (
                <button className="bg-slate-100 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none text-black leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[4px] font-medium cursor-pointer">
                  #{post.tagT}
                </button>
              )}
            </div>
            <div className="!flex overflow-hidden line-clamp-1 whitespace-nowrap mt-4 justify-between text-[12px] font-normal text-light-gray">
              <div className="flex-auto w-0 max-w-[520px] min-w-0 flex items-center">
                <span className="shrink overflow-ellipsis whitespace-nowrap inline-block">{post.nick_name}</span>
                <span className=" shrink-0 inline-block">&nbsp;·&nbsp;</span>
                <span className=" shrink-0 inline-block">{dayjs(post.createAt).format("YYYY년MM월DD일")}</span>
                <span className=" shrink-0 md:inline-block hidden">&nbsp;·&nbsp;</span>
                <span className=" shrink-0 md:inline-block hidden">{post.category}</span>
              </div>
              <div className="flex min-w-0 items-center">
                <dl className="flex">
                  <dt className="absolute hidden">답변</dt>
                  <dd className="flex items-center">
                    <FaComment className="font-[12px] mr-[4px]" />
                    <span className=" text-xs font-bold inline-block">
                      {post?.comments && post.comments?.length > 0 ? post.comments.length : 0}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
