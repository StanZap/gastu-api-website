import { PencilIcon } from "@heroicons/react/20/solid";

export const DetailsItem = (props) => {
    const { label, value, valClassNames, showEdit, onEditClick } = props;

    const handleEditClick = (e) => {
        e.preventDefault();
        onEditClick && onEditClick(e);
    };

    return (
        <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-gray-500">{label}</span>
            <div className="flex space-x-2 items-center">
                {Array.isArray(value) ? (
                    value.map((item, i) => (
                        <div key={i} className={valClassNames + " text-xl"}>
                            {item}
                        </div>
                    ))
                ) : (
                    <div className={valClassNames + " text-xl"}>{value}</div>
                )}
                {showEdit && (
                    <div>
                        <button
                            className="p-0 outline-none"
                            onClick={handleEditClick}
                        >
                            <PencilIcon className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
