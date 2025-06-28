"use client";
import {useParams} from "next/navigation";
import ChatBox from "@/app/(root)/interviews/components/ChatBox";
import ChatItem from "@/app/(root)/interviews/components/ChatItem";

export default function () {


    function handleSubmit(content: string) {
        alert(content);
    }


    const {id} = useParams()


    return <div className={'h-full flex flex-col gap-3'}>
        <div className={'text-center'}>
            Interview for {id}
        </div>
        <div className={'h-full overflow-auto'}
             style={{scrollbarWidth: 'thin', scrollbarColor: "gray transparent", background: "none"}}
        >

            <ChatItem/>
        </div>
        <div className={'h-max mb-2 flex justify-center '}>
            <ChatBox onSubmit={handleSubmit}/>
        </div>
    </div>
}
