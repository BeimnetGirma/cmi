"use client";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const Stats = () => {
  const [stats, setStats] = useState({
    traineeCount: 0,
    bimCount: 0,
    pmpCount: 0,
    researchCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current stats from API
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats({
          traineeCount: data.traineeCount ?? 0,
          bimCount: data.bimCount ?? 0,
          pmpCount: data.pmpCount ?? 0,
          researchCount: data.researchCount ?? 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStats({ ...stats, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });
      if (res.ok) {
        toast.success("Stats updated successfully!");
      } else {
        toast.error("Failed to update stats.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //   if (loading) return <p className="p-4">Loading...</p>;

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex flex-col justify-center ">
        <div className="text-center">
          <h1 className="text-3xl text-blue-400  my-12">Update Site Stats</h1>
        </div>

        {/* <Toaster position="top-right" richColors /> */}

        <div className="justify-end w-2/3 mx-auto px-52">
          <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl mx-auto bg-white rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800">Update Stats</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Trainee Count</label>
                <input
                  type="number"
                  name="traineeCount"
                  value={stats.traineeCount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">BIM Count</label>
                <input
                  type="number"
                  name="bimCount"
                  value={stats.bimCount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">PMP Count</label>
                <input
                  type="number"
                  name="pmpCount"
                  value={stats.pmpCount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Research Count</label>
                <input
                  type="number"
                  name="researchCount"
                  value={stats.researchCount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                />
              </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Stats;
