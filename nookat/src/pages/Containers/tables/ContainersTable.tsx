import {
  Table,
  TableBody,
} from "../../../components/ui/table";
import { IContainer } from "../Containers";
import { ContainersTableHeader } from "./ContainersTableHeader";
import { ContainerTableRow } from "./ContainersTableRow";


const ContainersTable = (props: { containers: IContainer[] }) => {
  return (
    
    <Table>
      <ContainersTableHeader checked={false} onCheckboxChange={() => { }} />

      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
        {props.containers.map((container) => (
          <ContainerTableRow key={container.id} container={container} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ContainersTable;

