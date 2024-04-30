
"use client"
import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  School,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons"
import React from "react"
import { ClassForm } from "./components/new-class"
import EditClassForm from "./components/edit-class"
import { ClassFormValues } from "./components/new-class"
const data:  ClassFormValues[] = [
        {name: "Class A",
        level:{name:"intermediate",id:"2"},
        className: "",
        capacity: 30,
        teachers: [],
        mainTeacher: { name: "Main Teacher", id: "3" },
        mainStudent: { name: "Main Student", id: "4" },
        students: [
          { name: "Student 1", id: "5" },
          { name: "Student 2", id: "6" },
        ],
      },
      {name: "Class A",
      level:{name:"intermediate",id:"3"},
      className: "",
      capacity: 30,
      teachers: [],
      mainTeacher: { name: "Main Teacher", id: "3" },
      mainStudent: { name: "Main Student", id: "4" },
      students: [
        { name: "Student 1", id: "5" },
        { name: "Student 2", id: "6" },
      ],
    },
    {name: "Class A",
    level:{name:"intermediate",id:"4"},
    className: "",
    capacity: 30,
    teachers: [],
    mainTeacher: { name: "Main Teacher", id: "3" },
    mainStudent: { name: "Main Student", id: "4" },
    students: [
      { name: "Student 1", id: "5" },
      { name: "Student 2", id: "6" },
    ],
  },
  {name: "Class A",
  level:{name:"intermediate",id:"5"},
  className: "",
  capacity: 30,
  teachers: [],
  mainTeacher: { name: "Main Teacher", id: "3" },
  mainStudent: { name: "Main Student", id: "4" },
  students: [
    { name: "Student 1", id: "5" },
    { name: "Student 2", id: "6" },
  ],
},
{name: "Class A",
level:{name:"intermediate",id:"6"},
className: "",
capacity: 30,
teachers: [],
mainTeacher: { name: "Main Teacher", id: "3" },
mainStudent: { name: "Main Student", id: "4" },
students: [
  { name: "Student 1", id: "5" },
  { name: "Student 2", id: "6" },
],
},
{name: "Class A",
level:{name:"intermediate",id:"1"},
className: "",
capacity: 30,
teachers: [],
mainTeacher: { name: "Main Teacher", id: "3" },
mainStudent: { name: "Main Student", id: "4" },
students: [
  { name: "Student 1", id: "5" },
  { name: "Student 2", id: "6" },
],
},
  
]

function Classes() {
  const [open, setOpen] = React.useState(false);
  const [cls, setCls] = React.useState< ClassFormValues>(data[0]);
    const columns: ColumnDef<ClassFormValues>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({ row }) => (
            <div className="capitalize w-[100px]">
               <div className="font-medium">{row.getValue("name")}</div>

            </div>
          ),
        },
        {
          accessorKey: "level",
          header: "Level",
          cell: ({ row }) => <div className="lowercase hidden sm:table-cell"> {row.original.level?.name}</div>,
        },
        {
          accessorKey: "className",
          header: "Class",
          cell: ({ row }) => (
            <div className="capitalize hidden sm:table-cell">{row.getValue("class")}</div>
          ),
        },
        {
          accessorKey: "capacity",
          header: "Capacity",
          cell: ({ row }) => (
            <div className="capitalize hidden sm:table-cell">{row.getValue("capacity")}</div>
          ),
        },
        {
          accessorKey: "mainTeacher",
          header: "Main Teacher",
          cell: ({ row }) => (
            <div className="capitalize hidden sm:table-cell">{row.original.mainTeacher?.name}</div>
          ),
        },
            {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const cls = row.original
      
            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => openEditSheet(cls)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]
      const openEditSheet = (cls:ClassFormValues) => {
        setOpen(true);
        setCls(cls);
      };
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
            pageSize: 5, //custom default page size
          },
        },
      })
      const handleFilter = (classType:string) => {
        if (classType === "All") {
          table.resetColumnFilters()
        
        } else {
          table.getColumn("level")?.setFilterValue(classType);
        } 
      };
  return (

      <div className="flex flex-col sm:gap-4 sm:py-4 ">

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all" onClick={() => handleFilter("All")}>All</TabsTrigger>
                <TabsTrigger value="Beginner" onClick={() => handleFilter("Beginner")}>Beginner</TabsTrigger>
                <TabsTrigger value="Intermediate" onClick={() => handleFilter("Intermediate")}>Intermediate</TabsTrigger>
                <TabsTrigger value="Advanced" className="sm:flex" onClick={() => handleFilter("Advanced")}>
                Advanced
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
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
                <Button  variant="outline" className="gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <EditClassForm open={open} setOpen={setOpen} cls={cls} />

           <ClassForm/>
              </div>
            </div>
       
          
   
          </Tabs>
          <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Classes</CardTitle>
                  <CardDescription>
                    Manage your classes and view their details.
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
                </CardContent>
                <CardFooter>
              
      <div className="flex items-center justify-end space-x-2 py-4 w-full">
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
                </CardFooter>
              </Card>
        </main>
      </div>

  )
}
export default Classes