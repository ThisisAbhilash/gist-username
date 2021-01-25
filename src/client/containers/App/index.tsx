import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllGists, fetchAGist } from '../../store/gists/action';
import GitLogo from '../../../../public/git-logo.png';
import CardSkeleton from '../../components/card-skeleton';
import Card from '../../components/card';
import './style.css';


const App: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const inputRef: any = React.createRef();
  const dispatch = useDispatch();

  const { userName, allGists, loading, gistFork } = useSelector((state: any) => state.gists);

  const handleSubmit = function (event: any) {
    event.preventDefault();
    const user_name = inputRef.current.value.trim();
    //if user has not typed anything
    if (user_name.length === 0) {
      return;
    }
    //dispatch
    dispatch(fetchAllGists({ user_name }));
  };

  const fetchForkCount = (id: string) => dispatch(fetchAGist(id));

  return (
    <div className="App">
      <section className="sticky">
        <div className="dFlex margin5">
          <div className="dFlex">
            <img src={GitLogo} height={40} alt="github_logo" />
          </div>
          <div className="imageText">
            <div className="dFlex">
              <b>Github Gist Searcher</b>
            </div>
            <div>Search github gists for users</div>
          </div>
        </div>

        <form onSubmit={(event) => handleSubmit(event)} className="dFlex margin5 pad5">
          <label />
          <input
            className="form-control"
            type="text"
            placeholder="Type user name to search gists..."
            ref={inputRef} />
        </form>

      </section>
      <section>
        {loading && <CardSkeleton size={21}/>}
        {!loading && userName.length > 0 && (
          <>
            <h2 className="section-title">
              Showing {allGists.length} gists for &quot;{userName}&quot;
            </h2>
            <ul className="list" key={1}>
              {allGists.map((k: any) => {
                const activeCard = gistFork && gistFork.gistId === k.id;
                const file: any = k.files && (Object.values(k.files) || []);
                const languages = file ? file.map((k: any) => k.language) : [];

                return <Card
                  key={k.id}
                  user_name={userName}
                  languages={languages}
                  fetchForkCount={fetchForkCount}
                  fork_count={activeCard ? gistFork.forkData.length : undefined} 
                  {...k}
                />;
              })}
            </ul>
          </>
        )}
      </section>
    </div>
  );
};

export default App;
