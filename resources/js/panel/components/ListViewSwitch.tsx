import { useSearchParams } from "react-router-dom";
import {
    ListBulletIcon,
    TableCellsIcon,
    SquaresPlusIcon,
} from "@heroicons/react/20/solid";

enum ListViewTypeEnum {
    LIST = "list",
    GRID = "grid",
    TABLE = "table",
}

const ListViewSwitch = ({ className = "" }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSwitchToTable = (event) => {
        event.preventDefault();
        searchParams.set("view", ListViewTypeEnum.TABLE);
        setSearchParams(searchParams);
    };

    const handleSwitchToGrid = (event) => {
        event.preventDefault();
        searchParams.set("view", ListViewTypeEnum.GRID);
        setSearchParams(searchParams);
    };

    const handleSwitchToList = (event) => {
        event.preventDefault();
        searchParams.delete("view"); // or set to ListTypeEnum.LIST
        setSearchParams(searchParams);
    };

    const isTableView = () =>
        searchParams.get("view") === ListViewTypeEnum.TABLE;
    const isGridView = () => searchParams.get("view") === ListViewTypeEnum.GRID;
    const isListView = () => {
        const view = searchParams.get("view");
        return !view || view === ListViewTypeEnum.LIST;
    };

    return (
        <div className={className}>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-r-none text-white rounded-md hover:opacity-75 ${
                    isTableView() ? "bg-blue-500" : "bg-blue-300 text-gray-900"
                }`}
                onClick={handleSwitchToTable}
            >
                <TableCellsIcon className="w-5 h-5" />
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-none text-white hover:opacity-75 ${
                    isGridView() ? "bg-blue-500" : "bg-blue-300 text-gray-900"
                }`}
                onClick={handleSwitchToGrid}
            >
                <SquaresPlusIcon className="w-5 h-5" />
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-l-none text-white rounded-md  hover:opacity-75 ${
                    isListView() ? "bg-blue-500" : "bg-blue-300 text-gray-900"
                }`}
                onClick={handleSwitchToList}
            >
                <ListBulletIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ListViewSwitch;
export { ListViewTypeEnum };
