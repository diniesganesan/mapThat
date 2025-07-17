import { toast } from "sonner";

interface Props {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}
export const toaster = ({ description, title, action }: Props) => {
  let timer = setTimeout(() => {
    toast(title, {
      description,
      action,
    });

    return () => clearTimeout(timer);
  }, 500);
};
