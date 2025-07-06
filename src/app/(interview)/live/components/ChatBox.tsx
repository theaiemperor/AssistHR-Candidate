"use client";
import {Card} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {ArrowUp} from "lucide-react";
import {KeyboardEvent, useRef} from "react";
import useCurrentInterview from "@/app/(interview)/live/utils/useCurrentInterview";
import useChatHistory from "@/app/(interview)/live/utils/useChatHistory";


interface Props {
    handleSubmit: (content: string) => void;
}

export default function (props: Props) {

    const areaRef = useRef<null | HTMLTextAreaElement>(null);
    const auth = useCurrentInterview(state => state.auth);
    const {setHistory, setPending} = useChatHistory();

    function onSubmit() {
        const data = areaRef.current?.value || "";

        if (areaRef.current && data.length > 0) {

            setHistory({content: data, isUser: true});
            setPending(true);

            props.handleSubmit(data);
            areaRef.current.value = ""
            areaRef.current.focus();
        }
    }


    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && e.metaKey) {
            e.preventDefault();
            onSubmit();
            return;
        }

        if (e.key === "Enter" && e.shiftKey) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    }


    return <>
        <Card className={'w-full max-w-3xl max-h-60 p-2 flex flex-col  gap-0'}>
            <Textarea
                disabled={!(auth?.info === "round_pending" || auth?.info === 'screening_pending')}
                ref={areaRef}
                placeholder={"Enter your answers here"}
                onKeyDown={handleKeyDown}
                className={'w-full resize-none rounded-md flex-1 border-none outline-none focus:ring-0 focus-visible:ring-0 mb-1 p-2'}
                style={{scrollbarWidth: 'thin', scrollbarColor: "gray transparent", background: "none"}}

            />

            <div className={'flex justify-end h-max mt-2'}>
                <button className={'rounded-full p-0.5 border cursor-pointer'} onClick={onSubmit}>
                    <ArrowUp/>
                </button>
            </div>
        </Card>
    </>
}
