import React, {ReactNode} from 'react';

export const Section: React.FC<{
  children?: ReactNode;
  description?: string;
  title?: string;
}> = ({children, description, title}) => {
  return (
    <div style={styles.sectionContainer}>
      {title ? (
        <div style={styles.sectionTitle}>{title}</div>
      ) : null}
      {description ? (
        <div style={styles.sectionDescription}>
          {description}
        </div>
      ) : null}
      <div style={styles.sectionDescription}>{children}</div>
    </div>
  );
};

const styles = {
  sectionContainer: {
    marginTop: 18,
    paddingHorizontal: 24,
  },
  childrenContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
}
