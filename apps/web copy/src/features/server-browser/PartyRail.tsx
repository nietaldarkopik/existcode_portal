import { Plus, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@existcode/ui";
import { RailIconButton } from "./RailIconButton";

interface PartyMember {
  label: string;
  ringClass: string;
  toneClass: string;
}

const partyMembers: PartyMember[] = [
  { label: "Online", ringClass: "border-success-400", toneClass: "bg-gradient-to-br from-emerald-700/60 to-neutral-900" },
  { label: "Away", ringClass: "border-neutral-300", toneClass: "bg-gradient-to-br from-neutral-500/60 to-neutral-900" }
];

export function PartyRail() {
  return (
    <aside className="fixed inset-y-0 right-0 z-20 flex w-[64px] flex-col items-center gap-6 py-10 text-neutral-300">
      <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.15 }}>
        <Users className="size-4" />
      </motion.span>

      <RailIconButton
        icon={<Plus className="size-4" />}
        label="Invite Friend"
        ariaLabel="Invite party member"
        side="left"
        size={44}
        className="rounded-[3px] bg-neutral-800/70 hover:bg-neutral-700"
      />

      {partyMembers.map((member) => (
        <div key={member.label} className="flex flex-col items-center gap-3">
          <span className="size-4 rounded-full border-2 border-neutral-500" />
          <RailIconButton
            icon={null}
            label={member.label}
            ariaLabel={member.label}
            side="left"
            size={52}
            className={cn("overflow-hidden rounded-[3px] border-2", member.ringClass, member.toneClass)}
          />
        </div>
      ))}
    </aside>
  );
}
