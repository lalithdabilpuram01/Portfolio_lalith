import { motion } from "framer-motion";
import { TbBrain, TbCode, TbDatabase, TbRocket } from "react-icons/tb";
import SectionTitle from "./SectionTitle";

const HIGHLIGHTS = [
  { icon: TbBrain, label: "ML & Deep Learning", color: "text-neon-green", border: "border-neon-green/20", bg: "bg-neon-green/5" },
  { icon: TbCode, label: "LLM Engineering", color: "text-neon-cyan", border: "border-neon-cyan/20", bg: "bg-neon-cyan/5" },
  { icon: TbDatabase, label: "Data Engineering", color: "text-neon-purple", border: "border-neon-purple/20", bg: "bg-neon-purple/5" },
  { icon: TbRocket, label: "MLOps & Deployment", color: "text-neon-green", border: "border-neon-green/20", bg: "bg-neon-green/5" },
];

export default function Summary({ summary, personal }) {
  return (
    <section id="about" className="py-24 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-neon-green/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-neon-purple/3 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle label="01. Introduction" title="About Me" />

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3 glass rounded-2xl overflow-hidden neon-border"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-neon-green/60" />
              <span className="ml-3 font-mono text-xs text-slate-500">about.py</span>
            </div>

            {/* Terminal body */}
            <div className="p-6 font-mono text-sm leading-7">
              <div className="text-slate-500">
                <span className="text-neon-purple">class</span>{" "}
                <span className="text-neon-cyan">Portfolio</span>:
              </div>
              <div className="ml-4 text-slate-500">
                <span className="text-neon-purple">def</span>{" "}
                <span className="text-neon-green">about</span>
                <span className="text-slate-300">(self):</span>
              </div>
              <div className="ml-8 mt-2">
                <span className="text-slate-500">"""</span>
              </div>
              <div className="ml-8 text-slate-300 leading-8 not-italic">
                {summary}
              </div>
              <div className="ml-8 mt-1">
                <span className="text-slate-500">"""</span>
              </div>
              <div className="ml-8 mt-3">
                <span className="text-neon-purple">return</span>{" "}
                <span className="text-neon-green">True</span>{" "}
                <span className="text-slate-600 text-xs"># always learning</span>
              </div>
            </div>
          </motion.div>

          {/* Highlights & stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className={`glass rounded-xl px-5 py-4 flex items-center gap-4 border ${h.border} ${h.bg} neon-border`}
              >
                <h.icon className={`${h.color} text-2xl flex-shrink-0`} />
                <span className="text-slate-200 font-space text-sm font-medium">
                  {h.label}
                </span>
              </motion.div>
            ))}

            {/* Location & email */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="glass rounded-xl px-5 py-4 border border-white/5 space-y-2"
            >
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Contact</p>
              <p className="text-slate-300 text-sm">{personal.email}</p>
              {personal.location && (
                <p className="text-slate-400 text-sm">{personal.location}</p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
