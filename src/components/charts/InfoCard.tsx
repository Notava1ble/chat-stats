import { ReactNode } from "react";

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
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase">{topic}</h3>
      <div className="flex items-center">
        {icon}
        <div>
          <div className="text-xl font-semibold">{main}</div>
          <div className="text-muted-foreground text-sm">{extra}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
