import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

const InfoCard = ({
  topic,
  icon,
  main,
  extra,
}: {
  topic: string;
  icon: ReactNode;
  main: string;
  extra: string;
}) => {
  return (
    <Card className="gap-2">
      <CardHeader className="text-sm font-medium uppercase">{topic}</CardHeader>
      <CardContent className="flex items-center">
        {icon}
        <div>
          <div className="text-xl font-semibold">{main}</div>
          <div className="text-muted-foreground text-sm">{extra}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
