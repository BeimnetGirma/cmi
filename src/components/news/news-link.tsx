"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const NewsLink = () => {
  useEffect(() => {
    // Redirect to the Ghost Admin page
    window.location.assign(`${process.env.NEXT_PUBLIC_GHOST_ADMIN_URL}`);
  }, []);
  return null;
};

export default NewsLink;
