import db from '@/lib/prismadb';
import GetSession from './getsession';

const getUser = async () => {
    const session = await GetSession();

    if(!session?.user?.email){
        return [];
    }

    try{
         const user = await db.user.findMany({
            orderBy:{
                createdAt:'desc'
            },
            where : {
                NOT:{
                    email: session.user.email
                }
            }
         });
        return user;
    } catch(err){
        console.log(err);
    }
}

export default getUser;