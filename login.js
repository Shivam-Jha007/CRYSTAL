import { supabase } from './supabaseClient.js'

const loginForm = document.getElementById('l-form')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  

  
  const { data,error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('login failed:  recheck password' + error.message)
  } else {
    alert('login successful')
   window.location.href = '/dashboard.html'
  }
  
 })
