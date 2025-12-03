import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FileText, X } from "lucide-react";
import { Button } from "../ui/button";
import { FileContentsType } from "../ClientApp";

const HeaderCard = ({
  filename,
  messagesLength,
  realParticipantsSize,
  setFileContents,
}: {
  filename: string;
  messagesLength: number;
  realParticipantsSize: number;
  setFileContents: (contents: FileContentsType | null) => void;
}) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <FileText className="text-primary" />
          {filename}
        </CardTitle>
        <CardDescription>
          {messagesLength} messages • {realParticipantsSize} historical
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
  );
};

export default HeaderCard;
