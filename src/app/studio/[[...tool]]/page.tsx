import { projectId } from "../../../sanity/env";
import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!projectId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          color: "#3e3e38",
          background: "#f3f0e9",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>
            Panel aún no configurado
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.8 }}>
            Agrega tu <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> en el archivo{" "}
            <code>.env.local</code> y reinicia el servidor para activar el
            editor de contenido.
          </p>
        </div>
      </div>
    );
  }

  return <Studio />;
}
