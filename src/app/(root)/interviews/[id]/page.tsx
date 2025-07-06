"use client";
import {useParams} from "next/navigation";
import ChatBox from "@/app/(root)/interviews/components/ChatBox";
import ChatItem, {ChatItemProps} from "@/app/(root)/interviews/components/ChatItem";
import {useState} from "react";

export default function () {

    const [chat, setChat] = useState<ChatItemProps[]>([{
        id: '1',
        content: "Hello sir, can we start Interview right now",
        isUser: true
    },
        {
            id: '2',
            content: "Ok But before starting your interviews, I want to ask you whether you have any question about us or not. if any then feel free to ask.",
            isUser: false
        }])

    function handleSubmit(content: string) {
        setChat(prev => ([...prev, {id: Math.random().toString(), content, isUser: true}]));
    }


    const {id} = useParams()


    return <div className={'h-full flex flex-col gap-3'}>
        <div className={'text-center'}>
            Interview for {id}
        </div>
        <div className={'h-full overflow-auto'}
             style={{scrollbarWidth: 'thin', scrollbarColor: "gray transparent", background: "none"}}
        >
            <ChatItem chatData={chat}/>
        </div>
        <div className={'h-max mb-2 flex justify-center '}>
            <ChatBox onSubmit={handleSubmit}/>
        </div>
    </div>
}
