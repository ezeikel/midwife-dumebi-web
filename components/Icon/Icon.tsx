import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconProps = {
  name: string;
  type?: string;
  size?: string;
  color?: string;
  className?: string;
};

const Icon = ({
  name,
  type = "fal",
  size = "lg",
  color = "#000000",
  className,
}: IconProps) => (
  <FontAwesomeIcon
    icon={[type, name]}
    size={size}
    color={color}
    className={className}
  />
);

export default Icon;
