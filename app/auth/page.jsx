"use client";
import { auth, db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { setDoc, doc } from 'firebase/firestore'
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import ButtonLoader from "../components/ButtonLoader";

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
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(' ')
  // const auth = getAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
  
      await updateProfile(auth.currentUser, {
        displayName: registerData.name
      });
      
      setIsLoading(false)
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
      setIsLoading(false)
      setErrorMsg(errorMessage.split('Error')[1])
      setRegisterData(registerInitial);
      console.error('Registration error:', error);
    }
  };
  


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const user = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {  
        const user = userCredential.user;
        setLoginData(loginInitial)
        setIsAuth(true)
        localStorage.setItem('isAuthenticated','true')
        setIsLoading(false)
        router.push('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false)
        setErrorMsg(errorMessage.split('Error')[1])
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
      <div className="bg-white shadow-md rounded-[10px] w-[22rem] px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Registration</h1>
        <p className="text-md text-center text-red-400">{errorMsg}</p>
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
          <div className="flex justify-center">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? <ButtonLoader/> : 'Register'}
              
            </button>
          </div>
          <p className="my-2 text-center">OR</p>
          <div className="flex items-center justify-center">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
      <div className="bg-white shadow-md rounded px-8 pt-6 w-[22rem] pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <p className="text-md text-center text-red-400">{errorMsg}</p>
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
          <div className="flex justify-center">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? <ButtonLoader/> : 'Login'}
            </button>
          </div>
          <div className="text-center my-2">OR</div>
          <div className="flex items-center justify-center">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
