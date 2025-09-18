"use client";
import { NEXT_PUBLIC_API_URL } from "@/config";
import React, { useState, useEffect, useRef } from "react";

export interface Service {
  id: string;
  title: string;
}

interface FooterServicesSectionProps {
  footerServices: Service[];
  setFooterServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export default function FooterServicesSection({
  footerServices,
  setFooterServices,
}: FooterServicesSectionProps) {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitMessage, setLimitMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch matching services when query changes
  useEffect(() => {
    if (!query.trim()) {
      setServices([]);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(
      `${NEXT_PUBLIC_API_URL}/services?search=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data: { data: Service[]; total: number }) => {
        setServices(data.data);
        setIsOpen(true);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addService = (service: Service) => {
    if (footerServices.length >= 7) {
      setLimitMessage("Maximum 7 services allowed");
      setTimeout(() => setLimitMessage(""), 3000); // clear after 3s
      return;
    }

    if (!footerServices.find((s) => s.id === service.id)) {
      setFooterServices((prev) => [...prev, service]);
    }
    setQuery("");
    setServices([]);
    setIsOpen(false);
  };

  const removeService = (id: string) => {
    setFooterServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-gray-100 flex items-center w-full justify-center">
      <div className="w-full bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Footer Services
        </h1>
        <p className="text-sm text-gray-500 mb-2">
          Start typing to search and add services. Click outside to close the
          dropdown.
        </p>
        {limitMessage && (
          <p className="text-sm text-red-500 mb-2">{limitMessage}</p>
        )}

        {/* Search + Dropdown */}
        <div className="relative" ref={containerRef}>
          <label className="block mb-1 text-sm font-medium">
            Select Services
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (services.length || loading) setIsOpen(true);
            }}
            disabled={footerServices.length >= 7}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search services…"
          />

          {isOpen && (
            <ul className="absolute left-0 right-0 z-50 mt-1 bg-white border rounded shadow max-h-60 overflow-auto">
              {loading && <li className="px-3 py-2 text-gray-500">Loading…</li>}
              {!loading && error && (
                <li className="px-3 py-2 text-red-500">Error: {error}</li>
              )}
              {!loading && !error && services.length === 0 && query.trim() && (
                <li className="px-3 py-2 text-gray-500">No results</li>
              )}
              {!loading &&
                services.map((service) => (
                  <li
                    key={service.id}
                    onClick={() => addService(service)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {service.title}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Selected Chips */}
        {footerServices.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {footerServices.map((s) => (
              <span
                key={s.id}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded flex items-center gap-1"
              >
                {s.title}
                <button
                  onClick={() => removeService(s.id)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  title="Remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
