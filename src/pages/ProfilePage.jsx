import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { getApiBase, post } from '../api/client'
import toast from 'react-hot-toast'

function ProfilePage() {
  const { user, loadProfile } = useAuthStore()
  const [screenName, setScreenName] = useState(user?.screen_name || '')
  const [passwords, setPasswords] = useState({ current: '', next: '' })
  const [apiBase, setApiBase] = useState('')

  useEffect(() => {
    getApiBase().then(setApiBase).catch(() => setApiBase(''))
  }, [])

  const onSave = async () => {
    try {
      await post('/users/updateProfile.php', { screen_name: screenName })
      await loadProfile()
      toast.success('Profile updated')
    } catch (error) {
      toast.error(error.message || 'Profile update failed')
    }
  }

  const onChangePassword = async () => {
    try {
      await post('/users/changePassword.php', {
        currentPassword: passwords.current,
        newPassword: passwords.next,
      })
      setPasswords({ current: '', next: '' })
      toast.success('Password updated')
    } catch (error) {
      toast.error(error.message || 'Password update failed')
    }
  }

  const onUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      toast.error('No file selected')
      return
    }
    const formData = new FormData()
    formData.append('avatar', file)
    toast('Uploading avatar...')
    try {
      await post('/users/uploadAvatar.php', formData)
      await loadProfile()
      toast.success('Avatar updated')
      event.target.value = ''
    } catch (error) {
      toast.error(error.message || 'Avatar upload failed')
    }
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Profile</p>
      </div>
      <div className="avatar-preview">
        {user?.avatar_path && apiBase ? (
          <img src={`${apiBase}/${user.avatar_path}`} alt="User avatar" />
        ) : (
          <div className="avatar-fallback">
            {(user?.screen_name || 'GM').slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <p className="panel-label">Avatar</p>
          <p className="panel-value">
            {user?.avatar_path ? 'Uploaded' : 'No avatar uploaded'}
          </p>
        </div>
      </div>
      <div className="form-grid">
        <label>
          Screen name
          <input value={screenName} onChange={(e) => setScreenName(e.target.value)} />
        </label>
      </div>
      <div className="form-grid">
        <label>
          Current password
          <input
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          />
        </label>
        <label>
          New password
          <input
            type="password"
            value={passwords.next}
            onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
          />
        </label>
        <button className="ghost-button" type="button" onClick={onChangePassword}>
          Change password
        </button>
      </div>
      <div className="form-grid">
        <label>
          Avatar
          <input type="file" accept="image/png,image/jpeg,image/gif" onChange={onUpload} />
        </label>
      </div>
      <div className="profile-actions">
        <button className="primary-button save-button" type="button" onClick={onSave}>
          Save profile
        </button>
      </div>
    </section>
  )
}

export default ProfilePage
