import React from 'react';
import styles from './NotPhone.module.scss';
const NotPhone = () => {
  return (
    <div className={styles.NOT}>
      <h1>Hello</h1>
      <h3>Glad to see you here!</h3>
      <h3>
        😔Unfortunately, the planner is not available for phones at the moment,
        but you can access it from a tablet or computer. This issue will be
        resolved as soon as possible.Unfortunately, the planner is not available
        for phones at the moment, but you can access it from a tablet or
        computer. This issue will be resolved as soon as possible.
      </h3>
    </div>
  );
};

export default NotPhone;
