import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    if (!req.User) {
        throw new ApiError(404, "User must be logged in")
    }

    const match = {
        ...(query ? { title: {$regex: query, $options: "i"} }: {}),
        ...(userId ? { owner: mongoose.Types.ObjectId(userId) } : {})
    }

    const videos = await Video.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "videosByOwner"
            }
        },
        {
            $project: {
                videoFile: 1,
                thumbnail: 1,
                title: 1,
                description: 1,
                duration: 1,
                views: 1,
                isPublished: 1,
                owner: {
                    $arrayElemAt: ["videosByOwner", 0]
                }
            }
        },
        {
            $sort: {
                [sortBy]: sortType === "desc" ? -1 : 1
            }
        },
        {
            $skip: (page - 1) * parseInt(limit)
        },
        {
            $limit: parseInt(limit)
        }
    ])

    if(!videos?.length){
        throw new ApiError(404, "Videos not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched Successfully"))


})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    if (!title) {
        throw new ApiError(404, "Title shpuld not be empty")
    }
    if (!description) {
        throw new ApiError(404, "Description should not be empty")
    }

    const videoFileLocalPath = req.files?.videoFile[0]?.path
    if (!videoFileLocalPath) {
        throw new ApiError(404, "Video File is required")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if (!thumbnailLocalPath) {
        throw new ApiError(404, "Thumbnail is required")
    }

    try {
        const duration = await getVideoDuration(videoFileLocalPath)
        const videoFile = await uploadOnCloudinary(videoFileLocalPath)
        if (!videoFile) {
            throw new ApiError(400, "Cloudinary Error: Video file required")
        }
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
        if (!thumbnail) {
            throw new ApiError(400, "Cloudinary Error: Thumbnail is required")
        }

        const videoDoc = await Video.create({
            videoFile: videoFile.url,
            thumbnail: thumbnail.url,
            title,
            description,
            owner: req.user?._id,
            duration
        })
        console.log(`title: ${title}, duration: ${duration}, owner: ${owner}`);
        if (!videoDoc) {
            throw new ApiError(400, "Somethung went wrong while publishing a video")
        }
        return res
        .status(200)
        .json(new ApiResponse(200, videoDoc, "Video published successfully"))

    } catch (error) {
        throw new ApiError(400, "Error Occured")
    }

})

const getVideoById = asyncHandler(async (req, res) => {
   
    const { videoId } = req.params
   
    //TODO: get video by id
   
    if (!isValidObjectId(videoId)) {
        throw new ApiError(404, "Invalid video Id")
    }
   
    const video = await Video.findById(videoId).populate("owner", "name email")
   
    if (!video) {
        throw new ApiError(400, "Video not found")
    }
   
    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    
    const { videoId } = req.params
    
    //TODO: update video details like title, description, thumbnail
    
    const { title, description } = req.body
    
    if(!isValidObjectId(videoId)) {
        throw new ApiError(404, "Invalid video Id")
    }
    
    let updateData = { title, description }
    
    if (req.file) {
        const thumbnailLocalPath = req.file.path
        if (!thumbnailLocalPath) {
            throw new ApiError(404, "Thumbnail file is missing")
        }
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
        if (!thumbnail.url) {
            throw new ApiError(400, "Error while uploading thumbnail")
        }
        updateData.thumbnail = thumbnail.url
    }
    
    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {$set: updateData},
        {new: true, runvalidators: true}
    )
    
    if (!updatedVideo) {
        throw new ApiError(404, "Video not found")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    
    const { videoId } = req.params
    
    //TODO: delete video
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(404, "Invalid video Id")
    }
    
    const deletedvideo = await Video.findByIdAndDelete(videoId)
    
    if (!deletedvideo) {
        throw new ApiError(404, "Video not found")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, deletedvideo, "Video dleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    
    const { videoId } = req.params
    
    if (!videoId) {
        throw new ApiError(400, "Invalid video Id")
    }
    
    const video = await Video.findById(videoId)
    
    if (!video) {
      throw new ApiError(404, "Video not found")
    }
    video.isPublished = !video.isPublished
    
    await video.save()
    
    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video publish status toggled successfully"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}