import { ToggleGroupItem as TGItem } from "../ui/toggle-group";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  value: string;
  icon: ReactNode;
  tooltip: string;
  [key: string]: any;
}
export const ToogleGroupItem = ({ icon, value, tooltip, ...props }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TGItem value={value} aria-label={`Toggle ${value}`} {...props}>
          {icon}
        </TGItem>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
