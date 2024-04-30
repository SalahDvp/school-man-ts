"use client";

import * as React from "react";
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SheetDemo } from "./sheet-form";
import EditFormSheetDemo from "./edit-level";
const data: Level[] = [
  {
    id: "1",
    level: "Kindergarten",
    start: "2024-09-01",
    end: "2025-06-30",
    fee: 1000,
    status: "open",
    registrationDeadline: "2024-08-15",
  },
  {
    id: "2",
    level: "Year 1",
    start: "2024-09-01",
    end: "2025-06-30",
    fee: 1200,
    status: "open",
    registrationDeadline: "2024-08-15",
  },
  {
    id: "3",
    level: "Year 2",
    start: "2024-09-01",
    end: "2025-06-30",
    fee: 1400,
    status: "open",
    registrationDeadline: "2024-08-15",
  },
  {
    id: "4",
    level: "Year 3",
    start: "2024-09-01",
    end: "2025-06-30",
    fee: 1600,
    status: "open",
    registrationDeadline: "2024-08-15",
  },
  {
    id: "5",
    level: "Year 4",
    start: "2024-09-01",
    end: "2025-06-30",
    fee: 1800,
    status: "open",
    registrationDeadline: "2024-08-15",
  },
  {
    id: "6",
    level: "Year 5",
    start: "2024-09-01",
    end: "2025-06-30",
    fee: 2000,
    status: "open",
    registrationDeadline: "2024-08-15",
  },
];
type Status = "open" | "closed";
export type Level = {
  id: string;
  level: string;
  status: "open" | "closed";
  fee: number;
  start: string;
  end: string;
  registrationDeadline: string;
};
export const DataTableDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = React.useState<Level>(data[0]);
  const [levels, setLevels] = React.useState(data);
  const getStatusColor = React.useCallback((status: Status) => {
    switch (status) {
      case "open":
        return "#90EE90"; // Green for accepted
      case "closed":
        return "#E74C3C"; // Red for rejected
      default:
        return "#FFFFFF"; // Default to white for unknown status
    }
  }, []);

  const columns: ColumnDef<Level>[] = [
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => (
        <div className="capitalize">
          <div className="font-medium">{row.getValue("level")}</div>
        </div>
      ),
    },
    {
      accessorKey: "start",
      header: "Start",
      cell: ({ row }) => (
        <div className="lowercase hidden sm:table-cell">
          {row.getValue("start")}
        </div>
      ),
    },
    {
      accessorKey: "end",
      header: "End",
      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">
          {row.getValue("end")}
        </div>
      ),
    },
    {
      accessorKey: "fee",
      header: "Fee",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("fee"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "DZD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
        variant="secondary"
          className="capitalize hidden sm:table-cell"
          style={{ backgroundColor: getStatusColor(row.getValue("status")) }}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const level = row.original;

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
              <DropdownMenuItem>
                {row.getValue("status") === "open"
                  ? "Close level"
                  : "Open Level"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openEditSheet(level)}>
                View level details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const openEditSheet = (level: Level) => {
    setOpen(true);
    setLevel(level);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const handleAddLevel = (newLevel: any) => {
    setLevels((prevLevels) => [...prevLevels, newLevel]);
  };

  return (
    <>
        <div className="flex flex-row items-center justify-between space-y-6 w-full">
        <div>
      <h3 className="text-lg font-medium">Levels</h3>
      <p className="text-sm text-muted-foreground">
      Add, edit, or remove levels
      </p>
    </div>
 
   
    
          <SheetDemo addLevel={handleAddLevel} />
 
      </div>
      <Separator/>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Your Levels</CardTitle>
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
                    );
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
          <EditFormSheetDemo open={open} setOpen={setOpen} level={level} />
        </CardContent>
      </Card>
    </>
  );
};
