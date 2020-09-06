import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    if (query !== '') {
      fetchData()
    }
  }, [query])

  async function fetchData() {
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=JKFiE01SWXKFYh1sexzimtsflXCSmfwu&q=${query}&limit=10&offset=0&rating=G&lang=en`)

      const json = await res.json()
      console.log({ json })
      setResult(
        json.data.map(item => (
          item.images.preview.mp4
        )))
    } catch (error) { }
  }

  function onSubmit(e) {
    e.preventDefault()
    setQuery(search)
    setSearch('')

  }

  function onChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Awesome Giphy</h2>

        <form onSubmit={onSubmit}>
          <input value={search} onChange={onChange} />

          <button type="submit">search gif</button>

        </form>
      </header>

      {result.map(item => (
        // <h1 key={item}> {item}</h1>
        <video autoPlay loop key={item} src={item} />
      ))}
    </div >
  );
}

export default App;
