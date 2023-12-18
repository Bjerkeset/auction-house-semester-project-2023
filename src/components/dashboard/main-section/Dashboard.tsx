import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import History from "./history-tab/History";
import Overview from "./overview-tab/Overview";
import Settings from "./settings-tab/Settings";
import {getUserProfile} from "@/lib/api";

export default async function Dashboard() {
  const user = await getUserProfile();

  return (
    <Tabs defaultValue="overview" className="w-full border">
      <TabsList className="justify-start w-full border-b ">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent className="p-4" value="overview">
        <Overview user={user} />
      </TabsContent>
      <TabsContent className="p-4" value="history">
        <History />
      </TabsContent>
      <TabsContent value="settings">
        <Settings user={user} />
      </TabsContent>
    </Tabs>
  );
}
