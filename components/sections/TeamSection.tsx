"use client";

import { motion } from "framer-motion";

import { PlaceholderImage } from "@/components/common/placeholder-image";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamData } from "@/data/mock";

export function TeamSection() {
  return (
    <section id="zespol" className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={teamData.eyebrow}
            title={teamData.title}
            description={teamData.description}
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamData.members.map((member, index) => (
            <Reveal key={member.name + index} delay={index * 0.07}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                <Card className="group h-full overflow-hidden bg-card/95">
                  <CardHeader className="space-y-5">
                    <PlaceholderImage
                      src={member.image}
                      alt="Placeholder zespol"
                      className="aspect-[4/5] w-full rounded-2xl"
                    />
                    <div>
                      <CardTitle className="text-3xl">{member.name}</CardTitle>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">{member.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {member.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}