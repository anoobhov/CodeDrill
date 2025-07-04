import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , NavLink} from 'react-router';
import {loginUser} from "../authSlice"
import { useEffect } from 'react';
import AnimateBg from '../components/bg_animation';

const loginSchema = z.object({
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
  } = useForm({ resolver: zodResolver(loginSchema) });


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
    <>
    
    <div className="min-h-screen flex items-center justify-center p-4 bg-none"> {/* Centering container */}
    <AnimateBg/>
      <div className="card w-96 shadow-xl bg-white/10 backdrop-blur-lg border border-white/20"> {/* Existing card styling */}
        <div className="card-body">
          <h1 className="card-title justify-center text-3xl text-yellow-100">CodeDrill</h1> {/* Centered title */}
          <h2 className="card-title justify-center text-xl text-green-300">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email ID"
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
          <div className="text-center mt-6">
            <span className="text-sm bg-gray-700 shadow-xl p-2">
              New Here?{' '}
              <NavLink to="/signup" className="link link-primary">
                Register Here
              </NavLink>
            </span>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;



