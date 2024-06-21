import db from "@/lib/prismadb";
import GetSession from "./getsession";

const getCurrentUSER  = async () => {
    try{
        const session = await GetSession();
        console.log(`session : ${session}`);
        
        if(!session?.user?.email){
            return null;
        }
        console.log(session);
        
        const currentUser = await db.user.findUnique({
            where :{
                email : session.user.email as string,
            },
        });
        if(!currentUser){
            return "user is not defiend";
        }
        console.log(`currentUser : ${currentUser.id}`);

        return currentUser;
    }catch(err){
        console.log(err);
    }
}

export default getCurrentUSER;