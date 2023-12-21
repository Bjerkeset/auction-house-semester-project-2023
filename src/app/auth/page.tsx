import FormTabs from "@/components/pages/auth/AuthTabs";
import FramerMotionProvider from "@/components/providers/FramerMotionProvider";

export default function page() {
  return (
    <FramerMotionProvider>
      <main className="flex w-screen justify-center max-w-7xl">
        <FormTabs />
      </main>
    </FramerMotionProvider>
  );
}
