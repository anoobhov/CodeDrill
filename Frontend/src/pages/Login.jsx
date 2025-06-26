// import {useForm}from "react-hook-form"
// import {zodResolver} from "@hookform/resolvers/zod"
// import {z } from "zod"

// const LoginSchema = z.object({
//     emailId:z.string().email("Invalid Email"),
//     password:z.string().min(8,"Weak Password")
// })
// function Login(){
//         const {
//             register,
//             handleSubmit,
//             formState:{errors},
//         } = useForm({resolver:zodResolver(LoginSchema)})
    
//         const onSubmit = (data)=>{
//             console.log(data)
//         }
//         return(
//            <div className="min-h-screen flex items-center justify-center p-4">
//             <div className="card w-96 bg-base-100 shadow-xl">
//                 <div className="card-body">
//                     <h2 className="card-title justify-center text-3xl">LeetCode</h2>
//                     <form onSubmit={handleSubmit(onSubmit)}>
                       
//                         <div className="form-control">
//                   <label className="label mb-1">
//                     <span className="label-text">Email</span>
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="john@example.com"
//                     className={`input input-bordered ${errors.emailId && 'input-error'}`}
//                     {...register('emailId')}
//                   />
//                   {errors.emailId && (
//                     <span className="text-error">{errors.emailId.message}</span>
//                   )}
//                 </div>
    
//                 <div className="form-control mt-4">
//                   <label className="label mb-1">
//                     <span className="label-text">Password</span>
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="••••••••"
//                     className={`input input-bordered ${errors.password && 'input-error'}`}
//                     {...register('password')}
//                   />
//                   {errors.password && (
//                     <span className="text-error">{errors.password.message}</span>
//                   )}
//                 </div>
//                 <div className="form-control mt-6 flex justify-center">
//                     <button type="submit" className="btn btn-primary">SignUp</button>
//                 </div>
    
//                     </form>
//                 </div>
    
//             </div>
    
//            </div>
//         )
//     }    


// export default Login

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,NavLink } from 'react-router';
import {loginUser} from "../authSlice"
import { useEffect } from 'react';

const signupSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    try{
    dispatch(loginUser(data));
    console.log(data)
    }catch(error)
    {
      alert("Eroor"+error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"> {/* Centering container */}
      <div className="card w-96 bg-base-100 shadow-xl"> {/* Existing card styling */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Leetcode</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.emailId && 'input-error'}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
          {/* Signup redirect */}
          <div className="text-center mt-6">
            <span className="text-sm">
              Don't have an account?{' '}
              <NavLink to="/signup" className="link link-primary">
                Login
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



