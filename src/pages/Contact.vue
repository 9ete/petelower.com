<script setup>
import { ref } from 'vue'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('idle') // idle | sending | success | error

async function submit() {
  status.value = 'sending'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: name.value,
        email: email.value,
        message: message.value,
        subject: `petelower.com contact from ${name.value}`,
        botcheck: false,
      }),
    })
    const data = await res.json()
    status.value = data.success ? 'success' : 'error'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <main class="contact">
    <h1>Contact</h1>

    <div v-if="status === 'success'" class="result success">
      Message sent — I'll get back to you soon.
    </div>

    <template v-else>
      <div v-if="status === 'error'" class="result error">
        Something went wrong. Try again or email
        <a href="mailto:pete@petelower.com">pete@petelower.com</a> directly.
      </div>

      <form v-if="!WEB3FORMS_KEY" class="result error">
        Contact form not configured. Set <code>VITE_WEB3FORMS_KEY</code> in your
        environment (see README).
      </form>

      <form v-else class="form" @submit.prevent="submit">
        <label>
          Name
          <input v-model="name" type="text" name="name" required autocomplete="name" />
        </label>
        <label>
          Email
          <input v-model="email" type="email" name="email" required autocomplete="email" />
        </label>
        <label>
          Message
          <textarea v-model="message" name="message" rows="6" required></textarea>
        </label>
        <button type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Sending…' : 'Send' }}
        </button>
      </form>
    </template>
  </main>
</template>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.contact h1 {
  margin-bottom: 2rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.95rem;
  font-weight: 500;
}
input,
textarea {
  font: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem 0.6rem;
  border-radius: 6px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  width: 100%;
  box-sizing: border-box;
  opacity: 0.9;
}
input:focus,
textarea:focus {
  outline: 2px solid var(--link-color);
  outline-offset: 1px;
  opacity: 1;
}
textarea {
  resize: vertical;
}
button[type='submit'] {
  align-self: flex-start;
  padding: 0.55em 1.4em;
}
button[type='submit']:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.result {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}
.success {
  border: 1px solid #4caf50;
  background: rgba(76, 175, 80, 0.1);
}
.error {
  border: 1px solid #e53935;
  background: rgba(229, 57, 53, 0.1);
}
</style>
