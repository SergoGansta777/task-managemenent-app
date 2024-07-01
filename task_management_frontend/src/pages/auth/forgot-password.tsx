import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { ForgotForm } from './components/forgot-form'

export default function ForgotPassword() {
  return (
    <>
      <div
        className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div
          className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <Card className='p-6'>
            <CardHeader className='mb-2 flex flex-col space-y-2 text-left'>
              <CardTitle className='text-md font-semibold tracking-tight'>
                Forgot Password
              </CardTitle>
              <CardDescription className='text-sm text-muted-foreground'>
                Enter your registered email and <br /> we will send you a link
                to reset your password.
              </CardDescription>
            </CardHeader>
            <ForgotForm className='px-6' />
            <CardFooter
              className='mt-4 px-6 text-center text-sm text-muted-foreground'>
              Don't have an account?
              <Link
                to='/login'
                className='px-0.5 underline underline-offset-4 hover:text-primary'
              >
                Sign up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
