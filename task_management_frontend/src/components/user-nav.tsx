import { GetCurrentUser } from '@/api/authApi'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/authContext'
import { useQuery } from '@tanstack/react-query'

export function UserNav() {
  const { data: queryData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: GetCurrentUser
  })
  const { logout } = useAuth()
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>
              {queryData?.user.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {queryData?.user.username}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {queryData?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
