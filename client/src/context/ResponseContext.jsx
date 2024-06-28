import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/base.url.js";

export const GeminiContext = createContext();

const GeminiContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsloaading] = useState(false);
  const [error, setError] = useState("");

  const handleQuery = (text) => {
    setQuery((prev) => text);
  };

  const handleOutput = async (prompt) => {
    try {
      setIsloaading(true);
      setOutput("");
      setError("");
      const res = await axios.post(`${BASE_URL}/prompt`, { prompt });
      if (res.statusText == "OK") {
        setIsloaading(false);
        setQuery("");
        setError("");
        setOutput((prev) => res.data);
      } else {
        setError("Something went wrong...");
      }
    } catch (error) {
      setIsloaading(false);
      setError(error.message);
    }
  };

  return (
    <GeminiContext.Provider
      value={{ handleOutput, handleQuery, isLoading, error, output, query }}
    >
      {children}
    </GeminiContext.Provider>
  );
};

export default GeminiContextProvider;
