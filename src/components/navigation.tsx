import { useAppContext } from "@/contexts/app-context";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TNavigation = {
  id: number | undefined;
};

export const Navigation = ({ id }: TNavigation) => {
  const { setData } = useAppContext();
  return (
    <div className="bg-background rounded-[20px] p-4 flex items-center justify-between mt-5">
      {id! <= 1 ? (
        <span></span>
      ) : (
        <span
          className="flex items-center gap-x-3 cursor-pointer"
          onClick={() => {
            setData({
              id: id! - 1,
            });
          }}
        >
          <ChevronLeft />
          <img
            src={
              id! >= 650
                ? `${import.meta.env.VITE_POKEMON_IMG}${id! - 1}.png`
                : `${import.meta.env.VITE_POKEMON_IMG_ANIMATE}${id! - 1}.gif`
            }
            alt=""
            className="pixel-rendering w-10 h-10"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="text-xs">#{id! - 1}</p>
        </span>
      )}
      <span
        className="flex items-center gap-x-3 cursor-pointer"
        onClick={() => {
          setData({
            id: id! + 1,
          });
        }}
      >
        <p className="text-xs">#{id! + 1}</p>
        <img
          src={
            id! >= 650
              ? `${import.meta.env.VITE_POKEMON_IMG}${id! + 1}.png`
              : `${import.meta.env.VITE_POKEMON_IMG_ANIMATE}${id! + 1}.gif`
          }
          alt=""
          className="pixel-rendering w-10 h-10"
          style={{ imageRendering: "pixelated" }}
        />
        <ChevronRight />
      </span>
    </div>
  );
};
