import { useState, useRef, useEffect, useMemo } from "react"

const initialFormData = {
  username: '',
  password: '',
  description: ''
}

// Variabili per validazioni
const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = '!@#$%^&*()-_=+[]{}|;:\'\\",.<>?/`~';

export default function App() {

  // Stato controllato per il form
  const [formData, setFormData] = useState(initialFormData)

  // Campi form non controllati
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Validazione username
  const isUsernameValid = useMemo(() => {
    const validChars = formData.username.split('').every(char =>
      letters.includes(char.toLowerCase()) ||
      numbers.includes(char)
    )
    return validChars && formData.username.trim().length >= 6
  }, [formData.username])

  // Validazione password
  const isPasswordValid = useMemo(() => {
    return (
      formData.password.trim().length >= 8 &&
      formData.password.split('').some(char => letters.includes(char)) &&
      formData.password.split('').some(char => numbers.includes(char)) &&
      formData.password.split('').some(char => symbols.includes(char))
    )
  }, [formData.password])

  // Validazione description
  const isDescriptionValid = useMemo(() => {
    return (
      formData.description.trim().length >= 100 &&
      formData.description.trim().length <= 1000
    )
  }, [formData.description])

  // Funzione per il submit del form
  const handleSubmit = (e) => {
    e.preventDefault()

    // Valori dei campi non controllati
    const fullname = fullnameRef.current.value
    const specs = specsRef.current.value
    const experience = experienceRef.current.value

    // Validazione form al submit
    if (
      !fullname.trim() ||
      !formData.username.trim() ||
      !formData.password.trim() ||
      specs === 'Select specialization...' ||
      !experience.trim() ||
      experience < 0 ||
      !formData.description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      return
    }

    console.log('Form submitted!', formData, fullname, specs, experience)
    // Resetto i campi controllati e non del form
    setFormData(initialFormData)
    fullnameRef.current.value = ''
    specsRef.current.value = 'Select specialization...'
    experienceRef.current.value = ''
  }

  // Funzione per il reset del form
  const handleReset = (e) => {
    e.preventDefault()
    setFormData(initialFormData)
    fullnameRef.current.value = ''
    specsRef.current.value = 'Select specialization...'
    experienceRef.current.value = ''
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
            {formData.username.trim() && (
              <span className={isUsernameValid ? 'text-green-600' : 'text-red-500'}>
                {isUsernameValid ? 'Username is valid' : 'Username must be without space and at least 8 alphanumeric characters'}
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
            {formData.password.trim() && (
              <span className={isPasswordValid ? 'text-green-600' : 'text-red-500'}>
                {isPasswordValid ? 'Password is valid' : 'Password must be at least 8 characters, 1 letter, 1 number, 1 symbol'}
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
            {formData.description.trim() && (
              <span className={isDescriptionValid ? 'text-green-600' : 'text-red-500'}>
                {isDescriptionValid ? 'Description is valid' : `Description must be between 100 and 1000 characters (${formData.description.trim().length})`}
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