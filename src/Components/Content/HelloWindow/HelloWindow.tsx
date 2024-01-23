import React from 'react';

import styles from './Hello.module.scss';
const HelloWindow = () => {
  const hello = React.useRef<HTMLDivElement>(null);
  const Hendle = () => {
    localStorage.setItem('hello', 'DONE');
    if (hello.current) hello.current.style.display = 'none';
  };
  return (
    <div ref={hello} className={styles.hello}>
      <div className={styles.content}>
        <h1>Hello👋 </h1>
        <h3>
          Welcome to our portal! We're glad to see you here and hope that your
          time here will be enjoyable, useful, and productive. Wishing you
          success in all your endeavors. This planner is designed to help you
          visualize your tasks and interact with them conveniently. The planner
          does not store your data on the server, all data is saved on your
          device, and the planner simply displays it. If you have any questions,
          feel free to reach out to us. Have a productive experience!
        </h3>
        <h2>Features 🛠️</h2>
        <h3>{`CTRL + ENTER = Add Todo (But remember that to add a task, you need to enter at least a title.)`}</h3>
        <h3>DOUBLE CLICK ON TASK = Removing task.</h3>
        <h3>
          {`At the top of the page, there is a theme switcher (dark-light) and a
          calendar. In the calendar, you can select the day, month, and year you
          need (by default, the current day is set), and then add tasks. Also,
          days with tasks are marked in blue to quickly find the desired day.
          Widgets show the next three days that contain scheduled tasks. Also,
          by clicking on the widgets, you can go to the respective day.
        `}
        </h3>
        <button onClick={Hendle}>Let's GO</button>
      </div>
    </div>
  );
};

export default HelloWindow;
