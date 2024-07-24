"use client";
import Navbar from "@/components/blocks/Navbar/Navbar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronsUpDown, Heart } from "lucide-react";
import { useAllLists, useRecommendedLists } from "../../../services/queries";
import { createLike } from "../../../services/api";
import { listTypes } from "../../../services/api.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GradientHeader from "@/components/ui/gradient-header";
import { UserContext } from "../context";
import { useContext } from "react";
import Link from "next/link";

const ExplorePage = () => {
  const lists = useAllLists();
  const { user } = useContext(UserContext);
  //const recommendedLists = useRecommendedLists();
  //console.log("recs")
  //console.log(recommendedLists)
  const onLikeClick = async (list_name: string, user_name: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.currentTarget.setAttribute(
      "fill",
      event.currentTarget.getAttribute("fill") === "pink"
        ? "none"
        : "pink"
    );
    if (user) {
      const response = await createLike(list_name, user?.username, user_name);
      if (response.error) {
        const message = `An error has occurred: ${response.error}`;
        throw new Error(message);
      }
    } else {
    }
  };
  console.log()
  return (
    <div className="w-screen h-screen text-gray-600">
      <Navbar className="bg-transparent" />
      <GradientHeader title="Explore" />
      <div className="flex flex-col p-4 gap-8">
        <div className="flex flex-col w-full items-center gap-4">
          <h2 className="text-lg font-semibold">Recommended Lists for You</h2>
          <Carousel className="w-1/2">
            <CarouselContent className="-ml-1">
              {/*recommendedLists.data?.map((list, index) => (
                <CarouselItem
                  key={index}
                  className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2"
                >
                  <Card>
                    <CardContent className="flex flex-col gap-2 justify-between aspect-square p-6">
                      <div className="flex flex-col">
                        <span>{list.list_name}</span>
                        <span className="italic text-xs">{list.user_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <Badge className="w-fit">
                          {list.list_type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))*/}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {listTypes.map((listType, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="flex gap-2">
              <ChevronsUpDown />
              <h2 className="text-2xl">{listType.toUpperCase()}</h2>
            </CollapsibleTrigger>
            <CollapsibleContent className="m-4">
              {lists.data
                ?.filter((list) => list.list_type === listType)
                .map((list, index) => (
                  <div
                    className="flex justify-between border-b-2 p-2 items-center"
                    key={index}
                  >
                    <Link href={`/view-list/${list.username}/${list.listname}`}>
                      <span>
                        {list.listname} by {list.username}
                      </span>
                    </Link>
                    <div className="flex flex-col items-center">
                      <Heart
                        className="cursor-pointer"
                        onClick={async (event) =>
                          onLikeClick(list.listname, list.username, event)
                        }
                      />
                      {list.likes}
                    </div>
                  </div>
                ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
