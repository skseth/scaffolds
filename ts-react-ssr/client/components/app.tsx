// client/components/app.tsx
import React from "react";
import { NodeFetch } from "./node-fetch";
import { NodeFetchAsyncAwait } from "./node-fetch-async-await";

export const App: React.FC = () => (
  <p>
    Hello from Client
    <NodeFetchAsyncAwait />
  </p>
);
