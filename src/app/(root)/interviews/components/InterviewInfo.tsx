import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";


interface InterviewInfo {
    name: string;
    description: string;
    company: string;
    totalRounds: number;
    createdAt: Date
}

export default function ({info}: { info: InterviewInfo }) {

    return <>
        <Card className={'p-2'}>
            <div>
                <div className={'text-lg text-center font-bold'}>
                    {info.name}
                </div>
                <div className={'flex justify-center gap-2 text-xs text-gray-300 mt-1'}>
                    <div>{info.company}</div>
                    |
                    <div>{info.createdAt.toDateString()}</div>
                    |
                    <div>{info.totalRounds} Rounds</div>
                </div>
            </div>

            <div className={'text-sm'}>
                {info.description}
            </div>

            <div className={'flex justify-between'}>
                <Button className={'cursor-pointer'} variant={'destructive'}>
                    Go to home
                </Button>
                <Button className={'cursor-pointer'}>
                    Start Interview
                </Button>
            </div>
        </Card>
    </>
}
