import {Progress} from "@/components/ui/progress";

type ProgressBarProps = {
  endsAt: string;
  created: string;
};

export default function ProgressBar({endsAt, created}: ProgressBarProps) {
  // Compare the difference between endsAt and created. Then show time left in percentage.
  const calculatePercentage = () => {
    const endsAtDate = new Date(endsAt);
    const createdDate = new Date(created);
    const now = new Date();

    const totalDuration = endsAtDate.getTime() - createdDate.getTime();
    const elapsedTime = now.getTime() - createdDate.getTime();

    const remainingTime = totalDuration - elapsedTime;
    const percentageLeft = (remainingTime / totalDuration) * 100;
    return percentageLeft;
  };

  return (
    <div className="flex justify-center w-full ">
      <Progress className=" h-0.5" value={calculatePercentage()} />
    </div>
  );
}
