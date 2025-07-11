import { ImagesTableHeader } from "./ImagesTableHeader";
import { ImagesTableRow } from "./ImagesTableRow";
import { Table, TableBody } from "../../../components/ui/table";
import { IImage } from "../Images";


const ImagesTable = (props: { images: IImage[] }) => {
    const { images } = props;

    return (
      
      <Table>
        <ImagesTableHeader checked={false} onCheckboxChange={() => { }} />
  
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {images.map((image) => (
            <ImagesTableRow key={image.id} image={image} />
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default ImagesTable;
  