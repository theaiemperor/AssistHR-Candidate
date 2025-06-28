import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

interface RoundFailProps {
    title: string;
    description: string;
    success?: boolean
}

export default function ({info}: { info: RoundFailProps }) {
    return <>
        <Card className={'p-2 max-w-lg '}>
            <div className={'text-center font-bold'}>
                {info.title}
            </div>
            <div className={info.success ? 'text-green-300':'text-red-300'}>
                {info.description}
            </div>
            <Button className={'cursor-pointer self-center rounded-full max-w-xs w-full'}>
                Take me to Home
            </Button>

        </Card>
    </>
}
