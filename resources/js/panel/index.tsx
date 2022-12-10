import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// window.addEventListener("DOMContentLoaded", () => {
//   alert("Receiving content...");
  //     console url = new URL(window.location);
  //
  //     const sharedTitle = url.searchParams.get('title');
  //     const sharedText = url.searchParams.get('text');
  //     const sharedUrl = url.searchParams.get('url');
  //
  //     alert(sharedTitle)
// });
