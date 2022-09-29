import "./table.scss";
interface TableHeaderComponent {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderComponent> = ({
  headers,
}): JSX.Element => {
  return (
    <div className="table-header">
      {headers.map((name, index) => (
        <span key={index} className="table-header-name">
          {name}
        </span>
      ))}
    </div>
  );
};

export default TableHeader;
