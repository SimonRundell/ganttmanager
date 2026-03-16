import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { resetPassword } from '../api/auth'
import { useSearchParams } from 'react-router-dom'

const schema = z.object({
  password: z.string().min(6),
})

function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (values) => {
    await resetPassword({ token, password: values.password })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Set new password</h2>
        {isSubmitSuccessful ? (
          <p>Password updated. You can sign in.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <label>
              New password
              <input type="password" {...register('password')} />
              {errors.password && <span>{errors.password.message}</span>}
            </label>
            <button className="primary-button" type="submit">
              Update password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordPage
