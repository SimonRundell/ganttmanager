import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { forgotPassword } from '../api/auth'

const schema = z.object({
  email: z.string().email(),
})

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    await forgotPassword(values)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Password reset</h2>
        {isSubmitSuccessful ? (
          <p>Check your inbox for a reset link.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <label>
              Email
              <input type="email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
            <button className="primary-button" type="submit">
              Send reset link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
