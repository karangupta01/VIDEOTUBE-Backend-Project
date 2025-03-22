import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body
    const ownerId = req.user._id

    if(!content){
       throw new ApiError(400, "Tweet content empty")
    }

    const newtweet = await Tweet.create({content, owner: ownerId})

    if(!newtweet){
        throw new ApiError(500, "Something wrong happened in creating new tweet")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, newtweet, "Tweet Created Successfully"
        )
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const {userId} = req.params

    if(!userId){
        throw new ApiError(400, "Invalid User ID")
    }

    const tweets = await Tweet.find({owner: userId}).sort({createAt: -1})

    if(!tweets || tweets.length === 0){
        throw new ApiError(404, "Tweets not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweets fetched successfully"))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params
    const { content } = req.body
    const { userId } = req.user._id

    if(!tweetId){
        throw new ApiError(400, "Invalid Tweet ID")
    }

    if (tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You can only update your own tweets");
      }

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
          $set: {
            content,
          },
        },
        {
          new: true,
        }
      );
    
      if (!updatedTweet) {
        throw new ApiError(500, "Something went wrong while updating the tweet");
      }

      return res
      .status(200)
      .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params

    const userId = req.user._id
    
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet ID")
    }
    
    const tweet = await Tweet.findById(tweetId)
    
    if(!tweetId){
        throw new ApiError(400, "Tweet not found")
    }
    
    if (tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You can only delete your own tweets");
      }
    
    const deletedTweet = await Tweet.findByIdAndDelete(tweetId)
    
    if(!deletedTweet){
        throw new ApiError(400, "Tweet not deleted")
    }

    return res
    .status(200)
    .json( new ApiResponse(200, deletedTweet, "Tweet deleted successfully") )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}