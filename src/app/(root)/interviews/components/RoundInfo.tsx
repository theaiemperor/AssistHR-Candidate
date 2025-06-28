"use client"
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

interface RoundInfo {
    name: string;
    description: string;
    avgDuration: number; // in seconds
}

function formatDuration(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
}

export default function ({info}: { info: RoundInfo }) {
    const [timeLeft, setTimeLeft] = useState(90);


    function startNextRound() {

    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    startNextRound();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return <>
        <Card className={'p-2 max-w-md'}>
            <div>
                <div className={'text-lg text-center font-bold'}>
                    {info.name}
                </div>
                <div className={'flex justify-center gap-2 text-xs text-gray-300 mt-1'}>
                    <div>Avg <b>{formatDuration(info.avgDuration)}</b></div>

                </div>
            </div>

            <div className={'text-sm'}>
                {info.description}
            </div>

            <div className={'flex justify-between'}>
                <Button className={'pointer-events-none rounded-full'} variant={'outline'}>
                    {minutes}m {seconds < 10 ? "0" + seconds : seconds}s left
                </Button>

                <Button className={'cursor-pointer'} onClick={startNextRound}>
                    Start Now
                </Button>
            </div>
        </Card>
    </>
}
