import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FormCreate } from "./form-create";
import { FormView } from "./form-view";

interface Props {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
}
export const TabUI = ({ setTab, tab }: Props) => {

  const isMobile = useIsMobile();
  return (
    <Tabs defaultValue={tab} className="w-[100%]" onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="log">Log Experience</TabsTrigger>
        <TabsTrigger value="explore">Explore Experience</TabsTrigger>
      </TabsList>
      <TabsContent value="log">
        <ScrollArea className={`${isMobile ? 'h-72' : 'h-full'}`}>
          <FormCreate />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="explore">
        <FormView />
      </TabsContent>
    </Tabs>
  );
};
