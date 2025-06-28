"use client";

import {SidebarMenuButton, SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {LeftArrow} from "next/dist/client/components/react-dev-overlay/ui/icons/left-arrow";
import {RightArrow} from "next/dist/client/components/react-dev-overlay/ui/icons/right-arrow";

export default function () {
    const {state, setOpen, isMobile} = useSidebar();


    function toggleSidebar() {
        if (state === 'expanded') {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    if (isMobile) {
        return;
    }


    return <>
        <SidebarMenuButton onClick={toggleSidebar} className={'flex justify-end'}>

            {state === 'expanded' ?
                <LeftArrow/>
                : <RightArrow/>
            }

        </SidebarMenuButton>

    </>
}
