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
    id: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    id: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    id: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    id: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    id: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    id: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    id: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    id: "high",
    icon: ArrowUpIcon,
  },
];
