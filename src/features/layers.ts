import type { CategoryId } from '@/types/atlas'

/**
 * Her mimari katman için tutarlı bir vurgu rengi.
 * Öğrenme sayfasındaki görsel şema, çözüm profillerindeki katman
 * konumu göstergesi ve keşif tablosundaki kategori kodları aynı
 * renkleri kullanır, böylece öğrenci katmanı her yerde aynı renkle tanır.
 */
export const layerColors: Record<CategoryId, string> = {
  INF: '#135ce5',
  SRV: '#0b7189',
  RUN: '#2f5945',
  APP: '#b46755',
  DST: '#6b4fa0',
  GTW: '#9a5a00',
  EDG: '#a13737',
}
