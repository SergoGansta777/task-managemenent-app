import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { priorities } from '@/constants'
import { cn } from '@/lib/utils'
import { NewTask, type NewTaskInput, newTaskInputSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface NewTaskFormProps extends HTMLAttributes<HTMLDivElement> {
  addTask: (newTask: NewTask) => void;
  statusId: number;
}

const NewTaskForm = ({
                       addTask,
                       statusId,
                       className,
                       ...props
                     }: NewTaskFormProps) => {
  const form = useForm<z.infer<typeof newTaskInputSchema>>({
    resolver: zodResolver(newTaskInputSchema),
    defaultValues: {
      title: '',
      label: '',
      priority: '1'
    }
  })
  
  function onSubmit(newTaskInput: NewTaskInput) {
    addTask({ ...newTaskInput, statusId } as NewTask)
  }
  
  return (
    <div className={cn('grid gap-8', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Title or description of your task'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='The main subject or keyword of the task'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-row justify-between items-end'>
              <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Choose' className='px-4' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Priorities</SelectLabel>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.id} value={priority.id}>
                                <div className='flex gap-2 items-center'>
                                  <priority.icon />
                                  {priority.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button type='submit' className='test-lg px-6'>
                  Add new task
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default NewTaskForm
