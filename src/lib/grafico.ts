/**
 * Larguras de desenho dos gráficos em SVG. O SVG escala com o contêiner, então o
 * texto escala junto: cada variante só aparece na faixa de largura em que a escala
 * fica entre ~0,9 e ~1,25 (texto de 14 unidades entre ~12,5 e ~17,5 px). As faixas
 * estão em global.css (container queries em `.graficos`).
 */
export const LARGURAS = [240, 320, 440, 600, 820, 1100] as const;
export type Largura = (typeof LARGURAS)[number];
