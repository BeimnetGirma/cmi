"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const NewsLink = () => {
  useEffect(() => {
    // Redirect to the Ghost Admin page with a new tab
    window.open(`${process.env.NEXT_PUBLIC_GHOST_ADMIN_URL}`, "_blank");
  }, []);
  return null;
};

export default NewsLink;
