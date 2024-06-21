import db from "@/lib/prismadb";

const getMessages = async (conversationId : string) => {
  try{
   const messages = await db.message.findMany({
    where : {
        conversationId : conversationId,
    },
    include:{
        sender:true,
        seend:true,
    },
    orderBy:{
        createdAt:'asc'
    }
   });
   return messages;
  }
  catch(err){
    console.log(err);
  }

}

export default getMessages;