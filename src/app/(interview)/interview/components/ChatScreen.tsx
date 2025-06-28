"use client";
import {useSearchParams} from "next/navigation";
import ChatBox from "@/app/(interview)/interview/components/ChatBox";
import ChatItem, {ChatItemProps} from "@/app/(interview)/interview/components/ChatItem";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import useTimer from "@/hooks/useTimer";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

export default function ({next}: { next: null | string }) {

    const [chat, setChat] = useState<ChatItemProps[]>([])

    const {seconds} = useTimer(20)
    const [isCompleted, setIsCompleted] = useState(false)
    const [modalMsg, setModalMsg] = useState('')


    function showModal() {
        setModalMsg('You have done!')
    }


    function handleSubmit(content: string) {
        if (content === "done") {
            setIsCompleted(true)
            if (next === null) {
                setTimeout(() => {
                    showModal();
                }, 20000)
            }

        } else if (content === "error") {
            setIsCompleted(false)
            setModalMsg('You have failed!')
        }
        setChat(prev => ([...prev, {id: Math.random().toString(), content, isUser: true}]));
    }


    const round = useSearchParams().get("round");


    return <>

        <Dialog open={modalMsg.length > 0}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className={'text-center'}>
                        {
                            isCompleted ? 'Interview Completed Successfully' : "Interview failed"
                        }
                    </DialogTitle>
                    <DialogDescription className={'my-3'}>
                        {modalMsg}
                    </DialogDescription>
                    <div className={'flex justify-center'}>
                        <Button className={'cursor-pointer rounded-full max-w-xs w-full'} asChild>
                            <Link href={'/home'}>
                                Take me to dashboard
                            </Link>
                        </Button>

                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        <div className={'h-full flex flex-col gap-3'}>
            <div className={'text-center font-bold text-xl text-blue-400'}>
                Round : {round || "Screening Round"}
            </div>
            <div className={'h-full overflow-auto'}
                 style={{scrollbarWidth: 'thin', scrollbarColor: "gray transparent", background: "none"}}
            >
                <ChatItem chatData={chat}/>
            </div>
            <div className={'h-max mb-2 flex flex-col items-center '}>
                <div className={'flex justify-center mb-1'}>
                    <Card hidden={!isCompleted || modalMsg.length > 0}
                          className={'p-2 max-w-2xl w-full flex flex-row justify-between'}>
                        <Button variant={'ghost'} className={'cursor-pointer pointer-events-none rounded-full'}>
                            {
                                next ? "Next Round starts" : "Interview ends "
                            }
                            in<b>{seconds} s</b>
                        </Button>
                        <Button hidden={!next} className={'cursor-pointer'} asChild>
                            <Link href={'?round=' + encodeURIComponent(next || "")}>
                                Start Now
                            </Link>
                        </Button>
                        <Button hidden={next !== null} className={'cursor-pointer'} onClick={showModal}>
                            Finish Now
                        </Button>
                    </Card>
                </div>
                <ChatBox onSubmit={handleSubmit}/>
            </div>
        </div>


    </>
}
