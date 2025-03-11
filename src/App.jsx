import { useState } from "react"

const initialFormData = {
  fullname: '',
  username: '',
  password: '',
  specs: '',
  experience: '',
  description: ''
}

export default function App() {

  // Stato per il form
  const [formData, setFormData] = useState(initialFormData)
  // Stato per i messaggi di validazione del form
  const [messages, setMessages] = useState({
    fullname: '',
    username: '',
    password: '',
    specs: '',
    experience: '',
    description: ''
  })

  // Funzione per collegare i change degli inputs
  const handleFormData = (e) => {
    const { name, type, value, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setFormData({
      ...formData,
      [name]: newValue
    })

    // Validazione in tempo reale
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';

    let message = ''
    if (name === 'fullname' && !newValue) {
      message = 'Full Name is required'
    } else if (name === 'username') {
      if (newValue.length < 6) {
        message = 'Username must be at least 6 characters long'
      } else if (symbols.split('').some(symbol => newValue.includes(symbol))) {
        message = 'Username must not contain special characters'
      } else {
        message = 'Username is valid'
      }
    } else if (name === 'password') {
      if (newValue.length < 8) {
        message = 'Password must be at least 8 characters long'
      } else if (!letters.split('').some(letter => newValue.toLowerCase().includes(letter))) {
        message = 'Password must contain at least one letter'
      } else if (!numbers.split('').some(number => newValue.includes(number))) {
        message = 'Password must contain at least one number'
      } else if (!symbols.split('').some(symbol => newValue.includes(symbol))) {
        message = 'Password must contain at least one special character'
      } else {
        message = 'Password is valid'
      }
    } else if (name === 'specs' && newValue === 'Select specialization...') {
      message = 'Please select a specialization'
    } else if (name === 'experience' && (newValue < 0 || newValue === '')) {
      message = 'Experience must be a positive number'
    } else if (name === 'description') {
      if (newValue.length < 100) {
        message = 'Description must be at least 100 characters long'
      } else if (newValue.length > 1000) {
        message = 'Description must be less than 1000 characters long'
      } else {
        message = 'Description is valid'
      }
    }

    setMessages({
      ...messages,
      [name]: message
    })
  }

  // Funzione per il submit del form
  const handleSubmit = (e) => {
    e.preventDefault()
    const { fullname, username, password, specs, experience, description } = formData

    // Validazione
    if (!fullname || !username || !password || !specs || !description || experience === '') {
      setMessages({
        ...messages,
        form: 'All fields must be completed'
      })
      return
    }

    if (experience < 0) {
      setMessages({
        ...messages,
        form: 'Experience must be a positive number'
      })
      return
    }

    if (specs === 'Select specialization...') {
      setMessages({
        ...messages,
        form: 'Please select a specialization'
      })
      return
    }

    console.log('Form submitted!', formData)
    setFormData(initialFormData)
    setMessages({})
  }

  return (
    <main className="bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-600 min-h-screen">
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold text-emerald-900">Register here!</h1>
        <section className="my-10 py-3">
          <form className="flex flex-col justify-between gap-4" onSubmit={handleSubmit}>
            <label className="text-gray-700" htmlFor="fullname">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Insert your full name..."
              className="p-2 rounded-lg border border-emerald-900"
              required
              onChange={handleFormData}
              value={formData.fullname}
            />
            <label className="text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              name='username'
              id="username"
              placeholder="Insert your username..."
              className="p-2 rounded-lg border border-emerald-900"
              required
              minLength='6'
              onChange={handleFormData}
              value={formData.username}
            />
            {messages.username && (
              <span className={messages.username.includes('valid') ? 'text-green-600' : 'text-red-500'}>
                {messages.username}
              </span>
            )}
            <label className="text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              name='password'
              id="password"
              placeholder="Insert your password..."
              className="p-2 rounded-lg border border-emerald-900"
              required
              onChange={handleFormData}
              value={formData.password}
            />
            {messages.password && (
              <span className={messages.password.includes('valid') ? 'text-green-600' : 'text-red-500'}>
                {messages.password}
              </span>
            )}
            <div className="flex justify-between items-center my-3 gap-10">
              <select
                name="specs"
                className="p-2 rounded-lg border border-emerald-900 text-gray-700 grow"
                required
                onChange={handleFormData}
                value={formData.specs}
              >
                <option>Select specialization...</option>
                <option value="front-end">Frontend</option>
                <option value="back-end">Backend</option>
                <option value="full-stack">Full stack</option>
              </select>

              <label className="text-gray-700 ms-auto" htmlFor="experience">Years of experience</label>
              <input
                type="number"
                name="experience"
                className="p-2 rounded-lg border border-emerald-900"
                required
                min='0'
                onChange={handleFormData}
                value={formData.experience}
              />
            </div>
            <div className="flex justify-between">
              <span >
                {messages.specs && (
                  <span className={messages.specs.includes('valid') ? 'text-green-600' : 'text-red-500'}>
                    {messages.specs}
                  </span>
                )}
              </span>
              <span >
                {messages.experience && (
                  <span className={messages.experience.includes('valid') ? 'text-green-600' : 'text-red-500'}>
                    {messages.experience}
                  </span>
                )}
              </span>
            </div>

            <textarea
              className="text-gray-700 p-2 rounded-lg border border-emerald-900"
              placeholder="Describe yourself..."
              rows='5'
              required
              minLength='100'
              maxLength='1000'
              onChange={handleFormData}
              value={formData.description}
              name="description">
            </textarea>
            {messages.description && (
              <span className={messages.description.includes('valid') ? 'text-green-600' : 'text-red-500'}>
                {messages.description}
              </span>
            )}
            <button
              className="text-gray-300 font-bold p-3 rounded-lg mt-5 bg-sky-600"
              type="submit">
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}