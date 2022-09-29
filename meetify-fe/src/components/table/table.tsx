import "./table.scss";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

interface TableComponent {
  name?: string;
  headers: string[];
  items: { [key: string]: string }[] | RoomDTO[] | undefined;
  keys: string[];
  keyRenderer?: KeyRendererType;
}

const Table: React.FC<TableComponent> = ({
  headers,
  items,
  keys,
  keyRenderer,
}): JSX.Element => {
  return (
    <div className="table-content">
      <TableHeader headers={headers} />
      <TableBody items={items} keys={keys} keyRenderer={keyRenderer} />
    </div>
  );
};

export default Table;
