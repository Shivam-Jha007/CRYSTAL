import { supabase } from './supabaseClient.js'

// 🟢 Ensure user is logged in
const { data: { user } } = await supabase.auth.getUser()
if (!user) window.location.href = '/login.html'

// 📝 Add habit
document.getElementById('h-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = document.getElementById('newHabit').value

  const { error } = await supabase.from('habits').insert({
    user_id: user.id,
    title: title,
    is_done: false
  })

  if (error) {
    alert('Error adding habit: ' + error.message)
  } else {
    document.getElementById('newHabit').value = ''
    fetchHabits()
  }
})

// 📋 Fetch and display habits
async function fetchHabits() {
  const { data: habits, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const list = document.getElementById('habitList')
  list.innerHTML = ''

  habits.forEach(habit => {
    const li = document.createElement('li')
    li.innerHTML = `
      <input type="checkbox" ${habit.is_done ? 'checked' : ''} data-id="${habit.id}" />
      <span style="text-decoration:${habit.is_done ? 'line-through' : 'none'}">${habit.title}</span>
      <button data-delete="${habit.id}">🗑</button>
    `
    list.appendChild(li)
  })
}

fetchHabits()

// ✅ Toggle complete
document.getElementById('habitList').addEventListener('change', async (e) => {
  if (e.target.type === 'checkbox') {
    const habitId = e.target.dataset.id
    const isDone = e.target.checked

    await supabase.from('habits').update({ is_done: isDone }).eq('id', habitId)
    fetchHabits()
  }
})

// ❌ Delete habit
document.getElementById('habitList').addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON'  && e.target.dataset.delete) {
    const habitId = e.target.dataset.delete
    await supabase.from('habits').delete().eq('id', habitId);
    fetchHabits()
  }
})

// 🚪 Logout
document.getElementById('logout').addEventListener('click', async () => {
  console.log("Logout clicked"); // 🧪 test log

  const { error } = await supabase.auth.signOut();

  if (error) {
    alert('Logout failed: ' + error.message);
  } else {
    window.location.href = 'login.html'; // adjust path if needed
  }
});

