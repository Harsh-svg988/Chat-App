import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id; // Changed from res.user.id to req.user._id

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
            // await Promise.all([
                
            // ]);
        }
        // newMessage.save(),
        // conversation.save()
        await Promise.all([
            newMessage.save(),
            conversation.save()
        ]);

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

