import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { post } from '../api/client'

function ProfilePage() {
  const { user, loadProfile } = useAuthStore()
  const [screenName, setScreenName] = useState(user?.screen_name || '')
  const [passwords, setPasswords] = useState({ current: '', next: '' })

  const onSave = async () => {
    await post('/users/updateProfile.php', { screen_name: screenName })
    await loadProfile()
  }

  const onChangePassword = async () => {
    await post('/users/changePassword.php', {
      currentPassword: passwords.current,
      newPassword: passwords.next,
    })
    setPasswords({ current: '', next: '' })
  }

  const onUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('avatar', file)
    await post('/users/uploadAvatar.php', formData)
    await loadProfile()
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-title">Profile</p>
      </div>
      <div className="form-grid">
        <label>
          Screen name
          <input value={screenName} onChange={(e) => setScreenName(e.target.value)} />
        </label>
        <button className="primary-button" type="button" onClick={onSave}>
          Save profile
        </button>
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
    </section>
  )
}

export default ProfilePage
