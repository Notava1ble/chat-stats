import parseStats from "@/lib/parseStats";
import { ReactNode } from "react";
import InfoCard from "./charts/InfoCard";
import ProfileIcon from "./common/ProfileIcon";

interface StatsRegistyType {
  id: string;
  render: (data: ReturnType<typeof parseStats>, key: string) => ReactNode;
}

export const STATS_REGISTRY: StatsRegistyType[] = [
  {
    id: "group-yapper",
    render: (data, key) => {
      const { topSenders, topSender } = data;
      return (
        <InfoCard
          key={key}
          topic="Group Yapper"
          icon={<ProfileIcon profileName={topSender} />}
          main={topSender}
          extra={topSenders[topSender] + " total messages"}
        />
      );
    },
  },
  {
    id: "the-quiet-one",
    render: (data, key) => {
      const { topSenders, bottomSender } = data;
      return (
        <InfoCard
          key={key}
          topic="The Quiet One"
          icon={<ProfileIcon profileName={bottomSender} />}
          main={bottomSender}
          extra={topSenders[bottomSender] + " total messages"}
        />
      );
    },
  },
];
