import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { SignUpForm } from './components/signup-form'

export default function SignUp() {
  return (
    <div className='flex w-full h-screen'>
      <div
        className='bg-accent hidden lg:w-1/2 lg:flex
        items-center justify-center
        relative'
      >
        <div
          className='w-60 h-60 bg-gradient-to-tr from-accent to-accent-foreground animate-spin-very-slow'></div>
        <div
          className='w-full h-1/2 bg-accent-foreground/4 backdrop-blur-lg absolute bottom-0'></div>
      </div>
      
      <div
        className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <Card className='p-6'>
          <CardHeader className='mb-0.5 flex flex-col space-y-2 text-left'>
            <CardTitle className='text-3xl tracking-wide'>
              Create an account
            </CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>
              Enter your email and password to create an account. <br />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter className='text-sm text-muted-foreground'>
            Already have an account?
            <Link
              to='/login'
              className='px-1 underline underline-offset-4 hover:text-primary'
            >
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
