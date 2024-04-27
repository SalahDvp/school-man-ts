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
import { z } from "zod"
import { PaymentRegistrationSchema } from "@/validators/paymentSchema"
const data:StudentData[] = [
    {
      id: "1",
      name: "Charlie Brown",
      level: "Kindergarten",
      nextPaymentDate: "2024-05-26",
      amountLeftToPay: 500,
      totalAmount: 1000,
      parentPhone:"055555555"
    },
    {
      id: "2",
      name: "Lucy van Pelt",
      level: "Grade 3",
      nextPaymentDate: "2024-05-28",
      amountLeftToPay: 300,
      totalAmount: 800,
      parentPhone:"055555555"
    },
    {
      id: "3",
      name: "Linus van Pelt",
      level: "Grade 6",
      nextPaymentDate: "2024-05-30",
      amountLeftToPay: 200,
      totalAmount: 600,
      parentPhone:"055555555"
    },
  ];
  
type Status = 'paid' | 'not paid' 
type StudentData = {
    id: string;
    name: string;
    level: string;
    nextPaymentDate: string;
    amountLeftToPay: number;
    totalAmount: number;
    parentPhone:string
  };

 interface DataTableDemoProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  }
  export const StudentPaymentTable: React.FC<DataTableDemoProps> = ({ setOpen }) => {
    
    const getStatusColor = React.useCallback((status:Status) => {
      switch (status) {
        case 'paid':
          return '#2ECC71'; // Green for accepted
        case 'not paid':
          return '#E74C3C'; // Yellow for pending
        // Default to white for unknown status
      }
    }, []);
    
   const columns: ColumnDef<any>[] = [
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.getValue("name")}</div>

        </div>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => <div className="lowercase hidden sm:table-cell">{row.getValue("level")}</div>,
    },
    {
      accessorKey: "nextPaymentDate",
      header: "Next payment Date",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">{row.getValue("nextPaymentDate")}</div>
      ),
    },
    {
        accessorKey: "parentPhone",
        header: "parent phone number",
        cell: ({ row }) => (
          <div className="capitalize hidden sm:table-cell">{row.getValue("parentPhone")}</div>
        ),
      },
    {
      accessorKey: "amountLeftToPay",
      header: () => <div className="text-right">Amount left</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amountLeftToPay"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "DZD",
        }).format(amount)
  
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">total Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("totalAmount"))
    
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
              <DropdownMenuItem onClick={()=>setOpen(true)}>
 Student payment details
              </DropdownMenuItem>
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

  
    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>Your Student payments</CardTitle>
      <CardDescription>
      Introducing Our Dynamic Expences Dashboard for Seamless
                    Management and Insightful Analysis.
      </CardDescription>
    </CardHeader>
    <CardContent>     
    <div className="w-full">
    <div className="flex items-center justify-between">
       

       <Input
             placeholder="Filter by student..."
             value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
             onChange={(event) =>
               table.getColumn("name")?.setFilterValue(event.target.value)
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
      <div className="rounded-md border mt-5">
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