import React from 'react';
import { notice } from '../public/dummy/notice';
import NoticeCard from './NoticeCard';

export default function NoticeList() {
    return (
        <div className='p-3 flex-shrink basis-0 grow max-w-[1130px]'>
            <div className="mb-[32px]">
                {notice.map((post) => (
                    <NoticeCard post={post} key={post.order} />
                ))}
                
            </div>
        </div>
    );
}

