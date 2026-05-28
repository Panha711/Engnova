import { Container } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  /** Fill viewport height so children can use their own scroll areas. */
  fillHeight?: boolean;
};

export default function PageLayout({
  children,
  maxWidth = "lg",
  fillHeight = false,
}: Props) {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: { xs: 2, sm: 3 },
        ...(fillHeight
          ? {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              maxHeight: "100%",
              boxSizing: "border-box",
              py: { xs: 2, md: 2 },
              overflow: "hidden",
            }
          : {
              py: { xs: 3, md: 4 },
            }),
      }}
    >
      {children}
    </Container>
  );
}
