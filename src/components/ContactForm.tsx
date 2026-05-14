import { useState } from 'react'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  if (!WEB3FORMS_KEY) {
    return (
      <div className="result error">
        Contact form not configured. Set <code>VITE_WEB3FORMS_KEY</code> in your environment (see README).
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="result success">
        Message sent — I'll get back to you soon.
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `petelower.com contact from ${name}`,
          botcheck: false,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {status === 'error' && (
        <div className="result error">
          Something went wrong. Try again or email{' '}
          <a href="mailto:pete@petelower.com">pete@petelower.com</a> directly.
        </div>
      )}
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
          />
        </label>
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </form>
    </>
  )
}
