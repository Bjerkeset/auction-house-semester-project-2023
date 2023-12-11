import DownButton from "./DownButton";
export default function Intro() {
  return (
    <div className="flex items-center h-full">
      <div className="flex flex-col w-1/4 gap-4">
        <div className="flex justify-between  ">
          <p>Product</p>
          <p>33,233$</p>
        </div>
        <div className="flex justify-between ">
          <p>Product</p>
          <p>33,233$</p>
        </div>
      </div>
      <div className="w-2/4"></div>
      <div className="flex flex-col w-1/4 gap-4">
        <div className="flex justify-between ">
          <p>Product</p>
          <p>33,233$</p>
        </div>
        <div className="flex justify-between ">
          <p>Product</p>
          <p>33,233$</p>
        </div>
      </div>
      <DownButton />
    </div>
  );
}
