import { parseChatFile } from "@/lib/utils";

export default function parseStats(fileContents: {
  content: string;
  filename: string;
}) {
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

  return {
    messages,
    realParticipants,
    topSenders,
    topSender,
    bottomSender,
  };
}
