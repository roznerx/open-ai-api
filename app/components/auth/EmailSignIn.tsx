import { getCsrfToken } from "next-auth/react"
import { useState, useEffect, SetStateAction } from "react"
// import { LoadingDots } from '../shared/icons';

const EmailSignIn = () => {
  const [token, setToken] = useState("")
  const [signInClicked, setSignInClicked] = useState(false)
  useEffect(() => {
    async function getToken() {
      const t = await getCsrfToken()
      if (t) {
        setToken(t)
      }
    }
    getToken()
  })

  return (
    <form method="POST" action="/api/auth/signin/email">
      <div className="col-span-6 sm:col-span-4">
        <input name="csrfToken" type="hidden" value={token} />
        <input
          autoFocus
          type="email"
          name="email"
          placeholder="Your email address here"
          id="email-address"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <button
          className={`${
            signInClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
          } mt-2 flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
        >
          <p>Sign In with Email</p>
        </button>
      </div>
    </form>
  )
}

export default EmailSignIn
