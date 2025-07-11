import { TableHeader, TableRow, TableCell } from "../../../components/ui/table";
import Checkbox from "../../../components/form/input/Checkbox";

export const ImagesTableHeader = (props: {
  checked: boolean; 
  onCheckboxChange: (checked: boolean) => void;}) => {
  
  return (
    <>
      <TableHeader className="border-b border-gray-100 dark:border-b dark:border-gray-800">
        <TableRow>
          <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" >
            <Checkbox checked={props.checked} onChange={props.onCheckboxChange} />
          </TableCell>

          <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
            Name
          </TableCell>

          <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" >
            Tag
          </TableCell>

          <TableCell isHeader
            className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            Size
          </TableCell>

          <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
            Created
          </TableCell>

          <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" >
            Actions
          </TableCell>
        </TableRow>
      </TableHeader>
    </>
  )
}
