import React from 'react';

const Timer: React.FC = () => {
  const [now, setNow] = React.useState('time');
  React.useEffect(() => {
    let ts = setInterval(() => {
      let time = new Date();

      setNow(time.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(ts);
  }, []);
  return (
    <p style={{ width: '70px', fontSize: '20px', marginRight: '20px' }}>
      {now}
    </p>
  );
};

export default Timer;
