import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export default function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        spacing={2}
      >
        <Box>
          <Typography
            variant="overline"
            className="engnova-gradient-text"
            sx={{ display: "block", mb: 0.75 }}
          >
            Engnova
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1.25, maxWidth: 520, lineHeight: 1.65 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
      </Stack>
    </Box>
  );
}
