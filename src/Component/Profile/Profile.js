import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, editProfile } from '../../redux/profileSlice';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [showEdit, setShowEdit] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        DOB: '',
        gender:"",
        education:"",
        Contact:""
    });
    const profile = useSelector((state) => state.profiles.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                age: profile.age,
                DOB: profile.DOB,
                gender:profile.gender,
                education:profile.education,
                contact:profile.contact
            });
        }
    }, [profile]);

    const handleEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editProfile(formData));
        setShowEdit(false); 
    };

    if (!profile) {
        return <div>Loading...</div>; 
    }

    const handleLogout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1)
        const day = String(date.getDate())
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    return (
        <div className='profile-container'>
            <ToastContainer/>
            <h1>MY PROFILE</h1>
            <div className='profile-details'>
                <div className='leftProfile'>
                    <h5>Name</h5>
                    <h5>Email</h5>
                    <h5>Age</h5>
                    <h5>DOB</h5>
                    <h5>Gender</h5>
                    <h5>Education</h5>
                    <h5>Contact</h5>
                </div>
                <div className='rightProfile'>
                    <h5>{profile.username}</h5>
                    <h5>{profile.email}</h5>
                    <h5>{profile.age || "NA"}</h5>
                    <h5>{profile.DOB ? formatDate(profile.DOB) : "NA"}</h5>
                    <h5>{profile.gender || "NA"}</h5>
                    <h5>{profile.education || "NA"}</h5>
                    <h5>{profile.contact || "NA"}</h5>
                </div>
                
            </div>
            <div className='btn-container'>
            <button  className='edit-btn'onClick={handleEdit}>{showEdit ? 'Cancel' : 'Edit Profile'}</button>
            <button className='save-btn' onClick={handleLogout}>Logout</button>
            </div>

            {showEdit && (
                <form  className='edit-details'>
                 
                 <div className='form-group'>
                        <label>Age:</label>
                        <input
                            className='form-control'
                            type='number'
                            name='age'
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date of Birth:</label>
                        <input
                            type='date'
                            name='DOB'
                            className='form-control'
                            value={formData.DOB}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Gender:</label>
                        <div className='radio-group'>
                            <label>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Male'
                                    checked={formData.gender === 'Male'}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Female'
                                    checked={formData.gender === 'Female'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Education:</label>
                        <input
                            type='text'
                            name='education'
                            className='form-control'
                            value={formData.education}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Contact Number:</label>
                        <input
                            type='number'
                            name='contact'
                            className='form-control'
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                   <button className='save-btn' onClick={handleSubmit}>Save</button>

                </form>
            )}
        </div>
    );
}

export default Profile;
