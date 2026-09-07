const conversationModel = require('../models/Conversation');
const messageModel = require('../models/Message');
require('../models/user');
require('../models/AgentDetails');
require('../models/Properties');

const createOrGetConversation = async (req, res) => {
    try{
        console.log('User ID:', req.user.id || req.user._id);
        const buyerId = req.user.id || req.user._id; 
        const { agentId, propertyId } = req.body;

        if(!agentId){
            return res.status(400).json({message:'Agent ID is required'});
        }
        const query = { buyer: buyerId, agent: agentId };
        if (propertyId) query.property = propertyId;

        const existingConversation = await conversationModel.findOne(query);
        if(existingConversation){
            return res.status(200).json({
                success: true,
                conversation: existingConversation
            });
        }
        const newConversation = await conversationModel.create({
            buyer: buyerId,
            agent: agentId,
            property: propertyId || null
        });
        return res.status(201).json({
            success: true,
            message: 'Conversation created successfully',
            conversation: newConversation
        });
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error', error:error.message});
    }
};
const getMessages = async (req,res)=>{
    try{
        const {conversationId} = req.params;
        const messages = await messageModel.find({conversation:conversationId}).sort({createdAt:1});
        if(!messages){
            return res.status(404).json({message:'No messages found for this conversation'});
        }
        return res.status(200).json({
            success: true,
            messages
        });
    }catch(error){
        return res.status(500).json({message:'Internal Server Error', error:error.message});
    }
}
const getConversations = async(req,res)=>{
    try{
        const userId = req.user.id || req.user._id;
        const conversations = await conversationModel.find({
            $or:[
                {buyer:userId},
                {agent:userId}
            ]
        })
        .populate('buyer', 'name email profilePic phonenumber')
        .populate('agent', 'name email profileImage role location')
        .populate('property', 'name title price location image')
        .sort({
            updatedAt:-1
        });
        return res.status(200).json({
            success: true,
            conversations
        });
    }catch(error){
        return res.status(500).json({message:'Internal Server Error', error:error.message});
    }
}
module.exports = {
    createOrGetConversation,
    getConversations,
    getMessages
};