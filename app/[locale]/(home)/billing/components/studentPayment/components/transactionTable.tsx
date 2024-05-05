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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useData } from "@/context/admin/fetchDataContext"
import EditStudentPaymentForm from "./editStudentPaymentForm"


type Status = 'paid' | 'not paid' | 'rejected';



  export const TransactionDataTableDemo= () => {
    const {invoices}=useData()
    const [invoice,setInvoice]=React.useState<any>({
      "paymentTitle": "dwqdqwdqwd",
      "paymentAmount": 500,
      "paymentDate":new Date("2024-04-26"),
      "typeofTransaction": "CreditCard",
      "fromWho": "ddqwdqwd",
      "student": {
          "student": "Charlie Brown",
          "value": "Charlie Brown",
          "label": "Charlie Brown",
          "id": "4"
      },
      "parent": {
          "name": "Eleanor",
          "id": "4"
      },
      "level": "Kindergarten",
      "class": "6C",
      "paymentPlan": {
          "name": "Monthly Plan",
          "period": "1 month",
          "price": 500,
          "value": "Monthly Plan",
          "label": "Monthly Plan"
      },
      "status": "paid",
      "description": "eeee"
  })
  const [open,setOpen]=React.useState(false)
  const openEditSheet = (student:any) => {
    setInvoice(student)
    setOpen(true); // Open the sheet after setting the level
  };
    const getStatusColor = React.useCallback((status:Status) => {
      switch (status) {
        case 'paid':
          return '#2ECC71'; // Green for accepted
        case 'not paid':
          return '#F1C40F'; // Yellow for pending
        case 'rejected':
          return '#E74C3C'; // Red for rejected
        default:
          return '#FFFFFF'; // Default to white for unknown status
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
      accessorKey: "id",
      header: "Trasaction ID",
      cell: ({ row }) => <div className="lowercase hidden sm:table-cell">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "student",
      header: "Student",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.original.student.student}</div>
        </div>
      ),
    },
    {
      accessorKey: "paymentAmount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("paymentAmount"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "DZD",
        }).format(amount)
  
        return <div className=" font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "paymentDate",
      header: "Transaction Date",
      cell: ({ row }) => (
       

        <div className="capitalize hidden sm:table-cell"> {((row.getValue("paymentDate") as Date)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => (
        <Badge   className="capitalize hidden sm:table-cell" style={{backgroundColor:getStatusColor(row.getValue("status"))}}>{row.getValue("status")}</Badge>
      ),
    },
    {
      accessorKey: "fromWho",
      header: "from",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.getValue("fromWho")}</div>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const invoice = row.original
  
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
              <DropdownMenuItem onClick={()=>openEditSheet(invoice)}>
                View Transaction Details
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
    data:invoices,
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
      <CardTitle>Transactions</CardTitle>
      <CardDescription>
      Introducing Our Dynamic student Dashboard for Seamless
                    Management and Insightful Analysis.
      </CardDescription>
    </CardHeader>
    <CardContent>     
    <div className="w-full">
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
      <EditStudentPaymentForm open={open} setOpen={setOpen} invoice={invoice}/>
    </CardContent>
  </Card>


  </>
  )
}
