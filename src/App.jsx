import { useState, useRef, useEffect } from "react"

const initialFormData = {
  username: '',
  password: '',
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

  const fullnameRef = useRef()
  const specsRef = useRef()
  const experienceRef = useRef()

  // Focus all'input fullname al primo render
  useEffect(() => {
    fullnameRef.current.focus()
  }, [])

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
    const fullname = fullnameRef.current.value
    const specs = specsRef.current.value
    const experience = experienceRef.current.value

    // Validazione
    let newMessages = { ...messages }

    // Variabile per capire se ci sono errori
    let hasErrors = false

    if (!fullname || fullname.trim() === '') {
      newMessages.fullname = 'Full name is required'
      hasErrors = true
    } else {
      newMessages.fullname = 'Full name is valid'
    }

    if (experience < 0 || experience === '') {
      newMessages.experience = 'Experience must be a positive number'
      hasErrors = true
    } else {
      newMessages.experience = 'Experience is valid'
    }

    if (!specs || specs === 'Select specialization...') {
      newMessages.specs = 'Please select a specialization'
      hasErrors = true
    } else {
      newMessages.specs = 'Specialization is valid'
    }

    setMessages(newMessages)

    // Se ci sono errori blocco il form
    if (hasErrors) return

    console.log('Form submitted!', formData, fullname, specs, experience)
    // Resetto i campi controllati e non del form
    setFormData(initialFormData)
    fullnameRef.current.value = ''
    specsRef.current.value = 'Select specialization...'
    experienceRef.current.value = ''
    // Resetto i messaggi delle validazioni
    setMessages({})
  }

  // Funzione per il reset del form
  const handleReset = (e) => {
    e.preventDefault()
    setFormData(initialFormData)
    fullnameRef.current.value = ''
    specsRef.current.value = 'Select specialization...'
    experienceRef.current.value = ''
    setMessages({})
  }

  // Ref per la sezione
  const sectionRef = useRef()

  // Funzione per scrollare ad una sezione
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-600 min-h-screen">
      <div ref={sectionRef} className="container mx-auto py-4">
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
              ref={fullnameRef}
            />
            {messages.fullname && (
              <span className={messages.fullname.includes('valid') ? 'text-green-600' : 'text-red-500'}>
                {messages.fullname}
              </span>
            )}
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
                ref={specsRef}
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
                ref={experienceRef}
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
              className="cursor-pointer text-gray-300 font-bold p-3 rounded-lg mt-5 bg-sky-600 hover:bg-sky-700"
              type="submit">
              Submit
            </button>
            <button
              className="cursor-pointer text-sky-600 font-bold p-3 rounded-lg bg-gray-300 hover:bg-gray-400 self-start"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>
          <button className="fixed bottom-10 right-10" onClick={scrollToSection}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-10 cursor-pointer text-sky-600 hover:text-sky-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </section>
      </div>
    </main>
  )
}