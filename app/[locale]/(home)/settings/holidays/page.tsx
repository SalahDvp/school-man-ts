
import { Separator } from "@/components/ui/separator"
import { HolidaysForm } from "@/app/(home)/settings/holidays/holidays-form"

const SettingsHolidaysPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Holidays</h3>
       
      </div>
      <Separator />
      <HolidaysForm />
    </div>
  )
}
export default SettingsHolidaysPage