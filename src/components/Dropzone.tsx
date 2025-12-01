"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import JSZip from "jszip";
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  Loader2,
  FileArchive,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Shadcn-like class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileUploaderProps {
  setFileContents?: ({
    content,
    filename,
  }: {
    content: string;
    filename: string;
  }) => void;
}

export default function FileUploader({ setFileContents }: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<{
    name: string;
    type: "txt" | "zip";
  } | null>(null);

  // --- Core Logic: Handle File Content ---
  const processFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setFileSuccess(null);

    try {
      let textContent = "";
      let originFilename = file.name;

      // Case 1: Simple Text File
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        textContent = await file.text();
        setFileSuccess({ name: file.name, type: "txt" });
      }

      // Case 2: Zip File
      else if (
        file.type === "application/zip" ||
        file.type === "application/x-zip-compressed" ||
        file.name.endsWith(".zip")
      ) {
        const zip = new JSZip();
        const loadedZip = await zip.loadAsync(file);

        // Filter: Find .txt files, ignore directories and hidden files (like __MACOSX)
        const txtFiles = Object.keys(loadedZip.files).filter(
          (filename) =>
            filename.endsWith(".txt") &&
            !filename.startsWith("__MACOSX") &&
            !loadedZip.files[filename].dir,
        );

        // Validation: Exactly one .txt file allowed
        if (txtFiles.length === 0) {
          throw new Error("The zip file does not contain any .txt files.");
        }
        if (txtFiles.length > 1) {
          throw new Error(
            "The zip file contains multiple .txt files. Please upload a zip with exactly one text file.",
          );
        }

        // Extract the content
        const targetFilename = txtFiles[0];
        textContent = await loadedZip.file(targetFilename)!.async("string");
        originFilename = targetFilename; // Update name to the inner file
        setFileSuccess({ name: file.name, type: "zip" });
      }

      // --- PLACEHOLDER FOR FUTURE LOGIC ---
      console.log(
        "File processing complete. Content length:",
        textContent.length,
      );

      if (setFileContents) {
        setFileContents({ content: textContent, filename: originFilename });
      } else {
        console.log(`Processing ${originFilename}:`, textContent);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to process file");
      setFileSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Dropzone Callbacks ---
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];
    if (rejection.errors[0].code === "file-invalid-type") {
      setError("Invalid file type. Only .txt or .zip files are allowed.");
    } else {
      setError(rejection.errors[0].message);
    }
    setFileSuccess(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    accept: {
      "text/plain": [".txt"],
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
    },
    disabled: isLoading,
  });

  const resetUploader = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileSuccess(null);
    setError(null);
  };

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-all duration-200 ease-in-out",
          // Normal State
          "border-ring bg-muted/40 hover:bg-muted",
          // active drag state
          isDragActive && "border-primary bg-primary/5",
          // Error state
          error && "border-destructive bg-destructive/5",
          // Success state
          fileSuccess && "border-success bg-success/5",
          // Disabled/Loading
          isLoading && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />

        {/* --- Loading State --- */}
        {isLoading ? (
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 animate-spin" />
            <p className="text-sm font-medium">Processing file...</p>
          </div>
        ) : fileSuccess ? (
          // --- Success State ---
          <div className="flex w-full items-center gap-4">
            <div className="bg-success/10 rounded-full p-2">
              {fileSuccess.type === "zip" ? (
                <FileArchive className="text-success h-6 w-6" />
              ) : (
                <FileText className="text-success h-6 w-6" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">
                {fileSuccess.name}
              </p>
              <p className="text-muted-foreground text-xs">
                Ready for processing
              </p>
            </div>
            <button
              onClick={resetUploader}
              className="rounded-full p-1 transition-colors hover:bg-slate-200"
            >
              <X className="h-4 w-4 text-slate-500" />
            </button>
          </div>
        ) : (
          // --- Default Idle State ---
          <>
            <div
              className={cn(
                "bg-muted/10 mb-4 rounded-full p-4 transition-colors",
                isDragActive && "bg-primary/10",
                error && "bg-destructive/10",
              )}
            >
              {error ? (
                <AlertCircle className="text-destructive h-8 w-8" />
              ) : (
                <UploadCloud
                  className={cn(
                    "text-muted-foreground h-8 w-8",
                    isDragActive && "text-primary",
                  )}
                />
              )}
            </div>

            <div className="space-y-1 text-center">
              {error ? (
                <p className="text-destructive text-sm font-medium">{error}</p>
              ) : (
                <>
                  <p className="text-foreground text-sm font-medium">
                    <span className="text-primary hover:underline">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-muted-foreground text-xs">
                    TXT or ZIP (containing single .txt)
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
