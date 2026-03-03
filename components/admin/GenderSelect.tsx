import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function GenderSelect({ value }: { value?: string }) {
  return (
    <div className="flex flex-col">
      <Label className="mb-2">Gender</Label>
      <Select required name="gender" defaultValue={value || ""}>
        <SelectTrigger className="border-2 w-full border-gray-300">
          <SelectValue placeholder="select a gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="UNISEX">Unisex</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default GenderSelect;
