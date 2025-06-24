import React from "react";
import upload_image from "../assets/img/upload-image.jpg";
import { Button, ProfileImage } from "./Index";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/authentication";

function Avatar({
  userId = null,
  imageSrc = null,
  cancelClickFn,
}){
  const [src, setSrc] = React.useState(null);
  const ref = React.useRef(null);

  const uploadImage = () => ref.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSrc(file)
  }

  const uploadCancel = () => {
    setSrc(null);
    cancelClickFn();
  }

  const deleteCurrentPhoto = () => {
    const file = appwriteService.deleteFile(`profile-image-${userId}`);
    if(file) console.log("profile image is deleted");
    setSrc(null);
  }

  const uploadDone = () => {
    if(src){
      if(userId && imageSrc){
        checkImageURL(imageSrc, isValid => {
          if(isValid){
            const file = appwriteService.deleteFile(`profile-image-${userId}`);
            if(file) uploadProfile(userId, src);
          }
        });
      }else {
        const file = appwriteService.getFileView(`profile-image-${userId}`);
        checkImageURL(file, isValid => {
          if(isValid){
            const file = appwriteService.deleteFile(`profile-image-${userId}`);
            if(file) uploadProfile(userId, src);
          }else {
            uploadProfile(userId, src);
          }
        });
      }
    }
    setSrc(null);
    cancelClickFn();
  }

  function checkImageURL(url, callback) {
    const img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
  }

  function uploadProfile(id, src){
    authService.setProfileImage(id, src);
    console.log("profile image uploaded.");
  }

  return(
    <div className="avatar-back">
    <div className="avatar">
      <h3>Profile photo</h3>
      <input 
        type="file"
        accept="image/*"
        ref={ref}
        value=""
        onChange={handleImageChange}
        style={{display: "none"}}
      />
      <Button 
        className="close-avatar" 
        onClick={uploadCancel}
      ><i className="fa fa-close"></i>
      </Button>
      <ProfileImage
        src={src ? URL.createObjectURL(src)
          : imageSrc ? imageSrc : upload_image
        }
        onClick={uploadImage}
      />
      <div className="btns w-100">
        {imageSrc && <Button onClick={deleteCurrentPhoto}>
          Delete current photo</Button>}
        <Button onClick={uploadDone}>Done</Button>
      </div>
    </div>
    </div>

  );
}

export default Avatar;