import React , { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);


  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", 
        { withCredentials: true });
      setUser(response.data.user);
    }
    catch (err) {
      setError("Failed to fetch user data");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageUpload = async () => {

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const response =await axios.post("http://localhost:5000/api/auth/upload-profile-image", 
        formData, {
        withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
      });
      setUser(prev => ({
      ...prev, profile_image: response.data.profile_image}));
      setProfileImage(null);
      
    } catch (err) {
      setError("Failed to upload profile image");
    }
  };

  if(!user && !error){
    return <div>Loading...</div>;
  }
  return (
    <div className='profile-container'>
      <div className="profile-card">
        <h4 className='profile-title'>Profile</h4>
        {error && <p className='error-message'>{error}</p>}
        <div className='profile-info'>
          <p><strong>Username: </strong>{user?.username}
          </p>
          <p><strong>Email: </strong>{user?.email}
          </p>
          <p><strong>contact: </strong>{user?.contact || 'N/A'}
          </p>
          {user?.profile_image && < img src={`http://localhost:5000${user.profile_image}`} alt='Profile' className='profile-image'/>}
          
          <input type='file' accept='image/*' className='form-input' onChange={(e)=>setProfileImage(e.target.files[0])}></input>
          {profileImage && <button onClick={handleImageUpload} className='form-button'>Upload Profile Image</button>}
        </div>
      </div>
    </div>
  )
}

export default Profile