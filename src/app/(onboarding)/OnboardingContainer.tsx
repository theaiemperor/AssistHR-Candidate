import {Card} from "@/components/ui/card";
import {PropsWithChildren} from "react";
import {Button} from "@/components/ui/button";
import {RightArrow} from "next/dist/client/components/react-dev-overlay/ui/icons/right-arrow";
import Link from "next/link";
import {LeftArrow} from "next/dist/client/components/react-dev-overlay/ui/icons/left-arrow";
import {useRouter} from "next/navigation";


interface Props extends PropsWithChildren {
    title: string
    hidePrev?: boolean
    hideNext?: boolean
    next?: string
}


export default function (props: Props) {
    const router = useRouter();


    return <>
        <Card className={'p-3 min-h-[20vh]'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex justify-center items-center'}>
                    <button hidden={props.hidePrev} className={'px-2 cursor-pointer text-xl'} onClick={router.back}>
                        <LeftArrow/>
                    </button>
                    <span className={'text-xl font-bold'}>
                {props.title}
            </span>
                </div>

                <Button asChild hidden={props.hideNext} className={'cursor-pointer'} size={'sm'}>
                    <Link href={props.next ? '?page=' + props.next : ""}>
                        Next <RightArrow/>
                    </Link>
                </Button>
            </div>

            {props.children}
        </Card>
    </>
}
