import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/app/(home)/settings/level/components/profile-form"

const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Information</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see your school.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default SettingsProfilePage