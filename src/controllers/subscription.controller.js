import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    
    const {channelId} = req.params
    // TODO: toggle subscription

    const subscriberId = user._id

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid Channel id")
    }
    
    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId
    })

    if(existingSubscription){
        await Subscription.findByIdAndDelete(existingSubscription._id)

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Unsubscribed Successfully"))
    }

    await Subscription.create({subscriber: subscriberId, channel: channelId})
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subscribed Successfully"))

})


// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.user._id
    if(!isValidObjectId(channelId)){
        throw new ApiError(400, "Invalid Channel Id")
    }

    const SubscribersDocs = await Subscription.find({channel: channelId}).populate("subscriber", "_id name email ")

    if (!SubscribersDocs) {
        throw new ApiError(400, "No subscriber found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, SubscribersDocs, "Subscriber fetched succesfuly"))
})


// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.user._id

    const subscribedChannels = await Subscription.find({
        subscriber: subscriberId
    }).populate("channel", "_id name email")

    if (!subscribedChannels || subscribedChannels.length === 0) {
        throw new ApiError(404, "No subscribed channels found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200 ,subscribedChannels, "Subscribed channels fetched successfully"))
})


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}