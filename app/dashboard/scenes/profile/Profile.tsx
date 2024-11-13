// components/UserProfile.js
import React from 'react';
const Profile = () => {
    const user = {
        name:"Victor codes",
        email:"victorcodes9532@gmail.com",
        avatar:"/"
    }

    const onLogout = false

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="max-w-sm w-full rounded-lg shadow-md p-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <img
                        src={user.avatar || "/default-avatar.png"}
                        alt="User avatar"
                        className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-100">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>

                {/* Profile Information */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                        <span className="font-medium text-gray-100 w-1/3">Name:</span>
                        <span className="text-gray-100">{user.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium text-gray-100 w-1/3">Email:</span>
                        <span className="text-gray-100">{user.email}</span>
                    </div>
                    {/* Additional user info fields can go here */}
                </div>

                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
