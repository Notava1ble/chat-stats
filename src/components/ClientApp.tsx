"use client";

import { ReactNode, useState } from "react";
import FileUploader from "./Dropzone";
import InfoCard from "./charts/InfoCard";
import HeaderCard from "./charts/HeaderCard";
import parseStats from "@/lib/parseStats";
import { STATS_REGISTRY } from "./StatsRegisty";

export interface FileContentsType {
  content: string;
  filename: string;
}

const ClientApp = ({ header }: { header: ReactNode }) => {
  const [fileContents, setFileContents] = useState<FileContentsType | null>(
    null,
  );

  if (!fileContents) {
    return (
      <>
        {header}
        <FileUploader setFileContents={setFileContents} />
      </>
    );
  }

  const data = parseStats(fileContents);

  const { messages, realParticipants } = data;

  return (
    <div className="mx-auto grid w-2/3 grid-cols-3 gap-4 p-6">
      <HeaderCard
        filename={fileContents.filename}
        messagesLength={messages.length}
        realParticipantsSize={realParticipants.size}
        setFileContents={setFileContents}
      />
      {STATS_REGISTRY.map((stat) => stat.render(data, stat.id))}
    </div>
  );
};

export default ClientApp;
