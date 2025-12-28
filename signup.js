import { supabase } from './supabaseClient.js'   //makes the variable supabase available here from the client js file and thus makes supabase functions available here

const signupForm = document.getElementById('s-form')  //return the object with the given id

signupForm.addEventListener('submit', async (e) => {    //may wait for the value to be returned by event      
  e.preventDefault()                                    //preventing any default behaviour due to event

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('rpassword').value

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords don't match.")
    return // Stop here
  }

  // Sign up with Supabase
  const { error } = await supabase.auth.signUp({           //we are calling and waiting for function signup inside auth object inside supabase object with email and password
    email,
    password
  })                                                      //the error part is used bcuz we only ned that part of the return statement not the full one

  if (error) {                                         //if error happens
    alert('Signup failed: ' + error.message)
  } else {                                             //if error doesnt happen we get a null instead so
    alert('Check your email for confirmation!')
  }
})         
// always use async and await together as async → “I might wait” and await → “Wait here”
