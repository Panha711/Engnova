import { Card, CardContent } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: object;
};

export default function ContentCard({ children, sx }: Props) {
  return (
    <Card
      sx={{
        overflow: "hidden",
        borderRadius: 2.5,
        ...sx,
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3.25 } }}>{children}</CardContent>
    </Card>
  );
}
