import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const App = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md">
                {showLogin ? (
                    <>
                        <Login />
                        <p className="mt-4 text-center">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setShowLogin(false)}
                                className="text-blue-500 underline"
                            >
                                Register
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <Register />
                        <p className="mt-4 text-center">
                            Already have an account?{' '}
                            <button
                                onClick={() => setShowLogin(true)}
                                className="text-blue-500 underline"
                            >
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
