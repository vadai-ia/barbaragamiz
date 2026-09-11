import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Falls back to a syntactically-valid placeholder so importing this module
// never throws before Sanity is configured. It is only queried when a real
// projectId is present (see isSanityConfigured in ./artworks).
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
