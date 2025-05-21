// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://eptuyyfmzdkecxabtkfh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwdHV5eWZtemRrZWN4YWJ0a2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzEwNjMsImV4cCI6MjA2MjYwNzA2M30.MX8_LY48GWAQGOwlawHnFIa2SRA4lZckywOTK8mf8Yg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
