import {Card} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {ArrowUp} from "lucide-react";
import {HTMLProps, KeyboardEvent, useRef} from "react";


interface Props extends HTMLProps<HTMLTextAreaElement> {
    handleSubmit: (content: string) => void;
}

export default function ({handleSubmit, ...props}: Props) {

    const areaRef = useRef<null | HTMLTextAreaElement>(null);

    function onSubmit() {
        const data = areaRef.current?.value || "";

        if (areaRef.current && data.length > 0) {
            handleSubmit(data);
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
