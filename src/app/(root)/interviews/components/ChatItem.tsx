import {Card} from "@/components/ui/card";

interface ChatItemProps {
    id: string;
    content?: string;
    isUser?: boolean;
}

export default function () {
    const chatData: ChatItemProps[] = [
        {
            id: '1',
            content: "Hello sir, can we start Interview right now",
            isUser: true
        },
        {
            id: '2',
            content: "Ok But before starting your interview, I want to ask you whether you have any question about us or not. if any then feel free to ask.",
            isUser: false
        }
    ]


    return <div className={'flex  justify-center px-1'}>
        <div className={'flex flex-col gap-1 w-full max-w-3xl '}>
            {
                chatData.map((chat) => {
                    return <Card key={chat.id}
                                 className={`max-w-3xl p-2 text-sm w-full ${chat.isUser ? 'self-end bg-gray-700 w-max' : 'mb-5'}`}>
                        {chat.content}
                    </Card>
                })
            }
        </div>

    </div>
}
