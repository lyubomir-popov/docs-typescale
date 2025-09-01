---
layout: page
title: Domain Guidelines
nav_order: 3
---

# Domain-Specific Typography

## Understanding Context-Driven Design

While our mathematical foundation remains constant, the application of our type scale varies significantly across different contexts. Each domain—documentation, applications, and editorial—serves different user needs and requires tailored typographic strategies.

This specialization doesn't compromise our systematic approach; rather, it demonstrates how rigorous principles can be flexibly applied to optimize for specific use cases while maintaining overall harmony.

## Documentation Typography

### Context and Requirements

Technical documentation serves users who need to quickly locate specific information, understand complex procedures, and reference detailed specifications. These users often work in focused sessions, moving between different types of content—code examples, explanations, warnings, and step-by-step instructions.

### Typographic Strategy

**Information Density with Semantic Clarity**

Documentation typography prioritizes information density while maintaining the ability to create semantic emphasis. Users must be able to distinguish between different types of information quickly, making emphasis through italics and bold essential for effective communication.

**Size Implementation**
- **Body Text**: 14px (0.875rem) for optimal information density
- **Headings**: Strategic use of 18px and 24px to create clear hierarchy
- **Large Headings**: 32px for major section breaks

**Emphasis Support**
- **Italic**: For emphasis, code variables, and UI element names
- **Bold**: For strong emphasis, warnings, and key concepts
- **Combined**: When both semantic meanings apply

**Spacing Strategy**

Documentation uses **shallow spacing** (1.5rem) consistently to maximize information density. This tight spacing allows users to see more content in a single view, reducing scrolling and improving task completion efficiency.

## Application Typography

### Context and Requirements

Applications serve users who spend extended periods—often hours—interacting with the interface. Unlike fleeting website visits, application users develop familiarity with the interface and benefit from optimizations that reduce eye strain and cognitive load during sustained use.

### Typographic Strategy

**Sustained Focus Optimization**

Applications prioritize lower contrast and higher density to accommodate extended use sessions. The reduced visual hierarchy allows users to focus on content and functionality rather than being distracted by dramatic typographic variations.

**Alignment with User Environment**

Our 14px base size aligns closely with operating system defaults and terminal font sizes—environments where our application users spend most of their time. This consistency reduces the cognitive adjustment required when switching between tools.

**Size Implementation**
- **Body Text**: 14px (0.875rem) matching system conventions
- **Headings**: Minimal contrast with 18px and 24px options
- **Rhythm**: Regular and bold weights only (no italic emphasis)

**Responsive Strategy**

Applications include an **optional root em scaling feature** that effectively "zooms in" the entire UI by a factor of 16/14 for larger screens. This scaling is available at designer discretion, allowing teams to optimize for their specific user base and screen size distributions.

*Implementation details: The scaling adjusts the root font size from 14px to 16px equivalent, proportionally scaling all em-based measurements throughout the interface.*

**Spacing Strategy**

Like documentation, applications use **shallow spacing** (1.5rem) to maximize interface density and reduce unnecessary scrolling during extended work sessions.

## Editorial Typography

### Context and Requirements

Editorial content—including marketing sites, blog posts, and promotional materials—serves users who are scanning, evaluating, and consuming content in shorter, more focused sessions. These users benefit from higher contrast and more generous spacing that facilitates quick comprehension and decision-making.

### Typographic Strategy

**Maximum Scanability**

Editorial typography employs the **highest contrast** in font sizes to create clear visual hierarchy that supports rapid content scanning. Users should be able to understand the content structure and locate relevant information quickly.

**Accessibility Foundation**

Editorial content strictly adheres to **16px (1rem) base size**, respecting web accessibility standards and browser defaults. This ensures optimal readability across diverse user needs and assistive technologies.

**Disciplined Size Selection**

Editorial contexts follow the **two font size rule most rigorously**, though exceptions are allowed when necessary for specific content requirements. This constraint forces careful consideration of information hierarchy and prevents typographic chaos.

**Size Implementation**
- **Body Text**: 16px (1rem) for accessibility compliance
- **Small Headings (H5, H6)**: 16px (1rem) with weight differentiation
- **Medium Headings (H3, H4)**: 24px (1.5rem) for clear hierarchy
- **Large Headings (H1, H2)**: 42px (2.625rem) for maximum impact

**Spacing Strategy**

Editorial content uses a **varied spacing system** that adapts to content needs:
- **Shallow (1.5rem)**: Between closely related elements
- **Regular (4rem)**: Between distinct content sections
- **Deep (8rem)**: Between major content blocks

On smaller breakpoints, regular and deep spacing values are halved to maintain appropriate proportions while preserving hierarchy.

## Comparative Analysis

| Aspect | Documentation | Applications | Editorial |
|--------|---------------|--------------|-----------|
| **Base Size** | 14px (0.875rem) | 14px (0.875rem) | 16px (1rem) |
| **Primary Goal** | Information density | Sustained use comfort | Scanability & accessibility |
| **Contrast Level** | Moderate | Minimal | Maximum |
| **Emphasis Support** | Full (italic, bold) | Limited (bold only) | Full (italic, bold) |
| **Spacing** | Shallow (1.5rem) | Shallow (1.5rem) | Variable (1.5-8rem) |
| **Size Discipline** | 3 sizes maximum | 3 levels (body + 2 headings) | 2 sizes preferred |
| **Responsive Strategy** | Static | Optional scaling | Fluid spacing |

## Implementation Consistency

Despite these domain-specific optimizations, all three approaches maintain:

- **Mathematical harmony** through Spencer Mortensen's sequence
- **Baseline grid alignment** for visual consistency
- **Systematic decision-making** based on user context
- **Brand alignment** with Canonical's precision values

Each domain represents a thoughtful application of our foundational principles, optimized for specific user needs while maintaining the systematic rigor that defines our approach.

---

*Next: [Typography Strategy](04-typography-strategy.md) - Weight hierarchies, line height relationships, and spacing philosophy*
