import { PokemonItem } from "./pokemon-item";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export const PokemonList = () => {

  const { items, isLoading, loadRef } = useInfiniteScroll();

  return (
    <section className="mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-5 gap-y-16">
        {items?.map((item: any, index: number) => (
          <PokemonItem key={index} id={index + 1} name={item.name} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-5 gap-y-16" ref={loadRef}>
        {isLoading &&
          Array(20)
            .fill("x")
            .map((_, index) => <PokemonItem.Skeleton key={index} />)}
      </div>
    </section>
  );
};
