import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import s from "@/entities/weather/ui/edit-location-menu/edit-location-menu.module.scss";

export function EditLocationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={s.menuTrigger}>...</button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={s.dropdownEditLocationContent}>
        <DropdownMenuItem>
          <button type="button" className={s.editLocationButton}>Edit Location</button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
