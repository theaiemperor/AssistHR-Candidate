import {PropsWithChildren} from "react";

export default function ({children}: PropsWithChildren) {
    return <>
        <div className={'w-full flex justify-center h-screen'}>
            <div className={'max-w-xl w-full h-[70%] self-center'}>
                {children}
            </div>
        </div>
    </>
}
