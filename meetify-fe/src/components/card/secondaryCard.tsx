import { MouseEventHandler } from "react";
import "./secondaryCard.scss";

interface SecondaryCardComponent {
  title: string;
  status: string;
  capacity: string;
  futureMeetings: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const SecondaryCard: React.FC<SecondaryCardComponent> = (
  props
): JSX.Element => {
  return (
    <div className="secondary-card">
      <h3>{props.title}</h3>
      <p>Currently:{props.status}</p>
      <p>Capacity:{props.capacity}</p>
      <p>Active meetings:{props.futureMeetings}</p>
      <div
        className="arrow-card"
        onClick={props.onClick ? props.onClick : undefined}
      >
        APPOINT →
      </div>
    </div>
  );
};

export default SecondaryCard;
