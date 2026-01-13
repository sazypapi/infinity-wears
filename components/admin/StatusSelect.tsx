import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function StatusSelect({ value }: { value?: string }) {
  return (
    <div className="flex flex-col">
      <Label className="mb-2">Status</Label>
      <Select required name="status" defaultValue={value || ""}>
        <SelectTrigger className="border-2 w-full border-gray-300">
          <SelectValue placeholder="select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusSelect;
