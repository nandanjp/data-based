"use client";

import { ListCard } from "@/components/blocks/ListCard";
import { useParams } from "next/navigation";
import { useGroupById, useGroupMemberLists} from "../../../../services/queries";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ChangeEvent, useState } from "react";

const GroupPage = () => {
  const { group_id } = useParams<{ group_id: string }>();
  const group_info = useGroupById({ group_id });
  const [orderByAuthor, setOrdering] = useState(true);
  const group_member_lists = useGroupMemberLists({ group_id, orderByAuthor });

  const handleChangeListOrdering = (value: string) => {
    setOrdering(value == "usernames")
  }

  if (group_info.isPending || group_member_lists.isPending) {
    return <span>Loading....</span>;
  }

  if (group_info.isError || group_member_lists.isError) {
    return <span>there was an error!</span>;
  }

  console.log(group_member_lists.data)

  return (
    <div className="w-full xl mx-auto">
      <div className="bg-primary p-6">
        <div className="flex items-center pt-12 pl-6 pb-6">
          <div className="grid gap-1">
            <div className="text-4xl font-bold text-primary-foreground">
              {group_info.data.groups?.group_name}
            </div>
            <div className="text-sm text-primary-foreground/80">
              Owner: {group_info.data.groups?.owned_by}
            </div>
          </div>
        </div>
      </div>
      <div className="p-12">
        <div className="flex justify-between py-6">
            <div className="text-3xl font-semibold pb-6">Member lists</div>
            <Select defaultValue="usernames" onValueChange={handleChangeListOrdering}>
                <SelectTrigger className="w-[300px]">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="usernames">Sort by author usernames</SelectItem>
                    <SelectItem value="types">Sort by list type</SelectItem>
                </SelectContent>
            </Select>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
            {group_member_lists.data.lists?.map((l) => (
              <ListCard
                key={l.user_name}
                list_author={l.user_name!}
                list_name={l.list_name!}
                list_type={l.list_type!}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default GroupPage;
