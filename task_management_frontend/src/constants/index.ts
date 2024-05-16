import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    id: "bug",
    label: "Bug",
  },
  {
    id: "feature",
    label: "Feature",
  },
  {
    id: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    id: 2,
    label: "Todo",
    icon: CircleIcon,
  },
  {
    id: 3,
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    id: 4,
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    id: 5,
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    id: 6,
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "1",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "2",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "3",
    icon: ArrowUpIcon,
  },
];
