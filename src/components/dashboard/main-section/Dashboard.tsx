import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {getAllListingsByProfile} from "@/lib/api";
import History from "./history-tab/History";
import {Separator} from "@/components/ui/separator";
import Overview from "./overview-tab/Overview";

type Props = {};

export default async function Dashboard({}: Props) {
  return (
    <Tabs defaultValue="overview" className="w-full border">
      <TabsList className="justify-start w-full border-b ">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent className="p-4" value="overview">
        <Overview />
      </TabsContent>
      <TabsContent className="p-4" value="history">
        <History />
      </TabsContent>
      <TabsContent value="settings">Change your Settings here.</TabsContent>
    </Tabs>
  );
}
