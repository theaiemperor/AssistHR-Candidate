import AuthWrapper from "@/components/global/AuthWrapper";
import {PropsWithChildren} from "react";

export default function ({children}: PropsWithChildren) {
    return <>
        <AuthWrapper>
            {children}
        </AuthWrapper>
    </>
}
