import db from "@/lib/prismadb";
import getCurrentUSER from "./getCurrentUser";

const getConversationById = async(conversationId : string) => {
    try{
        const currentUser = await getCurrentUSER();
        if(!currentUser){
            return null;
        }

        const conversation = await db.conversation.findUnique({
            where : {
                id : conversationId
            },
            include:{
                users:true,
            }
        })
        return conversation;
    }
    catch(err){
        console.log(err);
    }
}

export default getConversationById;