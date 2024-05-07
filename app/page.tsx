"use client";

import { DonationForm } from "../components/donation-form";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicModal = dynamic(
  () => import("../components/donation-modal").then((mod) => mod.DonationModal),
  {
    ssr: false,
  }
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <main className="bg-slate-100 flex h-full items-stretch flex-col items-center justify-between sm:p-24">
      <DynamicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DonationForm />
      </DynamicModal>
    </main>
  );
}
