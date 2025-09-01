---
layout: page
title: Theoretical Foundation
nav_order: 2
---

# Theoretical Foundation

## Spencer Mortensen's Infinite Harmonic Sequence

Classical typographic scales have served designers for centuries, but they were developed for metal type and printing presses—not the infinite flexibility of digital design. Spencer Mortensen's revolutionary work takes the mathematical principles underlying these classical scales and extends them into infinite, precise sequences that maintain perfect harmonic relationships across any number of sizes.

### Mathematical Precision

Where traditional type scales relied on a limited set of predetermined sizes, Mortensen's approach uses the continuous mathematical formula:

```
f(i) = f(0) × pow(ratio, i/n)
```

This formula generates an infinite sequence where:
- `f(0)` is the base font size
- `ratio` defines the harmonic relationship (typically 2 for octave-based scales)
- `n` represents the number of steps per octave
- `i` is the position in the sequence

The result is a mathematically perfect progression that can generate any number of harmonically related sizes while maintaining the aesthetic principles that have guided typography for centuries.

*For deeper mathematical analysis and implementation details, see our [open-source repository](https://github.com/canonical/docs-typescale).*

## Design Philosophy Foundations

Our typographic approach is built on three foundational principles from masters of design theory:

### The Two Font Size Discipline

Inspired by **Massimo Vignelli's** rigorous economy of means, we maintain strict discipline in our font size usage. Vignelli, renowned for his work on the New York City subway system and numerous corporate identities, believed that restraint and clarity were paramount to effective design.

We aim to use only **two font sizes** in any given context, allowing a third only when absolutely necessary for hierarchy or clarity. This constraint forces intentional decision-making and prevents the typographic chaos that often emerges from unlimited choice.

### Hierarchy Navigation

Our approach to heading hierarchy follows **Robert Bringhurst's** principles from *The Elements of Typographic Style*. Bringhurst emphasizes that type scales should create clear, logical relationships between different levels of information, guiding readers naturally through content hierarchy.

Rather than arbitrary size jumps, our scales create meaningful distinctions that help users understand the relative importance and relationship of different content elements.

### Baseline Grid Accountability

The foundation of our entire system rests on a **baseline grid**—a level of accountability and rigor rarely seen in web design, especially at the enterprise level. Every typographic element, spacing decision, border, and UI component aligns to this grid.

This isn't merely aesthetic preference; it's a systematic approach that ensures:
- **Visual Consistency**: All elements relate to each other through consistent mathematical relationships
- **Scalable Precision**: New components automatically align when built on grid principles
- **Quality Assurance**: Visual inconsistencies become immediately apparent when the baseline grid is visible
- **Cross-Domain Harmony**: Different typographic domains maintain visual relationships despite their specialized optimizations

## Harmonic Relationships in Practice

The infinite sequence provides us with a palette of mathematically related sizes, but discipline comes in selection. Rather than using every available size, we choose specific points on the sequence that create optimal relationships for each domain's needs.

### Octave Structure

Like musical scales, our typographic scales are organized in octaves. Each octave doubles the size of the previous one, creating strong visual relationships. Within each octave, we have intermediate steps that provide subtle variations while maintaining harmonic integrity.

### Size Relationships

The mathematical relationships ensure that any two sizes in our scale will have a pleasing visual relationship. This is why a heading at 24px naturally harmonizes with body text at 16px—they exist at mathematically related points on the same harmonic sequence.

## Implementation Philosophy

Our theoretical foundation translates into practical implementation through several key principles:

### Precision Over Approximation

Where many design systems use rounded numbers or approximations for convenience, we maintain mathematical precision. Our font sizes, line heights, and spacing values are calculated exactly, then implemented with precision that respects the underlying mathematics.

### Systematic Decision Making

Every typographic decision—from font size selection to spacing calculations—follows from our mathematical foundation. This systematic approach reduces arbitrary choices and ensures that all decisions support the overall harmonic structure.

### Domain Optimization Within Universal Principles

While we maintain universal mathematical principles, we recognize that different contexts have different needs. Our system provides the flexibility to optimize for specific domains while ensuring all variations remain harmonically related.

---

*Next: [Domain-Specific Typography](03-domain-guidelines.md) - How we apply these principles across documentation, applications, and editorial contexts*
