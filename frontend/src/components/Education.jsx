import { motion } from "framer-motion";
import { HiLocationMarker, HiAcademicCap } from "react-icons/hi";
import { TbStar } from "react-icons/tb";
import SectionTitle from "./SectionTitle";

export default function Education({ education }) {
  return (
    <section id="education" className="py-24 px-6 relative bg-bg-secondary/20">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-neon-cyan/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-neon-green/3 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <SectionTitle label="03. Academic Background" title="Education" />

        <div className="space-y-8">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-2xl overflow-hidden neon-border"
            >
              {/* Gradient top bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: i === 0
                    ? "linear-gradient(90deg, #00ff88, #22d3ee, #a855f7)"
                    : "linear-gradient(90deg, #22d3ee, #a855f7, #00ff88)",
                }}
              />

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  {/* Left — main info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HiAcademicCap className="text-neon-green text-lg" />
                      </div>
                      <div>
                        <h3 className="font-orbitron font-bold text-white text-base leading-snug">
                          {edu.degree}
                          <span className="text-neon-cyan"> — {edu.field}</span>
                        </h3>
                        <p className="text-neon-green font-medium text-sm mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-mono mb-4 ml-13 pl-[52px]">
                      <HiLocationMarker className="text-neon-cyan flex-shrink-0" />
                      {edu.location}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-5">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                          <span className="text-neon-green mt-1.5 flex-shrink-0">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Relevant courses */}
                    {edu.courses?.length > 0 && (
                      <div>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">
                          Relevant Courses
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((c) => (
                            <span
                              key={c}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg-secondary border border-neon-cyan/20 text-neon-cyan/80
                                         hover:border-neon-cyan/50 hover:text-neon-cyan transition-all cursor-default"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right — date + GPA */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-3 flex-shrink-0">
                    {/* Date range */}
                    <div className="glass rounded-lg px-4 py-2 border border-neon-green/15 text-right">
                      <p className="font-mono text-neon-green text-xs tracking-widest whitespace-nowrap">
                        {edu.start} — {edu.current ? "Present" : edu.end}
                      </p>
                      {edu.current && (
                        <span className="text-xs font-mono text-neon-green/60">ongoing</span>
                      )}
                    </div>

                    {/* GPA badge */}
                    {edu.gpa && (
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neon-green/8 border border-neon-green/20">
                        <TbStar className="text-neon-green text-sm" />
                        <span className="font-mono text-neon-green text-xs font-bold whitespace-nowrap">
                          GPA {edu.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
