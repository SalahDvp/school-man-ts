

import * as React from "react"
import {
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
import {exportTableToExcel} from '@/components/excelExport'
import SheetDemo from "./editStudent"
import  studentRegistrationSchema  from "@/validators/auth";
import { useData } from "@/context/admin/fetchDataContext";
import { z } from "zod"
import { useTranslations } from "next-intl"

type Status = 'accepted' | 'pending' | 'rejected';
export type StudentSummary = {
  id: string;
  teacher: string;
  status: Status;
  Subject: string;
  joiningDate: string;
  salary: number;

};
interface DataTableDemoProps {
  filter: string;
}
  type StudentFormValues = z.infer<typeof studentRegistrationSchema>  & {id:string };
  export const DataTableDemo: React.FC<DataTableDemoProps> = ({ filter }) => {
    const [open,setOpen]=React.useState(false)
    const t=useTranslations()
    const {students}=useData()
    const [student,setStudent]=React.useState<StudentFormValues>({  
      id: '123456',
      level: 'Intermediate',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      address: '123 Main St',
      city: 'Anytown',
      state: 'State',
      postalCode: '12345',
      country: 'Country',
      parentFullName: 'Jane Doe',
      parentFirstName: 'Jane',
      parentLastName: 'Doe',
      parentEmail: 'jane.doe@example.com',
      parentPhone: '123-456-7890',
      parentId: '654321',
      emergencyContactName: 'Emergency Contact',
      emergencyContactPhone: '987-654-3210',
      medicalConditions: null,
      status: 'Active',
      joiningDate: new Date(),
      registrationStatus: 'Registered',
      startDate: new Date(),
      lastPaymentDate: new Date(),
      nextPaymentDate: new Date(),
      totalAmount: 1000,
      amountLeftToPay: 500,
      class: { name: 'Class Name', id: 'class123' },
    })
      // Define your table and set up filtering
  React.useEffect(() => {
         
    if (filter === "All") {
      table.resetColumnFilters()
    } else {
      table.getColumn("level")?.setFilterValue(filter);
    } 
  }, [filter]); 
    const openEditSheet = (student:StudentFormValues) => {
      setStudent(student)
      setOpen(true); // Open the sheet after setting the level
    };
    const getMonthAbbreviation = (monthIndex: number) => {
      const startDate = new Date(2023, 8); // September 2023 (month index 8)
      const date = new Date(startDate.getFullYear(), startDate.getMonth() + monthIndex);
      const monthAbbreviation = date.toLocaleString("default", { month: "short" });
      const yearAbbreviation = date.getFullYear().toString().substr(-2);
      return `${monthAbbreviation}${yearAbbreviation}`;
    };
    
    // Updated generateMonthlyPaymentColumns function
    const generateMonthlyPaymentColumns = (
      getMonthAbbreviation: (index: number) => string
    ): ColumnDef<any>[] => {
      return Array.from({ length: 12 }, (_, i) => {
        const monthAbbreviation = getMonthAbbreviation(i);
        return {
          accessorKey: `monthlyPayments23_24.${monthAbbreviation}`,
          header: () => <div>{monthAbbreviation}</div>,
          cell: ({ row }: { row: any }) => {
            const isPaid = row.original.monthlyPayments23_24[monthAbbreviation]?.status 
     
            
            return (
              <Badge
                style={{ backgroundColor: isPaid === 'Paid' ? "#4CAF50" : "#F44336" }}
              >
       {isPaid === t('paid') && isPaid}
            
              </Badge>
            );
          },
        };
      });
    };
    const columns: ColumnDef<any>[] = [
      {
        accessorKey: "student",
        header: () => <div >{t('student')}</div>,
  
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
        header: () => <div >{t('level')}</div>,
        cell: ({ row }) => <div>{row.original.level}</div>,
      },
      ...generateMonthlyPaymentColumns(getMonthAbbreviation),
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const student = row.original;
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditSheet(student)}>
                  Edit
                </DropdownMenuItem>
       
                <DropdownMenuItem onClick={() => console.log(`View details of ${student.firstName} ${student.lastName}`)}>
            Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  const handleExport = () => {
    const exceldata=students.map((student:any)=>({[`${t('Name')}`]:student.student,
    [`${t('level')}`]:student.level,
    [`${t('status')}`]:t(student.status),
    [`${t('joining-date-0')}`]:student.joiningDate,
    [`${t('amount-left')}`]: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "DZD",
    }).format(student.amountLeftToPay),
    [`${t('total-amount-0')}`]: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "DZD",
    }).format(student.totalAmount),
    }))
    exportTableToExcel(t('students-table'),exceldata);
  };
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
    
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
        pageSize: 10, //custom default page size
      },
    },
  })
 


  return (
    <>


    <ScrollArea className="w-full whitespace-nowrap mt-2">
    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>{t('your-students')}</CardTitle>
      <CardDescription>
      {t('introducing-our-dynamic-student-dashboard-for-seamless-management-and-insightful-analysis')} 
      
      <div className="flex items-center justify-between">
       
    
    <Input
          placeholder={t('filter-student')}
          value={(table.getColumn("student")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("student")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mt-4"
        />
          <div className=" ml-auto space-y-4 ">
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t('columns')} <ChevronDownIcon className="ml-2 h-4 w-4" />
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
                    {t(column.id)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="ml-2"  
        
    onClick={handleExport}>
       {t('export')} <File className="ml-2 h-4 w-4" />
      </Button>
    </div>
 
    </div>
      </CardDescription>
    </CardHeader>
    <CardContent>     

 
 
        <Table id="students-table">
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
                  {t('no-results')} </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
   
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} {t('row-s-selected')}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t('previous')} </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('next')} </Button>
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