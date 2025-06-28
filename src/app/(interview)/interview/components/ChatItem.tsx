import {Card} from "@/components/ui/card";
import {motion} from "motion/react";

export interface ChatItemProps {
    id: string;
    content?: string;
    isUser?: boolean;
}

export default function ({chatData}: { chatData: ChatItemProps[] }) {


    return <div className={'flex  justify-center px-1'}>
        <div className={'flex flex-col gap-1 w-full max-w-3xl '}>
            {
                chatData.map((chat) => {
                    return <motion.div
                        key={chat.id}
                        layout
                        className={`max-w-3xl text-sm w-full ${chat.isUser ? 'self-end w-max' : 'mb-5'}`}
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3}}
                    >
                        <Card key={chat.id} className={`p-2 whitespace-pre-wrap min-w-xs ${chat.isUser ? ' bg-gray-700 ' : ''}`}>
                            {chat.content}
                        </Card>
                    </motion.div>

                })
            }


        </div>

    </div>
}
