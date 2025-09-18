"use client";

import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ||
      "https://api.fastservices4u.com/test/api";
    //   "http://localhost:3001/test/api";

interface AboutUsData {
  paragraphs: string[];
}

interface AboutUsSectionProps {
  initialData?: AboutUsData;
  onChange?: (data: AboutUsData) => void;
}


export default function AboutUsSection({ initialData, onChange }: AboutUsSectionProps) {
  const [paragraphs, setParagraphs] = useState<string[]>(initialData?.paragraphs || [""]);
  const [saving, setSaving] = useState(false);

  // Add a new paragraph
  const addParagraph = () => setParagraphs([...paragraphs, ""]);

  // Update paragraph text
  const updateParagraph = (index: number, value: string) => {
    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
  };

  // Remove a paragraph
  const removeParagraph = (index: number) => {
    const updated = paragraphs.filter((_, i) => i !== index);
    setParagraphs(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/settings/about-us`, {
        method: "POST", // or PUT if updating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraphs }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save About Us");
      }
      alert("About Us content saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving About Us content");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    onChange?.({ paragraphs });
  }, [paragraphs]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">About Us Content</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save About Us"}
        </button>
      </div>

      {paragraphs.map((para, index) => (
        <div key={index} className="flex items-start gap-2">
          <textarea
            value={para}
            onChange={(e) => updateParagraph(index, e.target.value)}
            rows={3}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          <button
            onClick={() => removeParagraph(index)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            &times;
          </button>
        </div>
      ))}

      <button
        onClick={addParagraph}
        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
      >
        + Add Paragraph
      </button>
    </div>
  );
}
