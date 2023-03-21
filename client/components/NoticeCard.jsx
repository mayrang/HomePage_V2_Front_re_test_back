import dayjs from 'dayjs';
import React from 'react';
import cls from "classnames";
export default function NoticeCard({post}) {
    return (
        <article className={cls('p-4 flex', {'border-t border-t-gray-400': post.order !== 1})}>
            <a className='overflow-auto break-words cursor-pointer grow'>
                <h3 className='mb-2 text-lg'>
                    <span className='text-import-color'>N.</span>
                    {post.title}
                </h3>
                <div className="text-xs mt-1 text-preview-gray flex">
                    <time dateTime={new Date(post.createAt)}>{dayjs(post.createAt).format("MM월DD일")}</time>
                    <div className='ml-2'>{post.nick_name}</div>
                </div>
            </a>
        </article>
    );
}

