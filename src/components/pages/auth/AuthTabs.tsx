import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RegisterForm from "@/components/pages/auth/forms/RegisterForm";
import SignInForm from "@/components/pages/auth/forms/SignInForm";

export default async function FormTabs() {
  return (
    <div>
      <Tabs
        defaultValue="sign-in"
        className="mt-[10vh] flex flex-col items-center"
      >
        <TabsList className="w-full ">
          <TabsTrigger className="w-full" value="sign-in">
            Sign in
          </TabsTrigger>
          <TabsTrigger className="w-full" value="register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <div></div>
    </div>
  );
}
