import { useState } from "react";
import { TableCell } from "../../../components/ui/table";
import { TableRow } from "../../../components/ui/table";
import Checkbox from "../../../components/form/input/Checkbox";
import { MoreDotIcon, TrashBinIcon, InfoIcon } from "../../../icons";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../../components/ui/dropdown/DropdownItem";
import { IImage } from "../Images";


const ActionsCell = (props: { image: IImage }) => {
    const { image } = props;

    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        console.log(image);
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={() => { }}>
                <InfoIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
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

export const ImagesTableRow = (props: { image: IImage }) => {

    const { image } = props;

    return (
        <TableRow>
            <TableCell className="w-1/24">
                <Checkbox checked={false} onChange={() => { }} />
            </TableCell>

            <TableCell className="w-8/24">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {image.name}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {image.id}
                        </span>
                    </div>
                </div>
            </TableCell>

            <TableCell className="w-6/24 text-gray-500 text-theme-sm dark:text-gray-400">
                {image.tag}
            </TableCell>

            <TableCell className="w-3/24 text-gray-500 text-theme-sm dark:text-gray-400">
                {image.size}
            </TableCell>

            <TableCell className="w-3/24 text-gray-500 text-theme-sm dark:text-gray-400">
                {image.created}
            </TableCell>

            <TableCell className="w-3/24 text-gray-500 text-theme-sm dark:text-gray-400 sticky right-0 bg-white dark:bg-white/[0.03] z-10">
                <ActionsCell image={image} key={image.id} />
            </TableCell>
        </TableRow>
    )
}
