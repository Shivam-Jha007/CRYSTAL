import { supabase } from './supabaseClient.js'      //getting the object of supabase variable exported from client 

const loginForm = document.getElementById('l-form')     //getting the values


loginForm.addEventListener('submit', async (e) => {        //loginForm element needs to async as bcuz we need to use await somewhere inside
  e.preventDefault()                                       //preventing the default thigs that may happen on event of submit


  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  

  
  const { data,error } = await supabase.auth.signInWithPassword({       //catching for error if not in DB already checking the email and pswd
    email,
    password
  })

  if (error) {                                                          //error occured as replied by supabase hence crdentials wrong
    alert('login failed:  recheck password' + error.message)
  } else {                                                              //else we move forward to Dashboard
                                                                           
    alert('login successful')
   window.location.href = './dashboard.html'                            //This helps navigate based on logic itself no need for href in html
  }
  
 })
