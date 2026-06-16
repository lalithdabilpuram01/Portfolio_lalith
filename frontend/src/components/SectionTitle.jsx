import { motion } from "framer-motion";

export default function SectionTitle({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <p className="text-neon-green font-mono text-sm tracking-[0.3em] uppercase mb-3">
        {label}
      </p>
      <h2 className="font-orbitron text-4xl md:text-5xl font-bold gradient-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-neon-green" />
        <div className="w-2 h-2 rounded-full bg-neon-green glow-green" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-neon-green" />
      </div>
    </motion.div>
  );
}
