import {useForm}from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z } from "zod"

const LoginSchema = z.object({
    emailId:z.string().email("Invalid Email"),
    password:z.string().min(8,"Weak Password")
})
function Login(){
        const {
            register,
            handleSubmit,
            formState:{errors},
        } = useForm({resolver:zodResolver(LoginSchema)})
    
        const onSubmit = (data)=>{
            console.log(data)
        }
        return(
           <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-3xl">LeetCode</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                        <div className="form-control">
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
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </div>
    
                    </form>
                </div>
    
            </div>
    
           </div>
        )
    }    


export default Login