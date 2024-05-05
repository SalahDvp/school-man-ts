"use client"
import { teacherPaymentRegistrationSchema } from "@/validators/teacherSalarySchema";
import * as React from "react"
import { format } from "date-fns"; 
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
import { z } from "zod"
import { File } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/context/admin/fetchDataContext"
import SheetDemo from "./edit-teacher-salary"

export type teacherSalary = {
  
  salaryDate: string;
  
  

};
export type TeacherSummary = {
  salaryDate: string;
}
type Status = 'paid' | 'not paid' 

type TeacherSalaryFormValues = z.infer<typeof teacherPaymentRegistrationSchema>  & {id:string };
  export const DataTableDemo = () => {
    const [open,setOpen]=React.useState(false)
    const {teachers,setTeachers}=useData()
    const{teachersSalary,setTeachersSalary}= useData()

    const [teacherSalary,setTeacherSalary]=React.useState<TeacherSalaryFormValues>({

      salaryTitle: "Monthly Salary",
      salaryAmount: 5000,
      salaryDate: new Date('2024-01-01'),
      typeofTransaction:"Salary",
      monthOfSalary:"May",
      fromWho: "Company XYZ",
      status:"paid",
      teacher:{name:"joi",id:"2222"}
  })
  const formattedJoiningDate = format(teacherSalary.salaryDate, "yyyy-MM-dd");
  console.log(formattedJoiningDate);
  
    const getStatusColor = React.useCallback((status:Status) => {
      switch (status) {
        case 'paid':
          return '#2ECC71'; // Green for accepted
        case 'not paid':
          return '#E74C3C'; // Yellow for pending
        // Default to white for unknown status
      }
    }, []);
    
   const columns: ColumnDef<TeacherSalaryFormValues>[] = [
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
      accessorKey: "teacherName",
      header: "Teacher",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.original.teacher.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "typeofTransaction",
      header: "Transaction",
      cell: ({ row }) => <div className="lowercase hidden sm:table-cell">{row.getValue("typeofTransaction")}</div>,
    },
    {
      accessorKey: "salaryDate",
      header: "Salary Date",
      cell: ({ row }) => {
        const rawDate = row.getValue("salaryDate"); // Assuming this is a Date object
        return <div>{format(new Date(rawDate), "yyyy-MM-dd")}</div>;
      },
      
    },
    {
      accessorKey: "monthOfSalary",
      header: "Month paid",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">{row.getValue("monthOfSalary")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "status",
      cell: ({ row }) => (
        <Badge   className="capitalize hidden sm:table-cell" style={{backgroundColor:getStatusColor(row.getValue("status"))}}>{row.getValue("status")}</Badge>
      ),
    },

    {
      accessorKey: "salaryAmount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("salaryAmount"))
  
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
             
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>openEditSheet(teacherSalary)}>
                View Payment
              </DropdownMenuItem>
              {/* <DropdownMenuItem>remove sa</DropdownMenuItem> */}
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
  const openEditSheet = (teacherSalary:TeacherSalaryFormValues) => {
    setTeacherSalary(teacherSalary)
        setOpen(true); // Open the sheet after setting the level
      };
    
  const table = useReactTable({
    data:teachersSalary,
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
  placeholder="Filter Salaries..."
  value={(table.getColumn("teacherName")?.getFilterValue() ?? "")}
  onChange={(event) =>
    table.getColumn("teacherName")?.setFilterValue(event.target.value)
  }
  className="max-w-sm"
/>
          <div className="flex items-center ml-auto">
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {table.getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => (
        <DropdownMenuCheckboxItem
          key={column.id}
          checked={column.getIsVisible()}
          onCheckedChange={() => column.toggleVisibility()}
        >
          {column.header} {/* Adjust to display appropriate name */}
        </DropdownMenuCheckboxItem>
      ))}
  </DropdownMenuContent>
</DropdownMenu>

        <Button variant="outline" className="ml-2">
       Export <File className="ml-2 h-4 w-4" />
      </Button>
    </div>
    </div>
  
    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>Your salary roll</CardTitle>
      <CardDescription>
      Introducing Our Dynamic teacger's salary Dashboard for Seamless
                    Management and Insightful Analysis.
      </CardDescription>
    </CardHeader>
    <CardContent>     
    <div className="w-full">
 
      <div className="rounded-md border">
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
      </div>
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
    </div>

    <SheetDemo open={open} setOpen={setOpen}  teacherSalary={teacherSalary}/>
    </CardContent>
  </Card>
  </>
  )
}