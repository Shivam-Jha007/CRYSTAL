import { supabase } from './supabaseClient.js'

const signupForm = document.getElementById('s-form')

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('rpassword').value

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords don't match.")
    return // Stop here
  }

  // Sign up with Supabase
  const { error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert('Signup failed: ' + error.message)
  } else {
    alert('Check your email for confirmation!')
  }
})
