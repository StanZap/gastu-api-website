export const DetailsItem = (props) => {
    const { label, value, valClassNames } = props;
    return (
        <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-gray-500">{label}</span>
            {Array.isArray(value) ? (
                value.map((item, i) => (
                    <div key={i} className={valClassNames + " text-xl"}>
                        {item}
                    </div>
                ))
            ) : (
                <div className={valClassNames + " text-xl"}>{value}</div>
            )}
        </div>
    );
};
