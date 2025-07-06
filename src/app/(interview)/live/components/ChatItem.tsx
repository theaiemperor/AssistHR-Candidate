"use client";
import {Card} from "@/components/ui/card";
import {motion} from "motion/react";
import {Sparkles} from "lucide-react";
import {memo, useEffect, useRef} from 'react';
import useChatHistory from "@/app/(interview)/live/utils/useChatHistory";


function ChatItem() {

    const {history, isPending} = useChatHistory(state => state)
    const ref = useRef<HTMLDivElement>(null);


    useEffect(() => {
        ref.current?.focus()
    }, [history])

    return <div className={'flex  justify-center px-1'}>
        <div className={'flex flex-col gap-1 w-full max-w-3xl '}>
            {
                history.map((chat, index) => {
                    return <motion.div
                        key={index}
                        layout
                        className={`max-w-3xl text-sm w-full ${chat.isUser ? 'self-end w-max' : 'mb-5'}`}
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                    >
                        <Card
                            className={`p-2 whitespace-pre-wrap min-w-xs ${chat.isUser ? ' bg-gray-700 max-w-lg ' : ''}`}>
                            {chat.content}
                        </Card>

                    </motion.div>

                })
            }
            <div ref={ref}/>
            <div hidden={!isPending}>
                <Sparkles className={'animate-pulse '}/>
            </div>
        </div>

    </div>
}


export default memo(ChatItem);
