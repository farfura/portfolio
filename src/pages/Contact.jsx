import React,{useState,useRef} from 'react'
import emailjs from "@emailjs/browser"
import Alert  from "../components/Alert";

const Contact = () => {
  const formRef=useRef(null);
  const[form,setForm]=useState({name:'',email:'',message:''})
const[isLoading,setisLoading]=useState(false);
const [currentAnimation, setCurrentAnimation] = useState("idle");
const handleChange=(e) => {
  setForm({...form,[e.target.name]:e.target.value});
};

const [alert, setAlert] = useState({show: false, type: '', text: ''});
const handleFocus=() =>setCurrentAnimation("walk");//called when you click on the text field
const handleBlur=() =>setCurrentAnimation("idle");//called when you click out of the text field

const handleSubmit=(e)=>{
  e.preventDefault(); // Do not reload the page when we submit form
  setisLoading(true);
  emailjs.send(
    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    {
      from_name: form.name,
      to_name: 'Fareeha',
      from_email: form.email,
      to_email: 'fareehanadeem.new@gmail.com',
      message: form.message
    },
    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
  ).then(() => {
    setisLoading(false);
    setForm({ name: '', email: '', message: '' }); // Reset form
    setAlert({
      show: true,
      text: "Thank you for your message 😃",
      type: "success",
    });
    setTimeout(() => {
      setAlert({ show: false, type: '', text: '' }); // Hide alert after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  })
  .catch((error) => {
    setisLoading(false);
    setAlert({
      show: true,
      text: "Failed to send message. Please try again later.",
      type: "danger",
    });
  });
};

  return (
   <section className='relative flex lg:flex-row flex-col max-container
   '>
{alert.show && <Alert {...alert}/>}

    <div className='flex-1 min-w-[50%] flex flex-col'>
      <h1 className='head-text'>Get in Touch</h1>
      <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
<label className='text-black-500 font-semibold'>Name
<input type='text' name='name' className='input' placeholder='Please enter your name'
required
value={form.name}
onChange={handleChange}
onFocus={handleFocus}
onBlur={handleBlur}
/>
</label>
<label className='text-black-500 font-semibold'>Email
<input type='email' name='email' className='input' placeholder='Please enter your email'
required
value={form.email}
onChange={handleChange}
onFocus={handleFocus}
onBlur={handleBlur}
/>
</label>
<label className='text-black-500 font-semibold'>Your Message
<textarea  name='message' row={4} className='textarea' placeholder='Let me know how I can help you'
required
value={form.message}
onChange={handleChange}
onFocus={handleFocus}
onBlur={handleBlur}

/>
</label>
<button type='submit' className='btn' onFocus={handleFocus} onBlur={handleBlur} disabled={isLoading}>
{isLoading ? 'Sending...': 'Send Message'}

</button>
      </form>
    </div>
   </section>
  )
}

export default Contact