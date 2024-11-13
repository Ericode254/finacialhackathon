import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import avatae from "@/public/images/avatae.png"
import styles from './Register.module.css'; // Import your CSS module

const Register = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirmPassword: "",
        occupation: "",
        gender: ""
    });

    const [errors, setErrors] = useState({ phone: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleGenderChange = (e) => {
        setFormData({ ...formData, gender: e.target.value });
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone);
    };

    const submit = async () => {
        if (!validatePhoneNumber(formData.phone)) {
            setErrors({ ...errors, phone: "Please enter a valid phone number in international format (e.g., +1234567890)." });
            return;
        }
        setErrors({ phone: "" });

        const apiData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            profile: {
                phone_number: formData.phone,
                gender: formData.gender,
                occupation: formData.occupation,
                date_of_birth: formData.dob
            }
        };

        try {
            const response = await axios.post('http://localhost:8000/api/register/', apiData);
            console.log('Registration successful:', response.data);
            router.replace('/auth/login');
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Sign Up</h1>
                <p className={styles.subtitle}>Enter your details and create your account to get started</p>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="User Name" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="occupation">Occupation</label>
                        <input type="text" id="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
                    </div>

                    <div className={styles.field}>
                        <label>Gender</label>
                        <div className={styles.radioGroup}>
                            <div>
                                <input type="radio" id="male" value="male" checked={formData.gender === 'male'} onChange={handleGenderChange} />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" value="female" checked={formData.gender === 'female'} onChange={handleGenderChange} />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.submitButton}>
                        <button onClick={submit}>Register</button>
                    </div>
                </div>
            </div>

            <div className={styles.imageContainer}>
                <Image src={avatae} width={400} height={400} alt="logo" />
            </div>
        </div>
    );
};

export default Register;
