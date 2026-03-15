/**
 * services-data.ts  —  Données statiques des services Pro-Pub
 * ─────────────────────────────────────────────────────────────────
 * Fichier SANS 'use client' intentionnellement.
 * Permet l'import de SERVICES_DATA depuis un Server Component (page.tsx).
 * ─────────────────────────────────────────────────────────────────
 */

import { createElement } from 'react'
import {
  Building2,
  Layers,
  Type,
  Lightbulb,
  Palette,
  Zap,
  Wrench,
  Printer,
} from 'lucide-react'

/* ── Type ───────────────────────────────────────────────────────── */
export interface ServiceCardData {
  slug:        string
  title:       string
  description: string
  tag?:        string           // ex: "Phare", "Populaire", "Tendance"
  price?:      string           // ex: "À partir de 50 000 F"
  icon?:       React.ReactNode  // icône Lucide créée via createElement()
}

/* ── Données ────────────────────────────────────────────────────── */
export const SERVICES_DATA: ServiceCardData[] = [
  {
    slug:        'facades-3d',
    title:       'Façades décoratives 3D',
    description: "Habillage extérieur moderne qui transforme l'identité visuelle de votre commerce. Relief, texture, impact garanti.",
    tag:         'Phare',
    price:       'Sur devis',
    icon:        createElement(Building2, { size: 22 }),
  },
  {
    slug:        'habillage-ext-int',
    title:       'Habillage extérieur & intérieur',
    description: 'Revêtement Alucobond, bardage composite, finitions premium sur tous supports et toutes surfaces.',
    icon:        createElement(Layers, { size: 22 }),
  },
  {
    slug:        'enseignes-3d',
    title:       'Enseignes 3D',
    description: 'Lettres en relief taillées sur mesure pour boutiques, pharmacies, restaurants et entreprises.',
    tag:         'Populaire',
    price:       'À partir de 50 000 F',
    icon:        createElement(Type, { size: 22 }),
  },
  {
    slug:        'lettres-led',
    title:       'Lettres lumineuses LED',
    description: 'Signalétique rétroéclairée haute luminosité, consommation optimisée, durée de vie 50 000h.',
    icon:        createElement(Lightbulb, { size: 22 }),
  },
  {
    slug:        'logos-muraux',
    title:       'Logos muraux',
    description: 'Impression grand format, stickers, fresques murales sur mesure pour votre identité de marque.',
    icon:        createElement(Palette, { size: 22 }),
  },
  {
    slug:        'neon-deco',
    title:       'Décoration néon',
    description: 'Néon LED sur mesure pour salons de beauté, bars, studios, restaurants et instituts.',
    tag:         'Tendance',
    icon:        createElement(Zap, { size: 22 }),
  },
  {
    slug:        'renovation-facade',
    title:       'Rénovation de façade',
    description: "Diagnostic, dépose de l'existant, réfection complète de l'enseigne et de la façade commerciale.",
    icon:        createElement(Wrench, { size: 22 }),
  },
  {
    slug:        'imprimerie-vitrerie',
    title:       'Imprimerie & Vitrerie',
    description: 'Impression numérique, covering vitrine, films décoratifs et adhésifs tous formats.',
    icon:        createElement(Printer, { size: 22 }),
  },
]