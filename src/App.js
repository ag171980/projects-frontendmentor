import logo from './logo.svg';
import { AiOutlineEye } from 'react-icons/ai'
import { TbHandClick } from 'react-icons/tb'
import axios from 'axios'
import './App.css';
import { useState } from 'react';

function App() {
  const [load, setLoad] = useState(false)
  const [repos, setRepos] = useState([])


  const getRepos = async () => {
    try {
      const response = await axios.get("https://api.github.com/orgs/frontendMentor-me/repos")
      if (response.status === 200) {
        setLoad(true)
        setRepos(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.log("error: ", error.message)
    }
  }
  const handleClick = (index) => {
    const asd = document.getElementsByClassName("url_repo")[index].innerHTML

    var aux = document.createElement("input");
    aux.setAttribute("value", asd);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }
  if (!load) {
    getRepos()
  }
  return (
    <div className="App">
      <h1>Frontendmentor repositories</h1>
      <div className='repositories'>
        {repos &&
          repos.map((repo, index) =>
            <div className='repository' key={index}>

              <div className='data-repo'>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </div>
              <div className='detail-repo'>
                {
                  repo.topics.map((topic) =>
                    <p>#{topic}</p>)
                }
              </div>
              <div className='description-repo'>
                <div className='buttons'>
                  <button title='View repository'><a href={repo.html_url} target="_blank"> <AiOutlineEye /> Repo</a></button>
                  <button title='Click view Demo'><a href={repo.homepage} target="_blank"><TbHandClick /> Demo </a></button>
                </div>
                <p className='url_repo' style={{ display: "none" }}>{repo.clone_url}</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
