import React from 'react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/TOCItems/Tree';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';

import styles from './tocTree.module.css'; // ⬅️ add a CSS file like this

function TOCItemTree({
  toc,
  className,
  linkClassName,
  isChild,
}: Props): JSX.Element | null {
  const location = useLocation();

  if (!toc.length) return null;

  return (
    <ul className={clsx(styles.timeline, !isChild && className)}>
      {toc.map((heading, index) => {
        const isActive = location.hash === `#${heading.id}`;
        const isLast = index === toc.length - 1;

        return (
          <li className={clsx(styles.item)} key={heading.id}>
            <div className={clsx(styles.dot, isActive ? styles.active : styles.inactive)} />
            {!isLast && <div className={styles.line} />}
            <Link
              to={`#${heading.id}`}
              className={clsx(styles.link, isActive && styles.activeText)}
              dangerouslySetInnerHTML={{ __html: heading.value }}
            />
            <TOCItemTree
              isChild
              toc={heading.children}
              className={className}
              linkClassName={linkClassName}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(TOCItemTree);
