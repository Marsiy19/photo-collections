import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './component/Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]


function App() {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)

  const [collections, setCollections] = useState([])
  const [categoryId, setCategoryId] = useState(0)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''

    fetch(`https://647f2683c246f166da9033b9.mockapi.io/img/collection?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json)
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получений данных')
    })
    .finally(() => {
      setLoading(false)
    })
  }, [categoryId, page])



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">


        <ul className="tags">
            {
              cats.map((item, i) => <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={item.name}>{item.name}</li>)
            }
        </ul>


        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          loading ? (<h1>Loading...</h1>) : (
            collections
            .filter((item) => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
            .map((item, index) => (
              <Collection key={index}
              name={item.name}
              images={item.photos}
            />
            ))
          )
        }

      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (
            <li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
