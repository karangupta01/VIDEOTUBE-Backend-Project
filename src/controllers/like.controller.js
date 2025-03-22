import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    const userId  = req.user._id
    if (!videoId) {
        throw new ApiError(400, "Invalid video ID")
    }
    const existingLike = await Like.findOne({video: videoId, likedBy: userId})

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        return res
        .status(200)
        .json(new ApiResponse(200, existingLike, "Video Unliked Successfully"))
    }

    const likeVideo = await Like.create({video: videoId, likedBy: userId})

    return res
    .status(200)
    .json(new ApiResponse(200, likeVideo, "Video liked Successfully"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    const userId = user._id

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid Comment Id")
    }

    const exisitingLike = await Like.findOne({
        comment: commentId,
        likedBy: userId
    })
    if (exisitingLike) {
        await Like.findByIdAndDelete(existingLike._id)

        return res
        .status(200)
        .json(new ApiResponse(200, exisitingLike, "Comment Unliked Successfully"))
    }


    const likeComment = await Like.create({comment: commentId, likedBy: userId})
    return res
    .status(200)
    .json(new ApiResponse(200, likeComment, "Comment Liked Successfully"))

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const userId = user._id

    if (!tweetId) {
        throw new ApiError(400, "Invalid Tweet ID")
    }
    const exisitingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: userId
    })
    if(existingLike){
        await Like.findByIdAndDelete(existingLike._id)

        return res
        .status(200)
        .json(new ApiResponse(200, exisitingLike, "Tweet Unliked Successfully"))
    }

    const likeTweet = await Like.create({tweet: tweetId, likedBy: userId})
    return res
    .status(200)
    .json(new ApiResponse(200, likeTweet, "Tweet Liked Successfully"))

})

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const userId = req.user._id
    const likedVideos = await Like.find({
        likedBy: userId,
        video: { $exists: true }
    }).populate("video", "_id title url")

    return res
    .status(200)
    .json(new ApiResponse(200, likedVideos, "Liked Videos fetched Successfully"))

})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}

//https://github.com/shantanu421/vidcore/blob/all-controllers-explained/src/controllers/like.controller.js