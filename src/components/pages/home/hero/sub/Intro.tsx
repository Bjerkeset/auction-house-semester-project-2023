import DownButton from "./DownButton";

type Bid = {
  title: string;
  price: number;
};

type Props = {
  bids: Bid[];
};

export default function Intro({bids}: Props) {
  // Sort bids by price in descending order and take the top 4
  const topBids = bids.sort((a, b) => b.price - a.price).slice(0, 4);
  return (
    <>
      <div className="flex items-center h-full">
        <div className="flex flex-col w-2/5 gap-4">
          {topBids.slice(0, 2).map((bid, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-xs md:text-base">{bid.title}</p>
              <span className="flex gap-1 items-center">
                <pre className="text-green-600 ">{bid.price}</pre>
                <p className="text-sm text-muted-foreground">$</p>
              </span>
            </div>
          ))}
        </div>
        <div className="w-2/4"></div>
        <div className="flex flex-col w-2/5 gap-4">
          {topBids.slice(2, 4).map((bid, index) => (
            <div key={index} className="flex justify-between gap-2">
              <p className="text-xs md:text-base">{bid.title}</p>
              <span className="flex gap-1 items-center">
                <pre className="text-green-600 ">{bid.price}</pre>
                <p className="text-sm text-muted-foreground">$</p>
              </span>
            </div>
          ))}
        </div>
      </div>
      <DownButton />
    </>
  );
}
