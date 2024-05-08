

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
import { useData } from "@/context/admin/fetchDataContext";
import { deleteLevel } from "@/lib/hooks/levels";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
type Status = "open" | "closed";
export type Level = {
  id: string;
  level: string;
  status: "open" | "closed";
  fee: number;
  start: Date;
  end: Date;
  registrationDeadline: Date;
  subjects:any;
  prices:any;
};
export const DataTableDemo = () => {
  const {levels,setLevels}=useData()

  const t=useTranslations()
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = React.useState<Level>({id: "1",
  level: "Kindergarten",
  start: new Date("2024-09-01"),
  end: new Date("2025-06-30"),
  fee: 1000,
  status: "open",
  registrationDeadline: new Date("2024-08-15"),
  subjects:[{value:'',label:''}],
  prices:[]});

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
      header:() => <div>{t('level')}</div>, 
      cell: ({ row }) => (
        <div className="capitalize">
          <div className="font-medium">{row.getValue("level")}</div>
        </div>
      ),
    },
    {
      accessorKey: "start",
      header:() => <div>{t('start')}</div>, 

      cell: ({ row }) => (
        <div className="lowercase hidden sm:table-cell">
{((row.getValue("start") as Date)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </div>
      ),
    },
    {
      accessorKey: "end",
      header:() => <div>{t('end-0')}</div>, 

      cell: ({ row }) => (
        <div className="capitalize hidden sm:table-cell">
{((row.getValue("end") as Date)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </div>
      ),
    },
    {
      accessorKey: "fee",
      header:() => <div>{t('fee')}</div>, 

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
      header:() => <div>{t('status')}</div>, 

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
        const level1 = row.original;


        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t('open-menu')}</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuItem onClick={()=>deleteLevelDoc(level1.id,level1)}>
                {t('delete-level')} </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openEditSheet(level1)}>
                {t('view-level-details')} </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const openEditSheet = (level: Level) => {
setLevel(level)

    setOpen(true); // Open the sheet after setting the level
  };

  const table = useReactTable({
    data:levels,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
const {toast}=useToast()
const deleteLevelDoc=async(levelId:string,data:Level)=>{
  await deleteLevel(levelId)
  setLevels((prev:any) => prev.filter((level:Level) => level.id !== data.id));
  toast({
    title: t('level-deleted'),
    description: t(`level-deleted-Successfully`),
  });
}

  return (
    <>
        <div className="flex flex-row items-center justify-between space-y-6 w-full">
        <div>
      <h3 className="text-lg font-medium">{t('levels')}</h3>
      <p className="text-sm text-muted-foreground">
      {t('add-edit-or-remove-levels')} </p>
    </div>
 
   
    
          <SheetDemo />
 
      </div>
      <Separator/>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>{t('your-levels')}</CardTitle>
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
                    {t('no-results')} </TableCell>
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
