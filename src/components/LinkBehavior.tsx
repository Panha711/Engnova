"use client";

import NextLink from "next/link";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

// Forwarded-ref wrapper around next/link so it can be the default LinkComponent
// in the MUI theme. This avoids passing a function across the RSC boundary on
// every `<Button href="...">` / `<CardActionArea href="...">` etc.
const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof NextLink>
>(function LinkBehavior(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

export default LinkBehavior;
