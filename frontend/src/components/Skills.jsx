import { motion } from "framer-motion";
import {
  TbBrain, TbCode, TbCloud, TbDatabase, TbChartBar,
} from "react-icons/tb";
import SectionTitle from "./SectionTitle";

const ICON_MAP = {
  brain: TbBrain,
  code: TbCode,
  cloud: TbCloud,
  database: TbDatabase,
  chart: TbChartBar,
};

const COLOR_MAP = {
  green: {
    icon: "text-neon-green",
    border: "border-neon-green/20",
    bg: "bg-neon-green/5",
    badge: "border-neon-green/20 text-neon-green/80",
    hoverBadge: "hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/10",
  },
  cyan: {
    icon: "text-neon-cyan",
    border: "border-neon-cyan/20",
    bg: "bg-neon-cyan/5",
    badge: "border-neon-cyan/20 text-neon-cyan/80",
    hoverBadge: "hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan/10",
  },
  purple: {
    icon: "text-neon-purple",
    border: "border-neon-purple/20",
    bg: "bg-neon-purple/5",
    badge: "border-neon-purple/20 text-neon-purple/80",
    hoverBadge: "hover:border-neon-purple/50 hover:text-neon-purple hover:bg-neon-purple/10",
  },
};

export default function Skills({ skills }) {
  const { categories } = skills;

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-neon-cyan/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="05. Technical Stack"
          title="Skills"
          subtitle="Technologies and tools I use to build intelligent systems"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || TbBrain;
            const col = COLOR_MAP[cat.color] || COLOR_MAP.green;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass rounded-2xl p-6 border ${col.border} ${col.bg} neon-border`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${col.bg} border ${col.border}`}>
                    <Icon className={`${col.icon} text-xl`} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-sm">
                    {cat.name}
                  </h3>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-badge px-3 py-1.5 rounded-lg text-xs font-mono border bg-bg-secondary ${col.badge} ${col.hoverBadge} cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
