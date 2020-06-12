import React from 'react';
import './Stat.css';

interface iStat {
  title: string;
  heroStat: string;
  opponentStat: string;
}

const Stat: React.FC<iStat> = (props) => {
  const { title, heroStat, opponentStat } = props;

  return (
    <div className="Stat">
      <span className="Stat_title">{title}</span>
      <div className="Stat_hero">
        <span>You</span>
        <span className="Stat_value">{heroStat}</span>
      </div>
      <div className="Stat_opponent">
        <span>Opponent</span>
        <span className="Stat_value">{opponentStat}</span>
      </div>
    </div>
  );
};

export default Stat;
