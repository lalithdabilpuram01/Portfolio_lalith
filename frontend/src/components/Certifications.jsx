import { motion } from "framer-motion";
import { FiExternalLink, FiAward } from "react-icons/fi";
import SectionTitle from "./SectionTitle";

const COLOR_MAP = {
  orange: { border: "border-orange-500/20", bg: "bg-orange-500/5", icon: "text-orange-400", badge: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  blue: { border: "border-neon-cyan/20", bg: "bg-neon-cyan/5", icon: "text-neon-cyan", badge: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20" },
  green: { border: "border-neon-green/20", bg: "bg-neon-green/5", icon: "text-neon-green", badge: "text-neon-green bg-neon-green/10 border-neon-green/20" },
  purple: { border: "border-neon-purple/20", bg: "bg-neon-purple/5", icon: "text-neon-purple", badge: "text-neon-purple bg-neon-purple/10 border-neon-purple/20" },
};

export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-neon-purple/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="05. Credentials"
          title="Certifications"
          subtitle="Professional certifications validating my expertise"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => {
            const col = COLOR_MAP[cert.color] || COLOR_MAP.green;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`glass rounded-2xl p-6 border ${col.border} ${col.bg} neon-border flex flex-col gap-4`}
              >
                {/* Icon + issuer */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${col.border} ${col.bg}`}>
                    <FiAward className={`${col.icon} text-lg`} />
                  </div>
                  <span className="text-slate-400 font-mono text-xs">{cert.issuer_short}</span>
                </div>

                {/* Cert name */}
                <h3 className="font-orbitron font-bold text-white text-sm leading-snug">
                  {cert.name}
                </h3>

                {/* Issuer + date */}
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs">{cert.issuer}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono border ${col.badge}`}>
                      {cert.date}
                    </span>
                    {cert.expiry && (
                      <span className="text-slate-600 text-xs font-mono">
                        → {cert.expiry}
                      </span>
                    )}
                    {!cert.expiry && (
                      <span className="text-slate-600 text-xs font-mono italic">No expiry</span>
                    )}
                  </div>
                </div>

                {/* Credential ID */}
                {cert.credential_id && (
                  <p className="text-slate-600 font-mono text-xs truncate">
                    ID: {cert.credential_id}
                  </p>
                )}

                {/* Verify link */}
                {cert.verify_url && (
                  <a
                    href={cert.verify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto flex items-center gap-1.5 text-xs font-mono transition-colors ${col.icon} opacity-70 hover:opacity-100`}
                  >
                    <FiExternalLink size={12} />
                    Verify Credential
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
