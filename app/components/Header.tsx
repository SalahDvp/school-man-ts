
import TeamSwitcher from "../(home)/dashboard/components/team-switcher"
import { MainNav } from "../(home)/dashboard/components/main-nav"
import { Search } from "../(home)/dashboard/components/search"
import { UserNav } from "../(home)/dashboard/components/user-nav"
import { ModeToggle } from "../(home)/dashboard/components/theme-mode"
export default function Header(){
    return(
<div className="border-b">
<div className="flex h-16 items-center px-4">
  <TeamSwitcher />
  <MainNav className="mx-6" />
  <div className="ml-auto flex items-center space-x-4">
    <Search />
    <UserNav />
    <ModeToggle/>
  </div>
</div>
</div>
    )
}
