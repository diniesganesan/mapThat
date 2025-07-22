import { ReactNode } from "react";
import { Tooltip as Tip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  children: ReactNode;
  tooltip: string;
}

export const Tooltip = ({ children, tooltip }: Props) => {
  return (
    <Tip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tip>
  );
};
