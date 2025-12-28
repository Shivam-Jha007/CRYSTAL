// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'   //importing the supabase js library to access functions like createClient

const supabaseUrl = "https://ulxcyotprieugovrshml.supabase.co"                       //url for the project
const supabaseAnonKey = "sb_publishable_osKW74sJC2fdwP1cGFYT6A_m-hUYXis"   //unique identification for the DB

export const supabase = createClient(supabaseUrl, supabaseAnonKey)    //“This creates a client that can SEND REQUESTS to Supabase.Supabase then decides what is allowed.”


//auth.uid() is the database asking: “Who are you?”
//user_id is the row answering: “I belong to this person.”