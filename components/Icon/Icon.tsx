import {
  IconName,
  IconPrefix,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconProps = {
  name: IconName;
  type?: IconPrefix;
  size?: SizeProp;
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
