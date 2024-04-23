"use client"

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
import { teacherRegistrationSchema } from "@/validators/teacherSchema"
import { z } from "zod"


type Status = 'active' | 'suspended' | 'expelled';
export type TeacherSummary = {
    id: string;
    teacher: string;
    status: Status;
    Subject: string;
    joiningDate: string;
    salary: number;
 
  };
const data: TeacherSummary[] = [
    {
        id: "1",
        teacher: "John Doe",
        status: "suspended",
        Subject: "Math",
        joiningDate: "2023-01-15",
        salary: 22000,
        
      },
      {
        id: "2",
        teacher: "Jane Smith",
        status: "active",
        Subject: "Arabic",
        joiningDate: "2022-11-20",
        salary: 55000,
        
      },
      {
        id: "3",
        teacher: "Michael Johnson",
        status: "active",
        Subject: "Arabic",
        joiningDate: "2023-03-10",
        salary: 40000,
        
      },
      {
        id: "4",
        teacher: "John Doe",
        status: "suspended",
        Subject: "Art",
        joiningDate: "2023-01-15",
        salary: 20000,
        
      },
      {
        id: "5",
        teacher: "Jane Smith",
        status: "active",
        Subject: "French",
        joiningDate: "2022-11-20",
        salary: 15000,
        
      },
      {
        id: "6",
        teacher: "Michael Johnson",
        status: "active",
        Subject: "English",
        joiningDate: "2023-03-10",
        salary: 20000,
        
      },
]

export type teacher = {
    id: string;
    teacher: string;
    status: "active" | "suspended" | "failed";
    Subject: string;
    joiningDate: string;
    salary: number;
    

  };

 interface DataTableDemoProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  }
  export const DataTableDemo: React.FC<DataTableDemoProps> = ({ setOpen }) => {
    
    const getStatusColor = React.useCallback((status:Status) => {
      switch (status) {
        case 'active':
          return '#2ECC71'; // Green for accepted
        case 'suspended':
          return '#F1C40F'; // Yellow for pending
        case 'expelled':
          return '#E74C3C'; // Red for rejected
        default:
          return '#FFFFFF'; // Default to white for unknown status
      }
    }, []);
    
   const columns: ColumnDef<TeacherSummary>[] = [
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
      accessorKey: "teacher",
      header: "Teacher",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.getValue("teacher")}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {row.getValue("email")}
                              </div>
        </div>
      ),
    },
    {
      accessorKey: "Subject",
      header: "Subject",
      cell: ({ row }) => <div className="lowercase hidden sm:table-cell">{row.getValue("Subject")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge   className="capitalize hidden sm:table-cell"  style={{backgroundColor:getStatusColor(row.getValue("status"))}}>{row.getValue("status")}</Badge>
      ),
    },
    {
      accessorKey: "joiningDate",
      header: "Joining Date",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">{row.getValue("joiningDate")}</div>
      ),
    },
    {
      accessorKey: "salary",
      header: () => <div className="text-right">Salary</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("salary"))
  
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
        const teacher = row.original
  
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
              <DropdownMenuItem onClick={()=>setOpen(true)}>
                View Teacher
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

  const table = useReactTable({
    data,
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
          placeholder="Filter teacher..."
          value={(table.getColumn("teacher")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("teacher")?.setFilterValue(event.target.value)
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
  
    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>Your Teachers</CardTitle>
      <CardDescription>
      Introducing Our Dynamic teacher Dashboard for Seamless
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
    </CardContent>
  </Card>
  </>
  )
}