"use client";
import {Card} from "@/components/ui/card";
import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import constants from "@/config/constants";


export default function Navbar() {

    const {isMobile} = useSidebar()


    if(!isMobile){
        return;
    }

    return <>
        <Card className={'p-1 py-2 border-l-0 border-r-0 rounded-none w-full sticky top-0 z-50' }>
            <div className={'flex gap-2 items-center '}>
                <SidebarTrigger  />
                <span className={'font-bold '}>{constants.app.name}</span>
            </div>
        </Card>
    </>
}
