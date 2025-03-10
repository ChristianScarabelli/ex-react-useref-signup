import { useState } from "react"

const initialFormData = {
  fullname: '',
  username: '',
  password: '',
  specs: '',
  experience: '',
  description: ''
}
function App() {

  // Stato per il form
  const [formData, setFormData] = useState(initialFormData)
  // Stato per messaggio di errore
  const [errorMessage, setErrorMessage] = useState('')

  // Funzione per collegare i change degli inputs
  const handleFormData = (e) => {
    const { name, type, value, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Funzione per il submit del form
  const handleSubmit = (e) => {
    e.preventDefault()
    const { fullname, username, password, specs, experience, description } = formData

    // Validazione
    if (!fullname || !username || !password || !specs || !description || experience === '') {
      setErrorMessage('All fields must be completed')
      return
    }

    if (experience < 0) {
      setErrorMessage('Experience must be a positive number')
      return
    }

    if (specs === 'Select specialization...') {
      setErrorMessage('Please select a specialization')
      return
    }

    console.log('Form submitted!', formData)
    setFormData(initialFormData)
    setErrorMessage('')
  }

  return (
    <main className="bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-600 min-h-screen">

      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold text-emerald-900">Register here!</h1>
        <section className="my-10 py-3">
          <form className="flex flex-col justify-between gap-4">
            <label className="text-gray-700" htmlFor="fullname">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Insert your full name..."
              className="p-2 rounded-lg border-1 border-emerald-900"
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
              className="p-2 rounded-lg border-1 border-emerald-900"
              required
              minLength='6'
              onChange={handleFormData}
              value={formData.username}
            />
            <label className="text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              name='password'
              id="password"
              placeholder="Insert your password..."
              className="p-2 rounded-lg border-1 border-emerald-900"
              required
              onChange={handleFormData}
              value={formData.password}
            />
            <div className="flex justify-between items-center my-3 gap-10">
              <select
                name="specs"
                className="p-2 rounded-lg border-1 border-emerald-900 text-gray-700 grow"
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
                className="p-2 rounded-lg border-1 border-emerald-900"
                required
                min='0'
                onChange={handleFormData}
                value={formData.experience}
              />
            </div>
            <textarea
              className="text-gray-700 p-2 rounded-lg border-1 border-emerald-900"
              placeholder="Describe yourself..."
              rows='5'
              required
              minLength='100'
              maxLength='1000'
              onChange={handleFormData}
              value={formData.description}
              name="description">
            </textarea>
            <button
              className="text-gray-300 font-bold p-3 rounded-lg  mt-5 bg-sky-600"
              onClick={handleSubmit}
              type="submit">
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>

  )
}

export default App
