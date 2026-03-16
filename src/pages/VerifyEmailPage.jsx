import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../api/auth'

function VerifyEmailPage() {
  const [params] = useSearchParams()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const token = params.get('token')
    if (!token) {
      setStatus('missing')
      return
    }

    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [params])

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Email Verification</h2>
        {status === 'loading' && <p>Verifying your email...</p>}
        {status === 'success' && <p>Your email is verified. You can sign in.</p>}
        {status === 'missing' && <p>Verification token is missing.</p>}
        {status === 'error' && <p>Verification failed. Request a new email.</p>}
      </div>
    </div>
  )
}

export default VerifyEmailPage
