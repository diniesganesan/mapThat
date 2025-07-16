import { toast } from "sonner";

interface Props {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}
export const toaster = ({ description, title, action }: Props) => {
  toast(title, {
    description,
    action,
  });
};
