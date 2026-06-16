import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { TbBrain } from "react-icons/tb";

export default function Footer({ personal }) {
  const { github, linkedin } = personal.social;
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="relative border-t border-white/5 py-14 px-6 bg-bg-secondary/40">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
              <TbBrain className="text-neon-green text-xl" />
            </div>
            <span className="font-orbitron font-bold gradient-text text-lg">
              {personal.name.split(" ")[0]}
            </span>
          </div>

          {/* CTA */}
          <h3 className="font-orbitron font-bold text-2xl text-white mb-3">
            Let&apos;s Build Something Intelligent
          </h3>
          <p className="text-slate-400 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
            Open to AI/ML engineering roles, data science collaborations, and interesting research opportunities.
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {github.visible && (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass border border-neon-green/15 flex items-center justify-center
                           text-slate-400 hover:text-neon-green hover:border-neon-green/40 hover:glow-green transition-all duration-200"
              >
                <FiGithub size={18} />
              </a>
            )}
            {linkedin.visible && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass border border-neon-cyan/15 flex items-center justify-center
                           text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200"
              >
                <FiLinkedin size={18} />
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="w-11 h-11 rounded-full glass border border-neon-purple/15 flex items-center justify-center
                         text-slate-400 hover:text-neon-purple hover:border-neon-purple/40 transition-all duration-200"
            >
              <FiMail size={18} />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Copyright */}
          <p className="text-slate-600 font-mono text-xs">
            © {year} {personal.name} · Built with{" "}
            <span className="text-neon-green">Python</span> &{" "}
            <span className="text-neon-cyan">React</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
