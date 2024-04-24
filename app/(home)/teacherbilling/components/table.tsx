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



const data = [
  {
    id: "1",
    PaymentTitle: "John Doe",
    Typeofpayment: "salary",
    Paymentdate: "2023-01-15",
    PaymentStatus: "Not Paid",
    PaymentAmount: 2200,
    month: "January",
  },
  {
    id: "2",
    PaymentTitle: "Jane Smith",
    Typeofpayment: "salary",
    Paymentdate: "2022-11-20",
    PaymentStatus: "Paid",
    PaymentAmount: 5500,
    month: "January",
  },
  {
    id: "3",
    PaymentTitle: "Michael Johnson",
    Typeofpayment: "Other",
    Paymentdate: "2023-03-10",
    PaymentStatus: "Paid",
    PaymentAmount: 4000,
    month: "January",
  },
  {
    id: "4",
    PaymentTitle: "John Doe",
    Typeofpayment: "salary",
    Paymentdate: "2023-01-15",
    PaymentStatus: "Not Paid",
    PaymentAmount: 2000,
    month: "January",
  },
  {
    id: "5",
    PaymentTitle: "Jane Smith",
    Typeofpayment: "Other",
    Paymentdate: "2022-11-20",
    PaymentStatus: "Paid",
    PaymentAmount: 1500,
    month: "January",
  },
  {
    id: "6",
    PaymentTitle: "Michael Johnson",
    Typeofpayment: "Other",
    Paymentdate: "2023-03-10",
    PaymentStatus: "Not Paid",
    PaymentAmount: 2000,
    month: "December",
  }
];

type Status = 'Paid' | 'Not Paid' 
export type Payment = {
    id: string;
    PaymentTitle: string;
    Typeofpayment: string;
    Paymentdate: string;
    PaymentAmount: number;
    PaymentStatus:"Paid" | "Not Paid" 
    

  };

 interface DataTableDemoProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean; // Specify the type of setOpen
  }
  export const DataTableDemo: React.FC<DataTableDemoProps> = ({ setOpen }) => {
    
    const getStatusColor = React.useCallback((status:Status) => {
      switch (status) {
        case 'Paid':
          return '#2ECC71'; // Green for accepted
        case 'Not Paid':
          return '#E74C3C'; // Yellow for pending
        // Default to white for unknown status
      }
    }, []);
    
   const columns: ColumnDef<Payment>[] = [
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
      accessorKey: "PaymentTitle",
      header: "TeacherName",
      cell: ({ row }) => (
        <div className="capitalize">
           <div className="font-medium">{row.getValue("PaymentTitle")}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {row.getValue("email")}
                              </div>
        </div>
      ),
    },
    {
      accessorKey: "Typeofpayment",
      header: "Typeofpayment",
      cell: ({ row }) => <div className="lowercase hidden sm:table-cell">{row.getValue("Typeofpayment")}</div>,
    },
    {
      accessorKey: "Paymentdate",
      header: "Paymentdate",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">{row.getValue("Paymentdate")}</div>
      ),
    },
    {
      accessorKey: "month",
      header: "PaymentMonth",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">{row.getValue("month")}</div>
      ),
    },
    {
      accessorKey: "PaymentStatus",
      header: "PaymentStatus",
      cell: ({ row }) => (
        <Badge   className="capitalize hidden sm:table-cell" style={{backgroundColor:getStatusColor(row.getValue("PaymentStatus"))}}>{row.getValue("PaymentStatus")}</Badge>
      ),
    },

    {
      accessorKey: "PaymentAmount",
      header: () => <div className="text-right">Payment amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("PaymentAmount"))
  
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
                View Payment
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
          placeholder="Filter Payment..."
          value={(table.getColumn("Payment")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Payment")?.setFilterValue(event.target.value)
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
      <CardTitle>Your Expences</CardTitle>
      <CardDescription>
      Introducing Our Dynamic Expences Dashboard for Seamless
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