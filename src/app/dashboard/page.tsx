import MainSection from "@/components/dashboard/main-section/Dashboard";
import FramerMotionProvider from "@/components/providers/FramerMotionProvider";

export default function page() {
  return (
    <FramerMotionProvider>
      <main className="flex max-w-7xl flex-col items-center w-full mt-[10vh]">
        <MainSection />
      </main>
    </FramerMotionProvider>
  );
}
