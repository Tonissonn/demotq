import Button from "../button/button";
import Icon from "../icon/icon";
import "./meetingCard.scss";
interface CardComponent {
  title: string;
  meetingRoom: string;
  date: string;
  participants: string;
  duration: string;
  isOwner?: boolean;
  isPassed?: boolean;
}

const MeetingCard = (props: CardComponent): JSX.Element => {
  return (
    <div className="card-meeting">
      <div className="title">{props.title}</div>
      <div className="details">
        <span>
          {props.isPassed !== true && (
            <>
              <Button
                name={props.isOwner ? "End Meeting for All" : "Leave Meeting"}
                variant="secondary"
              />
            </>
          )}
        </span>
        <span>
          {props.isOwner === true && <div className="edit-link">EDIT</div>}
        </span>
        <span>
          {props.isOwner === true && (
            <>
              <Icon type={"line"} />
            </>
          )}
        </span>
        <span>
          {props.participants}
          <Icon type={"user"} />
        </span>
        <span>
          <Icon type={"line"} />
        </span>
        <span>
          {props.date}
          <Icon type={"date"} />
        </span>
        <span>
          <Icon type={"line"} />
        </span>
        <span>
          {props.duration}
          <Icon type={"time"} />
        </span>
        <span>
          <Icon type={"line"} />
        </span>
        <span>{props.meetingRoom}</span>
      </div>
    </div>
  );
};
export default MeetingCard;
