import "./button.scss";
interface ButtonComponent {
  name?: String;
  variant?: String;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonComponent> = ({
  name,
  variant,
  isDisabled,
  onClick,
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`button ${variant}`}
    >
      {name}
    </button>
  );
};

export default Button;
