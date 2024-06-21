import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { HiChat, HiUsers } from "react-icons/hi";
import {signOut} from "next-auth/react";
import useConversation from "./useConversation";
import { LogOut, MessageCircle, Users } from "lucide-react";
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";

const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();
    const routes = useMemo(() => [
        {
            lable:'المحادثة',
            href:'/conversation',
            icon:HiChat,
            active:pathname === '/conversation' || !!conversationId
        },
        {
            lable:'المستخدمين',
            href:'/users',
            icon:HiUsers,
            active:pathname === '/users' 
        },
        {
            lable:'تسجيل الخروج',
            href:'/',
            icon:HiArrowLeftStartOnRectangle,
            active:pathname === '/',
            function : () => {
                signOut();
            }
        },
    ] , [pathname , conversationId])

    return routes;
};

export default useRoutes;