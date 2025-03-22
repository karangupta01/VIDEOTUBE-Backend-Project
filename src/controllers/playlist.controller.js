import mongoose, {isValidObjectId, mongo} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist

    if (!name || !description) {
        throw new ApiError(400, "Name & Description Required")
    }

    const playList = await Playlist.create({
        name,
        description,
        owner: user._id
    })
    if(!playList){
        throw new ApiError(400, "Something went wrong!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, playList, "Playlist Created Successfully."))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if (!userId) {
        throw new ApiError(400, "Invalid user ID")
    }
    const playList = await Playlist.find({owner: userId})

    if (!playList || playList.length === 0) {
        throw new ApiError(404, "PlayList not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playList, "User playlist fetched successfully")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id

    if(!playlistId){
        throw new ApiError(404, "Invalid playlist ID")
    }

    const playList = await Playlist.findById(playlistId).populate("videos")

    if(!playList){
        throw new ApiError(404, "Playlist Not Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playList, "Playlist fetched Successfully")
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new ApiError(404, "Invalid Id's")
    }

    const updatedPlaylist = await Playlist.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $addFields: {
                videos: {
                    $setUnion: ["$videos", [new mongoose.Types.ObjectId(videoId)]]
                }
            }
        },
        {
            $merge: {
                into: "playlists"
            }
        }
    ])

    if(!updatePlaylist){
        throw new ApiError(404, "Playlist not updated")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatePlaylist, "Playlist updated successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new ApiError(404, "Invalid IDs")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            new: true
        }
    )

    if (!updatedPlaylist) {
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedPlaylist, "Video removed successfully")
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!playlistId){
        throw new ApiError(404, "Invalid Id")
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)

    if(!deletedPlaylist){
        throw new ApiError(404, "Playlist not found")
    }
    return res
    .status(200)
    .json(
        new ApiError(200 , deletedPlaylist, "Playlist deleted Successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    if(!playlistId){
        throw new ApiError(404, "Invalid Play List Id")
    }
    if (!name || !description) {
        throw new ApiError(404, "Name And Description can not be Empty")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name,
                description
            }
        },
        {new: true}
    )

    if(!updatedPlaylist){
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedPlaylist, "Playlist Updated Successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}