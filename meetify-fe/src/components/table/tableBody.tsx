import "./table.scss";
interface TableBodyComponent {
  items: { [key: string]: string }[] | RoomDTO[] | undefined;
  keys: string[];
  keyRenderer?: KeyRendererType;
}

const TableBody: React.FC<TableBodyComponent> = ({
  items,
  keys,
  keyRenderer,
}): JSX.Element => {
  return (
    <div className="table-body">
      {items?.map((name) => {
        return (
          <div key={name._id} className="table-row">
            {keys.map((field) =>
              (keyRenderer as { [key: string]: string })[field] ? (
                <div className="table-row-item" key={field}>
                  {(keyRenderer as KeyRendererCallableType)[field](
                    name as EntityDTO
                  )}
                </div>
              ) : (
                <div key={field} className="table-row-item">
                  {(name as { [key: string]: string })[field]}
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;
