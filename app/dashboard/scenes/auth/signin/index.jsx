import React, { useState } from 'react';
// import xora from "@/public/images/xora.svg";
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import axios from 'axios';
import './styles.css'; // Import the CSS file
import avatae from "@/public/images/avatae.png"

const Page = () => {
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // Token state
    const [token, setToken] = useState("");

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submit = async () => {
        const apiData = {
            username: formData.username,
            password: formData.password
        };

        try {
            const response = await axios.post('http://localhost:8000/api/token/', apiData);
            setToken(response.data.token);
            console.log('Token received:', response.data.token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='container'>
            <div className='logo-container'>
                <Image src={avatae} alt="logo" />
            </div>
            <div className='form-container'>
                <h1 className='title'>Your finances are in your hands</h1>

                <h1 className='login-header'>Login</h1>
                <p className='subtitle'>Enter your details and create your account to get started</p>
                
                <div className='input-group'>
                    <label htmlFor="username" className="label">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Username..." 
                        value={formData.username}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="password" className="label">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password..." 
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div className='button-container'>
                    <button onClick={submit} className='login-button'>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
