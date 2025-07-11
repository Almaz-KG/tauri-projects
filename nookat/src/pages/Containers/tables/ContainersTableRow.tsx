import { useState } from "react";
import { TableCell } from "../../../components/ui/table";
import { IContainer, IContainerPortMapping } from "../Containers";
import { TableRow } from "../../../components/ui/table";
import Checkbox from "../../../components/form/input/Checkbox";
import { MoreDotIcon, TrashBinIcon, InfoIcon, VideoIcon } from "../../../icons";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../../components/ui/dropdown/DropdownItem";

const startedDateFormatter = (startedDateString: string) => {
    const startedDate = new Date(startedDateString);
    const now = new Date();
    const diffMs = now.getTime() - startedDate.getTime();
    const diffMins = Math.floor(diffMs / 60000).toLocaleString();
    return `${diffMins} min${diffMins !== "1" ? "s" : ""} ago`;
}

const portMappingFormatter = (portMapping: IContainerPortMapping[]) => {
    return portMapping.map((port) => port.container_port).join(", ");
}


const ActionsCell = (props: { container: IContainer }) => {
    const { container } = props;

    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        console.log(container);
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={() => { }}>
                {container.status === "Running" ? (
                    <InfoIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                ) : (
                    <VideoIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                )}
            </button>

            <button onClick={() => { }}>
                <TrashBinIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>

            <button onClick={toggleDropdown}>
                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />

                <Dropdown
                    isOpen={isOpen}
                    onClose={closeDropdown}
                    className="w-40 p-2"
                >
                    <DropdownItem
                        onItemClick={closeDropdown}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                        Logs
                    </DropdownItem>
                    <DropdownItem
                        onItemClick={closeDropdown}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                        Terminal
                    </DropdownItem>
                    <DropdownItem
                        onItemClick={closeDropdown}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                        Files
                    </DropdownItem>
                </Dropdown>
            </button>
        </>
    )
}

export const ContainerTableRow = (props: { container: IContainer }) => {

    const { container } = props;

    return (
        <TableRow>
            <TableCell className="w-1/24">
                <Checkbox checked={false} onChange={() => { }} />
            </TableCell>

            <TableCell className="w-8/24">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {container.name}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {container.id}
                        </span>
                    </div>
                </div>
            </TableCell>

            <TableCell className="w-6/24 text-gray-500 text-theme-sm dark:text-gray-400">
                {container.params.image}
            </TableCell>

            <TableCell className="w-3/24 text-gray-500 text-theme-sm dark:text-gray-400">
                {portMappingFormatter(container.params.port_mapping)}
            </TableCell>

            <TableCell className="w-3/24 text-gray-500 text-theme-sm dark:text-gray-400">
                {startedDateFormatter(container.started)}
            </TableCell>

            <TableCell className="w-3/24 text-gray-500 text-theme-sm dark:text-gray-400 sticky right-0 bg-white dark:bg-white/[0.03] z-10">
                <ActionsCell container={container} key={container.id} />
            </TableCell>
        </TableRow>
    )
}
