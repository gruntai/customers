import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

// Define the Patient type
export type Patient = {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  lastVisit: string;
  serviceType: string;
  dueDate: string;
  nextSteps: string;
  assignedTo: string;
  status: "active" | "inactive";
  recallSpend: string;
};

// Sample data
export const data: Patient[] = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Tom Smith",
    phone: "1-413-904-5843",
    lastVisit: "Jan 15, 2023",
    serviceType: "Landscaping Service",
    dueDate: "Feb 15, 2025",
    nextSteps: "Your AI assistant will begin contact customer tomorrow for service recall.",
    assignedTo: "Landscaping",
    status: "inactive",
    recallSpend: "$8651.00",
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Alex Johnson",
    phone: "1-212-555-0198",
    lastVisit: "Apr 09, 2024",
    serviceType: "Plumbing Service",
    dueDate: "Mar 15, 2025",
    nextSteps: "Your AI assistant will follow up tomorrow to re-engage this customer.",
    assignedTo: "Plumbing",
    status: "inactive",
    recallSpend: "$14,793.00",
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Riley Brooks",
    phone: "1-646-555-0123",
    lastVisit: "Mar 06, 2024",
    serviceType: "AC Maintenance",
    dueDate: "Jan 23, 2025",
    nextSteps: "System will begin outreach tomorrow to recall this customer.",
    assignedTo: "HVAC",
    status: "inactive",
    recallSpend: "$10,690.00",
  },
  {
    id: "4",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Morgan Lee",
    phone: "1-718-555-0177",
    lastVisit: "Mar 08, 2024",
    serviceType: "Gutter Cleaning",
    dueDate: "Jan 22, 2025",
    nextSteps: "This customer is queued for automated follow-up starting tomorrow.",
    assignedTo: "Gutters",
    status: "inactive",
    recallSpend: "$15,697.00",
  },
  {
    id: "5",
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Jamie Taylor",
    phone: "1-917-555-0101",
    lastVisit: "Mar 26, 2024",
    serviceType: "Window Washing",
    dueDate: "Nov 17, 2024",
    nextSteps: "AI assistant will start contacting the customer by text and phone.",
    assignedTo: "Windows",
    status: "inactive",
    recallSpend: "$7,737.00",
  },
];

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <img
            src={"https://api.dicebear.com/7.x/lorelei/svg?seed=John"}
            alt="Patient avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-normal text-[#111827]">{row.original.name}</div>
          <div className="text-xs">{row.original.phone}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "lastVisit",
    header: ({ column }) => {
      return <p> Last Service</p>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Service Type",
  },

  {
    accessorKey: "assstatusignedTo",
    header: "Status",
    cell: ({ row }) => <div className="text-[#6B7280] text-sm">{row.original.status}</div>,
  },
  {
    accessorKey: "recallSpend",
    header: "Total Spend",
    cell: ({ row }) => <div className="text-[#6B7280] text-lg">{row.original.recallSpend}</div>,
  },
];
