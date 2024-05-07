"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DataTableDemo } from "./components/teachers-table";
import TeacherForm from "./components/teacherForm";
import { Overview } from "./components/area-chart";
import { useTranslations } from "next-intl";

function Dashboard() {
  const t=useTranslations()
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('teachers')}</h2>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-2">
                <CardDescription>{t('teachers')}</CardDescription>
                <Overview />
              </CardHeader>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>{t('this-week')}</CardDescription>
                <CardTitle className="text-4xl">15 </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {t('teached-classes')} </div>
              </CardContent>
              <CardFooter>
                <Progress value={80} aria-label={t('increase',{increase:25})} />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>{t('this-month')}</CardDescription>
                <CardTitle className="text-4xl">45 </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {t('teached-classses')} </div>
              </CardContent>
              <CardFooter>
                <Progress value={67} aria-label={t('increase',{increase:25})}  />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>{t('create-teacher')}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {t('anyone-with-the-link-can-create-this-document')} </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                {" "}
                {/* Adjust flex properties */}
                <div className=" flex-grow">
                  <Input value="http://example.com/link/to/document" readOnly />
                </div>
                <Button variant="secondary" className="shrink-0">
                  {t('copy-link')} </Button>
              </CardFooter>
            </Card>
          </div>

          <DataTableDemo  />
  
        </div>
        <div>
          <TeacherForm />
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
