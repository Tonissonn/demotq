import Icon from "../icon/icon";
import "./card.scss";
interface CardComponent {
  title: string;
  appointedFor: string;
  appointedBy: string;
  participants: string;
  duration: string;
  isAdmin?: boolean;
}

const Card = (props: CardComponent): JSX.Element => {
  return (
    <div className="card-left">
      <div className="column">
        <h2 className="title">{props.title}</h2>
        <label>
          Appointed for &nbsp;
          <span className="appointed">{props.appointedFor}</span>
        </label>
        <label>
          Appointed by &nbsp;
          <span className="appointed">{props.appointedBy}</span>
        </label>
      </div>
      <div className="column">
        <label>
          <Icon type={"user"} />
          &nbsp;
          <span className="logos">{props.participants}</span>
        </label>
        <label>
          <Icon type={"time"} />
          &nbsp;
          <span className="logos">{props.duration}</span>
        </label>
        {props.isAdmin === true && (
          <label>
            <Icon type={"edit"} />
          </label>
        )}
      </div>
    </div>
  );
};
export default Card;
