"use client";
import { auth, db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { setDoc, doc } from 'firebase/firestore'
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const loginInitial = {
  email: "",
  password: "",
};
const registerInitial = {
  name: "",
  email: "",
  password: "",
};


const loginRegister = () => {
  const [loginData, setLoginData] = useState(loginInitial);
  const [registerData, setRegisterData] = useState(registerInitial);
  const [formType, SetFormType] = useState("login");
  const router = useRouter()
  const {isAuth,setIsAuth} = useContext(DataContext)
  // const auth = getAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
  
      await updateProfile(auth.currentUser, {
        displayName: registerData.name
      });
  
      const userId = userCredential.user.uid;
  
      await setDoc(doc(db, 'users', userId), {
        userId,
        name: registerData.name,
        email: registerData.email,
        favoriteGif: [],
      });
  
      setRegisterData(registerInitial);
      SetFormType('login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setRegisterData(registerInitial);
      console.error('Registration error:', error);
    }
  };
  


  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {  
        const user = userCredential.user;
        
        setLoginData(loginInitial)
        setIsAuth(true)
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setLoginData(loginInitial)
      });
      
      
  };

  const handleChange = (e) => {
    formType === "login"
      ? 
        (()=>{setLoginData({ ...loginData, [e.target.name]: e.target.value })})()
      : 
      (()=>{setRegisterData({ ...registerData, [e.target.name]: e.target.value })})()
  };

  const handleFormType = () =>{
    formType === 'login' ? SetFormType('register') : SetFormType('login')
  }

  return formType === "register" ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6">Registration</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={handleRegistration}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              value={registerData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={registerData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={registerData.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <p>OR</p>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleFormType}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div>OR</div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleFormType}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default loginRegister;
