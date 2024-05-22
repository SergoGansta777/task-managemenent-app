import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons'

export const statuses = [
  {
    id: 2,
    label: 'Todo',
    icon: CircleIcon
  },
  {
    id: 3,
    label: 'In Progress',
    icon: StopwatchIcon
  },
  {
    id: 4,
    label: 'Done',
    icon: CheckCircledIcon
  },
  {
    id: 5,
    label: 'Canceled',
    icon: CrossCircledIcon
  },
  {
    id: 6,
    label: 'Backlog',
    icon: QuestionMarkCircledIcon
  }
]

export const priorities = [
  {
    label: 'Low',
    id: '1',
    icon: ArrowDownIcon
  },
  {
    label: 'Medium',
    id: '2',
    icon: ArrowRightIcon
  },
  {
    label: 'High',
    id: '3',
    icon: ArrowUpIcon
  }
]

export const DEFAULT_TASK_STATUS_ID = 2
