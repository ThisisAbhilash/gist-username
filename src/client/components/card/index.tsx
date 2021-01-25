import React, { FC } from 'react';
import './style.css';

interface GistProps {
  id: string;
  user_name: string;
  html_url: string;
  languages: [string];
  description: string;
  created_at: string;
  comments?: number;
  fork_count?: number;
  fetchForkCount: (id: string) => void;
}

const Card: FC<GistProps> = (props: GistProps) => {
  const {
    id,
    user_name,
    html_url,
    languages,
    description,
    created_at,
    comments,
    fork_count,
    fetchForkCount
  } = props;

  return (
    <li key={id} className="card">
      <div className="badges">
        {languages.map(k => <span className="badge">{k}</span>)}
      </div>
      <h4 className="card-title">
        {description} &bull; Author: {user_name}
      </h4>
      <p className="card-channel">
        <i>Created At : {new Date(created_at).toISOString()}</i>
      </p>
      <div className="card-metrics">
        <p>#Comments: {comments}</p>
        {fork_count === undefined && <button onClick={() => fetchForkCount(id)}>Fetch Fork Count</button>}
        {fork_count !== undefined && <p>#Forked: {fork_count}</p>}
      </div>
    </li>
  );
};

export default Card;
