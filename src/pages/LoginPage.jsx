import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../store/authStore'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

function LoginPage() {
  const navigate = useNavigate()
  const { signIn, status } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    await signIn(values)
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Sign in to your project workspace.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
          <button className="primary-button" type="submit" disabled={status === 'loading'}>
            Sign in
          </button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
