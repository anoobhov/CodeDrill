const Problem = require('../schema/problem')
const SolutionVideo = require("../schema/videometadata");
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET
})



//Generating Signature to send it to the Cloudinary(security)
const generateUploadSignature = async (req,res) => {
    try {
        const problemId = req.params
        const userId = req.result._id

        //verrifying if the problem exists...
        const problem = await Problem.findById({problemId})

        if(!problem)
            return res.json({error:"Problem isn't in the db"})

        const timeStamp = Math.round(new Date().getTime()/1000)
        const publicId = `leetcode-solutions/${problemId}/${userId}_${timeStamp}`

         const uploadParams = {
            timestamp: timeStamp,
            public_id: publicId,
    };

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_APISECRET
    );
    res.json({
      signature,
      timeStamp,
      public_id: publicId,
      //sending apiKey so that clodinary can seach private api key
      api_key: process.env.CLOUDINARY_APIKEY,
      cloud_name: process.env.CLOUDINARY_CLOUDNAME,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUDNAME}/video/upload`,
    });

  } catch (error) {
    console.error('Error generating upload signature:', error);
    res.status(500).json({ error: 'Failed to generate upload credentials' });
  }
}

const saveVideoMetadata = async (req,res) => {
    try {
        const {
      problemId,
      cloudinaryPublicId,
      secureUrl,
      duration,
    } = req.body;

    const userId = req.result._id;
     // Verify the upload with Cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      cloudinaryPublicId,
      { resource_type: 'video' }
    );

    if (!cloudinaryResource) {
      return res.status(400).json({ error: 'Video not found on Cloudinary' });
    }

    // Check if video already exists for this problem and user
    const existingVideo = await SolutionVideo.findOne({
      problemId,
      userId,
      cloudinaryPublicId
    });

    if (existingVideo) {
      return res.status(409).json({ error: 'Video already exists' });
    }

    const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
    resource_type: 'image',  
    transformation: [
    { width: 400, height: 225, crop: 'fill' },
    { quality: 'auto' },
    { start_offset: 'auto' }  
    ],
    format: 'jpg'
    });

    // Create video solution record
    const videoSolution = await SolutionVideo.create({
      problemId,
      userId,
      cloudinaryPublicId,
      secureUrl,
      duration: cloudinaryResource.duration || duration,
      thumbnailUrl
    });


    res.status(201).json({
      message: 'Video solution saved successfully',
      videoSolution: {
        id: videoSolution._id,
        thumbnailUrl: videoSolution.thumbnailUrl,
        duration: videoSolution.duration,
        uploadedAt: videoSolution.createdAt
    }
})
    } catch (error) {
        console.error('Error saving video metadata:', error);
        res.status(500).json({ error: 'Failed to save video metadata' });
    }
}


const deleteVideo = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    const video = await SolutionVideo.findOneAndDelete({problemId:problemId});
    
   

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    await cloudinary.uploader.destroy(video.cloudinaryPublicId, { resource_type: 'video' , invalidate: true });
    // why invalidate true

    res.json({ message: 'Video deleted successfully' });

  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
};


module.exports = {generateUploadSignature,saveVideoMetadata,deleteVideo}
