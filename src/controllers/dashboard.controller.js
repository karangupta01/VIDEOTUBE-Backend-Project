import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const userId = user._id

    const totalVideos = await Video.countDocuments({owner: userId})

    if (totalVideos === null || totalVideos === undefined) {
        throw new ApiError(404, "Something went wrong while playing videos")
    }

    const totalSubscribers = await Subscription.countDocuments({channel: userId})
    if (totalSubscribers === null || totalSubscribers === undefined) {
        throw new ApiError(404, "Something went wrong while displaying subscribers")
    }

    const totalVideosLike = await Like.countDocuments({
        video: {
            $in: await video.find({owner: userId}).distinct("_id")
        }
    })

    if (totalVideosLike === null || totalVideosLike === undefined) {
        throw new ApiError(404, "Something went wrong while displaying total likes")
    }

    const totalTweetLikes = await Like.countDocuments({
        tweet: {
            $in: await Tweet.find({ owner: userId }).distinct("_id")
        }
    })
    if (totalTweetLikes === null || totalTweetLikes === undefined) {
        throw new ApiError(404, "Something went wrong while fetching total tweet likes")
    }

    const totalCommentLike = await Like.countDocuments({
        comment: {
            $in: await Comment.find({ owner: userId }).distinct("_id")
        }
    })
    if(totalCommentLike === null || totalCommentLike === undefined){
        throw new ApiError(404, "Something went wrong while ddisplaying total comment likes")
    }

    const totalViews = await Video.aggregate([
        {
            $match : {owner : userId}
        },
        {
            $group: {
                _id: null,
                totalViews: {$sum: "$views"}
            }
        }
    ])
    if(totalViews === null || totalViews === undefined){
        throw new ApiError(404, "Something went wrong while displaying total views")
    }

    return res
    .status(200)
    json(new ApiResponse(
        200,
        {totalVideos,
        totalSubscribers,
        totalVideosLike,
        totalTweetLikes,
        totalCommentLike,
        totalViews: totalViews[0]?.totalViews || 0},
        "Channel Status fetched Successfully"
    ))
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const userId = req.user._id

    const Videos = await viedo.find({ owner: userId }).sort({createdAt : -1})

    if (!videos || Videos.length === 0) {
        throw new ApiError(404, "No videos found for this channel")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, Videos, "Channel Videos fetched successfully"))

})

export {
    getChannelStats, 
    getChannelVideos
    }