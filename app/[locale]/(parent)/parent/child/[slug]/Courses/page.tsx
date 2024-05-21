
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { AlbumArtwork } from "./components/album-artwork"


import  {currentModules}from "./components/data/albums"
import { useTranslations } from "next-intl"

export default function MusicPage() {
    const t=useTranslations()
  return (
<div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">{t('general-information')}</h3>
      <p className="text-sm text-muted-foreground">
        {t('this_is_how_others_will_see_your_school')} </p>
    </div>
      <div className=" md:block">
       
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
            
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="arabic" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="arabic" className="relative">
                          Arabic
                        </TabsTrigger>
                        <TabsTrigger value="english">English</TabsTrigger>
                        <TabsTrigger value="french">
                          French
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                       
                      </div>
                    </div>
                    <TabsContent
                      value="arabic"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Study  Arabic 
                          </h2>
                          <p className="text-sm text-muted-foreground">
                           The latest course for you 
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {currentModules.map((album) => (
                              <AlbumArtwork
                                key={album.title}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      
                      <Separator className="my-4" />
                     
                    </TabsContent>
                    <TabsContent
                      value="english"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Study English
                          </h2>
                          <p className="text-sm text-muted-foreground">
                           The latest course for you 
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {currentModules.map((album) => (
                              <AlbumArtwork
                                key={album.title}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      
                      <Separator className="my-4" />
                     
                    </TabsContent>

                    <TabsContent
                      value="french"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Study French
                          </h2>
                          <p className="text-sm text-muted-foreground">
                           The latest course for you 
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {currentModules.map((album) => (
                              <AlbumArtwork
                                key={album.title}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      
                      <Separator className="my-4" />
                     
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}