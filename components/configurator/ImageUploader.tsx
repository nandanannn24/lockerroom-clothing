"use client";

import { useRef, useState, useCallback } from "react";
import { useConfigStore } from "@/lib/store";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const decalImage = useConfigStore((s) => s.decalImage);
  const setDecalImage = useConfigStore((s) => s.setDecalImage);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format file tidak didukung (Gunakan PNG/JPG).");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setDecalImage(result);
    };
    reader.onerror = () => {
      setError("Gagal membaca file.");
    };
    reader.readAsDataURL(file);
  }, [setDecalImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleRemove = useCallback(() => {
    setDecalImage(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [setDecalImage]);

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {!decalImage ? (
        <div
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            isDragging ? "border-[#f5c518] bg-[#f5c518]/10" : "border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mb-3">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17,8 12,3 7,8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm font-medium text-white mb-1">Upload desain base/logo</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">PNG, JPG • Maks 5MB</p>
        </div>
      ) : (
        <div className="relative aspect-video rounded-xl border border-white/20 bg-black/50 overflow-hidden group">
          <img
            src={decalImage}
            alt="Custom design preview"
            className="w-full h-full object-contain p-2"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Hapus
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1 bg-red-400/10 p-2 rounded border border-red-400/20">{error}</p>}
    </div>
  );
}
