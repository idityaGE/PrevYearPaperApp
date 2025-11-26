import { Link } from "react-router-dom";
import { teamMembers } from "../config/team";
import { Github, Linkedin, Twitter, Globe, ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full mt-4 max-w-4xl mx-auto space-y-12">
      {/* Diagonal line pattern background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`,
        }}
      />

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Building a platform that gives students instant access to previous
          year exam papers — no distractions, no noise, only real exam practice.
        </p>
      </div>

      {/* Mission */}
      <div className="space-y-3 border-l-2 border-border py-2 px-6">
        <h2 className="text-xl font-semibold">Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          Empower students with fast, organized, and verified exam resources to
          make preparation smarter.
        </p>
      </div>

      {/* Philosophy */}
      <div className="space-y-3 border-l-2 border-border py-2 px-6">
        <h2 className="text-xl font-semibold">Philosophy</h2>
        <p className="text-muted-foreground leading-relaxed">
          Simplicity • Speed • Organized content
          <br />
          <span className="text-sm">
            The right past papers at the right time change outcomes.
          </span>
        </p>
      </div>

      {/* Team */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative border border-border rounded-lg p-4 hover:border-primary/50 transition-all bg-card"
            >
              {/* Subtle diagonal pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-lg"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    currentColor 10px,
                    currentColor 11px
                  )`,
                }}
              />

              <div className="relative space-y-3">
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>

                {member.links && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-muted transition-colors"
                        title="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-muted transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-muted transition-colors"
                        title="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {member.links.portfolio && (
                      <a
                        href={member.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-muted transition-colors"
                        title="Portfolio"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-8 border-t border-border">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors group"
        >
          Get in touch
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
