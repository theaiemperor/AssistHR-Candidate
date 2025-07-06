"use client";
import ChatBox from "@/app/(interview)/interview/components/ChatBox";
import ChatItem, {ChatItemProps} from "@/app/(interview)/interview/components/ChatItem";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import useTimer from "@/hooks/useTimer";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import apiClient from "@/lib/axiosClient";
import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {ArrowDown} from "lucide-react";


interface Props {
    title: 'screening' | string
    initialMsg?: ChatItemProps
}

export interface ChatMessageItem {
    content: string
    status: 'pending' | 'completed' | 'failed'
    finished?: boolean
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export default function ({title, initialMsg}: Props) {

    const [chat, setChat] = useState<ChatItemProps[]>(initialMsg ? [initialMsg] : [])
    const {auth, setToken} = useCurrentInterview();


    const [modalMsg, setModalMsg] = useState('')
    const [status, setStatus] = useState<ChatMessageItem['status'] | 'finished'>("pending")
    const bottomRef = useRef<HTMLDivElement | null>(null);


    const {seconds, reset} = useTimer(20, {active: status !== 'pending', onComplete: handleNext})
    const {isPending, mutate} = useMutation({mutationFn: submitAnswer})
    const router = useRouter();


    async function submitAnswer(content: string) {
        try {
            const {data: {data}} = await apiClient.put('/interview/live', {
                content,
                token: auth?.token || "",
            })


            setChat(prev => ([
                ...prev, {id: Math.random().toString(), content: data.content, isUser: false}
            ]))

            setStatus(data.finished ? 'finished' : data.status);


        } catch (error) {

        }
    }


    async function handleSubmit(content: string) {
        setChat(prev => ([...prev, {
            id: Math.random().toString(),
            content,
            isUser: true
        }]));

        mutate(content);
    }

    async function handleNext() {
        if (status === 'finished') {
            router.push('/');
        } else {
            router.push('?round=' + encodeURIComponent(auth?.value.nextRound || ""));
        }
    }

    useEffect(() => {
        if (status === 'pending') {
            reset();
        }
    }, [seconds, status]);


    function goPageEnd() {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        goPageEnd();
    }, [chat]);


    return <>

        <Dialog open={(status === 'finished' || status === 'failed') && modalMsg !== ''}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className={'text-center'}>
                        {
                            status === 'finished' ? 'Interview Completed Successfully' : "Interview failed"
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
                {title === "screening" ? "Screening Round" : title}
            </div>
            <div className={'h-full overflow-auto'}
                 style={{scrollbarWidth: 'thin', scrollbarColor: "gray transparent", background: "none"}}
            >
                <ChatItem chatData={chat} isPending={isPending} ref={bottomRef}/>

            </div>
            <div className={'h-max mb-2 flex flex-col items-center '}>
                <div className={'flex justify-center items-center mb-1'}>
                    <Card hidden={status !== "completed" && status !== "finished"}
                          className={'p-2 max-w-2xl w-full flex flex-row justify-between'}>
                        <Button variant={'ghost'} className={'cursor-pointer pointer-events-none rounded-full'}>
                            {
                                status === 'completed' ? "Next Round starts " : "Interview ends "
                            }
                            in<b>{seconds} s</b>
                        </Button>
                        <Button
                            hidden={status !== 'completed'}
                            className={'cursor-pointer'}
                            asChild>
                            <Link href={'?round=' + encodeURIComponent(auth?.value.nextRound || "")}>
                                Start Now
                            </Link>
                        </Button>
                        <Button
                            hidden={status !== 'finished'}
                            className={'cursor-pointer'}
                            onClick={() => {
                                setModalMsg('You are done.')
                                setStatus('finished')
                            }}>
                            Finish Now
                        </Button>
                    </Card>

                    <Button variant={'link'} className={'cursor-pointer'} onClick={goPageEnd}>
                        <ArrowDown size={20}/>
                    </Button>
                </div>
                <ChatBox
                    disabled={status !== 'pending' || isPending}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>


    </>
}
