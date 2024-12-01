import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function Home() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Membership Site</h1>
      <div className="space-y-8">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}

