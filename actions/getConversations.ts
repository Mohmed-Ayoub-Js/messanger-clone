import db from '@/lib/prismadb';
import getCurrentUSER from './getCurrentUser';

const getConversations = async () => {
    const currentUser : any= await getCurrentUSER();
    if(!currentUser?.id){
        return [];
    }
    try{
        const conversations = await db.conversation.findMany({
            orderBy : {
                lastMessageAt : 'desc',
            },
            where:{
                usersIds : {
                    has : currentUser.id,
                }
            },
            include : {
                users: true,
                messages : {
                    include : {
                        sender:true,
                        seend:true,
                    }
                }
            }
        })
        return conversations;
    }
    catch(err :any){
        console.log(err);
        
        return [];
    }
}

export default getConversations;