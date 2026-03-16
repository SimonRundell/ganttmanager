import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { register as registerUser } from '../api/auth'
import { Link } from 'react-router-dom'

const schema = z.object({
  screen_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    await registerUser(values)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="auth-subtitle">Verify your email to activate access.</p>
        {isSubmitSuccessful ? (
          <p>Check your inbox to verify your email.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <label>
              Screen name
              <input type="text" {...register('screen_name')} />
              {errors.screen_name && <span>{errors.screen_name.message}</span>}
            </label>
            <label>
              Email
              <input type="email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
            <label>
              Password
              <input type="password" {...register('password')} />
              {errors.password && <span>{errors.password.message}</span>}
            </label>
            <button className="primary-button" type="submit">
              Register
            </button>
          </form>
        )}
        <div className="auth-links">
          <Link to="/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
