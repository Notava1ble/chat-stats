"use client";

import { ReactNode, useState } from "react";
import FileUploader from "./Dropzone";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { parseChatFile } from "@/lib/utils";
import InfoCard from "./charts/InfoCard";

const ClientApp = ({ header }: { header: ReactNode }) => {
  const [fileContents, setFileContents] = useState<{
    content: string;
    filename: string;
  } | null>(null);

  if (!fileContents) {
    return (
      <>
        {header}
        <FileUploader setFileContents={setFileContents} />
      </>
    );
  }

  const messages = parseChatFile(fileContents.content);
  const realParticipants: Set<string> = new Set(
    messages
      .map((msg) => msg.author)
      .filter(
        (msg): msg is string =>
          msg != null && msg !== "ERROR" && msg !== "Meta AI",
      ),
  );
  const topSenders = messages.reduce(
    (acc, msg) => {
      if (msg.author && realParticipants.has(msg.author)) {
        acc[msg.author] = (acc[msg.author] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const topSender = topSenders
    ? Object.entries(topSenders).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    : "N/A";

  const bottomSender = topSenders
    ? Object.entries(topSenders).reduce((a, b) => (a[1] < b[1] ? a : b))[0]
    : "N/A";

  console.log(realParticipants, topSenders);

  return (
    <div className="mx-auto w-2/3 space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="text-primary" />
            {fileContents.filename}
          </CardTitle>
          <CardDescription>
            {messages.length} messages • {realParticipants.size} historical
            participants
          </CardDescription>
          <CardAction onClick={() => setFileContents(null)}>
            <Button variant="destructive">
              <X />
              Close
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <InfoCard
          topic="Group Yapper"
          icon={
            <div className="bg-accent text-accent-foreground mr-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
              {topSender.charAt(0).toUpperCase()}
            </div>
          }
          main={topSender}
          extra={topSenders[topSender] + " total messages"}
        />
        <InfoCard
          topic="Quiet One"
          icon={
            <div className="bg-accent text-accent-foreground mr-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
              {bottomSender.charAt(0).toUpperCase()}
            </div>
          }
          main={bottomSender}
          extra={topSenders[bottomSender] + " total messages"}
        />
      </div>
    </div>
  );
};

export default ClientApp;
