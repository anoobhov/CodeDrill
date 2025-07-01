import { useState } from "react";
import { useParams } from "react-router";
import {useForm} from "react-hook-form"
import axiosClient from "../utils/axiosClient";
import axios from "axios";


function VideoUpload(){
    const {problemId} = useParams()
    const [uploading,setUploading] = useState(false)
    const [progress,setProgress] = useState(0)

    const [metaData,setMetaData] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setError,
        clearErrors
    } = useForm()

    const selectedFile = watch('videoFile')?.[0]


    //Upload on cloudinary
    const onSubmit = async(data)=>{
        const file = data.videoFile[0]

        setUploading(true)
        setProgress(0)
        clearErrors()

        try {
            // get an upload signature from backend
            const signatureResponse = await axiosClient.get(`/video/upload/${problemId}`)
            const { signature, timeStamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;
            // Step 2: Create FormData for Cloudinary upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timeStamp);
            formData.append('public_id', public_id);
            formData.append('api_key', api_key);
    
            // Step 3: Upload directly to Cloudinary
            // upload response store the response by cloudinary after the video uploadation

            const uploadResponse = await axios.post(upload_url,formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(progress);
            },
            })
            const cloudinaryResult = uploadResponse.data;

            // Step 4: Save video metadata to backend
            const metadataResponse = await axiosClient.post('video/save',{
                problemId:problemId,
                cloudinaryPublicId: cloudinaryResult.public_id,
                secureUrl: cloudinaryResult.secure_url,
                duration: cloudinaryResult.duration,
            })
            setMetaData(metadataResponse.data.videoSolution)
            reset()

        } catch (error) {
          console.error('Upload error:', err);
          setError('root', {
            type: 'manual',
            message: err.response?.data?.message || 'Upload failed. Please try again.'
          });
        } finally {
          setUploading(false);
          setProgress(0);
        }
    }
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };
    
      // Format duration
      const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
    return(
        <div className="max-w-md mx-auto p-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Upload Video</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* File Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Choose video file</span>
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    {...register('videoFile', {
                      required: 'Please select a video file',
                      validate: {
                        isVideo: (files) => {
                          if (!files || !files[0]) return 'Please select a video file';
                          const file = files[0];
                          return file.type.startsWith('video/') || 'Please select a valid video file';
                        },
                        fileSize: (files) => {
                          if (!files || !files[0]) return true;
                          const file = files[0];
                          const maxSize = 100 * 1024 * 1024; // 100MB
                          return file.size <= maxSize || 'File size must be less than 100MB';
                        }
                      }
                    })}
                    className={`file-input file-input-bordered w-full ${errors.videoFile ? 'file-input-error' : ''}`}
                    disabled={uploading}
                  />
                  {errors.videoFile && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.videoFile.message}</span>
                    </label>
                  )}
                </div>
    
                {/* Selected File Info */}
                {selectedFile && (
                  <div className="alert alert-info">
                    <div>
                      <h3 className="font-bold">Selected File:</h3>
                      <p className="text-sm">{selectedFile.name}</p>
                      <p className="text-sm">Size: {formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                )}
    
                {/* Upload Progress */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <progress 
                      className="progress progress-primary w-full" 
                      value={progress} 
                      max="100"
                    ></progress>
                  </div>
                )}
    
                {/* Error Message */}
                {errors.root && (
                  <div className="alert alert-error">
                    <span>{errors.root.message}</span>
                  </div>
                )}
    
                {/* Success Message */}
                {metaData && (
                  <div className="alert alert-success">
                    <div>
                      <h3 className="font-bold">Upload Successful!</h3>
                      <p className="text-sm">Duration: {formatDuration(metaData.duration)}</p>
                      <p className="text-sm">Uploaded: {new Date(metaData.uploadedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
    
                {/* Upload Button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`btn btn-primary ${uploading ? 'loading' : ''}`}
                  >
                    {uploading ? 'Uploading...' : 'Upload Video'}
                  </button>
                </div>
              </form>
            
            </div>
          </div>
        </div>
    )
}

export default VideoUpload;
