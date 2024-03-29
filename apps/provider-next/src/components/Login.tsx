import { useState } from 'react'
import { Input, toast } from 'bone-ui'
import { request } from '@boter/request'

interface Props {
  onLoginSuccess(): void
}
export const Login = ({ onLoginSuccess }: Props) => {
  const [value, setValue] = useState('')

  async function login() {
    try {
      await request('/api/login', {
        method: 'POST',
        body: {
          authorizationCode: value,
        },
      })
      onLoginSuccess?.()

      toast.success('Login success')
    } catch (error) {
      // TODO: handle any
      toast.error((error as any).message)
    }
  }

  return (
    <Input
      ring-0--focus
      placeholder="Authorization code"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await login()
        }
      }}
    />
  )
}
