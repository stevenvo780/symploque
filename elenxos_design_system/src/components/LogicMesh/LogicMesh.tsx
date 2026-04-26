import React, { useMemo } from 'react';
import styles from './LogicMesh.module.scss';

export interface LogicMeshProps {
  density?: number;
  className?: string;
}

export const LogicMesh: React.FC<LogicMeshProps> = ({
  density = 50,
  className = '',
}) => {
  // Generar nodos y conexiones de forma determinística en el primer render
  const { nodes, lines } = useMemo(() => {
    const generatedNodes = Array.from({ length: density }, (_, i) => {
      const typeRand = Math.random();
      let variant = '';
      if (typeRand > 0.8) variant = '--mask';
      else if (typeRand < 0.4) variant = '--dim';

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 2 + 1,
        variant,
      };
    });

    const generatedLines: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];
    
    // Conectar nodos cercanos
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const dx = generatedNodes[i].x - generatedNodes[j].x;
        const dy = generatedNodes[i].y - generatedNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Si están lo suficientemente cerca, dibujar línea (20% de la pantalla)
        if (dist < 20) {
          generatedLines.push({
            id: `${i}-${j}`,
            x1: generatedNodes[i].x,
            y1: generatedNodes[i].y,
            x2: generatedNodes[j].x,
            y2: generatedNodes[j].y,
          });
        }
      }
    }

    return { nodes: generatedNodes, lines: generatedLines };
  }, [density]);

  return (
    <div className={`${styles['elx-logic-mesh']} ${className}`} aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        {lines.map((line) => (
          <line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            className={styles['elx-logic-mesh__line']}
          />
        ))}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.r}
            className={`${styles['elx-logic-mesh__node']} ${
              node.variant ? styles[`elx-logic-mesh__node${node.variant}`] : ''
            }`}
            style={{ animationDelay: `${node.id * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
};

export default LogicMesh;
