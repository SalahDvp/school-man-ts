"use client"
import { format } from "date-fns"; 
import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { File } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import SheetDemo from "./editStudent"
import  studentRegistrationSchema  from "@/validators/auth";
import { useData } from "@/context/admin/fetchDataContext";
import { z } from "zod"

type Status = 'accepted' | 'pending' | 'rejected';
export type StudentSummary = {
  id: string;
  teacher: string;
  status: Status;
  Subject: string;
  joiningDate: string;
  salary: number;

};
export type Student = {
    id: string;
    student: string;
    status: "active" | "suspended" | "failed";
    level: string;
    joiningDate: string;
    leftAmountToPay: number;
    registrationStatus:"accepted" | "pending" | "rejected"
  };
  type StudentFormValues = z.infer<typeof studentRegistrationSchema>  & {id:string };
  export const DataTableDemo = () => {
    const [open,setOpen]=React.useState(false)
    const {students,setStudents}=useData()
    const [student,setStudent]=React.useState<StudentFormValues>({  
      
      id: '1',
      year: '2024',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main Street',
      city: 'Example City',
      state: 'Example State',
      postalCode: '12345',
      country: 'Example Country',
      studentEmail: 'john.doe@example.com',
      studentPhone: '123-456-7890',
      studentSubject: 'Math',
      joiningDate:new Date('2024-01-01'),
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '987-654-3210',
      medicalConditions: 'None',
      salary: 50000,
      status:"accepted",
    })
    const formattedJoiningDate = format(student.joiningDate, "yyyy-MM-dd");
    const getStatusColor = React.useCallback((status:Status) => {
      switch (status) {
        case 'accepted':
          return '#2ECC71'; // Green for accepted
        case 'pending':
          return '#F1C40F'; // Yellow for pending
        case 'rejected':
          return '#E74C3C'; // Red for rejected
        default:
          return '#FFFFFF'; // Default to white for unknown status
      }
    }, []);
    
   const columns: ColumnDef<Student>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "student",
      header: "Student",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.getValue("student")}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {row.getValue("email")}
                              </div>
        </div>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => <div className="lowercase hidden sm:table-cell">{row.getValue("level")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "joiningDate",
      header: "Joining Date",
      cell: ({ row }) => {
        const rawDate = row.getValue("joiningDate"); // Assuming this is a Date object
        return <div>{format(new Date(rawDate), "yyyy-MM-dd")}</div>;
      },
    },
    {
      accessorKey: "registrationStatus",
      header: "Registration",
      cell: ({ row }) => (
        <Badge   className="capitalize hidden sm:table-cell" style={{backgroundColor:getStatusColor(row.getValue("registrationStatus"))}}>{row.getValue("registrationStatus")}</Badge>
      ),
    },
    {
      accessorKey: "leftAmountToPay",
      header: () => <div className="text-right">Amount left</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("leftAmountToPay"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "DZD",
        }).format(amount)
  
        return <div className="text-right font-medium">{formatted}</div>
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
              disabled={row.getValue("registrationStatus")==="accepted"}
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                accept registration
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>openEditSheet(student)}>
                View Student
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const openEditSheet = (student:StudentFormValues) => {
        setStudent(student)
        setOpen(true); // Open the sheet after setting the level
      };
    
  const table = useReactTable({
    data:students,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 3, //custom default page size
      },
    },
  })
 


  
  return (
    <>

<div className="flex items-center justify-between">
       
    
    <Input
          placeholder="Filter student..."
          value={(table.getColumn("student")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("student")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
          <div className="flex items-center ml-auto">
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="ml-2">
       Export <File className="ml-2 h-4 w-4" />
      </Button>
    </div>
 
    </div>
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>Your Students</CardTitle>
      <CardDescription>
      Introducing Our Dynamic student Dashboard for Seamless
                    Management and Insightful Analysis.
      </CardDescription>
    </CardHeader>
    <CardContent>     

 
 
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
   
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <SheetDemo open={open} setOpen={setOpen}  student={student}/>
    </CardContent>
  </Card>
  <ScrollBar orientation="horizontal" />
      </ScrollArea>
  </>
  )
}
