---
layout: home
title: Home
---

# Canonical Type Scale System

A comprehensive typographic framework built on mathematical precision and domain-specific optimization.

---

## Overview

At Canonical, precision isn't just a brand value—it's the foundation of how we approach every design decision. Our Type Scale system transforms Spencer Mortensen's mathematical approach to classical typography into a modern, systematic framework that serves three distinct domains: **Documentation**, **Applications**, and **Editorial**.

## Key Features

### 🎯 **Domain-Specific Optimization**
Unlike one-size-fits-all approaches, our system provides specialized typography strategies for different contexts while maintaining mathematical harmony.

### 📐 **Mathematical Foundation**
Built on Spencer Mortensen's infinite harmonic sequence, ensuring perfect typographic relationships across all sizes.

### 🎨 **Baseline Grid Integration**
Enterprise-level precision with every element aligned to a consistent baseline grid—a level of rigor rarely seen in web design.

### 🌐 **Open Source Contribution**
Sophisticated font metrics extraction tools available to the broader design community.

---

## Quick Start

### Domain Comparison

| Domain | Base Size | Primary Goal | Best For |
|--------|-----------|--------------|----------|
| **[Documentation](docs/03-domain-guidelines.md#documentation-typography)** | 14px | Information density | Technical docs, APIs, guides |
| **[Applications](docs/03-domain-guidelines.md#application-typography)** | 14px | Sustained use comfort | Dashboards, tools, interfaces |
| **[Editorial](docs/03-domain-guidelines.md#editorial-typography)** | 16px | Scanability & accessibility | Marketing, blogs, content sites |

### Key Principles

- **Font Size Discipline**: Two sizes preferred, three maximum
- **Weight Strategy**: Increment by 200, skip weights for contrast  
- **Spacing Philosophy**: Single-direction approach with baseline alignment
- **Accessibility First**: WCAG compliance across all domains

---

## Documentation Sections

<div class="docs-grid">
  <div class="docs-card">
    <h3><a href="docs/01-introduction">1. Introduction</a></h3>
    <p>Canonical's precision philosophy and our contribution to the design community</p>
  </div>
  
  <div class="docs-card">
    <h3><a href="docs/02-theoretical-foundation">2. Theoretical Foundation</a></h3>
    <p>Spencer Mortensen's infinite harmonic sequence and design philosophy foundations</p>
  </div>
  
  <div class="docs-card">
    <h3><a href="docs/03-domain-guidelines">3. Domain Guidelines</a></h3>
    <p>Context-driven typography for documentation, applications, and editorial</p>
  </div>
  
  <div class="docs-card">
    <h3><a href="docs/04-typography-strategy">4. Typography Strategy</a></h3>
    <p>Weight hierarchies, line height relationships, and spacing philosophy</p>
  </div>
  
  <div class="docs-card">
    <h3><a href="docs/05-accessibility-responsive">5. Accessibility & Responsive</a></h3>
    <p>WCAG compliance, responsive behavior, and future exploration</p>
  </div>
</div>

---

## Resources

- **🔗 Repository**: [github.com/canonical/docs-typescale](https://github.com/canonical/docs-typescale)
- **📦 NPM Package**: [@lyubomir-popov/baseline-nudge-generator](https://www.npmjs.com/package/@lyubomir-popov/baseline-nudge-generator)
- **🎨 Live Demos**: Interactive examples in the repository

---

*Built with precision by Canonical's Design System team*

<style>
.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.docs-card {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f8f9fa;
}

.docs-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.docs-card h3 a {
  color: #0366d6;
  text-decoration: none;
}

.docs-card h3 a:hover {
  text-decoration: underline;
}

.docs-card p {
  margin-bottom: 0;
  color: #586069;
}
</style>
