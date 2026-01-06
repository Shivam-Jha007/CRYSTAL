import { supabase } from './supabaseClient.js'               //importing supabase to let us use all itas function

// 🟢 Ensure user is logged in
const { data: { user } } = await supabase.auth.getUser()       //we check the data values inside the object returned by getuser function it returns user =null if not auth.No inputs needed
if (!user) window.location.href = '/login.html'
const comp=new Date().toISOString().split('T')[0];



document.querySelector('#deadline').addEventListener('change',async (g) =>{
  g.preventDefault();
  console.log(document.querySelector('#deadline')?.value);
  getDate();
})

// 📝 Add habit
document.getElementById('h-form').addEventListener('submit', async (e) => {    // inside of it You are defining a function that the browser will call later,when the submit event happens.
  e.preventDefault()
  const title = document.getElementById('newHabit').value;
  const value=document.querySelector('input[name="choice"]:checked')?.value;
  let date=null;
  console.log(date);
  if (value==='deadline'){
    date=document.getElementById('tempD').value;
    if (date===null){
      alert("Please select the end date")
      return;
    }
  }
  
  if (!value){
    alert('please select the type of task ' );
    return;
  }
  const { error } = await supabase.from('habits').insert({      //in supabase habits table we are inserting the value for each column name manually
    user_id: user.id,
    title: title,
    is_done: false,
    task_type:value,
    deadline:date
  })

  if (error) {                                                    //if error occuring on inserting
    alert('Error adding habit: ' + error.message)
  } else {
    document.getElementById('newHabit').value = '';              //resetting the input field   
    fetchHabits();
    const d=document.getElementById('tempD');
    d.remove();

  }
})

// 📋 Fetch and display habits
async function fetchHabits() {
  const { data: habits, error } = await supabase                //this translates to selec * from habits where user id=uuid order by created at
    .from('habits')
    .select('*')
    .eq('user_id', user.id)
    .eq('task_type','daily')
    .order('created_at', { ascending: false })

  const list = document.getElementById('habitList')
  list.innerHTML = ''                                   //clearing the already present ones to remove duplicacy

  habits.forEach(async habit => {                                 //  for each habit from the habits object(Containing all entres of habits)
    const li = document.createElement('li')                    //creating the li tag for each element

    //injecting html as a string inside the li tag
    li.innerHTML = `                                                       
      <input type="checkbox" ${habit.is_done ? 'checked' : ''} data-id="${habit.id}" />
      <span style="text-decoration:${habit.is_done ? 'line-through' : 'none'}">${habit.title}</span>
      <button data-delete="${habit.id}">🗑</button>
    `
    list.appendChild(li);                                               //adding the next node in inside the list tag 
    if (habit.last_done < comp){
      li.style.textDecoration='none';
      await supabase.from('habits').update({is_done:false}).eq('id',habit.id);
      
    }  
    
  })
  const {data:Dhabits,error2}=await supabase .from('habits').select('*').eq('user_id',user.id).eq('task_type','deadline')
    .order('created_at',{ascending:false});
  const list2=document.querySelector('#DhabitList');
  list2.innerHTML='';
  const now=new Date();
  console.log(now.getDate());
  Dhabits.forEach(Dhabit => {
    const li=document.createElement('li');
    li.innerHTML=`                                                       
      <input type="checkbox" ${Dhabit.is_done ? 'checked' : ''} data-id="${Dhabit.id}" />
      <span style="text-decoration:${Dhabit.is_done ? 'line-through' : 'none'}">${Dhabit.title}        valid till ${Dhabit.deadline}</span>
      <button data-delete="${Dhabit.id}">🗑</button>
    `
    
    list2.appendChild(li);
    
    if (Dhabit.deadline<comp){
      console.log(now.getDate());
      li.style.color="red";
    }
  })
  
}

fetchHabits()                                                             //this call happpens without condititons  

// ✅ Toggle complete
document.getElementById('allList').addEventListener('change', async (e) => {        //change signifies actions like checkbox,radio buttons,or dropdowns..
  if (e.target.type === 'checkbox') {
    const habitId = e.target.dataset.id    //“Give me the value stored in data-id of the element that triggered the event.”
    const isDone = e.target.checked         //.checked only exists on checkboxes or radio buttons and returnds either true or false                                    

    await supabase.from('habits').update({ is_done: isDone ,last_done:comp}).eq('id', habitId)            //finding and updating  the specific habit the ROW LEVEL SECURITY handles the uuid we dont need to manually provide it 
    fetchHabits()
  }
})

// ❌ Delete habit
document.getElementById('allList').addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON'  && e.target.dataset.delete) {
    const habitId = e.target.dataset.delete
    await supabase.from('habits').delete().eq('id', habitId);
    fetchHabits() 
  }
})

// 🚪 Logout
document.getElementById('logout').addEventListener('click', async () => {             // on clicking the logout button
  console.log("Logout clicked"); // 🧪 test log

  const { error } = await supabase.auth.signOut();         // instructing supabase to terminate the current session and caatching if error occurs

  if (error) {
    alert('Logout failed: ' + error.message);         
  } else {                                                      
    window.location.href = 'login.html';                       //if errordoesnt occur we are to refer the user back to login page 
  }
});

//RLS ensures you can only change(select,update,delete) inside the row which belongs to you..but when u insert it doesnt know the row yet its actually not sure who u are so u must give uuid
//every habit has its unique uuid~

async function getDate() {
  const d=document.createElement('input');
  d.setAttribute('type','date');
  d.setAttribute('id','tempD');
  const container=document.getElementById('h-form');
  container.appendChild(d);
}



//browsers dont wait and shouldnt wait for user input during execution so its all just event driven
// Never ask the DOM for truth at submit time.
// The DOM only reflects state — it doesn’t own it.