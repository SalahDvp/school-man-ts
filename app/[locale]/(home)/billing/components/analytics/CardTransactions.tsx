
import { CardContent,Card,CardHeader,CardTitle,CardDescription} from '@/components/ui/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useTranslations } from 'next-intl';
import { useData } from '@/context/admin/fetchDataContext';
import { ScrollArea } from '@/components/ui/scroll-area';
function CardTransactions(){
  const t=useTranslations()
  const {payouts}=useData()
    return (
<Card className="col-span-3">
<CardHeader>
  <CardTitle>{t('recent-transactions')}</CardTitle>
  <CardDescription>
    {t('you-made-265-transactions-this-week',{numb:payouts.length})} </CardDescription>
</CardHeader>
<CardContent>
<ScrollArea className="h-[320px]">

<div className="space-y-8">
{payouts.map((payout:any,index:number) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={payout.avatarSrc} alt="Avatar" />
            <AvatarFallback>{payout.fromWho.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payout.paymentTitle}</p>
            <p className="text-sm text-muted-foreground">{payout.fromWho}</p>
          </div>
          <div className="ml-auto font-medium text-red-500">-{payout.paymentAmount} DZD</div>
        </div>
      ))}
      </div>
</ScrollArea>
</CardContent>
</Card>
    )
}
export default CardTransactions
