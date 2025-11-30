"use client";

import { useState } from "react";
import FileUploader from "./Dropzone";

const ClientApp = () => {
  const [fileContents, setFileContents] = useState<{
    content: string;
    filename: string;
  } | null>(null);

  if (!fileContents) {
    return <FileUploader setFileContents={setFileContents} />;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        File Loaded: {fileContents.filename}
      </h1>
      <pre className="rounded bg-gray-100 p-4 whitespace-pre-wrap">
        {fileContents.content}
      </pre>
    </div>
  );
};

export default ClientApp;
