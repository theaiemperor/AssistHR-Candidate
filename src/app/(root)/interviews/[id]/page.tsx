"use client";
import {useParams} from "next/navigation";
import ChatBox from "@/app/(root)/interviews/components/ChatBox";

export default function () {


    function handleSubmit(content: string) {
        alert(content);
    }


    const {id} = useParams()
    return <div className={'w-full flex justify-center h-screen relative'}>
        Taking interview for {id}
        <div className={'w-full absolute bottom-1 flex justify-center'}>
            <ChatBox onSubmit={handleSubmit}/>
        </div>
    </div>
}
