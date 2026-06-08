

import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import logo from '../../assets/Logo.png'
import back from '../../assets/LoginImage.jpeg'
import { useMutation } from '@tanstack/react-query'
import { userLogin } from '../api/allapi'
import Toast from '../../components/Toast'

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const [email, setEmail] = useState("postwagens@gmail.com")
  const [password, setPassword] = useState("rawxnfrkhkrvwqcy")


  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return userLogin(email, password);
    },

    onSuccess: (data) => {
      const { token, message } = data
      if (token) {
        localStorage.setItem('Token', token)
      }
      Toast({ type: 'success', message })
      navigate('/dashboard')
    },

    onError: (error) => {
      Toast({ type: 'error', message: error.message })
    },
  });

  return (
    <div style={{
      backgroundImage: `url(${back})`,
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
      className="p-2 flex justify-center items-center">


      <div className="flex items-center justify-center rounded-4xl">

        <div className="bg-[#000000CC] backdrop-blur-sm border border-white/30 shadow-2xl shadow-black space-y-8 px-8 py-10 w-full rounded-4xl  ">


          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-80" />

          </div>

          <h1 className="text-white text-3xl font-medium text-center tracking-wider">
            Admin Portal
          </h1>

          <div className="space-y-5">
            {/* Email Input */}
            <div className="flex items-center border-b border-white/20 py-2 group focus-within:border-blue-500 transition-colors">
              <User size={20} className="text-gray-500 group-focus-within:text-blue-500" />
              <input
                className="bg-transparent  w-full text-gray-200 px-3 outline-none placeholder:text-gray-600"
                type="email"
                placeholder="Your Email Address"
                value={email}
                required
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Please enter your email address")
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border-b border-white/20 py-2 group focus-within:border-blue-500 transition-colors">
              <Lock
                size={20}
                className="text-gray-500 group-focus-within:text-blue-500"
              />

              <input
                className="bg-transparent w-full text-gray-200 px-3 outline-none placeholder:text-gray-600"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className='cursor-pointer' size={20} /> : <Eye className=' cursor-pointer' size={20} />}
              </button>
            </div>
          </div>



          <button
            onClick={() =>
              handleLogin({
                email,
                password,
              })
            }
            disabled={isPending}
            className="w-full cursor-pointer bg-[#1F3A5F]  text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
            {isPending ? "Signing in..." : "Sign In"}
          </button>


          <div className="flex mt-6 justify-center">
            <Link className=' cursor-pointer' to={'forgetpass'}>
              <span className="text-sm text-gray-200 hover:text-blue-400 cursor-pointer transition-colors">
                Forgot Password?
              </span></Link>

          </div>
        </div>
      </div>
    </div>
  )
}