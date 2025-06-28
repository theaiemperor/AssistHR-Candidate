import {Card} from "@/components/ui/card";
import dayjs from "dayjs";
import {BadgeCheckIcon, CalendarIcon, ClockIcon, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";

export interface Interview {
    id: string
    publisher_id: string
    publisher_image: string,
    title: string
    short_description: string
    isVerified: boolean
    duration: number  // in seconds
    kind: string,
    totalApplications:number
    difficulty: number
    createdAt: Date
}


export default function (props: Interview) {


    const formatedDate = dayjs(props.createdAt).format('MMM D, YYYY');

    return <>
        <Card className={'rounded-md p-2 max-w-sm relative overflow-hidden'}>

            <div
                className={'rounded-none text-xs font-bold rounded-bl-lg bg-purple-700 p-1 px-2 absolute right-0 top-0'}>
                {props.kind}
            </div>

            <div className={'flex  gap-5 justify-center'}>
                <div className={'flex flex-col items-center'}>
                    <Avatar className={'w-15 h-15'}>
                        <AvatarImage
                            src={props.publisher_image}
                            alt={'Company logo'}
                        />
                        <AvatarFallback>
                            {props.title.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {
                        props.isVerified &&
                        <Badge
                            variant="secondary"
                            className="bg-blue-500 text-white dark:bg-blue-600 -mt-2 z-20"
                        >
                            <BadgeCheckIcon/>
                            Verified
                        </Badge>
                    }

                </div>


            </div>

            <div className={'flex flex-col gap-1 text-sm'}>
                <div className={'text-lg font-bold'}>{props.title}</div>

                <div className={'flex gap-3'}>
                    <Badge className={'bg-yellow-200'}>
                        <CalendarIcon size={20}/>
                        <p>{formatedDate}</p>
                    </Badge>

                    <Badge className={'bg-yellow-200'}>
                        <ClockIcon size={20}/>
                        <p>{(props.duration / 60).toFixed(2)} minute</p>
                    </Badge>

                </div>
                <div className={'mt-3'}>{props.short_description}</div>
            </div>


            <div className={'flex justify-between items-center'}>
                <div className={'font-bold flex gap-1 text-sm items-center'}>
                    <span><User size={17}/></span>
                    <span>{props.totalApplications}</span>
                </div>
                <Button className={'rounded-full bg-indigo-200 hover:bg-indigo-300 font-bold text-xs'} size={'sm'}
                        asChild>
                    <Link href={'#'} className={'px-9'}>
                        View Interview
                    </Link>
                </Button>
            </div>


        </Card>
    </>
}
